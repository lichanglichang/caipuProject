'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async cesi() {
    const { ctx } = this;
    ctx.response.body = '请求到了数据';
  }
 
      // 注册
      async regist() {
        let username = this.ctx.request.body.username1;
        let password = this.ctx.request.body.password1;
          let list = await this.ctx.service.user.regist(username, password);
        this.ctx.response.body = list;
      }
 
}

module.exports = HomeController;
