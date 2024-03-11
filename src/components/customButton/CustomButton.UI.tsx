import React from 'react';
import styles from './CustomButton.module.scss';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  loading?: boolean;
  disabled?: boolean;
};

const CustomButton = (props: ButtonProps) => {
  if (props.href)
    return (
      <Link href={props.href}>
        <button
          className={
            props.className
              ? `${styles.button} ${props.className}`
              : styles.button
          }
          type={props.type ? props.type : 'button'}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      </Link>
    );

  return (
    <button
      onClick={props.onClick}
      className={
        props.className ? `${styles.button} ${props.className}` : styles.button
      }
      type={props.type ? props.type : 'button'}
      disabled={props.disabled}
    >
      {props.loading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {props.children}
    </button>
  );
};

export default CustomButton;
