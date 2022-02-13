'use strict';

const { Controller } = require("egg");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/cesi', controller.home.cesi);


// 展示菜谱
  router.post('/showmenu',controller.user.showmenu);
  router.post('/showrepicedes',controller.user.showrepicedes);
  // router.post('/upload', controller.user.recipeimg);
  router.post('/showmenus',controller.user.showmenus);
  router.post('/showmenusdes',controller.user.showmenusdes);
  router.post('/showmenuone',controller.user.showmenuone);


  // 登陆接口
  router.post('/login', controller.home.login);
  // 注册接口
  router.post('/regist', controller.home.regist);
  // 上传头像
  router.post('/uploadimg', controller.user.uploadimg);
  // 获取用户信息
  router.get('/getuser', controller.user.getuser);
  // 获取用户关注
  router.get('/getguanzu', controller.user.getguanzu);
  // 获取用户发布的菜单
  router.get('/getcaidan', controller.user.getcaidan);
  
  // 展示菜谱
  router.post('/showmenu', controller.user.showmenu);
  // 展示菜谱详情
  router.post('/showrepicedes', controller.user.showrepicedes);

  //管理员 
  //用户
  router.get('/getAllUser', controller.administrator.getAllUser);//获取全部用户
  router.get('/delUser', controller.administrator.delUser);//删除用户
  router.post('/addUser', controller.administrator.addUser);//添加用户
  router.post('/updateUser', controller.administrator.updateUser);//修改用户
  //商品
  router.get('/delGoods', controller.administrator.delGoods);//删除商品
  router.get('/getAllGoods', controller.administrator.getAllGoods);//获取全部商品
  //菜谱
  router.get('/getAllRecipe', controller.administrator.getAllRecipe);//获取全部菜谱
  router.get('/delRecipe', controller.administrator.delRecipe);//获取全部菜谱
  //菜单
  router.get('/getAllMenu', controller.administrator.getAllMenu);//获取所有笔记
  router.get('/delMenu', controller.administrator.delMenu);//删除笔记
  //笔记
  router.get('/getAllNotes', controller.administrator.getAllNotes);//获取所有笔记
  router.get('/delNotes', controller.administrator.delNotes);//删除笔记

  //菜单
  router.get('/showmenu', controller.user.showmenu);
  //展示测试题数据
  router.get('/testshow', controller.zyh.testshow);
  // 商品
  router.post('/shopInformation', controller.shop.shopInformation);//获取所有商品信息
  router.post('/shopdetailInformation', controller.shop.shopdetailInformation);// 获取指定商品信息
  router.post('/addlovegoods', controller.shop.addlovegoods); // 添加购物车
  router.post('/shoppingcart', controller.shop.shoppingcart); // 查询购物车
  router.post('/deletecart', controller.shop.deletecart); // 删除购物车
  router.post('/changecart', controller.shop.changecart);//修改购物车



  //获取笔记信息
  router.get('/notesInfo', controller.notes.notesInfo);
  //获取详细的笔记
  router.post('/notesDetailInfo', controller.notes.notesDetailInfo);
  //随机获取笔记
  router.get('/randomNotes',controller.notes.randomNotes);
  //添加笔记
  router.post("/upload",controller.notes.upload);
  //查询登录者的笔记
  router.post("/personalNote",controller.notes.personalNote);
  // 删除登录者的笔记
  router.post("/deleteNote1",controller.notes.deleteNote1);

  //首页获取笔记
  router.get('/getNotes',controller.zyh.getNotes);
  

  //首页获取菜谱
  router.get('/getRecipe', controller.zyh.getRecipe);
  //首页获取笔记
  router.get('/getNotes', controller.zyh.getNotes);
  //首页获取商城

  router.get('/getShop',controller.zyh.getShop);

  //获取评论
  router.get('/getComment',controller.comment.getComment);
  //展示评论
  router.get('/showCom',controller.comment.showCom);
  // 删除评论
  router.get('/getDel',controller.comment.getDel);

  router.get('/getShop',controller.zyh.getShop)


  router.get('/getShop',controller.zyh.getShop);

  //搜索获取菜谱
  router.get('/searChcaipu',controller.zyh.searChcaipu);

  //发布菜单添加菜谱 
  router.get('/tianjiacaipu',controller.zyh.tianjiacaipu);

  //上传菜单
  router.post('/shangChuancaipu',controller.zyh.shangChuancaipu)
  router.get('/getShop', controller.zyh.getShop)

   //上传菜谱
   router.post("/uploadCaipu",controller.zyh.uploadCaipu);

   router.post("/uploadfiles",controller.zyh.uploadfiles);
  //搜索查找用户
  router.get("/searchUser",controller.zyh.searchUser);

};
