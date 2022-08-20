import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // TODO: we turn off retry for easier testing
      retry: false,
    },
  },
});

type Props = {
  children?: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container  mx-auto">
        <div className="p-4">{children}</div>
      </div>
    </QueryClientProvider>
  );
};

export default AppProvider;
