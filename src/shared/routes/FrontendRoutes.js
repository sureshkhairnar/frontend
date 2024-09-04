import Login from "../../features/frontend/authentication/desktop/Login";

export default [
  {
    label: "Login",
    path: "",
    showInMenu: true,
    addRoute: true,
    component: <Login />,
    authenticated: "no",
  },
];
