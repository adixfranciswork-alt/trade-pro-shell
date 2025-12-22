import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { TimeFilterProvider } from "./shared/timeFilters/TimeFilterContext";

export default function App() {
  return (
    <TimeFilterProvider>
      <RouterProvider router={router} />
    </TimeFilterProvider>
  );
}
