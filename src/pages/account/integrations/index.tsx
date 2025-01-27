import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import Integrations from '@/views/account/settings/integrations/Integrations.view';
const Component = () => {
  return (
    <PageLayout pages={[navigation()?.account?.links?.integrations]}>
      <Integrations />
    </PageLayout>
  );
};

export default Component;
