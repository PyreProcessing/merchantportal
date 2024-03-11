import styles from './Error.module.scss';
import { MdError } from 'react-icons/md';
type Props = {
  error: any;
};

const Error = (props: Props) => {
  return (
    <div className={styles.container}>
      <MdError className={styles.icon} />
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.message}>{props.error.message}</p>
    </div>
  );
};

export default Error;
