export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-global-background6">{children}</div>;
}
