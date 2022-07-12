import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  // Course,
  // Feedback,
  // Anecdotes,
  // RefactoredCourse,
  Phonebook,
  // Notes,
  // CountrySearch,
} from "./components";
import { GlobalStyles, AppWrapper } from "./components/common";
const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    staleTime: 3000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    keepPreviousData: false,
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <AppWrapper>
        {/* <Course /> */}
        {/* <Feedback /> */}
        {/* <Anecdotes /> */}
        {/* <RefactoredCourse /> */}
        <Phonebook />
        {/* <Notes /> */}
        {/* <CountrySearch /> */}
      </AppWrapper>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
