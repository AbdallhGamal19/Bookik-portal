interface NoVideoAlertProps {
  className?: string;
}

const NoVideoAlert: React.FC<NoVideoAlertProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-theme-bg-card rounded-lg border border-theme-border-primary ${className}`}
    >
      <div className="text-center p-6">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-theme-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-theme-text-primary mb-2">
          لا يوجد فيديو
        </h3>
        <p className="text-theme-text-secondary">
          هذا الكوبون لا يحتوي على فيديو زور المتجر لمعرفة المزيد
        </p>
      </div>
    </div>
  );
};

export default NoVideoAlert;
