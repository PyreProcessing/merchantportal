import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import SettingsView from '@/views/account/settings/Settings.view';
const Settings = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.account?.links?.settings]}>
        <SettingsView />
      </PageLayout>
    </>
  );
};

export default Settings;
