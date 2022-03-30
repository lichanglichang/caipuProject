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
        ctx.request.body.id,  ctx.request.body.cancelId
      );
      ctx.response.body = result;
    }


  //查找用户
  async searchUser() {
    const { ctx } = this;
    ctx.session.userId = 1;
    if (this.ctx.session.userId) {
      let result = await this.ctx.service.administrator.searchUser(
        ctx.request.query.kw
      );
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
  }

  //商品
  //获取所有商品
  async getAllGoods() {
    const { ctx } = this;
    //测试使用
    ctx.session.userId = 1;
    ctx.session.idcard = 1;
    if (ctx.session.userId && ctx.session.idcard == 1) {
      let result = await this.ctx.service.administrator.getAllGoods(
        ctx.request.query.num,
        ctx.request.query.kw
      );
      ctx.response.body = {
        code: 0,
        data: result,
      };
    } else {
      ctx.response.body = {
        code: 1,
        data: "未登录，请先登录!",
      };
    }
  }
  //删除
  async delGoods() {
    const { ctx } = this;
    ctx.session.userId = 1;
    if (this.ctx.session.userId == 1) {
      let result = await this.ctx.service.administrator.delGoods(
        ctx.request.query.id
      );
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
  }

  //菜谱
  //获取所有菜谱
  async getAllRecipe() {
    const { ctx } = this;
    //测试使用
    ctx.session.userId = 1;
    ctx.session.idcard = 1;
    if (ctx.session.userId && ctx.session.idcard == 1) {
      let result = await this.ctx.service.administrator.getAllRecipe(
        ctx.request.query.num,
        ctx.request.query.kw
      );
      ctx.response.body = {
        code: 0,
        data: result,
      };
    } else {
      ctx.response.body = {
        code: 1,
        data: "未登录，请先登录!",
      };
    }
  }
  //删除菜谱
  async delRecipe() {
    const { ctx } = this;
    ctx.session.userId = 1;
    if (this.ctx.session.userId == 1) {
      let result = await this.ctx.service.administrator.delRecipe(
        ctx.request.query.id
      );
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
  }

  //菜单
  //获取所有菜单
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
  //删除菜单
  async delMenu() {
    const { ctx } = this;
    ctx.session.userId = 1;
    if (this.ctx.session.userId == 1) {
      let result = await this.ctx.service.administrator.delMenu(
        ctx.request.query.id
      );
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
  }

  //笔记
  //获取所有笔记
  async getAllNotes() {
    const { ctx } = this;
    //测试使用
    ctx.session.userId = 1;
    ctx.session.idcard = 1;
    if (ctx.session.userId && ctx.session.idcard == 1) {
      let result = await this.ctx.service.administrator.getAllNotes(
        ctx.request.query.num,
        ctx.request.query.kw
      );
      ctx.response.body = {
        code: 0,
        data: result,
      };
    } else {
      ctx.response.body = {
        code: 1,
        data: "未登录，请先登录!",
      };
    }
  }
  //删除笔记
  async delNotes() {
    const { ctx } = this;
    ctx.session.userId = 1;
    if (this.ctx.session.userId == 1) {
      let result = await this.ctx.service.administrator.delNotes(
        ctx.request.query.id
      );
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
  }
}

module.exports = UserController;
