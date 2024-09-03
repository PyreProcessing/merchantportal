import React, { useEffect } from 'react';
import styles from './TransactionData.module.scss';
import { Form, Input } from 'antd';
import { useInterfaceStore } from '@/state/interface';

const Recurring = () => {
  const [form] = Form.useForm();
  const { transactionData, setCurrentForm } = useInterfaceStore(
    (state) => state
  );

  // const { data: featuresData } = useAllFeatures();

  useEffect(() => {
    form.setFieldsValue(transactionData);
    setCurrentForm(form);
  }, []);

  return (
    <Form form={form} className={styles.form} layout="vertical">
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
    </Form>
  );
};

export default Recurring;
