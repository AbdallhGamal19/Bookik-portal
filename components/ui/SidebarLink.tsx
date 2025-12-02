import Link from "next/link";

const SidebarLink = ({
  href,
  icon,
  text,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`w-full ${
        active && "bg-theme-accent-primary/10"
      } flex items-center justify-between text-theme-text-primary py-3 w-full rounded-bookik-rounded-full hover:bg-theme-bg-hover transition-colors font-bold border border-transparent hover:border-theme-border-primary`}
    >
      <span className="text-theme-text-primary ps-5">{text}</span>
      <span className="text-theme-text-secondary w-1/4 flex justify-center items-center">
        {icon}
      </span>
    </Link>
  );
};

export default SidebarLink;
