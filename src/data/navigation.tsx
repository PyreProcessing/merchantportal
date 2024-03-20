import { Navigation } from '@/types/navigation';
import { RiHome2Fill } from 'react-icons/ri';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { MdAttachMoney, MdSettings } from 'react-icons/md';
import { FaStore, FaUsers } from 'react-icons/fa';
import checkRole from '@/utils/checkRole';

export const navigation = (options?: {
  loggedInData?: { user: any };
  liveData?: { success: any; video: any };
}) => {
  const userRoleArray = options?.loggedInData?.user?.role;

  const navigation: Navigation = {
    home: {
      title: 'Home',
      links: {
        home: {
          title: 'Home',
          link: '/home',
          icon: <RiHome2Fill />,
        },
        order: {
          title: 'Orders',
          link: '/home/order',
          icon: <HiOutlineChartSquareBar />,
        },

        // deposits: {
        //   title: 'Deposits',
        //   link: '/home/deposits',
        //   icon: <IoIosNotifications />,
        // },
        // scheduled: {
        //   title: 'Scheduled',
        //   link: '/home/scheduled',
        //   icon: <IoIosNotifications />,
        // },
        // analytics: {
        //   title: 'Analytics',
        //   link: '/home/analytics',
        //   icon: <SiGoogleanalytics />,
        // },
      },
    },
    organization: {
      title: 'Organization',
      links: {
        inventory: {
          title: 'Inventory',
          link: '/organization/inventory',
          icon: <FaStore />,
        },
      },
    },
    account: {
      title: 'Account',
      links: {
        settings: {
          title: 'Account Settings',
          link: '/account/settings',
          icon: <MdSettings />,
        },
      },
    },
  };

  return navigation;
};
