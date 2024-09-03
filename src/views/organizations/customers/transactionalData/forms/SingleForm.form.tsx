import React, { useEffect } from 'react';
import styles from './TransactionData.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Form, Input, Modal } from 'antd';
import { useInterfaceStore } from '@/state/interface';

const SingleForm = () => {
  const [form] = Form.useForm();
  const { transactionData, setCurrentForm, setTransactionDataValues } =
    useInterfaceStore((state) => state);

  // const { data: featuresData } = useAllFeatures();

  const onFinish = (values: any) => {
    Modal.confirm({
      title: 'Are you sure you want to charge this customer?',
      content:
        "Clicking Ok, will add the transaction to the customer's account, please make sure the information is correct.",
      onOk: () => {
        setTransactionDataValues(values);
      },
    });
  };
  useEffect(() => {
    form.setFieldsValue(transactionData);
    setCurrentForm(form);
  }, []);

  return (
    <Form
      form={form}
      className={styles.form}
      layout="vertical"
      onFinish={onFinish}
    >
      <div className={styles.group}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: 'Please input the amount',
            },

            {
              pattern: /^[0-9]+\.[0-9]{2}$/,
              message: 'Amount must be in x.xx format with two decimal places.',
            },
          ]}
        >
          <Input placeholder={`X.XX`} className={styles.input} />
        </Form.Item>
      </div>
      {/* button to save the information */}
      <div className={formStyles.form__buttonContainer}>
        <Button
          type="primary"
          onClick={() => form.submit()}
          className={styles.form__button}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default SingleForm;
