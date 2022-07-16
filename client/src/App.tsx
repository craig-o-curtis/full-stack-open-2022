import React from "react";
import { QueryClientProvider } from "react-query";
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

import queryClient from "./queryClient";

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
// Confirm new build
export default App;
