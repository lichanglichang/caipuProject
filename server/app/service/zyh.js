
const Service = require('egg').Service;
const fs = require('fs');
const path = require("path");


class ZyhService extends Service {
    async testshow() {
        let sql = 'select * from test'
        let result = await this.app.mysql.query(sql);
        return result
    }

    async getRecipe() {
        let sql = 'select * from recipe limit 0,8';
        let result = await this.app.mysql.query(sql);
        return result
    }

    async getNotes() {
        let sql = 'select * from  notes limit 0,4';
        let result = await this.app.mysql.query(sql);
        return result
    }

    async getShop() {
        let sql = 'select * from goods ORDER BY sales desc limit 0,3';
        let result = await this.app.mysql.query(sql);
        return result
    }

    async searChcaipu(kw) {
        let sql = `select * from recipe where nickname like '%${kw}%'`;
        let result = await this.app.mysql.query(sql);
        return result;
    }

    async searchUser(kw) {
        let arr = [...new Set(kw)];
        let data = [];
        for (let i = 0; i < arr.length; i++) {
            let result = await this.app.mysql.query(`select * from user where nickname like '%${arr[i]}%'`)
            data = data.concat(result);
        }
        // let arrbox = [];
        // let obj = {};
        // for (let i = 0; i < data.length; i++) {
        //     if (!obj[data[i].username]) {
        //         arrbox.push(data[i]);
        //         obj[arr[i].username] = true;
        //     }
        // }
        return data;
    }

    async tianjiacaipu(id) {
        let arr = JSON.parse(id);
        let data = [];
        for (let i = 0; i < arr.length; i++) {
            let result = await this.app.mysql.query(`select * from recipe where id=${arr[i]}`);
            data = data.concat(result);
        }
        return data;
    }

    async shangChuancaipu(menuname,introduction,recipeid,username) {        
	    const file = this.ctx.request.files[0];
		const toFileName = '/public/upload/'+Date.now()+file.filename;
		let to = path.dirname(__dirname)+toFileName;
		await fs.copyFileSync(file.filepath, to);
		await fs.unlinkSync(file.filepath);
		const url = "http://localhost:8200"+toFileName;
		
		const sql = 'insert into menu(menuname,introduction,recipeid,background,username)values(?,?,?,?,?)';
		let r = await this.ctx.app.mysql.query(sql, [menuname,introduction,recipeid, url,username]);
		return true;//返回1则成功insert
	  }

    async uploadCaipu(menu_name,introduce,describe,nickname,steps) { 
    
	    const file = this.ctx.request.files[0];
		const toFileName = '/public/upload/'+Date.now()+file.filename;
		let to = path.dirname(__dirname)+toFileName;
		await fs.copyFileSync(file.filepath, to);
		await fs.unlinkSync(file.filepath);
		const url = "http://localhost:8200"+toFileName;
		
		const sql = 'insert into recipe(menu_name,introduce,describ,nickname,steps,img)values(?,?,?,?,?,?)';
		let r = await this.ctx.app.mysql.query(sql, [menu_name,introduce,describe, nickname,steps,toFileName]);
		return true;//返回1则成功insert
	  }

      async uploadfiles(){
        const file = this.ctx.request.files[0];
		const toFileName = '/public/upload/'+Date.now()+file.filename;
		let to = path.dirname(__dirname)+toFileName;
		await fs.copyFileSync(file.filepath, to);
		await fs.unlinkSync(file.filepath);
		const url = "http://localhost:8200"+toFileName;
        return toFileName;
        // console.log('public/upload/'+Date.now()+file.filename);
      }
   
}
module.exports = ZyhService;