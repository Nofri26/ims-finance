<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contract extends Model
{
    protected $table = 'contracts';
    protected $primaryKey = 'id';
    protected $keyType = 'integer';
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'otr',
        'contract_number',
        'client_name',
        'created_by'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function contractSchedules(): HasMany
    {
        return $this->hasMany(ContractSchedule::class, 'contract_id', 'id');
    }

    public function generateCode(): string
    {
        $lastCode = self::query()
            ->selectRaw("MAX(CAST(SUBSTRING(contract_number, 4) AS UNSIGNED)) as max_code")
            ->value('max_code');
        if (!$lastCode) {
            return 'AGR0001';
        }
        $newCode = str_pad($lastCode + 1, 4, '0', STR_PAD_LEFT);
        return 'AGR' . $newCode;
    }
}
