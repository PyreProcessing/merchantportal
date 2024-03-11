import { use, useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import Card from './layout/card/Card.component';
import VideosCard from './components/cards/viewsChartCard/ViewsChartCard.component';
import DashboardHeader from './layout/header/Header.layout';
import TotalCard from './components/cards/totalCard/TotalCard.component';
import TopPerformingContentCard from './components/cards/topPerformingContentCard/TopPerformingContentCard.component';
import NewsCard from './components/cards/newsCard/NewsCard.component';
import MapViewsCard from './components/cards/mapViewsCard/MapViewsCard.component';
// import { useTotalViews } from '@/state/analytics/userTotalViews';
// import { useTotalLikes } from '@/state/analytics/userTotalLikes';
import ViewsChartCard from './components/cards/viewsChartCard/ViewsChartCard.component';
import PaymentCard from './components/cards/paymentCard/newsCard/PaymentCard.component';
// import { useTotalVideos } from '@/state/analytics/userTotalVideos';
// import useViewsStats from '@/state/analytics/useViewsStats';
// import topPerformingContent from '@/state/analytics/topPerformingContent';
// import getNews from '@/state/analytics/getNews';
// import { useNextPaymentDate } from '@/state/analytics/nextPaymentDate';
import { AiFillLike, AiFillEye } from 'react-icons/ai';
import { MdVideoLibrary } from 'react-icons/md';
import SubscribersCard from './components/cards/subscribersCard/newsCard/SubscribersCard.component';
// import useTotalSubscribers from '@/state/analytics/useTotalSubscribers';
import { useUser } from '@/state/auth';
import { hasFeature, FEATURES } from '@/utils/hasFeature';
import Container from '@/layout/container/Container.layout';
import { Button } from 'antd';
import Link from 'next/link';
type Props = {};

type Card = {
  title: string;
  component: React.ReactNode;
  gridKey: string;
  hideIf?: boolean;
};

const Dashboard = (props: Props) => {
  const { data: loggedInData } = useUser();
  const dashboardCards = [
    // {
    //   title: 'All Time Total Views',
    //   gridKey: 'views',
    //   hideIf: !hasFeature(
    //     loggedInData?.user,
    //     FEATURES.VOD,
    //     FEATURES.LIVESTREAMING
    //   ),
    //   // <TotalCard type="views" hook={useTotalViews} icon={<AiFillEye />} />
    //   component: <></>,
    // } as Card,
    // {
    //   title: 'All Time Total Likes',
    //   gridKey: 'likes',
    //   hideIf: !hasFeature(
    //     loggedInData?.user,
    //     FEATURES.VOD,
    //     FEATURES.LIVESTREAMING
    //   ),
    //   // <TotalCard type="likes" hook={useTotalLikes} icon={<AiFillLike />} />
    //   component: <></>,
    // } as Card,
    // {
    //   title: 'Total Videos',
    //   gridKey: 'videos',
    //   hideIf: !hasFeature(
    //     loggedInData?.user,
    //     FEATURES.VOD,
    //     FEATURES.LIVESTREAMING
    //   ),
    //   component: (
    //     <TotalCard type="videos" hook={() => {}} icon={<MdVideoLibrary />} />
    //   ),
    // } as Card,
    // {
    //   title: new Date().getFullYear() + ' Views by Map',
    //   hideIf: !hasFeature(
    //     loggedInData?.user,
    //     FEATURES.VOD,
    //     FEATURES.LIVESTREAMING
    //   ),
    //   gridKey: 'map',
    //   component: <MapViewsCard />,
    // } as Card,
    // {
    //   title: new Date().getFullYear() + ' Views by Type',
    //   hideIf: !hasFeature(
    //     loggedInData?.user,
    //     FEATURES.VOD,
    //     FEATURES.LIVESTREAMING
    //   ),
    //   gridKey: 'viewsChart',
    //   component: <ViewsChartCard hook={() => {}} />,
    // } as Card,
    // {
    //   title: 'Top Performing Content',
    //   hideIf: !hasFeature(loggedInData?.user, FEATURES.VOD),
    //   gridKey: 'top',
    //   component: <TopPerformingContentCard hook={() => {}} />,
    // } as Card,
    // {
    //   title: 'Current News',
    //   gridKey: 'news',
    //   component: <NewsCard hook={() => {}} />,
    // } as Card,
    // {
    //   title: 'Total Subscribers',
    //   gridKey: 'subscribers',
    //   component: <SubscribersCard hook={() => {}} />,
    // } as Card,
    // {
    //   title: 'Next Payment',
    //   gridKey: 'payment',
    //   component: <PaymentCard hook={() => {}} />,
    // } as Card,
  ];

  const [cards, setCards] = useState(dashboardCards);

  return (
    <div className={styles.wrapper}>
      <DashboardHeader />
      {!hasFeature(
        loggedInData?.user,
        FEATURES.VOD,
        FEATURES.LIVESTREAMING
      ) && (
        <div className={styles.noFeaturesContainer}>
          <h1>
            Welcome to your dashboard. You currently do not have any features
            enabled.
          </h1>
          <p>
            Please contact your account manager to enable features for your
            account.
          </p>
          <Link href="/features">
            <Button type="primary">Go to Features</Button>
          </Link>
        </div>
      )}
      <div className={styles.container}>
        {cards
          .filter((c: any) => !c.hideIf)
          .map((card: Card, index: number) => {
            return (
              <Card key={index} title={card.title} gridKey={card.gridKey}>
                {card.component}
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
