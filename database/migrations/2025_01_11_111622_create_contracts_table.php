<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('contract_number')->unique();
            $table->string('client_name');
            $table->double('otr');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('contract_schedules', function (Blueprint $table) {
           $table->id();
           $table->smallInteger('installment_number');
           $table->double('installment_amount');
           $table->date('due_date');
           $table->foreignId('contract_id')->constrained('contracts');
           $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_schedules');
        Schema::dropIfExists('contracts');
    }
};
