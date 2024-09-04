import * as React from "react";
import BlankLayout from "./layouts/blanklayout/BlankLayout";
import FullLayout from "./layouts/full-layout/desktop/FullLayout";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, addUser } from "./app/slices/AuthSlice";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import AuthService from "./services/AuthService";
import "./App.css";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedUSer = useSelector(selectUser);

  React.useEffect(() => {
    //validate the token
    AuthService.validateToken()
      .then((response) => {
        console.log(response.data, "valid token");
        dispatch(addUser(response?.data.data));
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status == 403) {
          sessionStorage.clear();
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            transition: "fade",
          }).then(() => {
            navigate("/");
          });
        }
      });
  }, [location?.pathname]);

  const token = sessionStorage.getItem("access");

  return loggedUSer._id || token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      <Route path="/*" element={<BlankLayout />} />
      <Route
        path="/secured/*"
        element={
          <ProtectedRoute>
            <FullLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
