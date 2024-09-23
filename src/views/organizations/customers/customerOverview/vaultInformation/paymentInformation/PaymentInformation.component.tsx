import { AiOutlineBank, AiOutlineCreditCard } from 'react-icons/ai';
import styles from './PaymentInformation.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Card, Form, Tooltip } from 'antd';
import { useInterfaceStore } from '@/state/interface';
import CardForm from './forms/CardForm.component';
import { AnimatePresence, motion } from 'framer-motion';
import AchForm from './forms/AchForm.component';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { VaultType } from '@/types/VaultType';

interface PaymentInformationFormProps {
  vaultData?: VaultType;
}

const PaymentInformationForm = ({ vaultData }: PaymentInformationFormProps) => {
  const { paymentMethod, setPaymentMethod } = useInterfaceStore(
    (state) => state
  );

  const getForm = () => {
    switch (paymentMethod) {
      case 'check':
        return (
          <div>
            {/* button to reset the form */}
            <Button
              onClick={() => setPaymentMethod('')}
              className={styles.resetButton}
            >
              <Tooltip title="Go back">
                <FaChevronCircleLeft />
              </Tooltip>
            </Button>
            <div className={styles.paymentHeader}>
              <AiOutlineBank />
              Bank Account (ACH)
            </div>
            <p style={{ marginTop: '1%', color: 'gray', textAlign: 'center' }}>
              Customer account information is not stored by PyreProcessing. We
              take the security of your customers' information very seriously,
              which is why we use a third-party vaulting system provided by NMI.
              All credit card and ACH information is securely stored with them,
              ensuring compliance with PCI DSS standards.
            </p>
            <AchForm />
          </div>
        );
      case 'creditcard':
        return (
          <div>
            <Button
              onClick={() => setPaymentMethod('')}
              className={styles.resetButton}
            >
              <Tooltip title="Go back">
                <FaChevronCircleLeft />
              </Tooltip>
            </Button>
            <div className={styles.paymentHeader}>
              <AiOutlineCreditCard />
              Credit/Debit Card
            </div>
            <p style={{ marginTop: '1%', color: 'gray', textAlign: 'center' }}>
              Customer account information is not stored by PyreProcessing. We
              take the security of your customers' information very seriously,
              which is why we use a third-party vaulting system provided by NMI.
              All credit card and ACH information is securely stored with them,
              ensuring compliance with PCI DSS standards.
            </p>
            <CardForm />
          </div>
        );
      default:
        return (
          <div className={styles.container}>
            <h1 className={styles.header}>Customer payment method</h1>
            <div className={styles.paymentMethodContainer}>
              <Tooltip
                title={
                  // if there is vaultData, and the payment method is not ach disable the button
                  vaultData && vaultData?.paymentMethod !== 'check'
                    ? 'Credit Card is already set as the payment method, Please remove the current payment method to add a new one'
                    : ''
                }
              >
                <Button
                  className={styles.paymentMethodButton}
                  onClick={() => setPaymentMethod('check')}
                  disabled={
                    // if there is vaultData, and the payment method is not ach disable the button
                    vaultData && vaultData?.paymentMethod !== 'check'
                      ? true
                      : false
                  }
                >
                  <AiOutlineBank />
                  <span>Bank Account (ACH)</span>
                </Button>
              </Tooltip>
              <Tooltip
                title={
                  // if there is vaultData, and the payment method is not creditcard disable the button
                  vaultData && vaultData?.paymentMethod !== 'creditcard'
                    ? 'ACH is already set as the payment method, Please remove the current payment method to add a new one'
                    : ''
                }
              >
                <Button
                  className={styles.paymentMethodButton}
                  onClick={() => setPaymentMethod('creditcard')}
                  disabled={
                    // if there is vaultData, and the payment method is not creditcard disable the button
                    vaultData && vaultData?.paymentMethod !== 'creditcard'
                      ? true
                      : false
                  }
                >
                  <AiOutlineCreditCard />
                  <span>Credit/Debit Card</span>
                </Button>
              </Tooltip>
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
          key={paymentMethod}
        >
          {getForm()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PaymentInformationForm;
 