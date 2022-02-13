'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  // 获取评论
  async getComment() {
    const { ctx } = this;
    let comment = ctx.request.query.comment
    let userName = ctx.request.query.username
    if (userName) {
      let result = await this.ctx.service.comment.getComment(comment,userName)
      ctx.response.body = result;
      console.log("已登录");
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录"
      }
      console.log(ctx.response.body);
    }
  }

  //显示评论
  async showCom() {
    const { ctx } = this;
    let result = await this.ctx.service.comment.ShowCom()
    ctx.response.body = result;
  }

  // 删除评论
  async getDel(){
    const { ctx } = this;
    let comment = ctx.request.query.comment
    let username = ctx.request.query.username
    let result = await this.ctx.service.comment.getDel(comment,username)
    ctx.response.body = result;
  }
}

module.exports = CommentController;