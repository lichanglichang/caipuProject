import MainLayout from "../Management/components/main-layout";
import ManagementCommodity from "../Management/management-commodity";
import ManagementMenu from "../Management/management-menu";
import MenuAdd from "../Management/management-menu/menu-add";
import MenuUpdate from "../Management/management-menu/menu-update";
import ManagementNode from "../Management/management-node";
import NotesAdd from "../Management/management-node/notes-add";
import NotesUpdate from "../Management/management-node/notes-update";
import ManagementRecipe from "../Management/management-recipe";
import RecipeAdd from "../Management/management-recipe/recipe-add";
import RecipeUpdate from "../Management/management-recipe/recipe-update";
import ManagementUser from "../Management/management-user/base";
import Interest from "../Management/management-user/base/interest";
import UpdateUser from "../Management/management-user/base/user-update";
import UserRelevance from "../Management/management-user/relevance";

const routes = [
  {
    path: "/Management/user/base",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementUser /> },
      { path: "userUpdate/:id", element: <UpdateUser /> },
      { path: "interest/:id", element: <Interest /> },
    ],
  },
  {
    path: "/Management/user/relevance",
    element: <MainLayout />,
    children: [
      { index: true, element: <UserRelevance /> },
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
      { path: "menuAdd", element: <MenuAdd /> },
      { path: "menuUpdate/:id", element: <MenuUpdate /> },
    ],
  },
  {
    path: "/Management/node",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementNode /> },
      { path: "notesAdd", element: <NotesAdd /> },
      { path: "notesUpdate/:id", element: <NotesUpdate /> },
    ],
  },
  {
    path: "/Management/recipe",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementRecipe /> },
      { path: "recipeAdd", element: <RecipeAdd /> },
      { path: "recipeUpdate/:id", element: <RecipeUpdate /> },
    ],
  },
];

export default routes;
