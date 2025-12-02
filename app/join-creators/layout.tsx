import LeftSaidebar from "../Explorer/_components/LeftSaidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 justify-between">
      <div className="flex-1">
        {children}
      </div>
      <LeftSaidebar />
    </div>
  );
}
