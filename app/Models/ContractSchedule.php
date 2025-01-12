<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContractSchedule extends Model
{
    protected $table = 'contract_schedules';
    protected $primaryKey = 'id';
    protected $keyType = 'integer';

    public $incrementing = true;
    public $timestamps = true;
    public $fillable = [
        'installment_number',
        'installment_amount',
        'due_date',
        'contract_id',
    ];

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class, 'contract_id', 'id');
    }
}
