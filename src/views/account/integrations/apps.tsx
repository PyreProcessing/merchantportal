import Calendly from "./apps/calendly/Calendly.app";
import GoHighLevel from "./apps/ghl/GoHighLevel.app";

// exportable apps array constant
export default [
  {
    title: 'GoHighLevel',
    description: 'Connect your account with GoHighLevel to automate tasks, and streamline your workflow.',
    component: <GoHighLevel />,
  },
  {
    title: 'Calendly',
    description: 'Connect your account with Calendly to automate tasks, and streamline your workflow.',
    component: <Calendly />,
  },
]