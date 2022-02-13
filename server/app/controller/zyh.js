'use strict';

const Controller = require('egg').Controller;

class ZyhController extends Controller {

  async testshow() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.testshow()
    ctx.response.body = result;
  }

  async getRecipe() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.getRecipe()
    ctx.response.body = result;
  }

  async getNotes() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.getNotes()
    ctx.response.body = result;
  }

  async getShop() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.getShop()
    ctx.response.body = result;
  }

  async searChcaipu() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.searChcaipu(ctx.request.query.kw);
    ctx.response.body = result;
  }

  async searchUser() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.searchUser(ctx.request.query.kw);
    ctx.response.body = result;
  }

  async tianjiacaipu() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.tianjiacaipu(ctx.request.query.id);
    ctx.response.body = result;
  }

  async shangChuancaipu() {
    const { ctx } = this;
    let menuname = this.ctx.request.body.menuname;
    let introduction = this.ctx.request.body.introduction;
    let recipeid = this.ctx.request.body.recipeid;
    let username=this.ctx.request.body.username;
    let result = await this.ctx.service.zyh.shangChuancaipu(menuname,introduction,recipeid,username);
    ctx.response.body = result;
  }

  async uploadCaipu() {
    const { ctx } = this;
    let menu_name = this.ctx.request.body.menu_name;
    let introduce = this.ctx.request.body.introduce;
    let describe = this.ctx.request.body.describe;
    let nickname=this.ctx.request.body.nickname;
    let steps=this.ctx.request.body.steps;
    let result = await this.ctx.service.zyh.uploadCaipu(menu_name,introduce,describe,nickname,steps);
    ctx.response.body = result;
  }
  async  uploadfiles() {
    const { ctx } = this;
    let result = await this.ctx.service.zyh.uploadfiles();
    ctx.response.body = result;
  }
 

  


}

module.exports = ZyhController;
