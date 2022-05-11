"use strict";

const { Controller } = require("egg");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);

  router.post("/cesi", controller.home.cesi);

  // 展示菜谱
  router.post("/showmenu", controller.user.showmenu);
  router.post("/showrepicedes", controller.user.showrepicedes);
  // router.post('/upload', controller.user.recipeimg);
  router.post("/showmenus", controller.user.showmenus);
  router.post("/showmenusdes", controller.user.showmenusdes);
  router.post("/showmenuone", controller.user.showmenuone);

  // 登陆接口
  router.post("/login", controller.administrator.login);
  // 注册接口
  router.post("/regist", controller.home.regist);
  // 上传图片
  router.post("/uploadimg", controller.user.uploadimg);
  // 获取用户信息
  router.get("/getuser", controller.user.getuser);
  // 获取用户关注
  router.get("/getguanzu", controller.user.getguanzu);
  // 获取用户发布的菜单
  router.get("/getcaidan", controller.user.getcaidan);

  // 展示菜谱
  router.post("/showmenu", controller.user.showmenu);
  // 展示菜谱详情
  router.post("/showrepicedes", controller.user.showrepicedes);

  //管理员接口
  // *************用户--基础信息****************
  //1、获取部分或全部用户的信息
  router.get("/getUser", controller.administrator.getUser);
  //2、删除用户
  router.get("/delUser", controller.administrator.delUser);
  //3、添加用户
  router.post("/addUser", controller.administrator.addUser);
  //4、修改用户状态
  router.post("/updateUserStatus", controller.administrator.updateUserStatus);
  //5、获取某个用户所有信息
  router.get("/queryUserInfo", controller.administrator.queryUserInfo);
  // 6、修改个人信息
  router.post("/updateUserInfo", controller.administrator.updateUserInfo);

  // *************用户--用户关联****************
  // 7、获取关注的用户
  router.get("/queryUserInterest", controller.administrator.queryUserInterest);
  // 8、取消关注
  router.post("/cancelFollow", controller.administrator.cancelFollow);
  // 9、购物车
  router.get("/queryShoppingCart", controller.administrator.queryShoppingCart);
  // 10、移除购物车
  router.post(
    "/deleteShoppingCart",
    controller.administrator.deleteShoppingCart
  );
  // 11、修改数量
  router.post("/updateNumber", controller.administrator.updateNumber);
  // 12、获取收藏菜单
  router.get("/queryCollectMenu", controller.administrator.queryCollectMenu);
  // 13、获取收藏菜谱
  router.get(
    "/queryCollectRecipe",
    controller.administrator.queryCollectRecipe
  );
  // 14、获取收藏笔记
  router.get("/queryCollectNotes", controller.administrator.queryCollectNotes);

  // 15、移除收藏菜单
  router.post("/deleteCollectMenu", controller.administrator.deleteCollectMenu);
  // 16、移除收藏菜谱
  router.post(
    "/deleteCollectRecipe",
    controller.administrator.deleteCollectRecipe
  );
  // 17、移除收藏笔记
  router.post(
    "/deleteCollectNotes",
    controller.administrator.deleteCollectNotes
  );
  // 18、获取用户发布菜单
  router.get("/queryPublishMenu", controller.administrator.queryPublishMenu);
  // 19、获取用户发布菜谱
  router.get(
    "/queryPublishRecipe",
    controller.administrator.queryPublishRecipe
  );
  // 20、获取用户发布笔记
  router.get("/queryPublishNotes", controller.administrator.queryPublishNotes);
  // 21、移除用户发布菜单
  router.post("/deleteUserPublish", controller.administrator.deleteUserPublish);

  //管理员接口
  //*************菜单****************
  // 1、获取菜单
  router.get("/getAllMenu", controller.administrator.getAllMenu);
  // 2、新增菜谱
  router.post("/addMenu", controller.administrator.addMenu);
  //3、 删除菜单
  router.get("/delMenu", controller.administrator.delMenu);
  // 4、获取某项菜单信息
  router.get("/queryMenu", controller.administrator.queryMenu);
  // 5、修改菜单信息
  router.post("/updateMenu", controller.administrator.updateMenu);

  //管理员接口
  //*************菜谱****************

  // 1、获取菜谱表格信息
  router.get("/getAllRecipe", controller.administrator.getAllRecipe);
  // 2、删除菜谱
  router.post("/delRecipe", controller.administrator.delRecipe);
  // 3、获取某项菜谱信息
  router.get("/queryRecipe", controller.administrator.queryRecipe);
  // 4、新增菜谱
  router.post("/addRecipe", controller.administrator.addRecipe);

  //管理员接口
  //*************商品****************

  //1、获取全部商品
  router.get("/getAllGoods", controller.administrator.getAllGoods);
  //2、删除商品
  router.post("/delGoods", controller.administrator.delGoods);
  //2、新增商品
  router.post("/addGoods", controller.administrator.addGoods);

  //管理员接口
  //*************笔记****************

  //1、获取笔记
  router.get("/getAllNotes", controller.administrator.getAllNotes);
  //2、删除笔记
  router.post("/delNotes", controller.administrator.delNotes);
  //3、新增笔记
  router.post("/addNotes", controller.administrator.addNotes);
  // 4、获取某一笔记详情信息
  router.get("/getNote", controller.administrator.getNote);
  // 5、修改菜单信息
  router.post("/updateNotes", controller.administrator.updateNotes);


  //菜单
  router.get("/showmenu", controller.user.showmenu);
  //展示测试题数据
  router.get("/testshow", controller.zyh.testshow);
  // 商品
  router.post("/shopInformation", controller.shop.shopInformation); //获取所有商品信息
  router.post("/shopdetailInformation", controller.shop.shopdetailInformation); // 获取指定商品信息
  router.post("/addlovegoods", controller.shop.addlovegoods); // 添加购物车
  router.post("/shoppingcart", controller.shop.shoppingcart); // 查询购物车
  router.post("/deletecart", controller.shop.deletecart); // 删除购物车
  router.post("/changecart", controller.shop.changecart); //修改购物车

  //获取笔记信息
  router.get("/notesInfo", controller.notes.notesInfo);
  //获取详细的笔记
  router.post("/notesDetailInfo", controller.notes.notesDetailInfo);
  //随机获取笔记
  router.get("/randomNotes", controller.notes.randomNotes);
  //添加笔记
  router.post("/upload", controller.notes.upload);
  //查询登录者的笔记
  router.post("/personalNote", controller.notes.personalNote);
  // 删除登录者的笔记
  router.post("/deleteNote1", controller.notes.deleteNote1);

  //首页获取笔记
  router.get("/getNotes", controller.zyh.getNotes);

  //首页获取菜谱
  router.get("/getRecipe", controller.zyh.getRecipe);
  //首页获取笔记
  router.get("/getNotes", controller.zyh.getNotes);
  //首页获取商城

  router.get("/getShop", controller.zyh.getShop);

  //获取评论
  router.get("/getComment", controller.comment.getComment);
  //展示评论
  router.get("/showCom", controller.comment.showCom);
  // 删除评论
  router.get("/getDel", controller.comment.getDel);

  router.get("/getShop", controller.zyh.getShop);

  router.get("/getShop", controller.zyh.getShop);

  //搜索获取菜谱
  router.get("/searChcaipu", controller.zyh.searChcaipu);

  //发布菜单添加菜谱
  router.get("/tianjiacaipu", controller.zyh.tianjiacaipu);

  //上传菜单
  router.post("/shangChuancaipu", controller.zyh.shangChuancaipu);
  router.get("/getShop", controller.zyh.getShop);

  //上传菜谱
  router.post("/uploadCaipu", controller.zyh.uploadCaipu);

  router.post("/uploadfiles", controller.zyh.uploadfiles);
  //搜索查找用户
  router.get("/searchUser", controller.zyh.searchUser);
};
