import React, { Suspense } from "react";
import routes from "../../../shared/routes/AdminRoutes";
import { Routes, Route } from "react-router-dom";

const SidebarRoutes = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Array.isArray(routes) &&
            routes.map(({ path, component, hasSubRoutes }, i) => (
              <Route
                key={path + "-" + i}
                path={hasSubRoutes ? `${path}/*` : path}
                element={component}
              />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default SidebarRoutes;
