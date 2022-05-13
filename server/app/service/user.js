const Service = require("egg").Service;
const fs = require("fs");
const path = require("path");

class UserService extends Service {
  async showmenu() {
    let img1 = await this.app.mysql.query(`select * from recipe `);
    return {
      code: 0,
      data: img1,
    };
  }

  async showrepicedes(repiceid) {
    let repiceids = await this.app.mysql.query(
      `select * from recipe where id='${repiceid}' `
    );

    return {
      code: 0,
      data: repiceids,
      // img:imgurl
    };
  }

  async showmenus() {
    let result = await this.app.mysql.query(`select * from menu `);
    return result;
  }
  async showmenusdes(menusid) {
    // console.log(menusid);

    let result1 = await this.app.mysql.query(
      `select * from menu where menuid='${menusid}'`
    );

    return result1;
  }
  async showmenuone(newarr) {
    let narr = JSON.parse(newarr);
    // console.log(narr);
    let res = [];
    if (narr) {
      for (let i = 0; i < narr.length; i++) {
        let result = await this.app.mysql.query(
          `select * from recipe where id='${narr[i]}'`
        );
        res = res.concat(result);
      }
    }

    return res;
  }

  // 登陆
  async login(username, password) {
    let message = await this.app.mysql.query(
      `SELECT * FROM user WHERE username = "${username}"`
    );
    if (username && password) {
      if (message.length == 0) {
        let result = {
          code: 0,
          msg: "账号不存在",
        };
        return result;
      }else if (message[0].userStatus == 0) {
        let result = {
          code: 5,
          msg: "该用户已被禁用！",
        };
        return result;
      } else if (message[0].status == 1) {
        let result = {
          code: 4,
          msg: "管理员登陆成功",
          message: message[0],
        };
        return result;
      } else {
        if (message[0].password != password) {
          let result = {
            code: 1,
            msg: "密码错误",
          };
          return result;
        } else {
          let result = {
            code: 2,
            msg: "用户登录成功",
            message,
          };
          return result;
        }
      }
    } else {
      return {
        code: 3,
        msg: "请输入账号、密码",
      };
    }
  }

  // 注册
  async regist(username, password) {
    let user = await this.app.mysql.query(
      `SELECT * FROM user WHERE username = "${username}"`
    );

    if (user.length != 0) {
      return {
        code: 0,
        msg: "用户已存在,请重新输入！",
      };
    } else {
      await this.app.mysql.query(`INSERT INTO user(username,password) 
            VALUES("${username}","${password}")`);
      return {
        code: 1,
        msg: "注册成功！快去登陆吧！",
      };
    }
  }

  // 上传信息
  async uploadimg(username, nickname1, sex1, intro1, birthday, address, taste) {
    const file = this.ctx.request.files[0];
    const toFileName = "/public/upload/" + file.filename;
    let to = path.dirname(__dirname) + toFileName;
    await fs.copyFileSync(file.filepath, to);
    fs.unlinkSync(file.filepath);
    const url = "http://localhost:8200" + toFileName;
    await this.ctx.app.mysql.query(
      `UPDATE user SET url="${url}",nickname="${nickname1}",sex="${sex1}",introduce_myself="${intro1}",birthday="${birthday}",address="${address}",taste="${taste}" WHERE username="${username}"`
    );
    //返回1则成功insert
    return url;
  }

  // 获取用户信息
  async getuser(username) {
    let userinfor = await this.app.mysql.query(
      `SELECT * FROM user WHERE username = "${username}"`
    );
    return userinfor;
  }

  // 获取关注用户
  async getguanzu(username) {
    let guanzuid = await this.app.mysql.query(
      `SELECT guanzu FROM user WHERE username = "${username}"`
    );
    let arr = [];
    if (guanzuid[0].guanzu) {
      for (let i = 0; i < guanzuid[0].guanzu.length; i++) {
        let user = await this.app.mysql.query(
          `SELECT * FROM user WHERE id = "${guanzuid[0].guanzu[i]}"`
        );
        arr = arr.concat(user);
      }
      return arr;
    } else {
      return []
    }
  }

  // 获取粉丝用户
  async getFans (username) {
    let userId = await this.app.mysql.query(
      `SELECT id FROM user WHERE  username = "${username}"`
    );
    let fans = await this.app.mysql.query(
      `SELECT * FROM user WHERE  guanzu like '%${userId[0].id}%'`
    );
    return fans;
  }



  // 获取用户发布的菜单
  async getcaidan(username) {
    let result = await this.app.mysql.query(
      `select * from menu WHERE username="${username}"`
    );
    return result;
  }
}
module.exports = UserService;
