import MainLayout from "../Management/components/main-layout";
import ManagementCommodity from "../Management/management-commodity";
import CommodityAdd from "../Management/management-commodity/commodity-add";
import CommodityUpdate from "../Management/management-commodity/commodity-update";
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
import UpdateUser from "../Management/management-user/base/user-update";
import UserRelevance from "../Management/management-user/relevance";
import Collect from "../Management/management-user/relevance/collect";
import Interest from "../Management/management-user/relevance/interest";
import Publish from "../Management/management-user/relevance/publish";
import ShoppingCart from "../Management/management-user/relevance/shoppingCart";
import Comment from "../Management/management-recipe/comment/index"
import CommentTow from "../Management/management-node/comment";

const routes = [
  {
    path: "/Management/user/base",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementUser /> },
      { path: "userUpdate/:id", element: <UpdateUser /> },
    ],
  },
  {
    path: "/Management/user/relevance",
    element: <MainLayout />,
    children: [
      { index: true, element: <UserRelevance /> },
      { path: "interest/:id", element: <Interest /> },
      { path: "collect/:id", element: <Collect /> },
      { path: "shoppingCart/:username", element: <ShoppingCart /> },
      { path: "publish/:username", element: <Publish /> },
    ],
  },
  {
    path: "/Management/commodity",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementCommodity /> },
      { path: "commodityAdd", element: <CommodityAdd /> },
      { path: "commodityUpdate/:id", element: <CommodityUpdate /> },
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
    path: "/Management/notes",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementNode /> },
      { path: "notesAdd", element: <NotesAdd /> },
      { path: "notesUpdate/:id", element: <NotesUpdate /> },
      { path: "notesComment/:id", element: <CommentTow /> },
    ],
  },
  {
    path: "/Management/recipe",
    element: <MainLayout />,
    children: [
      { index: true, element: <ManagementRecipe /> },
      { path: "recipeAdd", element: <RecipeAdd /> },
      { path: "recipeUpdate/:id", element: <RecipeUpdate /> },
      { path: "recipeComment/:id", element: <Comment /> },
    ],
  },
];

export default routes;
