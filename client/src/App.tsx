import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalStyles, AppWrapper } from "./components/common";
import * as AppRoutes from "./routes";

import queryClient from "./queryClient";
import { AuthProvider, AuthRoute } from "./auth";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />

      <AuthProvider>
        <BrowserRouter>
          <AppWrapper>
            <Routes>
              <Route path="/splash" element={<AppRoutes.Splash />} />
              <Route path="/signup" element={<AppRoutes.Signup />} />
              <Route path="/login" element={<AppRoutes.Login />} />
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <AppRoutes.Home />
                  </AuthRoute>
                }
              />
              <Route
                path="/phonebook"
                element={
                  <AuthRoute>
                    <AppRoutes.Phonebook />
                  </AuthRoute>
                }
              />
              <Route
                path="/countries"
                element={
                  <AuthRoute>
                    <AppRoutes.CountrySearch />
                  </AuthRoute>
                }
              />
              <Route
                path="/anecdotes"
                element={
                  <AuthRoute>
                    <AppRoutes.Anecdotes />
                  </AuthRoute>
                }
              />
              <Route
                path="/course"
                element={
                  <AuthRoute>
                    <AppRoutes.Course />
                  </AuthRoute>
                }
              />
              <Route
                path="/refactored-course"
                element={
                  <AuthRoute>
                    <AppRoutes.RefactoredCourse />
                  </AuthRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <AuthRoute>
                    <AppRoutes.Feedback />
                  </AuthRoute>
                }
              />

              <Route path="*" element={<AppRoutes.NotFound />} />
            </Routes>
            <Outlet />
          </AppWrapper>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};
// Confirm new build
export default App;
