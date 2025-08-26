const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "loading-xs",
    md: "loading-sm",
    lg: "loading-md",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className={`loading loading-spinner ${sizeClasses[size]}`} />
    </div>
  );
};

export default LoadingSpinner;
