const Service = require("egg").Service;

class UserService extends Service {
  //管理获取用户信息
  async getUser(value) {
    var arr = Object.keys(value);
    // 判断是否为空数据，为空，则查询所有数据
    if (arr.length == 0) {
      let userResult = await this.app.mysql.query(
        `SELECT * FROM user WHere status='0'`
      );
      return userResult;
    } else {
      // 不为空，则模糊查询数据
      let userResult = await this.app.mysql
        .query(`SELECT * FROM user WHere status='0' and nickname like '%${value.nickname}%' 
            and username like '%${value.username}%' and userStatus like '%${value.userStatus}%'`);
      return userResult;
    }
  }

  //管理员添加用户
  async addUser(username, password, nickname, sex) {
    console.log(username, password, nickname, sex);
    if (username && password && nickname && sex) {
      let userResult = await this.app.mysql.query(
        `SELECT * FROM user WHere username='${username}'`
      );
      if (userResult.length == 0) {
        let addResult = await this.app.mysql
          .query(`insert into user(username,password,nickname,sex)
                     values('${username}','${password}','${nickname}','${sex}')`);
        return {
          code: 0,
          message: "添加用户成功！",
        };
      } else {
        return {
          code: 1,
          message: "用户已存在",
        };
      }
    } else {
      return {
        code: 2,
        message: "请输入完整的资料",
      };
    }
  }

  //管理员删除用户
  async delUser(id) {
    if (id.length !== 0) {
      await this.app.mysql.query(
        `delete from user where id in(${id.toString()})`
      );
      return {
        code: 0,
        message: "删除成功",
      };
    } else {
      return {
        code: 1,
        message: "请先选中要删除的数据",
      };
    }
  }

  //管理员修改用户
  async updateUser(username, password, nickname, id) {
    if (username || password || nickname) {
      if (username && !email && !admin) {
        let updateResult = await this.app.mysql.query(
          `update user set username='${username}' where id=${id.toString()}`
        );
        return {
          code: 0,
          message: "修改成功",
        };
      }
      if (password && !username && !admin) {
        let updateResult = await this.app.mysql.query(
          `update user set password='${password}' where id=${id.toString()}`
        );
        return {
          code: 0,
          message: "修改成功",
        };
      }
      if (nickname && !password && !username) {
        let updateResult = await this.app.mysql.query(
          `update user set nickname=${nickname} where id=${id.toString()}`
        );
        return {
          code: 0,
          message: "修改成功",
        };
      }
      if (username && password && !nickname) {
        let updateResult = await this.app.mysql.query(
          `update user set username='${username}',password='${password}' where id=${id.toString()}`
        );
        return {
          code: 0,
          message: "修改成功",
        };
      }
      if (nickname && password && !username) {
        let updateResult = await this.app.mysql.query(
          `update user set password='${password}',nickname=${nickname} where id=${id.toString()}`
        );
        return {
          code: 0,
          message: "修改成功",
        };
      }
      if (username && nickname && !password) {
        let updateResult = await this.app.mysql.query(
          `update user set username='${username}',nickname=${nickname} where id=${id.toString()}`
        );
        return {
          code: 0,
          message: "修改成功",
        };
      }
      if (username && password && nickname) {
        let updateResult = await this.app.mysql.query(
          `update user set username='${username}',password='${password}',nickname=${nickname} where id=${id.toString()}`
        );
        return {
          code: 0,
          message: "修改成功",
        };
      }
    } else {
      return {
        code: 1,
        message: "请至少输入一项数据",
      };
    }
  }

  //管理员删除商品
  async delGoods(id) {
    if (id.length !== 0) {
      let delResult = await this.app.mysql.query(
        `delete from goods where id in(${id.toString()})`
      );
      return {
        code: 0,
        message: "删除成功",
      };
    } else {
      return {
        code: 1,
        message: "请先选中要删除的数据",
      };
    }
  }
  //得到所有商品
  async getAllGoods(num, kw) {
    if (kw) {
      let userResult1 = await this.app.mysql.query(
        ` SELECT * FROM goods where address  like '%${kw}%'`
      );
      return userResult1;
    } else {
      let local = (num - 1) * 5;
      let userResult1 = await this.app.mysql.query(
        ` select * from goods limit ${local},5 `
      );
      return userResult1;
    }
  }

  //菜谱
  //得到菜谱
  async getAllRecipe(num, kw) {
    if (kw) {
      let userResult1 = await this.app.mysql.query(
        ` SELECT * FROM recipe where nickname  like '%${kw}%'`
      );
      return userResult1;
    } else {
      let local = (num - 1) * 5;
      let userResult1 = await this.app.mysql.query(
        ` select * from recipe limit ${local},8 `
      );
      return userResult1;
    }
  }
  //删除菜谱
  async delRecipe(id) {
    if (id.length !== 0) {
      let delResult = await this.app.mysql.query(
        `delete from recipe where id in(${id.toString()})`
      );
      return {
        code: 0,
        message: "删除成功",
      };
    }
  }

  //菜单
  //得到菜单
  async getAllMenu(num, kw) {
    if (kw) {
      let userResult1 = await this.app.mysql.query(
        ` SELECT * FROM menu where menuname  like '%${kw}%'`
      );
      return userResult1;
    } else {
      let local = (num - 1) * 5;
      let userResult1 = await this.app.mysql.query(
        ` select * from menu limit ${local},8 `
      );
      return userResult1;
    }
  }
  //删除菜单
  async delMenu(id) {
    if (id.length !== 0) {
      let delResult = await this.app.mysql.query(
        `delete from menu where id in(${id.toString()})`
      );
      return {
        code: 0,
        message: "删除成功",
      };
    }
  }

  //笔记
  //得到笔记
  async getAllNotes(num, kw) {
    if (kw) {
      let userResult1 = await this.app.mysql.query(
        ` SELECT * FROM notes where title  like '%${kw}%'`
      );
      return userResult1;
    } else {
      let local = (num - 1) * 5;
      let userResult1 = await this.app.mysql.query(
        ` select * from notes limit ${local},8 `
      );
      return userResult1;
    }
  }
  //删除笔记
  async delNotes(id) {
    if (id.length !== 0) {
      let delResult = await this.app.mysql.query(
        `delete from notes where id in(${id.toString()})`
      );
      return {
        code: 0,
        message: "删除成功",
      };
    }
  }
}

module.exports = UserService;
