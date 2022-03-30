import MainLayout from "../Management/components/main-layout";
import ManagementCommodity from "../Management/management-commodity";
import ManagementMenu from "../Management/management-menu";
import ManagementNode from "../Management/management-node";
import ManagementRecipe from "../Management/management-recipe";
import ManagementUser from "../Management/management-user";
import Interest from "../Management/management-user/interest";
import UpdateUser from "../Management/management-user/update-user";

const routes = [
  {
    path: "/Management/user",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementUser /> },
      { path: "userUpdate/:id", element: <UpdateUser /> },
      { path: "interest/:id", element: <Interest /> },
    ],
  },
  {
    path: "/Management/commodity",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementCommodity /> },
    ],
  },
  {
    path: "/Management/menu",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementMenu /> },
    ],
  },
  {
    path: "/Management/node",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementNode /> },
    ],
  },
  {
    path: "/Management/recipe",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementRecipe /> },
    ],
  },
];

export default routes;
