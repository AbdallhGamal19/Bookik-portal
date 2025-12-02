import { getStoreProfile } from "@/server-actions";
import StoreProfileClient from "./StoreProfileClient";

interface StoreProfileServerProps {
  storeId: string;
}

const StoreProfileServer = async ({ storeId }: StoreProfileServerProps) => {
  try {
    const store = await getStoreProfile(storeId);
    console.log(store, "store");
    return <StoreProfileClient store={store} loading={false} error={null} />;
  } catch (error: any) {
    return (
      <StoreProfileClient store={null} loading={false} error={error.message} />
    );
  }
};

export default StoreProfileServer;
