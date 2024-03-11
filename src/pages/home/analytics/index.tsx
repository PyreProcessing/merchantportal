import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import AnalyticsView from '@/views/home/analytics/Analytics.view';
AnalyticsView;

const Analytics = () => {
  return (
    <>
      <PageLayout pages={[navigation().home.links.analytics]}>
        <AnalyticsView />
      </PageLayout>
    </>
  );
};

export default Analytics;
