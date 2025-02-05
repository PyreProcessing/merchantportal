import React from 'react';
import styles from './Integrations.module.scss';
import apps from './apps';

interface AppsProps {
  title: string;
  description: string;
  component: JSX.Element;
}

const Integrations = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Integrations</h1>
        <p>
          Integrations allow you to connect your account with other services, and platforms to automate tasks,
          and streamline your workflow. Check in regularly to see new integrations that are available.
        </p>
      </div>
      <div className={styles.appsContainer}>
        {apps.map((app: AppsProps, index: number) => (
          <div key={index} className={styles.app}>
            {app.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
