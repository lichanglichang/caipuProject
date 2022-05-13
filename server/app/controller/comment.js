"use strict";

const Controller = require("egg").Controller;

class CommentController extends Controller {
  // 发表评论
  async getComment() {
    const { ctx } = this;
    let comment = ctx.request.query.comment;
    let userName = ctx.request.query.username;
    console.log(ctx.request.query, "参数");
    const { articel_id, type } = ctx.request.query;
    if (userName) {
      let result = await this.ctx.service.comment.getComment(comment, userName,articel_id, type);
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: 3,
        data: "未登录，请先登录",
      };
    }
  }

  //显示评论
  async showCom() {
    const { ctx } = this;
    const { articel_id, type } = ctx.request.query;
    let result = await this.ctx.service.comment.ShowCom(articel_id, type);
    ctx.response.body = result;
  }

  // 删除评论
  async getDel() {
    const { ctx } = this;
    let id = ctx.request.query.id;
    let result = await this.ctx.service.comment.getDel(id);
    ctx.response.body = result;
  }
}

module.exports = CommentController;
