import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { TimeFilterProvider } from "./shared/timeFilters/TimeFilterContext";
import { AccountProvider } from "./features/account/AccountContext";

export default function App() {
  return (
    <TimeFilterProvider>
      <AccountProvider>
        <RouterProvider router={router} />
      </AccountProvider>
    </TimeFilterProvider>
  );
}
