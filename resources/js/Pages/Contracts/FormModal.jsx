import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

const FormModal = ({ isFormModalOpen, setIsFormModalOpen }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    otr: '',
    dp: '',
    client_name: '',
    due_date: '',
  });

  useEffect(() => {
    reset('otr', 'dp', 'due_date')
  }, [isFormModalOpen]);

  const closeModal = () => {
    setIsFormModalOpen(false)
  }

  const submit = (e) => {
    e.preventDefault()

    post(route('contracts.store'), {
      onSuccess: (page) => {
        console.log("Server Response:", page.props);
        setIsFormModalOpen(false)
      },
      onError: (errors) => {
        console.error("Validation Errors:", errors);
      },
      onFinish: () => {
        console.log('End Request')
      },
    });
  }

  const formatCurrency = (value) => {
    if (!value) return "";
    const numericValue = value.replace(/[^0-9]/g, "");
    return new Intl.NumberFormat("id-ID", {
      style: 'currency',
      currency: 'IDR',
    }).format(numericValue / 100)
  }

  const clearCurrencyFormat = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const handleFormatCurrency = (e) => {
    const numberValue = formatCurrency(e.target.value)
    setData('otr', numberValue)
  }

  return (
    <Modal show={isFormModalOpen} onClose={setIsFormModalOpen} maxWidth={'2xl'}>
      <div className={'flex flex-col gap-4 p-4'}>
        <div>
          <h1 className="text-lg font-bold">Add Contract</h1>
          <p className="text-sm text-gray-600">Create a contract for customer.</p>
        </div>
        <form onSubmit={submit}>
          <div className={'flex flex-col gap-4 mb-4'}>
            <div>
              <InputLabel htmlFor="client_name" value="Name"/>
              <TextInput
                id="client_name"
                name="client_name"
                value={data.client_name}
                className="mt-1 block w-full"
                placeholder={'Client Name'}
                autoComplete="client_name"
                isFocused={true}
                onChange={(e) => {setData('client_name', e.target.value)}}

              />
              <InputError message={errors.client_name} className="mt-2"/>
            </div>
            <div>
              <InputLabel htmlFor="otr" value="On the Road"/>
              <TextInput
                id="otr"
                name="otr"
                value={data.otr}
                className="mt-1 block w-full"
                placeholder={'OTR'}
                autoComplete="otr"
                onChange={handleFormatCurrency}

              />
              <InputError message={errors.otr} className="mt-2"/>
            </div>
            <div>
              <InputLabel htmlFor="dp" value="Down Payment (%)"/>
              <TextInput
                id="dp"
                name="dp"
                type={'number'}
                min={0.1}
                max={100}
                step={0.1}
                value={data.dp}
                className="mt-1 block w-full"
                placeholder={'DP'}
                autoComplete="dp"
                onChange={(e) => setData('dp', e.target.value)}

              />
              <InputError message={errors.dp} className="mt-2"/>
            </div>
            <div>
              <InputLabel htmlFor="due_date" value="Jangka Waktu (Perbulan)"/>
              <TextInput
                id="due_date"
                name="due_date"
                type={'number'}
                min={12}
                step={1}
                value={data.due_date}
                className="mt-1 block w-full"
                placeholder={'-- Bulan'}
                autoComplete="due_date"
                onChange={(e) => setData('due_date', e.target.value)}

              />
              <InputError message={errors.due_date} className="mt-2"/>
            </div>
          </div>
          <div className={'flex justify-end'}>
            <SecondaryButton onClick={closeModal}>
              Cancel
            </SecondaryButton>
            <PrimaryButton className="ms-4" disabled={processing}>
              Save
            </PrimaryButton>
          </div>
        </form>
      </div>
    </Modal>
  )
    ;
};

export default FormModal;
