import { AiOutlineBank, AiOutlineCreditCard } from 'react-icons/ai';
import styles from './TransactionData.module.scss';
import { Button, Card, Tooltip } from 'antd';
import { useInterfaceStore } from '@/state/interface';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { MdRepeat } from 'react-icons/md';
import SingleForm from './forms/SingleForm.form';
import RecurringOverview from './forms/RecurringOverview.component';

const TransactionData = () => {
  const { transactionMethod, setTransactionMethod } = useInterfaceStore(
    (state) => state
  );

  const getForm = () => {
    switch (transactionMethod) {
      case 'single':
        return (
          <div>
            {/* button to reset the form */}
            <Button
              onClick={() => setTransactionMethod('')}
              className={styles.resetButton}
            >
              <Tooltip title="Go back">
                <FaChevronCircleLeft />
              </Tooltip>
            </Button>
            <div className={styles.paymentHeader}>
              <FaMoneyBill1Wave />
              <span>Single Transaction</span>
            </div>
            <SingleForm />
          </div>
        );
      case 'recurring':
        return (
          <div>
            <Button
              onClick={() => setTransactionMethod('')}
              className={styles.resetButton}
            >
              <Tooltip title="Go back">
                <FaChevronCircleLeft />
              </Tooltip>
            </Button>
            <div className={styles.paymentHeader}>
              <MdRepeat />
              <span>Recurring Transaction</span>
            </div>
            <RecurringOverview />
          </div>
        );
      default:
        return (
          <div>
            <h1 className={styles.header}>Select Type of Transaction</h1>
            <div className={styles.paymentMethodContainer}>
              <Button
                className={styles.paymentMethodButton}
                onClick={() => setTransactionMethod('single')}
              >
                <FaMoneyBill1Wave />
                <span>Single Transaction</span>
              </Button>
              <Button
                className={styles.paymentMethodButton}
                onClick={() => setTransactionMethod('recurring')}
              >
                <MdRepeat />
                <span>Recurring</span>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.3,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          key={transactionMethod}
        >
          {getForm()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransactionData;
