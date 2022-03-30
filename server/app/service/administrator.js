const { jsonp } = require("../../config/plugin");

const Service = require("egg").Service;

class UserService extends Service {
  //1、管理获取用户信息
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

  //2、管理员添加用户
  async addUser(username, password, nickname, url) {
    if (username && password && nickname && url) {
      let userResult = await this.app.mysql.query(
        `SELECT * FROM user WHere username='${username}'`
      );
      if (userResult.length == 0) {
        await this.app.mysql
          .query(`insert into user(username,password,nickname,url)
                     values('${username}','${password}','${nickname}','${url}')`);
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
    }
  }

  //3、管理员删除用户
  async delUser(id) {
    await this.app.mysql.query(`delete from user where id in(${id})`);
    return {
      code: 0,
      message: "删除成功",
    };
  }

  // 4、修改管理员状态
  async updateUserStatus(id, userStatus) {
    await this.app.mysql.query(
      `update user set userStatus='${userStatus}' where id=${id}`
    );
    return {
      msg: "修改用户状态成功",
    };
  }

  // 5、获取某个用户信息
  async queryUserInfo(id) {
    const result = await this.app.mysql.query(
      `SELECT * FROM user WHere id='${id}'`
    );
    return result;
  }

  //6、管理员修改用户
  async updateUserInfo(
    password,
    nickname,
    id,
    addressOther,
    birthday,
    introduce_myself,
    tasteOther,
    url
  ) {
    await this.app.mysql.query(
      `update user set nickname='${nickname}',password='${password}',addressOther='${addressOther}',tasteOther='${tasteOther}',birthday='${birthday}',introduce_myself='${introduce_myself}',url='${url}'  where id=${id}`
    );
    return {
      msg: "修改成功！",
    };
  }

  // 7、获取关注的用户
  async queryUserInterest(id) {
    const result = await this.app.mysql.query(
      `SELECT guanzu FROM user WHERE id = "${id}"`
    );
    let interestArr = [];
    for (let i = 0; i < result[0].guanzu.length; i++) {
      let user = await this.app.mysql.query(
        `SELECT * FROM user WHERE id = "${result[0].guanzu[i]}"`
      );
      interestArr = interestArr.concat(user);
    }
    return interestArr;
  }

  // 8、取消关注
  async cancelFollow(id, cancelId) {
    const userInfo = await this.app.mysql.query(
      `SELECT guanzu FROM user WHERE id = "${id}"`
    );
    let Arr = JSON.parse(userInfo[0].guanzu);
    const value = Arr.indexOf(cancelId);
    if (value > -1) {
      Arr.splice(value, 1);
      await this.app.mysql.query(
        `update user set guanzu='${JSON.stringify(Arr)}' where id=${id}`
      );
    } else {
      return { msg: "未查询到相关用户" };
    }
    return { msg: "取消关注成功！" };
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
  async getAllMenu(username,nickname, menuname) {

    console.log(username, menuname,nickname);
    let userResult = await this.app.mysql
      .query(`SELECT * FROM menu WHere  username like '%${username}%' 
        and menuname like '%${menuname}%' and nickname like '%${nickname}%'`);
    return userResult;
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
