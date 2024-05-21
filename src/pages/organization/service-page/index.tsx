import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import ServicePage from '@/views/organizations/service-page/ServicePage.view';
import PageOptions from '@/views/organizations/service-page/controlViews/pageOptions/PageOptions.component';
import { useRouter } from 'next/router';
import { FaGears } from 'react-icons/fa6';

const ServicesPage = () => {
  return (
    <>
      <PageLayout
        pages={[navigation()?.organization?.links?.service_page]}
        controlNav={[
          {
            children: <PageOptions />,
            icon: <FaGears />,
            title: 'Page Settings',
          },
        ]}
      >
        <ServicePage />
      </PageLayout>
    </>
  );
};

export default ServicesPage;
