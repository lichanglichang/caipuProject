"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 登陆
  async login() {
    const { ctx } = this;
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    let list = await this.ctx.service.user.login(username, password);
    // if(list.message.id){
    //     ctx.session.userId = list.message.id
    // }
    this.ctx.response.body = list;
  }

  //获取用户
  async getUser() {
    const { ctx } = this;
    var arr = Object.keys(ctx.request.query)
   console.log(ctx.request.query,arr.length,arr,"ctx.request.query");

    //测试使用
    let result = await this.ctx.service.administrator.getUser(
        ctx.request.query
    );
    ctx.response.body = {
      code: 0,
      data: result,
    };

    // if (ctx.session.userId) {
    //     let result =
    //     await this.ctx.service.administrator.getUser(
    //         ctx.request.query.num, ctx.request.query.kw)
    //     ctx.response.body = {
    //         code: 0,
    //         data: result
    //     };
    // } else {
    //     ctx.response.body = {
    //         code: 1,
    //         data: "未登录，请先登录!"
    //     }
    // }
  }

  //添加用户
  async addUser() {
    const { ctx } = this;
    this.ctx.session.userId = 1;
    if (this.ctx.session.userId) {
      let result = await this.ctx.service.administrator.addUser(
        ctx.request.body.username,
        ctx.request.body.password,
        ctx.request.body.nickname,
        ctx.request.body.sex
      );
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
  }

  // 删除用户
  async delUser() {
    const { ctx } = this;
    this.ctx.session.userId = 1;
    if (this.ctx.session.userId) {
      let result = await this.ctx.service.administrator.delUser(
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

  //修改用户
  async updateUser() {
    const { ctx } = this;
    this.ctx.session.userId = 1;
    if (this.ctx.session.userId) {
      let result = await this.ctx.service.administrator.updateUser(
        ctx.request.body.username,
        ctx.request.body.password,
        ctx.request.body.nickname,
        ctx.request.body.id
      );
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
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
    //测试使用
    ctx.session.userId = 1;
    ctx.session.idcard = 1;
    if (ctx.session.userId && ctx.session.idcard == 1) {
      let result = await this.ctx.service.administrator.getAllMenu(
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
