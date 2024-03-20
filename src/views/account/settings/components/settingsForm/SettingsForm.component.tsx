import { useUpdateUser, useUser } from '@/state/auth';
import phoneNumber from '@/utils/phoneNumber';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Switch,
} from 'antd';
import { useEffect } from 'react';

import styles from './SettingsForm.module.scss';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';

type Props = {
  photoForm: any;
};

const SettingsForm = (props: Props) => {
  const [passwordForm] = Form.useForm();

  const { mutate: updateUser } = useUpdateUser();
  const onFinishChangePassword = (values: any) => {
    if (values.password != values.confirmNewPassword)
      return message.error('Passwords do not match');
    updateUser(values);
  };

  const openChangePasswordModal = () => {
    Modal.info({
      title: 'Change Password',
      okText: 'Change Password',
      okType: 'primary',
      cancelText: 'Cancel',
      okCancel: true,

      content: (
        <Form
          layout="vertical"
          form={passwordForm}
          onFinish={onFinishChangePassword}
        >
          <Form.Item label="New Password" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Confirm New Password" name="confirmNewPassword">
            <Input type="password" />
          </Form.Item>
        </Form>
      ),
      onOk() {
        passwordForm.submit();
        return false;
      },
    });
  };

  return (
    <>
      <div className={styles.group}>
        <h1 className={styles.header}>Business Details</h1>
        <div className={styles.columnContainer}>
          <div className={styles.container}>
            <Form.Item label="Business Name" name="businessName">
              <Input />
            </Form.Item>
            <Form.Item
              label="Logo Url"
              name="businessLogoUrl"
              tooltip="https link of the logo location, you can also paste your own link here, and the logo will be used"
            >
              <Input />
            </Form.Item>
            <Form.Item label="Business Description" name="businessDescription">
              <Input.TextArea />
            </Form.Item>
          </div>
          <div className={styles.container}>
            <div className={styles.imageUploadContainer}>
              <div className={styles.imageContainer}>
                <PhotoUpload
                  listType="picture-card"
                  isAvatar={false}
                  label="Buisness Logo"
                  tooltip="This is the logo that will be displayed on your business page. It should be a square image. The recommended size is 200x200 pixels."
                  name="businessLogoUrl"
                  aspectRatio={1}
                  form={props.photoForm}
                  action={`${process.env.API_URL}/upload`}
                  default={props.photoForm.getFieldsValue().businessLogoUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.group}>
        <h1 className={styles.header}>Account Details</h1>
        <div className={styles.side}>
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>

        <div className={styles.side}>
          <Form.Item label="Personal Phone Number" name="phoneNumber">
            <InputNumber
              style={{ width: '100%' }}
              controls={false}
              formatter={(value: any) => phoneNumber(value)}
              parser={(value: any) => value.replace(/[^\d]/g, '')}
            />
          </Form.Item>
          <Form.Item label="Gender" name="sex">
            <Radio.Group defaultValue="male" size="middle">
              <Radio.Button value="male">Male</Radio.Button>
              <Radio.Button value="female">Female</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <Button onClick={openChangePasswordModal} type="primary">
          Change Account Password
        </Button>
        {/* <Button onClick={openChangePasswordModal} type="primary" danger>
          Delete Account
        </Button> */}
      </div>

      <div className={styles.group}>
        <h1 className={styles.header}>Account Customization</h1>
        <div className={styles.side}>
          <Form.Item
            tooltip="If this is enabled, you will not receive emails from us, including video notifications."
            label="Unsubscribe from emails"
            className={styles.switch}
            name="unsubscribeFromEmails"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default SettingsForm;
