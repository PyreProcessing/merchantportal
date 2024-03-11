import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import InventoryView from '@/views/organizations/inventory/Inventory.view';
const Inventory = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.organization?.links?.inventory]}>
        <InventoryView />
      </PageLayout>
    </>
  );
};

export default Inventory;
