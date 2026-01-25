const SubmitButton = ({ isSubmitting, label = "Publish Listing" }) => {
  return (
    <div className="flex justify-end pt-4">
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Publishing...
          </span>
        ) : (
          label
        )}
      </button>
    </div>
  );
};

export default SubmitButton;
