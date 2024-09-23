import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Switch,
} from 'antd';
import styles from './TransactionData.module.scss';
import formStyles from '@/Form.module.scss';
import { useInterfaceStore } from '@/state/interface';
import moment from 'moment';
import dayjs from 'dayjs';

interface RecurringProps {
  form: any;
  onFinish: (values) => void;
  showSubmitButton?: boolean;
}

const Recurring = ({ form, onFinish, showSubmitButton }: RecurringProps) => {
  // State to track the switch status
  const [isChargeUntilCancel, setIsChargeUntilCancel] = useState(true);
  const handleChargeUntilCancelChange = (checked) => {
    setIsChargeUntilCancel(checked);
    if (checked) {
      // Clear numberOfPayments value when toggling to 'charge until cancel'
      form.setFieldsValue({ numberOfPayments: undefined });
    }
  };

  useEffect(() => {
    // Clear numberOfPayments when chargeUntilCancel is true
    if (isChargeUntilCancel) {
      form.setFieldsValue({ numberOfPayments: undefined });
    }
  }, [isChargeUntilCancel, form]);

  return (
    <Form
      form={form}
      className={formStyles.form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        amount: '1.00',
        frequency: 1,
        initialChargeDate: dayjs(moment().toDate()),
        chargeUntilCanceled: true, // Set the initial value of chargeUntilCancel
      }}
    >
      <div className={formStyles.form__formContainer}>
        <div className={formStyles.form__formGroup}>
          <div className={formStyles.form__inputGroup}>
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
                  message:
                    'Amount must be in x.xx format with two decimal places.',
                },
              ]}
            >
              <Input placeholder={`X.XX`} className={formStyles.form__input} />
            </Form.Item>
          </div>
          <div className={formStyles.form__inputGroup}>
            <Form.Item
              name="initialChargeDate"
              label="Date of Initial Transaction"
              rules={[
                {
                  required: true,
                  message: 'Please input the date of the initial transaction',
                },
              ]}
              tooltip="The date of the first transaction, this will be the date the recurring transaction will start, and the first payment will be drafted from the customers account, defaults to today's date"
            >
              <DatePicker
                className={formStyles.form__input}
                disabledDate={(current) =>
                  current && current < moment().startOf('day')
                }
                format={'YYYY-MM-DD'}
              />
            </Form.Item>
          </div>
        </div>

        <div className={formStyles.form__formGroup}>
          <div className={formStyles.form__inputGroup}>
            <Form.Item
              name="frequency"
              label="Payment Frequency"
              rules={[
                {
                  required: true,
                  message: 'Please input the payment frequency',
                },
              ]}
              tooltip="How often the draft will be taken from the customers account"
            >
              <InputNumber
                className={formStyles.form__input}
                min={1}
                addonAfter={
                  <Form.Item
                    name="frequencyInterval"
                    noStyle
                    initialValue="month"
                  >
                    <Select>
                      <Select.Option value="minute">minute</Select.Option>
                      <Select.Option value="day">Day</Select.Option>
                      <Select.Option value="week">Week</Select.Option>
                      <Select.Option value="month">Month</Select.Option>
                      <Select.Option value="year">Year</Select.Option>
                    </Select>
                  </Form.Item>
                }
              />
            </Form.Item>
          </div>

          <div className={formStyles.form__switchGroup}>
            <Form.Item
              name="chargeUntilCanceled"
              label="Charge Until Cancel"
              valuePropName="checked"
            >
              <Switch
                className={formStyles.form__switch}
                onChange={handleChargeUntilCancelChange}
                checkedChildren="Yes, charge customer till cancel"
                unCheckedChildren="No, only charge for a set number of payments"
              />
            </Form.Item>
          </div>

          <div className={formStyles.form__inputGroup}>
            <Form.Item
              name="numberOfPayments"
              label="Number of Payments"
              tooltip="The number of payments to draft from the customers account, if left blank, the charge will happen until it's cancelled."
            >
              <InputNumber
                disabled={isChargeUntilCancel}
                className={formStyles.form__input}
                min={1}
              />
            </Form.Item>
          </div>
        </div>
        <div className={formStyles.form__inputGroup}>
          <Form.Item
            name="description"
            label="Description"
            tooltip="A short description of the transaction, This will help you identify what the transaction is for"
            rules={[
              {
                required: true,
                message: 'Please input a description',
                max: 255,
              },
            ]}
          >
            <Input className={formStyles.form__input} min={1} />
          </Form.Item>
        </div>
      </div>
      {/* button to save values */}
      {showSubmitButton && (
        <div className={formStyles.form__buttonContainer}>
          <Button
            type="primary"
            onClick={() => form.submit()}
            className={formStyles.form__button}
          >
            Save
          </Button>
        </div>
      )}
    </Form>
  );
};

export default Recurring;
