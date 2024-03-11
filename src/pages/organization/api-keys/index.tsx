import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import ApiKeysView from '@/views/organizations/apiKeys/ApiKeys.view';
const APIKeys = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.organization?.links?.apiKeys]}>
        <ApiKeysView />
      </PageLayout>
    </>
  );
};

export default APIKeys;
