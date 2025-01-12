<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowContractRequest;
use App\Http\Requests\StoreContractRequest;
use App\Http\Requests\UpdateContractRequest;
use App\Models\Contract;
use App\Models\ContractSchedule;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use function Illuminate\Support\Str;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $data = Contract::query()->with('contractSchedules', 'user')->paginate(10);
        return Inertia::render('Contracts/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreContractRequest $request
     * @return RedirectResponse
     * @throws Exception
     */
    public function store(StoreContractRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['otr'] = $this->parseCurrency($data['otr']);
        $contract = $this->parseContract($data);

        DB::beginTransaction();
        try {
            $contract->save();
            $contractSchedules = $this->parseContractSchedule($data, $contract['id']);

            foreach ($contractSchedules as $data) {
                $data['contract_id'] = $contract['id'];
                $contractSchedule = new ContractSchedule($data);
                $contractSchedule->save();
            }

            DB::commit();
            return redirect()->route('contracts.index');
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }

    /**
     * @param $value
     * @return float
     */
    private function parseCurrency($value): float
    {
        $cleanedValue = str_replace(['Rp', '.', ' ', "\u{A0}"], '', $value);
        $cleanedValue = str_replace(',', '.', $cleanedValue);

        return (float)$cleanedValue;
    }

    /**
     * @param $data
     * @return Contract
     */
    private function parseContract($data): Contract
    {
        $data['contract_number'] = (new Contract)->generateCode();
        $data['created_by'] = auth()->id();

        return new Contract(Arr::except($data, ['dp', 'due_date']));
    }

    /**
     * @param $data
     * @param int $contractId
     * @return array
     */
    private function parseContractSchedule($data, int $contractId): array
    {
        $contractSchedules = [];
        $dateNow = date('Y-m-d');

        $principalDebt = $data['otr'] - (($data['dp'] / 100) * $data['otr']);
        $interestRate = 12 / 100;
        if ($data['due_date'] > 12 && $data['due_date'] <= 24) {
            $interestRate = 14 / 100;
        } else if ($data['due_date'] > 24) {
            $interestRate = 16.5 / 100;
        }
        for ($i = 1; $i <= $data['due_date']; ++$i) {
            $contractSchedules[] = [
                'installment_number' => $i,
                'installment_amount' => ($principalDebt + ($principalDebt * $interestRate)) / $data['due_date'],
                'due_date' => date('Y-m-d', strtotime("+{$i} month", strtotime($dateNow))),
                'contract_id' => $contractId
            ];
        }
        return $contractSchedules;
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowContractRequest $request, Contract $contract): Response
    {
        $dateRange = $request->validated();

        //Soal no 1
        $contractSchedules = $contract->with('contractSchedules')->first();

        //Soal no 2
        $installmentDueDate = $contract->load(['contractSchedules' => function ($query) use ($dateRange) {
            if (isset($dateRange['start_date']) && isset($dateRange['end_date'])) {
            $query->whereBetween('due_date', [$dateRange['start_date'], $dateRange['end_date']]);
            }
        }]);

        //Soal no 3
        $penaltyDueDate = null;
        if (isset($dateRange['start_date']) && isset($dateRange['end_date'])) {
            $startDate = new \DateTime($dateRange['start_date']);
            $endDate = new \DateTime($dateRange['end_date']);
            $penaltyDueDate = $startDate->diff($endDate)->days;
        }
        $contractSchedules['unpaid'] = $installmentDueDate['contractSchedules']->sum('installment_amount');
        $contractSchedules['penalty'] =  $penaltyDueDate * ($contract['otr']  * (0.1/100));

        return Inertia::render('Contracts/Show', [
            'contract' => $contractSchedules,
            'installmentDueDate' => $installmentDueDate,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contract $contract)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContractRequest $request, Contract $contract)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contract $contract)
    {
        //
    }
}
