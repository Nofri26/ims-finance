import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const Show = ({ contract, installmentDueDate }) => {
  console.log(contract)
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Show Contract
        </h2>
      }
    >
      <Head title={'Show Contract'}/>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 space-y-4">

              <div className={'p-4 border rounded-xl'}>
                <h1 className={'mb-4 pb-1 border-b font-bold text-xl'}>Contract Details</h1>
                <div className={'flex justify-between'}>
                  <p>Client Name:</p>
                  <p>{contract.client_name}</p>
                </div>
                <div className={'flex justify-between'}>
                  <p>Contract Number:</p>
                  <p>{contract.contract_number}</p>
                </div>
                <div className={'flex justify-between'}>
                  <p>OTR:</p>
                  <p>{contract.otr}</p>
                </div>
              </div>

              <div className={'p-4 border rounded-xl'}>
                <h1 className={'mb-4 pb-1 border-b font-bold text-xl'}>Contract Schedules</h1>
                <table className={'w-full'}>
                  <thead>
                  <tr className={'bg-slate-50'}>
                    <th className={'border py-2 px-4'}>Contract Number</th>
                    <th className={'border py-2 px-4'}>Installment Number</th>
                    <th className={'border py-2 px-4'}>Installment Amount</th>
                    <th className={'border py-2 px-4'}>Due Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {contract.contract_schedules.map((schedule) => (
                    <tr key={`${contract.id}-${schedule.installment_number}`}>
                      <td className={'text-center border py-2 px-4'}>{contract.contract_number}</td>
                      <td className={'text-center border py-2 px-4'}>{schedule.installment_number}</td>
                      <td className={'text-center border py-2 px-4'}>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(schedule.installment_amount)}
                      </td>
                      <td className={'text-center border py-2 px-4'}>{schedule.due_date}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>

              <div className={'p-4 border rounded-xl'}>
                <h1 className={'mb-4 pb-1 border-b font-bold text-xl'}>Installments</h1>
                <table className={'w-full'}>
                  <thead>
                  <tr className={'bg-slate-50'}>
                    <th className={'border py-2 px-4'}>Contract Number</th>
                    <th className={'border py-2 px-4'}>Client Name</th>
                    <th className={'border py-2 px-4'}>Installments Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  {installmentDueDate.contract_schedules.map((schedule) => (
                    <tr key={`${installmentDueDate.id}-${schedule.installment_number}`}>
                      <td className={'text-center border py-2 px-4'}>{installmentDueDate.contract_number}</td>
                      <td className={'text-center border py-2 px-4'}>{installmentDueDate.client_name}</td>
                      <td className={'text-center border py-2 px-4'}>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(schedule.installment_amount)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className={'text-center border py-2 px-4'} colSpan={3}>
                      <div className={'flex justify-between'}>
                        <p className={'font-bold'}>Total Installment :</p>
                        <h2 className={'font-bold'}>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(contract.unpaid)}
                        </h2>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>


              <div className={'p-4 border rounded-xl'}>
                <h1 className={'mb-4 pb-1 border-b font-bold text-xl'}>Contract Penalties</h1>
                <table className={'w-full'}>
                  <thead>
                  <tr className={'bg-slate-50'}>
                    <th className={'border py-2 px-4'}>Contract Number</th>
                    <th className={'border py-2 px-4'}>Client Name</th>
                    <th className={'border py-2 px-4'}>Total Installments</th>
                    <th className={'border py-2 px-4'}>Total Unpaid Penalties</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className={'text-center border py-2 px-4'}>{contract.contract_number}</td>
                    <td className={'text-center border py-2 px-4'}>{contract.client_name}</td>
                    <td className={'text-center border py-2 px-4'}>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(contract.unpaid)}
                    </td>
                    <td className={'text-center border py-2 px-4'}>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(contract.penalty)}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
