import Spinner from "~/components/ui/Spinner";

const PageLoading = () => {
  return (
    <div className="absolute bg-white dark:bg-gray-900 flex items-center justify-center top-0 w-full h-full">
      <Spinner className="w-20 h-20" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default PageLoading;
