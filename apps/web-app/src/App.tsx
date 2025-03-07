import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import RootLayout from "./rootLayout";
import Dashboard from "./pages/dashboard";
import Assignment from "./pages/assignment";
import AssignmentUpload from "./pages/assignment/components/assignment-upload";
import AssignmentDetails from "./pages/assignment-details";

const App = () => {
  
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="assignment">
          <Route index element={<Assignment />} />
          <Route path="upload" element={<AssignmentUpload />} />
          <Route path="assignment-details" element={<AssignmentDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
