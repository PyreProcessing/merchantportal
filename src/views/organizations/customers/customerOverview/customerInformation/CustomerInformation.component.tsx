import React from 'react';
import styles from './index.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Form, Input, Modal } from 'antd';
import useUpdateData from '@/state/useUpdateData';
import { useRouter } from 'next/router';
import CustomerType from '@/types/CustomerType';
import { FaSave } from 'react-icons/fa';

interface CustomerInformationProps {
  user: CustomerType;
}

const CustomerInformation = ({ user }: CustomerInformationProps) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const { mutate: updateCustomer } = useUpdateData({
    queriesToInvalidate: ['customer'],
  });

  const onFinish = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to save these values?',
      content: 'This will update the customer information',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        updateCustomer({ url: `/customer/${id}`, formData: values });
      },
    });
  };

  React.useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  return (
    <Form
      layout="vertical"
      className={formStyles.form}
      onFinish={onFinish}
      form={form}
    >
      <div className={formStyles.form__formContainer}>
        <div className={formStyles.form__formGroup}>
          <div className={formStyles.form__inputGroup}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: 'Please input the first name' },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={formStyles.form__inputGroup}>
            <Form.Item label="Last Name" name="lastName">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className={formStyles.form__formGroup}>
          <div className={formStyles.form__inputGroup}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input the email' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={formStyles.form__inputGroup}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please input the phone number' },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className={formStyles.form__buttonContainer}>
          <Button
            className={formStyles.form__button}
            onClick={() => form.submit()}
            type="primary"
          >
            <FaSave /> Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CustomerInformation;
