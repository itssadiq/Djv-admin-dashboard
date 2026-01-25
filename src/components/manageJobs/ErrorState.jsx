// src/components/manageJobs/ErrorState.jsx

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <svg
        className="w-12 h-12 text-red-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-red-800 mb-1">
        Failed to load jobs
      </h3>
      <p className="text-sm text-red-600 mb-4">
        {message || "Something went wrong. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
