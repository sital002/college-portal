import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import RootLayout from "./rootLayout";
import Dashboard from "./pages/dashboard";
import Assignment from "./pages/assignment";
import AssignmentUpload from "./pages/assignment/components/assignment-upload";

const App = () => {
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@gmail.com",
        password: "test1234",
        firstName: "test",
        lastName: "test",
      }),
    })
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  }, []);
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="assignment">
          <Route index element={<Assignment />} />
          <Route path="upload" element={<AssignmentUpload />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
