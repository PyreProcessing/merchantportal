import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import GatewaysView from '@/views/organizations/gateways/Gateways.view';
const Gateways = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.organization?.links?.gateways]}>
        <GatewaysView />
      </PageLayout>
    </>
  );
};

export default Gateways;
