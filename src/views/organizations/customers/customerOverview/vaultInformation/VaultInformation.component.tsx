import React from 'react';
import styles from './index.module.scss';
import formStyles from '@/Form.module.scss';
import { useRouter } from 'next/router';
import useFetchData from '@/state/useFetchData';
import PaymentInformationForm from './paymentInformation/PaymentInformation.component';
import { Button, Form, Modal } from 'antd';
import { useInterfaceStore } from '@/state/interface';
import usePostData from '@/state/usePostData';
import useUpdateData from '@/state/useUpdateData';
import useRemoveData from '@/state/useRemoveData';
import Loader from '@/components/loader/Loader.component';

const VaultInformation = () => {
  const router = useRouter();
  const { id } = router.query;
  const { signUpPaymentFormValues, paymentMethod, setSignUpPaymentFormValues } =
    useInterfaceStore((state) => state);

  const { data } = useFetchData({
    url: `/customer/${id}`,
    key: 'customer',
    enabled: !!id,
  });
  const { data: vaultData, isLoading: fetchLoading } = useFetchData({
    url: `/vault/${data?.payload?.vault?._id}`,
    key: 'vault',
    enabled: !!data?.payload?.vault?._id,
  });

  const { mutate: createVault, isLoading: createLoading } = usePostData({
    url: `/vault/${id}`,
    key: 'vault',
    queriesToInvalidate: ['customer'],
    successMessage: `Successfully created a vault for the customer`,
  });
  const { mutate: updateVault, isLoading: updateLoading } = useUpdateData({
    queriesToInvalidate: ['vault', 'customer'],
    successMessage: `Successfully updated the vaulted information for the customer`,
  });

  const { mutate: removeVault } = useRemoveData({
    queriesToInvalidate: ['customer'],
    queriesToReset: ['vault'],
    successMessage: `Successfully removed the vaulted information for the customer`,
  });
  const handleVaultCreation = async () => {
    // create a new vault
    // if there is no vault data, we are creating a new vault
    if (!vaultData?.payload) {
      createVault({ ...signUpPaymentFormValues, paymentMethod });
    } else {
      // update the existing vault
      updateVault(
        {
          url: `/vault/${vaultData?.payload?._id}`,
          formData: signUpPaymentFormValues,
        },
        {
          onSuccess: () => {
            // clear the form values so that lingering data is not present
            setSignUpPaymentFormValues({});
          },
        }
      );
    }
  };

  const handleVaultRemoval = async () => {
    // remove the vault
    Modal.confirm({
      title: 'Remove Vault',
      content:
        'Are you sure you want to remove this vault? this action is irreversible',
      onOk: () => {
        removeVault(
          { url: `/vault/${data?.payload?.vault?._id}` },
          {
            onSuccess: () => {
              window.location.reload();
            },
          }
        );
      },
    });
  };

  React.useEffect(() => {
    // if there is vault data, set the form values, and set the correct payment method
    if (vaultData?.payload) {
      useInterfaceStore.setState({
        paymentMethod: vaultData.payload.paymentMethod,
        signUpPaymentFormValues: {
          first_name: vaultData.payload?.billingAddress?.name.split(' ')[0],
          // there might be more than one last name seperated by a space
          last_name: vaultData.payload?.billingAddress?.name
            .split(' ')
            .slice(1)
            .join(' '),
          address1: vaultData.payload?.billingAddress?.line1,
          address2: vaultData.payload?.billingAddress?.line2,
          city: vaultData.payload?.billingAddress?.city,
          state: vaultData.payload?.billingAddress?.state,
          zip: vaultData.payload?.billingAddress?.zip,
          country: vaultData.payload?.billingAddress?.country,
          ...(vaultData.payload.paymentMethod === 'creditcard' && {
            creditCardDetails: {
              ...vaultData?.payload?.creditCardDetails,
              ccnumber: `XXXX-XXXX-XXXX-${vaultData?.payload?.creditCardDetails?.last4}`,
            },
          }),
          ...(vaultData.payload.paymentMethod === 'check' && {
            achDetails: {
              checkname: vaultData?.payload?.achDetails?.checkname,
              ...vaultData?.payload?.achDetails,
              checkaba: `XXXX${vaultData?.payload?.achDetails?.checkaba.slice(
                -4
              )}`,
              checkaccount: `XXXX${vaultData?.payload?.achDetails?.checkaccountLast4}`,
            },
          }),
        },
      });
    }
  }, [vaultData]);

  return (
    <div className={styles.container}>
      {vaultData?.payload && (
        <div className={styles.headContainer}>
          <div className={styles.leftContainer}>
            <h3>Vault Information</h3>
            <p>Customer Vault Id: {vaultData?.payload.nmiCustomerVaultId}</p>
          </div>
          <div className={styles.rightContainer}>
            <Button onClick={handleVaultRemoval}>Remove Vault</Button>
          </div>
        </div>
      )}
      <div className={formStyles.form__formContainer}>
        <PaymentInformationForm vaultData={vaultData?.payload} />
        <div className={formStyles.form__buttonContainer}>
          {paymentMethod && Object.keys(signUpPaymentFormValues).length ? (
            <Button type="primary" onClick={handleVaultCreation}>
              {vaultData?.payload ? 'Update Vault' : 'Create Vault'}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultInformation;
