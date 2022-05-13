const Service = require("egg").Service;

class CommentService extends Service {
  // 插入评论 & 用户名 & 头像
  async getComment(comment, userName, articel_id, type) {
    // let URL = await this.app.mysql.query(`select url from user where (username="${userName}");`);
    console.log(userName, "哈哈哈");
    let id = await this.app.mysql.query(
      `select id from user where username="${userName}"`
    );
    let sql = `insert into comment(user_id,comments,type,articel_id) values('${id[0].id}','${comment}','${type}','${articel_id}')`;
    let result = await this.app.mysql.query(sql);
    return result;
  }

  // 查询评论 & 用户名 & 头像
  async ShowCom(articel_id, type) {
    let commentArr = await this.app.mysql.query(
      `select * from comment where articel_id="${articel_id}" and type="${type}"`
    );
    let result = [];
    for (let i = 0; i < commentArr.length; i++) {
      const data = await this.app.mysql.query(
        `select nickname,url  from user where id="${commentArr[i].user_id}"`
      );
      result.push({
        ...data[0],
        comments: commentArr[i].comments,
        id: commentArr[i].id,
      });
    }
    return result;
  }

  // 删除评论
  async getDel(id) {
    await this.app.mysql.query(`delete from comment where id=${id}`);
    return {
        msg:"删除成功！"
    }
  }
}
module.exports = CommentService;
