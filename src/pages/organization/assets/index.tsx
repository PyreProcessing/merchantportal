import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import AssetsView from '@/views/organizations/assets/Assets.view';
const Assets = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.organization?.links?.assets]}>
        <AssetsView />
      </PageLayout>
    </>
  );
};

export default Assets;
