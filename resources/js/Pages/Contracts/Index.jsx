import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import FormModal from "@/Pages/Contracts/FormModal"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

const Contracts = () => {
  const { props } = usePage()
  const contracts = props.data.data
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isShowModalOpen, setIsShowModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null);

  const { data, setData, get, processing, errors, reset } = useForm({
    start_date: '',
    end_date: '',
  });

  const handleFormModalOpen = () => {
    setIsFormModalOpen(true);
  }

  const handleFormModalClose = () => {
    setIsFormModalOpen(false)
  }

  const handleShowModalOpen = (contract) => {
    setSelectedContract(contract);
    setIsShowModalOpen(true);
  }

  const handleShowModalClose = () => {
    setIsShowModalOpen(false)
    setSelectedContract(null);
  }

  const showDetails = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    console.log(isShowModalOpen)

    get(route('contracts.show', { contract: selectedContract }), {
      onSuccess: (page) => {
        console.log("Server Response:", page.props);
        setIsShowModalOpen(false);
      },
      onError: (errors) => {
        console.error("Validation Errors:", errors);
        alert("Data Required");
      },
      onFinish: () => {
        console.log('End Request');
      },
    });
  };


  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Contracts
        </h2>
      }
    >
      <Head title={'Contracts'}/>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 space-y-4">
              <PrimaryButton onClick={handleFormModalOpen}>Create Contract</PrimaryButton>
              <div>
                <table className={'w-full'}>
                  <thead>
                  <tr className={'bg-slate-50'}>
                    <th className={'border py-2 px-4'}>Contract Number</th>
                    <th className={'border py-2 px-4'}>Client Name</th>
                    <th className={'border py-2 px-4'}>OTR</th>
                    <th className={'border py-2 px-4'}>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract.id}>
                      <td className={'text-center border py-2 px-4'}>{contract.contract_number}</td>
                      <td className={'text-center border py-2 px-4'}>{contract.client_name}</td>
                      <td className={'text-center border py-2 px-4'}>{new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(contract.otr)}</td>
                      <td className={'text-center border py-2 px-4'}>
                        <PrimaryButton onClick={() => handleShowModalOpen(contract)}>Show</PrimaryButton>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormModal
        isFormModalOpen={isFormModalOpen}
        setIsFormModalOpen={handleFormModalClose}
      />

      <Modal show={isShowModalOpen} onClose={handleShowModalClose} maxWidth={'2xl'}>
        <div className={'flex flex-col gap-4 p-4'}>
          <div>
            <h1 className="text-lg font-bold">Range Installment</h1>
            <p className="text-sm text-gray-600">Influenced by the duration of unpaid installments.</p>
          </div>
          <form onSubmit={showDetails} className={'flex flex-col gap-4'}>
            <div>
              <InputLabel htmlFor="start_date" value="Start"/>
              <TextInput
                id="start_date"
                name="start_date"
                type={'date'}
                value={data.start_date}
                className="mt-1 block w-full"
                autoComplete="start_date"
                isFocused={true}
                onChange={(e) => {
                  setData('start_date', e.target.value)
                }}
              />
              <InputError message={errors.start_date} className="mt-2"/>
            </div>
            <div>
              <InputLabel htmlFor="end_date" value="End"/>
              <TextInput
                id="end_date"
                name="end_date"
                type={'date'}
                value={data.end_date}
                className="mt-1 block w-full"
                autoComplete="end_date"
                isFocused={true}
                onChange={(e) => {
                  setData('end_date', e.target.value)
                }}
              />
              <InputError message={errors.end_date} className="mt-2"/>
            </div>
            <div className={'flex justify-end'}>
              <SecondaryButton onClick={handleShowModalClose}>
                Cancel
              </SecondaryButton>
              <PrimaryButton className="ms-4" disabled={processing}>
                Confirm
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Modal>
    </AuthenticatedLayout>
  )
}
export default Contracts
