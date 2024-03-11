import { ReactNode } from 'react';
export type Navigation = {
  [key: string]: {
    title: string;
    links: {
      [key: string]: {
        title: string;
        link: string;
        hideIf?: boolean;
        icon: JSX.Element;
      };
    };
    hideIf?: boolean;
    subLinks?: {
      [key: string]: {
        title: string;
        link: string;
        hideIf?: boolean;
      };
    };
  };
};
