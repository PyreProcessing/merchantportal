import { AiOutlineLoading } from 'react-icons/ai';
import { Spin } from 'antd';
import styles from './Loader.module.scss';

type Props = {
  title?: string;
  light?: boolean;
};

const Loader = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.title && <p>{props.title}</p>}
      <Spin
        style={{
          width: '100%',
          margin: '20px 0',
          textAlign: 'center',
          color: props.light ? '#fff' : '#000',
        }}
        indicator={<AiOutlineLoading className={styles.icon} />}
      />
    </div>
  );
};

export default Loader;
