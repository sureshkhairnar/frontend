import { lazy } from "react";
import ProjectListIcon from "../../assets/Project-list.svg";
import ProjectListActiveIcon from "../../assets/Project-list-active.svg";
import AddProjectIcon from "../../assets/create-project.svg";
import AddProjectActiveIcon from "../../assets/create-project-active.svg";
import AddEditBlog from "../../features/admin/Blog/AddEditBlog";

const Blog = lazy(() => import("../../features/admin/Blog/Blog"));

export default [
  {
    label: "BlogList",
    path: "blogs",
    showInMenu: true,
    icon: <img src={ProjectListIcon} alt="blog list icon" />,
    activeIcon: <img src={ProjectListActiveIcon} alt="blog list active icon" />,
    component: <Blog />,
    hasSubRoutes: true,
  },
  {
    label: "AddBlog",
    path: "blogs/add-blog",
    showInMenu: true,
    icon: <img src={AddProjectIcon} alt="add blog icon" />,
    activeIcon: <img src={AddProjectActiveIcon} alt="add blog active icon" />,
    component: <AddEditBlog />,
    hasSubRoutes: true,
  },
];
