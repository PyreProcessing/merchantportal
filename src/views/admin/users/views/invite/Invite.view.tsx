import React from 'react';
import styles from './Invite.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Form, Input, Modal, Select, Tooltip } from 'antd';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaPlusCircle, FaRandom } from 'react-icons/fa';
import generateRandomPassword from '@/utils/generateRandomPassword';
import { useRouter } from 'next/router';
import usePostData from '@/state/usePostData';

const Invite = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { mutate: inviteAgent } = usePostData({
    url: '/admin/invite-agent',
    key: 'inviteAgent',
    queriesToInvalidate: ['agents'],
    redirectUrl: '/admin/agents',
    successMessage: 'Agent invited successfully',
  });
  const onFinish = (values: any) => {
    Modal.confirm({
      title: 'Invite Agent',
      content: (
        <div>
          <p>
            Are you sure you want to invite this agent to your organization?
          </p>
          <p>
            An email will be sent to the agent with instructions on how to join
            your organization.
          </p>
        </div>
      ),
      okText: 'Invite Agent',
      cancelText: 'Cancel',
      onOk() {
        inviteAgent(values);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Invite Agents</h1>
      </div>
      <div className={styles.content}>
        <p>
          Invite agents to your organization by entering their email address
          below. An email will be sent to the agent with instructions on how to
          join your organization.
        </p>
        <div>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            className={formStyles.form}
            initialValues={{
              role: ['agent'],
            }}
          >
            <div className={formStyles.editContainer}>
              <div className={formStyles.group}>
                <Form.Item label="First Name" name="firstName">
                  <Input type="text" className={formStyles.input} required />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input type="text" className={formStyles.input} />
                </Form.Item>
              </div>
              <div className={formStyles.group}>
                <Form.Item label="Email Address" name="email">
                  <Input type="email" className={formStyles.input} required />
                </Form.Item>
                <div className={styles.inputContainer}>
                  <div className={styles.input}>
                    <Form.Item label="Password" name="password">
                      <Input className={formStyles.input} />
                    </Form.Item>
                  </div>
                  {/* generate password button */}
                  <div className={styles.iconContainer}>
                    <Tooltip title="Generate Password">
                      <FaRandom
                        className={styles.icon}
                        onClick={async () => {
                          form.setFieldsValue({
                            password: generateRandomPassword(12),
                          });
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
                <Form.Item label="Role" name="role">
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    allowClear
                    className={formStyles.input}
                    tokenSeparators={[',']}
                  >
                    <Select.Option value="agent">Agent</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className={formStyles.buttonGroup}>
              <Button
                type="primary"
                htmlType="submit"
                className={formStyles.button}
                icon={<FaPlusCircle />}
              >
                Invite Agent
              </Button>
              <Button
                type="default"
                className={formStyles.button}
                icon={<BiLogOutCircle />}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Invite;
