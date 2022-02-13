const Service = require('egg').Service;

class CommentService extends Service {

    // 插入评论 & 用户名 & 头像
    async getComment(comment,userName){
        let URL = await this.app.mysql.query(`select url from user where (username="${userName}");`);
        let nick = await this.app.mysql.query(`select nickname from user where (username="${userName}");`);
        let Url = URL[0].url
        let Nickname = nick[0].nickname
        let sql=`insert into comment(nickname,url,comments) values('${Nickname}','${Url}','${comment}')`;
        let result=await this.app.mysql.query(sql);
        return result
    }

    // 查询评论 & 用户名 & 头像
    async ShowCom(){
        let Result = await this.app.mysql.query(`select nickname,url,comments from comment order by id desc limit 0,100;`);
        return Result;   
    }

    // 删除评论
    async getDel(comment,username){
        let nick1 = await this.app.mysql.query(`select nickname from user where (username="${username}")`);
        let Nick1 = nick1[0].nickname
        let ID = await this.app.mysql.query(`select id from comment where (comments="${comment}")`);
        let Id = ID[0].id
        let nick2 = await this.app.mysql.query(`select nickname from comment where (comments="${comment}")`);
        let Nick2 = nick2[0].nickname
        if (Nick1==Nick2) {
            console.log("进入删除");
            let result = await this.app.mysql.query(`delete from comment where id=${Id}`);
            return result
        }
    }
}
module.exports = CommentService;