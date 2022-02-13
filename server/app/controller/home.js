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
  		// 登陆
      async login() {
        const { ctx } = this;
        let username = this.ctx.request.body.username;
        let password = this.ctx.request.body.password;
        let list = await this.ctx.service.user.login(username, password);
        this.ctx.response.body = list;
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
