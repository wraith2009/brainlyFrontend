const CardShimmer = () => {
  return (
    <div
      className="bg-white rounded-lg p-6 shadow-sm animate-pulse"
      style={{ height: "24rem" }}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4 h-5 w-5 bg-gray-200 rounded"></div>
        <div className="flex-grow">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-4 h-4 w-1/2 bg-gray-200 rounded"></div>
    </div>
  );
};

const CardGridShimmer = () => {
  const shimmerCount = 6;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(shimmerCount)].map((_, index) => (
          <CardShimmer key={index} />
        ))}
      </div>
    </div>
  );
};

export default CardGridShimmer;
