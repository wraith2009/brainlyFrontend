const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-600">
        Brainly is loading...
      </div>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-600 animate-loading-bar"
          style={{
            width: "100%",
            transformOrigin: "left",
            animation: "loading-bar 1.5s infinite",
          }}
        ></div>
      </div>
      <style>{`
        @keyframes loading-bar {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
