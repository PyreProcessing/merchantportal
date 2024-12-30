import { Navigation } from '@/types/navigation';
import { RiHome2Fill } from 'react-icons/ri';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import {
  MdAttachMoney,
  MdInventory,
  MdRequestPage,
  MdSettings,
} from 'react-icons/md';
import { FaRecycle, FaStore, FaUsers } from 'react-icons/fa';
import checkRole from '@/utils/checkRole';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { GrCycle, GrPowerCycle } from 'react-icons/gr';

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
        transaction: {
          title: 'Transactions',
          link: '/organization/transactions',
          icon: <MdAttachMoney />,
        },
        customer: {
          title: 'Customers',
          link: '/organization/customers',
          icon: <FaUsers />,
        },
        recurring: {
          title: 'Recurring',
          link: '/organization/recurring',
          icon: <FaRecycle />,
        },
        inventory: {
          title: 'Inventory',
          link: '/organization/inventory',
          icon: <MdInventory />,
        },
        service_page: {
          title: 'Service Page',
          link: '/organization/service-page',
          icon: <MdRequestPage />,
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
        keys: {
          title: 'API Keys',
          link: '/account/keys',
          icon: <IoCodeSlashOutline />,
        },
        integrations: {
          title: 'Integrations',
          link: '/account/integrations',
          icon: <IoCodeSlashOutline />,
        },
      },
    },
  };

  return navigation;
};
