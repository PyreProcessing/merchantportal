// import { useSelectedVideo, useUpdateSelectedVideo } from '@/state/videos/video';
import { Button, Form, Input, message, Radio, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

import styles from './EditPrivacyForm.module.scss';

type Props = {
  updateHook: any;
  dataHook: any;
  removeFields?: ['public' | 'private' | 'pay' | 'password'];
};

const EditPrivacyForm = (props: Props) => {
  const [form] = Form.useForm();
  const [privacyOption, setPrivacyOption] = useState<any>();
  const { mutate: updateData, isLoading } = props.updateHook();
  const { data } = props.dataHook();

  useEffect(() => {
    form.setFieldsValue({
      privacy: data?.privacy?.setting,
      trailerUrl: data?.privacy?.payProtected?.trailerUrl,
      prices: data?.privacy?.payProtected?.prices,
      password: data?.privacy?.passwordProtected?.password,
    });
    setPrivacyOption(data?.privacy?.setting);
  }, [data]);

  const onFinish = (values: any) => {
    console.log('values', values);
    var privacyData: any = {
      privacy: { setting: values.privacy },
    };
    if (values.privacy === 'pay') {
      privacyData = {
        privacy: {
          ...data.privacy,
          payProtected: {
            trailerUrl: values.trailerUrl,
            prices: values.prices,
          },
        },
      };
    } else if (values.privacy === 'password') {
      privacyData = {
        privacy: {
          ...data.privacy,
          passwordProtected: { password: values.password },
        },
      };
    }
    updateData(privacyData);
  };

  const otherSettings = () => {
    switch (privacyOption) {
      case 'pay':
        return (
          <div>
            <h4>{privacyOption === 'pay' ? 'Paywall Settings' : ''}</h4>
            <br />

            <Form.Item
              name="trailerUrl"
              label="Trailer"
              tooltip="
              Please enter a trailer url for your video. This will be the trailer that your viewers will see before they purchase your video."
            >
              <Input placeholder="Enter a trailer url" type="string" />
            </Form.Item>

            <Form.List name="prices">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        name={[field.name, 'amount']}
                        label="Price"
                        tooltip="
              Please enter a price for your video. This will be the price that your viewers will pay to watch your video."
                      >
                        <Input
                          placeholder="Enter a price"
                          type="number"
                          prefix="$"
                        />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'hours']}
                        label="Hours"
                        tooltip="Please enter the number of hours that your viewers will have to watch your video."
                      >
                        <Input placeholder="Hours to view" type="string" />
                      </Form.Item>

                      <AiFillMinusCircle onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<AiFillPlusCircle />}
                    >
                      Add Rental Option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        );
        break;
      case 'password':
        return (
          <div>
            <h4>{privacyOption === 'password' ? 'Password Settings' : ''}</h4>
            <br />

            <Form.Item
              name="password"
              label="Password"
              required
              tooltip="Please enter a password for your video. This will be the password that your viewers will need to enter to watch your video."
            >
              <Input placeholder="Enter a password" type="password" />
            </Form.Item>
          </div>
        );
        break;
    }
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className={styles.container}
    >
      <Form.Item
        name="privacy"
        label="Privacy"
        tooltip="
        Please select a privacy option for your video.
        Public: Anyone can view your video.
        Private: Only you can view your video."
      >
        <Radio.Group
          defaultValue={privacyOption}
          value={privacyOption}
          onChange={(e) => {
            setPrivacyOption(e.target.value);
          }}
        >
          {props.removeFields?.includes('public') ? null : (
            <Radio value="public">Public</Radio>
          )}

          {props.removeFields?.includes('private') ? null : (
            <Radio value="private">Private</Radio>
          )}

          {/* TODO<Radio value="password">Password Protected</Radio> */}
          {/* TODO<Radio value="pay">Paywall Protected </Radio> */}
        </Radio.Group>
      </Form.Item>
      {otherSettings()}

      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
        loading={isLoading}
      >
        Save
      </Button>
    </Form>
  );
};

export default EditPrivacyForm;
