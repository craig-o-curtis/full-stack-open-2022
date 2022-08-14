import { QueryClient } from "react-query";

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    staleTime: 3000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: false,
  },
});

export default queryClient;
