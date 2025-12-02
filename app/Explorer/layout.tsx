import Header from "@/components/ui/Header";
import LeftSaidebar from "./_components/LeftSaidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-1 justify-between  ">
      {children}
      <LeftSaidebar />
    </div>
  );
}
