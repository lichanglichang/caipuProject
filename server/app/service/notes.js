const Service = require('egg').Service;
const fs = require('fs');
const path = require("path");

class NotesService extends Service {
    async notesInfo() {
        let sql = `select * from notes`;
        let notesResult = await this.app.mysql.query(sql);
        return notesResult;
    }

    async notesDetailInfo(notesId) {
        console.log(notesId);
        let sql = `select * from notes where id=${notesId}`;
        let notesDetailResult = await this.app.mysql.query(sql);
        return notesDetailResult;
    }

    async randomNotes() {
        let sql = `SELECT*FROM notes WHERE id>=(SELECT floor(RAND()*(SELECT MAX(id) FROM notes))) ORDER BY id LIMIT 4`;
        let randomResult = await this.app.mysql.query(sql);
        return randomResult;
    }

    async upload(title, content, username) {
        //第一张图片
        const file0 = this.ctx.request.files[0];
        console.log(username);
        const toFileName0 = '/public/bximg/' + file0.filename;
        let to0 = path.dirname(__dirname) + toFileName0;
        await fs.copyFileSync(file0.filepath, to0);
        await fs.unlinkSync(file0.filepath);
        const url0 = "http://localhost:8200" + toFileName0;

        // 第二张图片
        const file1 = this.ctx.request.files[1];
        const toFileName1 = '/public/bximg/' + file1.filename;
        let to1 = path.dirname(__dirname) + toFileName1;
        await fs.copyFileSync(file1.filepath, to1);
        await fs.unlinkSync(file1.filepath);
        const url1 = "http://localhost:8200" + toFileName1;

        // 第三张图片
        const file2 = this.ctx.request.files[2];
        const toFileName2 = '/public/bximg/'  + file2.filename;
        let to2 = path.dirname(__dirname) + toFileName2;
        await fs.copyFileSync(file2.filepath, to2);
        await fs.unlinkSync(file2.filepath);
        const url2 = "http://localhost:8200" + toFileName2;

        let r = await this.ctx.app.mysql.query(`select username from user where username='${username}'`);
        let r1 = r[0].username;
        console.log( r1 );

        let picture1 = [file0.filename, file1.filename, file2.filename];
        let picture = `[${picture1}]`;
        console.log(picture);

        const sql = `insert into notes(username,title,content,picture) values(?,?,?,?)`;
        let ww = await this.ctx.app.mysql.query(sql, [r1, title, content, picture]);
        return ww.affectedRows;
    }

    async personalNote(cookie){
        // console.log( cookie );
        let sql = `select * from notes where username = '${cookie}'`;
        let ppresult = await this.app.mysql.query(sql);
        return ppresult;
    }

    async deleteNote1(id){
        console.log( id );
        let sql = `delete from notes where id = '${id}'`;
        let deresult = await this.app.mysql.query(sql);
        return {
            code: 0,
            message: "删除购物车成功",
        }
    }

};
module.exports = NotesService;