import React from 'react';
import styles from './OrderDetails.module.scss';
import useFetchData from '@/state/useFetchData';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  Divider,
  Modal,
  Skeleton,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import Error from '@/components/error/Error.component';
import moment from 'moment';
import { FaQuestionCircle } from 'react-icons/fa';
import HelpIcon from '@/components/helpIcon/HelpIcon.component';
import usePostData from '@/state/usePostData';
import useUpdateData from '@/state/useUpdateData';
import { useUser } from '@/state/auth';
import useRemoveData from '@/state/useRemoveData';

const OrderDetails = () => {
  const router = useRouter();
  const { data, isFetching, isLoading, error, isError } = useFetchData({
    url: `/order/${router.query.id}`,
    key: 'orderDetails',
    enabled: !!router.query.id,
  });
  const { data: loggedInData } = useUser();
  const { mutate: sendEmail } = usePostData({
    url: `/order/${router.query.id}/send-receipt`,
    key: 'sendEmail',
  });

  const { mutate: markAsShipped } = useUpdateData({
    queriesToInvalidate: ['orderDetails'],
    successMessage: 'Order marked as shipped successfully',
  });

  const { mutate: voidOrder } = usePostData({
    url: `/order/${router.query.id}/void`,
    key: 'voidOrder',
    queriesToInvalidate: ['orderDetails'],
    successMessage: 'Order voided successfully',
  });

  const { mutate: deleteOrder } = useRemoveData({
    queriesToInvalidate: ['orderDetails', 'orders'],
    successMessage: 'Order deleted successfully',
    redirectUrl: '/home/order',
  });

  const { mutate: refundOrder } = usePostData({
    url: `/order/${router.query.id}/refund`,
    key: 'refundOrder',
    queriesToInvalidate: ['orderDetails'],
    successMessage: 'Order refunded successfully',
  });

  if (isFetching || isLoading) {
    return (
      <Skeleton
        active
        paragraph={{
          rows: 10,
        }}
      />
    );
  }
  if (isError) {
    return <Error error={error} />;
  }

  const order = data?.payload?.data;
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Divider orientation="left">
          Details for order{' '}
          <span className={styles.transactionId}>{order.transactionId}</span>
          <Divider type="vertical" />
          <span className={styles.status}>
            Transaction{' '}
            {{
              pending: (
                <>
                  is <Tag color="orange">Pending</Tag>
                </>
              ),
              success: (
                <>
                  has <Tag color="green">Successfully processed</Tag>
                </>
              ),
              failed: (
                <>
                  has <Tag color="red">Failed</Tag>
                </>
              ),
            }[order.status] ?? <Tag color="blue">{order.status}</Tag>}
          </span>
        </Divider>
        {/* show a table of the items in the receipt */}
        <Table
          dataSource={order.items}
          columns={[
            {
              title: 'Item',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
            },
          ]}
          pagination={false}
          rowKey={(record) => record._id}
        />
        <Divider orientation="left">Order Summary</Divider>
        <div className={styles.subContainer}>
          <div className={styles.detailsContainer}>
            <div className={styles.helpContainer}>
              <h3>Subtotal</h3>
              <HelpIcon
                tooltip="Price before any added shipping or taxes"
                size={12}
              />
            </div>
            <p>${order.orderInformation?.total.toFixed(2)}</p>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.helpContainer}>
              <h3>Shipping</h3>
              <HelpIcon tooltip="Price for shipping" size={12} />
            </div>
            <p>${order.orderInformation?.shipping?.toFixed(2) ?? '0.00'}</p>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.helpContainer}>
              <h3>Tax</h3>
              <HelpIcon tooltip="Price for tax" size={12} />
            </div>
            <p>${order.orderInformation?.tax?.toFixed(2) ?? '0.00'}</p>
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.helpContainer}>
              <h3>Total</h3>
              <HelpIcon
                tooltip="Total amount of the order, including taxes and shipping if applicable"
                size={12}
              />
            </div>
            <p>${order.orderInformation?.total.toFixed(2)}</p>
          </div>
        </div>
        <Divider orientation="left">Payment Details</Divider>
        <div className={styles.subContainer}>
          <div className={styles.detailsContainer}>
            <h3>Payment Method</h3>
            <span>Card - XXXX-XXXX-XXXX-{order.last4}</span>
          </div>
          <div className={styles.detailsContainer}>
            <h3>Transaction ID</h3>
            <span>{order.transactionId}</span>
          </div>
          <div className={styles.detailsContainer}>
            <h3>payment Status</h3>
            <span>
              {{
                pending: (
                  <>
                    <Tag color="orange">Pending</Tag>
                  </>
                ),
                success: (
                  <>
                    <Tag color="green">Successfully processed</Tag>
                  </>
                ),
                failed: (
                  <>
                    {' '}
                    <Tag color="red">Failed</Tag>
                  </>
                ),
              }[order.status] ?? <Tag color="blue">{order.status}</Tag>}
            </span>
          </div>
        </div>
        {order.shippingAddress && (
          <>
            <Divider orientation="left">Shipping Details</Divider>
            <div className={styles.subContainer}>
              <div className={styles.detailsContainer}>
                <h3>Address</h3>
                <span>{order.shippingAddress?.address}</span>
              </div>
              <div className={styles.detailsContainer}>
                <h3>City</h3>
                <span>{order.shippingAddress?.city}</span>
              </div>
              <div className={styles.detailsContainer}>
                <h3>Country</h3>
                <span>{order.shippingAddress?.country}</span>
              </div>
              <div className={styles.detailsContainer}>
                <h3>Zip Code</h3>
                <span>{order.shippingAddress?.zipcode}</span>
              </div>
            </div>
          </>
        )}
        <Divider orientation="left">Billing Details</Divider>
        <div className={styles.subContainer}>
          <div className={styles.detailsContainer}>
            <h3>Address</h3>
            <span>
              {order.billingAddress?.line1} {order.billingAddress?.line2}
            </span>
          </div>
          <div className={styles.detailsContainer}>
            <h3>City</h3>
            <span>{order.billingAddress?.city}</span>
          </div>
          <div className={styles.detailsContainer}>
            <h3>State</h3>
            <span>{order.billingAddress?.state}</span>
          </div>
          <div className={styles.detailsContainer}>
            <h3>Country</h3>
            <span>{order.billingAddress?.country}</span>
          </div>
          <div className={styles.detailsContainer}>
            <h3>Zip Code</h3>
            <span>{order.billingAddress?.zipcode}</span>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <Card className={styles.card} title="Customer Details">
          <div className={styles.subContainer}>
            <div className={styles.detailsContainer}>
              <h3>Full Name</h3>
              <span>{order.customer?.name}</span>
            </div>
            <div className={styles.detailsContainer}>
              <h3>Email</h3>
              <span>{order.customer?.email}</span>
            </div>
            <div className={styles.detailsContainer}>
              <h3>Phone</h3>
              <span>{order.customer?.phoneNumber}</span>
            </div>
          </div>
          <Divider orientation="center">Actions</Divider>
          <div className={styles.subContainer}>
            <div className={styles.detailsContainer}>
              <Button type="primary" onClick={() => sendEmail({})}>
                Send Receipt
              </Button>
            </div>
            {/* mark order as shipped, should not display if order status is completed */}
            {/* {order.status !== 'success' && !order.shipped && ( */}
            <div className={styles.detailsContainer}>
              <Button
                type="primary"
                disabled={
                  // if order is shipped or order status is success
                  order.shipped ||
                  order.status === 'success' ||
                  order.status === 'cancelled'
                }
                onClick={() =>
                  markAsShipped({
                    url: `/order/${order._id}/mark-as-shipped`,
                    formData: {
                      shipped: true,
                      shippedDate: new Date().toISOString(),
                    },
                  })
                }
              >
                Mark as Shipped
              </Button>
            </div>
            {/* )} */}

            {/* actions to manage the order, such as Void, refund */}
            <div className={styles.detailsContainer}>
              <Button
                type="primary"
                disabled={
                  // if order created at date is older than 10 minutes
                  moment(order.createdAt).isBefore(
                    moment().subtract(10, 'minutes')
                  ) || order.status === 'cancelled'
                }
                onClick={() => voidOrder({})}
                className={styles.danger}
              >
                Void
              </Button>
            </div>
            <div className={styles.detailsContainer}>
              <Button
                type="primary"
                className={styles.info}
                onClick={() => refundOrder({})}
                disabled={
                  // if order status is not success
                  order.status !== 'success' || order.status === 'cancelled'
                }
              >
                Refund
              </Button>
            </div>
            {
              // if the loggedInUser is an admin, show the delete button
              loggedInData?.user?.role?.includes('admin') && (
                <div className={styles.detailsContainer}>
                  <Button
                    type="primary"
                    className={styles.danger}
                    onClick={() =>
                      Modal.confirm({
                        title: 'Are you sure you want to delete this order?',
                        content:
                          'This action cannot be undone, and should only be used in extreme cases. Are you sure you want to continue?',
                        okText: 'Yes',
                        cancelText: 'No',
                        onOk: () => {
                          deleteOrder({ url: `/order/${order._id}` });
                        },
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              )
            }
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;