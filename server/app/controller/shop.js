'use strict';

const Controller = require('egg').Controller;
class ShopController extends Controller{
    async shopInformation() {
        const { ctx } = this;
        // console.log(this.ctx);
        let result = await this.ctx.service.shop.shopInformation();
        ctx.response.body = {
            code: 0,
            data: result
        };
    }
    async shopdetailInformation() {
        const { ctx } = this;
        let result = await this.ctx.service.shop.shopdetailInformation(ctx.request.body.goodid);
        ctx.response.body = result
       
    }
    async addlovegoods() {
        const { ctx } = this;
        // console.log(111);
        let result = await this.ctx.service.shop.addlovegoods(ctx.request.body.username,ctx.request.body.goodsname,ctx.request.body.total_price,ctx.request.body.img,ctx.request.body.number);
        ctx.response.body = result;
    }
    async shoppingcart() {
        const { ctx } = this;
        let result = await this.ctx.service.shop.shoppingcart(ctx.request.body.username);
        ctx.response.body = result
       
    }
    async deletecart() {
        const { ctx } = this;
        let result = await this.ctx.service.shop.deletecart(ctx.request.body.goodsname,ctx.request.body.number,ctx.request.body.username);
        ctx.response.body = result
       
    }
    
    async changecart() {
        const { ctx } = this;
        let result = await this.ctx.service.shop.changecart(ctx.request.body.goodsname,ctx.request.body.number,ctx.request.body.username);
        ctx.response.body = result
       
    }
   
}




module.exports=ShopController;