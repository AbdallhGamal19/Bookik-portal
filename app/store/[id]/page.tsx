import StoreProfileServer from "./_components/StoreProfileServer";

interface StoreProfilePageProps {
  params: {
    id: string;
  };
}

const StoreProfilePage = ({ params }: StoreProfilePageProps) => {
  return <StoreProfileServer storeId={params.id} />;
};

export default StoreProfilePage;
