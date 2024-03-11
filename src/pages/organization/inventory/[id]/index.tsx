import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import InventoryDetails from '@/views/organizations/inventory/inventoryDetails/InventoryDetails.view';
const AddInventory = () => {
  return (
    <PageLayout pages={[navigation()?.organization?.links?.inventory]}>
      <InventoryDetails />
    </PageLayout>
  );
};

export default AddInventory;
