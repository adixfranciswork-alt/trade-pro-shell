import React from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>Page not found</div>
      <div style={{ marginTop: 10 }}>
        <Link to="/reports/asset">Go to Asset Report</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
