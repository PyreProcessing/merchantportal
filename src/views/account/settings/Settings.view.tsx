import Error from '@/components/error/Error.component';
import Loader from '@/components/loader/Loader.component';
import SaveButton from '@/components/saveButton/SaveButton.component';
import Container from '@/layout/container/Container.layout';
import { useUpdateUser, useUser, useUserDetails } from '@/state/auth';
import { useWarnIfUnsavedChanges } from '@/utils/useWarnIfUnsavedChanges';
import { Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';

import SettingsForm from './components/settingsForm/SettingsForm.component';
import styles from './Settings.module.scss';

type Props = {};

const SettingsView = (props: Props) => {
  const { data: loggedInData, error, isLoading } = useUser();
  const {
    data: userDetails,
    isError: userError,
    error: userErrorDetails,
    isLoading: userLoadingDetails,
  } = useUserDetails(loggedInData?.user._id);
  const { mutate: updateUser, isLoading: userUpdateIsLoading } = useUpdateUser();
  const [form] = Form.useForm();
  const [unsaved, setUnsaved] = useState(false);
  useWarnIfUnsavedChanges(unsaved, () => {
    return confirm('Warning! You have unsaved changes.');
  });

  const onFinish = (values: any) => {
    console.log(values);
    updateUser(values);
    setUnsaved(false);
  };

  const handleColorChange = (field) => (_, colorHex) => {
    form.setFieldsValue({ servicePageOptions: { branding: { [field]: colorHex } } });
  };
  useEffect(() => {
    form.setFieldsValue({
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      phoneNumber: userDetails?.phoneNumber,
      sex: userDetails?.sex,
      businessInfo: userDetails?.businessInfo,
      ...userDetails,
    });
  }, [userDetails]);

  if (userError) return <Error error={userErrorDetails} />;

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFieldsChange={() => {
          setUnsaved(true);
        }}
        initialValues={{
          servicePageOptions: {
            branding: {
              primaryColor: '#1890ff',
              secondaryColor: '#1890ff',
              textColor: '#000000',
            },
          },
        }}
      >
        <Container title="Settings">
          {userLoadingDetails ? (
            <Loader />
          ) : (
            <SettingsForm photoForm={form} handleColorChange={handleColorChange} />
          )}
        </Container>
        <SaveButton isLoading={userUpdateIsLoading} isDisabled={userLoadingDetails} />
      </Form>
    </div>
  );
};

export default SettingsView;
