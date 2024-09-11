import React from 'react';
import styles from './CustomerDetails.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Form, Input, message, Tooltip } from 'antd';
import PaymentInformationForm from '../paymentInformation/PaymentInformation.component';
import TransactionData from '../transactionalData/TransactionData.view';
import { useInterfaceStore } from '@/state/interface';
import usePostData from '@/state/usePostData';

const CustomerDetails = () => {
  const [form] = Form.useForm();
  const [addPayment, setAddPayment] = React.useState(false);
  const {
    signUpPaymentFormValues,
    paymentMethod,
    setSignUpPaymentFormValues,
    setTransactionDataValues,
    transactionData,
  } = useInterfaceStore((state) => state);

  const { mutate: addCustomer } = usePostData({
    url: '/customer',
    key: 'customer',
    successMessage: 'Customer added successfully',
    redirectUrl: '/organization/customers',
  });

  const onFinish = (values: any) => {
    // post to the backend
    addCustomer({
      ...values,
      // if there is values in the payment form, add them to the customer
      ...(Object.keys(signUpPaymentFormValues).length > 0 && {
        paymentInfo: { ...signUpPaymentFormValues, type: paymentMethod },
      }),
      ...(Object.keys(transactionData).length > 0 && {
        transaction: { ...transactionData },
      }),
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <p>
          This is the customer details page. This page will show the details of
          the customer. Adding a customer allows you to keep track of the
          customer's information and their transactions, You can also use this
          information to create recurring transactions
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        className={formStyles.form}
        onFinish={onFinish}
      >
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input a name' }]}
              >
                <Input type="text" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Last Name" name="lastName" rules={[]}>
                <Input type="text" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input an email' }]}
              >
                <Input type="text" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: 'Please input a phone number' },
                  {
                    // pattern should be 3 digits followed by a dash, followed by 3 digits, followed by a dash, followed by 4 digits
                    pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/g,
                    message: 'Please input a valid phone number, XXX-XXX-XXXX',
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__buttonContainer}>
            {/* button to check if the merchant wants to add extra information */}
            <Tooltip
              title={
                addPayment
                  ? 'Do not add payment information'
                  : 'You dont have to add payment data, however it is useful and needed if you plan to use this customer as a recurring customer, or if you plan to charge their account'
              }
            >
              <Button
                type="primary"
                onClick={() => {
                  // validate the form fields first
                  form.validateFields().then(() => {
                    // if the state is going from true to false, remove the payment and transaction data
                    if (addPayment) {
                      setSignUpPaymentFormValues({});
                      setTransactionDataValues({});
                    }
                    setAddPayment(!addPayment);
                  });
                }}
                // className={formStyles.form__button}
              >
                {addPayment || Object.keys(signUpPaymentFormValues).length > 0
                  ? 'Cancel'
                  : 'Add Payment Information'}
              </Button>
            </Tooltip>
          </div>
        </div>
        {(addPayment || Object.keys(signUpPaymentFormValues).length > 0) && (
          <div className={formStyles.form__formContainer}>
            <PaymentInformationForm />
          </div>
        )}
        {Object.keys(signUpPaymentFormValues).length > 0 && (
          <div className={formStyles.form__formContainer}>
            <TransactionData />
          </div>
        )}
        <div className={formStyles.form__buttonContainer}>
          <Button
            type="primary"
            // className={formStyles.form__button}
            onClick={() => {
              form.submit();
            }}
          >
            Add Customer
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomerDetails;
