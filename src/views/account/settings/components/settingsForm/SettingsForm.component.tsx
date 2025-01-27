import { useUpdateUser, useUser, useUserDetails } from '@/state/auth';
import phoneNumber from '@/utils/phoneNumber';
import { Button, ColorPicker, Form, Input, InputNumber, message, Modal, Radio, Switch } from 'antd';

import styles from './SettingsForm.module.scss';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import checkRole from '@/utils/checkRole';

type Props = {
  photoForm: any;
  handleColorChange: (field: string) => any;
};

const SettingsForm = (props: Props) => {
  const [passwordForm] = Form.useForm();
  const { mutate: updateUser } = useUpdateUser();
  const { data: loggedInData, error, isLoading } = useUser();
  const { data: userDetails } = useUserDetails(loggedInData?.user._id);
  const onFinishChangePassword = (values: any) => {
    if (values.password != values.confirmNewPassword) return message.error('Passwords do not match');
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
        <Form layout="vertical" form={passwordForm} onFinish={onFinishChangePassword}>
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
        {
          // if the user has the role of merchant, show the business details
          checkRole(loggedInData?.user?.role, ['merchant']) && (
            <>
              <h1 className={styles.header}>Business Details</h1>
              <div className={styles.columnContainer}>
                <div className={styles.container}>
                  <Form.Item label="Business Name" name={['businessInfo', 'name']}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Logo Url"
                    name={['businessInfo', 'logoUrl']}
                    tooltip="https link of the logo location, you can also paste your own link here, and the logo will be used"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Business Email"
                    name={['businessInfo', 'email']}
                    tooltip="This email will be used for business related notifications and communication. it can be the same as your personal email that you use to access the site"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Business Description or mission statement"
                    name={['businessInfo', 'missionStatement']}
                  >
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
                        name={['businessInfo', 'logoUrl']}
                        aspectRatio={16 / 9}
                        form={props.photoForm}
                        action={`${process.env.API_URL}/upload`}
                        default={props.photoForm.getFieldsValue().businessInfo?.logoUrl}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
      <div className={styles.group}>
        <h1 className={styles.header}>Branding Details</h1>
        <div className={styles.side}>
          <Form.Item label="Primary Color" name={['servicePageOptions', 'branding', 'primaryColor']}>
            <ColorPicker
              defaultValue="#02225e"
              onChange={props.handleColorChange('primaryColor')}
              showText={(color) => <span>Primary Color ({color.toHexString()})</span>}
            />
          </Form.Item>

          <Form.Item label="Secondary Color" name={['servicePageOptions', 'branding', 'secondaryColor']}>
            <ColorPicker
              defaultValue="#0053a6"
              onChange={props.handleColorChange('secondaryColor')}
              showText={(color) => <span>Secondary Color ({color.toHexString()})</span>}
            />
          </Form.Item>

          <Form.Item label="Text Color" name={['servicePageOptions', 'branding', 'textColor']}>
            <ColorPicker
              defaultValue="#000000"
              onChange={props.handleColorChange('textColor')}
              showText={(color) => <span>Text Color ({color.toHexString()})</span>}
            />
          </Form.Item>
        </div>
        <div className={styles.side}>
          <Form.Item label="Subheader Text" name={['servicePageOptions', 'branding', 'subheaderText']}>
            <Input />
          </Form.Item>
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
