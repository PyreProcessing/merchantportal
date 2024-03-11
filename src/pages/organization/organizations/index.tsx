import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import OrganizationsView from '@/views/organizations/organizations/Organizations.view';
const Organizations = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.organization?.links?.organizations]}>
        <OrganizationsView />
      </PageLayout>
    </>
  );
};

export default Organizations;
