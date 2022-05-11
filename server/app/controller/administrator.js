"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 登陆
  async login() {
    const { ctx } = this;
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    let list = await this.ctx.service.user.login(username, password);
    this.ctx.response.body = list;
  }

  //  *************用户****************

  //1、获取用户信息
  async getUser() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.getUser(
      ctx.request.query
    );
    ctx.response.body = {
      code: 0,
      data: result,
    };
  }

  //2、添加用户
  async addUser() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.addUser(
      ctx.request.body.username,
      ctx.request.body.password,
      ctx.request.body.nickname,
      ctx.request.body.url
    );
    ctx.response.body = result;
  }

  //3、 删除用户
  async delUser() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.delUser(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  //4、 修改用户状态
  async updateUserStatus() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.updateUserStatus(
      ctx.request.body.id,
      ctx.request.body.userStatus
    );
    ctx.response.body = result;
  }

  //5、获取某个用户信息
  async queryUserInfo() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryUserInfo(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  //6、修改用户
  async updateUserInfo() {
    const { ctx } = this;
    const {
      password,
      nickname,
      id,
      addressOther,
      birthday,
      introduce_myself,
      tasteOther,
      url,
    } = ctx.request.body;
    let result = await this.ctx.service.administrator.updateUserInfo(
      password,
      nickname,
      id,
      addressOther,
      birthday,
      introduce_myself,
      tasteOther,
      url
    );
    ctx.response.body = result;
  }

  //7、获取关注的用户
  async queryUserInterest() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryUserInterest(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  //8、取消关注
  async cancelFollow() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.cancelFollow(
      ctx.request.body.id,
      ctx.request.body.cancelId
    );
    ctx.response.body = result;
  }

  //9、购物车
  async queryShoppingCart() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryShoppingCart(
      ctx.request.query.username
    );
    ctx.response.body = result;
  }

  //10、移除购物车
  async deleteShoppingCart() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.deleteShoppingCart(
      ctx.request.body.id
    );
    ctx.response.body = result;
  }

  //11、修改数据
  async updateNumber() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.updateNumber(
      ctx.request.body.id,
      ctx.request.body.number,
      ctx.request.body.total_price
    );
    ctx.response.body = result;
  }

  //12、获取用户收藏菜单
  async queryCollectMenu() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryCollectMenu(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  //13、获取用户收藏菜谱
  async queryCollectRecipe() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryCollectRecipe(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  //14、获取用户收藏笔记
  async queryCollectNotes() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryCollectNotes(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  //15、移除收藏菜单
  async deleteCollectMenu() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.deleteCollectMenu(
      ctx.request.body.id,
      ctx.request.body.deleteId
    );
    ctx.response.body = result;
  }

  //16、移除收藏菜谱
  async deleteCollectRecipe() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.deleteCollectRecipe(
      ctx.request.body.id,
      ctx.request.body.deleteId
    );
    ctx.response.body = result;
  }

  //17、移除收藏笔记
  async deleteCollectNotes() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.deleteCollectNotes(
      ctx.request.body.id,
      ctx.request.body.deleteId
    );
    ctx.response.body = result;
  }

  //18、获取用户发布菜单
  async queryPublishMenu() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryPublishMenu(
      ctx.request.query.username
    );
    ctx.response.body = result;
  }

  //19、获取用户发布菜谱
  async queryPublishRecipe() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryPublishRecipe(
      ctx.request.query.username
    );
    ctx.response.body = result;
  }

  //20、获取用户发布笔记
  async queryPublishNotes() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryPublishNotes(
      ctx.request.query.username
    );
    ctx.response.body = result;
  }

  //21、移除用户发布
  async deleteUserPublish() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.deleteUserPublish(
      ctx.request.body.deleteId,
      ctx.request.body.type
    );
    ctx.response.body = result;
  }

  //*************菜单****************

  //1、获取菜单
  async getAllMenu() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.getAllMenu(
      ctx.request.query?.username,
      ctx.request.query?.nickname,
      ctx.request.query?.menuname
    );
    ctx.response.body = {
      code: 0,
      data: result,
    };
  }

  // 2、新增菜单
  async addMenu() {
    const { ctx } = this;
    const { menuname, background, username, introduction, recipeid } =
      ctx.request.body;
    let result = await this.ctx.service.administrator.addMenu(
      menuname,
      background,
      username,
      introduction,
      JSON.stringify(recipeid)
    );
    ctx.response.body = result;
  }

  //3、删除菜单
  async delMenu() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.delMenu(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  // 4、获取某项菜单信息
  async queryMenu() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryMenu(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  // 5、修改菜单信息
  async updateMenu() {
    const { ctx } = this;
    const { menuid, menuname, introduction, username, recipeid, background } =
      ctx.request.body;
    let result = await this.ctx.service.administrator.updateMenu(
      menuid,
      menuname,
      introduction,
      username,
      recipeid,
      background
    );
    ctx.response.body = result;
  }

  //*************菜谱****************

  //1、获取所有菜谱
  async getAllRecipe() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.getAllRecipe(
      ctx.request.query
    );
    ctx.response.body = {
      code: 0,
      data: result,
    };
  }
  //2、删除菜谱
  async delRecipe() {
    const { ctx } = this;
    const result = await this.ctx.service.administrator.delRecipe(
      ctx.request.body.id
    );
    console.log(ctx.request.body.id, "哈哈哈哈");
    ctx.response.body = result;
  }

  // 3、获取某项菜谱
  async queryRecipe() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.queryRecipe(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  // 4、新增菜谱
  async addRecipe() {
    const { ctx } = this;
    const { menu_name, img, username, type, introduce, discrib, steps } =
      ctx.request.body;
      console.log(menu_name, img, username, type, introduce, discrib, steps);
    let result = await this.ctx.service.administrator.addRecipe(
      menu_name,
      img,
      username,
      type,
      introduce,
      discrib,
      steps,
    );
    ctx.response.body = result;
  }

  //*************笔记****************

  //获取所有笔记
  async getAllNotes() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.getAllNotes(
      ctx.request.query
    );
    ctx.response.body = result;
  }

  //删除笔记
  async delNotes() {
    const { ctx } = this;
    const result = await this.ctx.service.administrator.delNotes(
      ctx.request.body.id
    );
    ctx.response.body = result;
  }

  // 3、新增笔记
  async addNotes() {
    const { ctx } = this;
    const { account, title, content, picture } = ctx.request.body;

    let result = await this.ctx.service.administrator.addNotes(
      account,
      title,
      content,
      picture
    );
    ctx.response.body = result;
  }

  //4、获取某一笔记详情信息
  async getNote() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.getNote(
      ctx.request.query.id
    );
    ctx.response.body = result;
  }

  // 5、修改笔记
  async updateNotes() {
    const { ctx } = this;
    const { id, title, account, content, picture } = ctx.request.body;
    let result = await this.ctx.service.administrator.updateNotes(
      id,
      title,
      account,
      content,
      picture
    );
    ctx.response.body = result;
  }
  //*************商品****************

  //获取所有商品
  async getAllGoods() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.getAllGoods(
      ctx.request.query
    );

    ctx.response.body = result;
  }
  //删除
  async delGoods() {
    const { ctx } = this;
    let result = await this.ctx.service.administrator.delGoods(
      ctx.request.body.id
    );
    ctx.response.body = result;
  }

  // 3、新增笔记
  async addGoods() {
    const { ctx } = this;
    const { goodsname, address, price, picture, detailimg,introduction } = ctx.request.body;
    let result = await this.ctx.service.administrator.addGoods(
     goodsname, address, price, picture, detailimg,introduction
    );
    ctx.response.body = result;
  }
}

module.exports = UserController;
