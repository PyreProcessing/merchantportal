import React, { useState } from 'react';
import styles from './Notifications.module.scss';
import Link from 'next/link';
import { IoIosNotifications } from 'react-icons/io';
import { Avatar, Badge, Button, Empty, Tooltip } from 'antd';
import {
  useNotifications,
  useUpdateSelectedNotification,
} from '@/state/notifications/useNotifications';
import moment from 'moment';
import getNotificationLink from '@/utils/getNotificationLink';
import NotificationItem from '@/components/notificationItem/NotificationItem.component';

type Props = {};

const Notifications = (props: Props) => {
  const [isOpen, setIsOpen] = useState<any>();
  const { data, isError, isLoading, error, isFetching } = useNotifications();

  return (
    <div className={styles.container}>
      <Tooltip title="Notifications">
        <Badge count={data?.notifications?.filter((n) => !n.opened).length}>
          <Button
            type="text"
            onClick={() => setIsOpen(!isOpen)}
            className={styles.button}
          >
            <IoIosNotifications />
          </Button>
        </Badge>
      </Tooltip>

      <div className={`${styles.notifications} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <p>Notifications</p>
          <Badge
            count={data?.notifications?.filter((n) => !n.opened).length}
            size="small"
          />
        </div>

        {data?.notifications?.length > 0 ? (
          data?.notifications
            .slice(
              0,
              data?.notifications.length > 3 ? 3 : data?.notifications.length
            )
            .map((notification) => {
              return (
                <NotificationItem
                  notification={notification}
                  key={notification._id}
                  small={true}
                />
              );
            })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="You have no notifications"
          />
        )}
        <Link href={'/home/notifications'} className={styles.viewAllButton}>
          <span>View all notifications</span>
        </Link>
      </div>
    </div>
  );
};

export default Notifications;
