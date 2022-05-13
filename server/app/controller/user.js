'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async uploadimg() {
    const { ctx } = this;
    const username=ctx.request.body.username1;
    // console.log(ctx.request.body,"上传对象");
    let resoult = await this.ctx.service.user.uploadimg(username,ctx.request.body.nickname1,ctx.request.body.sex1,ctx.request.body.introduce_myself1,ctx.request.body.birthday1,ctx.request.body.address1,ctx.request.body.taste1 );
        
        // let resoult = await this.ctx.service.user.uploadimg(ctx.request.body.name);
        this.ctx.response.body = resoult;
    }
    // 获取用户信息
    async getuser() {
        const { ctx } = this;
        let username = ctx.request.query.username;
        let resoult = await this.ctx.service.user.getuser(username);
        ctx.response.body = resoult;
    }
    // 获取关注用户
    async getguanzu() {
        const { ctx } = this;
        let username = ctx.request.query.username;
        let resoult = await this.ctx.service.user.getguanzu(username);
        ctx.response.body = resoult;
    }

    // 获取粉丝
    async getFans() {
        const { ctx } = this;
        let username = ctx.request.query.username;
        let resoult = await this.ctx.service.user.getFans(username);
        ctx.response.body = resoult;
    }

    //获取用户发布的菜单
    async getcaidan(){
        const { ctx } = this;
        let username = ctx.request.query.username;
        let showmenusList = await this.ctx.service.user.getcaidan(username);
        ctx.response.body = showmenusList;

    } 
// cxj
    async showmenu() {
        const { ctx } = this;
        let imgList = await this.ctx.service.user.showmenu();
        ctx.response.body = imgList;
    }

    async showrepicedes() {
        const { ctx } = this;
        let showrepicedesList = await this.ctx.service.user.showrepicedes(ctx.request.body.repiceid);
        ctx.response.body = showrepicedesList;
    }

    async showmenus(){
        const { ctx } = this;
        let showmenusList = await this.ctx.service.user.showmenus();
        ctx.response.body = showmenusList;

    }

    async showmenusdes(){
        const { ctx } = this;
        let showmenus = await this.ctx.service.user.showmenusdes(ctx.request.body.menusid);
        ctx.response.body = showmenus;

    }

    async showmenuone(){
        const { ctx } = this;
        let a = await this.ctx.service.user.showmenuone(ctx.request.body.newarr);
        ctx.response.body = a;

    }

    // async recipeimg(){
    //     let img = await this.ctx.config.uploadController.upload();
    //     ctx.response.body = img;
    // }




  
}

module.exports = UserController;
