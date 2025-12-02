import { ImSpinner9 } from "react-icons/im";

const Spinner = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <span className="animate-spin text-theme-accent-primary text-xl">
        <ImSpinner9 />
      </span>
    </div>
  );
};

export default Spinner;
