import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import // Course,
// Feedback,
// RefactoredCourse,
// CountrySearch,
"./components";
import { GlobalStyles, AppWrapper } from "./components/common";
import * as AppRoutes from "./routes";

import queryClient from "./queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />

      <BrowserRouter>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<AppRoutes.Splash />} />
            <Route path="/login" element={<AppRoutes.Login />} />
            <Route path="/phonebook" element={<AppRoutes.Phonebook />} />\
            <Route path="/countries" element={<AppRoutes.CountrySearch />} />\
            <Route path="/anecdotes" element={<AppRoutes.Anecdotes />} />\
            <Route path="/course" element={<AppRoutes.Course />} />\
            <Route
              path="/refactored-course"
              element={<AppRoutes.RefactoredCourse />}
            />
            \
            <Route path="/feedback" element={<AppRoutes.Feedback />} />\
          </Routes>
        </AppWrapper>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};
// Confirm new build
export default App;
