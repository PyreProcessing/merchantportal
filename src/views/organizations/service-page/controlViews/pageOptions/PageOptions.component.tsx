import React from 'react';
import styles from './PageOptions.module.scss';
import { Button, Form, Input, Modal, message } from 'antd';
import { useUser } from '@/state/auth';
import { FaPlus } from 'react-icons/fa';
import useUpdateData from '@/state/useUpdateData';
import { url } from 'inspector';

const PageOptions = () => {
  const [form] = Form.useForm();
  const { data: loggedInData, error, isLoading } = useUser();
  const { mutate: updateFields } = useUpdateData({
    queriesToInvalidate: ['user'],
    successMessage: 'Page options updated successfully',
  });
  const [amounts, setAmounts] = React.useState<string[]>([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] dollars
  console.log(amounts);

  const addToValuesHandler = (value: string) => {
    // ensure that there is something in the input
    if (!form.getFieldValue('predeterminedAmounts')) {
      message.error('Please enter a value');
      return;
    }
    // ensure the value is not already in the list
    if (amounts.includes(form.getFieldValue('predeterminedAmounts'))) {
      message.info('Value already exists');
      return;
    }
    // add the amount to the list
    setAmounts([...amounts, form.getFieldValue('predeterminedAmounts')]); // Remove the unnecessary type assertion
  };

  const onFinish = () => {
    updateFields({
      url: `/merchant/${loggedInData?.user._id}`,
      formData: { servicePageOptions: { predeterminedAmounts: amounts } },
    });
  };
  React.useEffect(() => {
    form.setFieldsValue({
      ...loggedInData?.user.servicePageOptions.predeterminedAmounts,
    });
    setAmounts(loggedInData?.user.servicePageOptions.predeterminedAmounts);
  }, [loggedInData]);
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {amounts.map((amount, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                // remove the amount from the list
                setAmounts(amounts.filter((a) => a !== amount));
              }}
              className={styles.button}
            >
              {amount}
            </Button>
          );
        })}
      </div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="predeterminedAmounts"
          tooltip="Entering a value will ensure that this is a selectable value in the services payment page"
        >
          <Input
            placeholder="$100.00"
            addonBefore="$"
            addonAfter={
              <span
                onClick={() => {
                  addToValuesHandler(
                    form.getFieldValue('predeterminedAmounts')
                  );
                }}
                className={styles.addIcon}
              >
                <FaPlus />
              </span>
            }
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default PageOptions;
