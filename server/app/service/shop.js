const Service = require('egg').Service;

class ShopService extends Service {
    // 获取所有商品信息
    async shopInformation() {
        let shopResult = await this.app.mysql.query(`SELECT * FROM goods`);
        return {
            shopResult
        }
    }
    // 获取点击指定商品详情
    async shopdetailInformation(goodid) {
        console.log(goodid);
        let shopdetailResult = await this.app.mysql.query(`SELECT * FROM goods WHERE id="${goodid}"`);
        return { shopdetailResult }
    }
    // 添加购物车
    async addlovegoods(username, goodsname, total_price,img,number) {  
        console.log(111); 
        let unit_price  =total_price *number;//总价
            let shoppingResult = await this.app.mysql.
                query(`INSERT INTO shoppingcart(username,goodsname,total_price,img,number,unit_price) VALUES('${username}','${goodsname}','${total_price}','${img}','${number}','${unit_price}')`);
            return {
                code: 0,
                message: "加入购物车成功",
            }
        
    }
      // 查询购物车
      async shoppingcart(username) {   
        let shoppingcartResult = await this.app.mysql.query(`SELECT * FROM shoppingcart WHERE username="${username}"`);
        return { shoppingcartResult }  
    }

    // 删除购物车
    async deletecart( goodsname,number,username) {  
        console.log(111); 
            let deletecartResult = await this.app.mysql.
                query(`DELETE FROM shoppingcart WHERE goodsname='${goodsname}'and number='${number}'and username='${username}'`);
            return {
                code: 0,
                message: "删除购物车成功",
            }
        
    }
    
    // 修改购物车
    async changecart( goodsname,number,username) { 
        // console.log(111); 
        let goods=await this.app.mysql.query(`SELECT * FROM shoppingcart WHERE goodsname='${goodsname}'and username='${username}'`);
        let goodsid=goods[0].id;
        let goodstotal=goods[0].total_price;
        let unit_price  =goodstotal *number;
        console.log(goodsid); 
            let changecartResult = await this.app.mysql.
                query(`update shoppingcart set number='${number}',unit_price='${unit_price}' where id='${goodsid}'`);
            return {
                code: 0,
                message: "修改购物车成功",
            }
        
    }
}

module.exports = ShopService;