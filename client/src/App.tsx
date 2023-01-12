import React from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'auth';
import queryClient from 'queryClient';
import * as AppRoutes from 'routes';

import { AppWrapper, GlobalStyles } from 'components/common';

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
              <Route path="/home" element={<AppRoutes.Home />} />
              <Route path="/user-profile" element={<AppRoutes.UserProfile />} />

              <Route path="/blogs" element={<AppRoutes.Blogs />} />
              <Route path="/phonebook" element={<AppRoutes.Phonebook />} />
              <Route path="/countries" element={<AppRoutes.CountrySearch />} />
              <Route path="/anecdotes" element={<AppRoutes.Anecdotes />} />
              <Route path="/course" element={<AppRoutes.Course />} />
              <Route
                path="/refactored-course"
                element={<AppRoutes.RefactoredCourse />}
              />
              <Route path="/feedback" element={<AppRoutes.Feedback />} />
              <Route path="/redux" element={<AppRoutes.Redux />} />

              <Route path="/" element={<AppRoutes.Home />} />
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
