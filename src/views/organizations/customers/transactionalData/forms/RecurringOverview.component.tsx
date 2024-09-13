import { useInterfaceStore } from '@/state/interface';
import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Recurring from './Recurring.form';

const RecurringOverview = () => {
  const [form] = Form.useForm();
  const { transactionData, setCurrentForm, setTransactionDataValues } =
    useInterfaceStore((state) => state);

  useEffect(() => {
    form.setFieldsValue(transactionData);
    setCurrentForm(form);
  }, [transactionData, form, setCurrentForm]);

  const onFinish = (values) => {
    // validate the form, if there are any errors, return
    form
      .validateFields()
      .then(() => {
        // If the form is valid, save the values
        Modal.confirm({
          title: 'Are you sure you want to save these values?',
          content:
            'This will update the transaction data for this customer, and set the customer to recurring transactions',
          okText: 'Yes',
          cancelText: 'No',
          onOk: () => {
            setTransactionDataValues({ recurringData: { ...values } });
          },
        });
      })
      .catch((errorInfo) => {
        console.log('Error: ', errorInfo);
        message.error('Please fill out all required fields');
      });
  };
  return <Recurring onFinish={onFinish} form={form} />;
};

export default RecurringOverview;
