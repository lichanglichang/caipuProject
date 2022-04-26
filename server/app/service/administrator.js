const { jsonp } = require("../../config/plugin");

const Service = require("egg").Service;

class UserService extends Service {
  //*************用户****************

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
      if (userResult.length === 0) {
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


    // 9、购物车
    async queryShoppingCart(username) {
      const result = await this.app.mysql.query(
        `SELECT * FROM shoppingcart WHERE username = "${username}"`
      );
     
      return result;
    }


  //*************菜单****************

  //1、获取菜单
  async getAllMenu(username, nickname, menuname) {
    let userResult = await this.app.mysql
      .query(`SELECT * FROM menu WHere  username like '%${username}%' 
        and menuname like '%${menuname}%' and nickname like '%${nickname}%'`);
    return userResult;
  }

  // 2、新增菜单
  async addMenu(menuname, background, username, introduction, recipeid) {
    const userResult = await this.app.mysql.query(
      `SELECT * FROM user WHere  username='${username}'`
    );
    // 判断用户是否存在
    if (userResult.length !== 0) {
      const result = await this.app.mysql
        .query(`insert into menu(menuname, background, username, introduction, recipeid,nickname)
      values('${menuname}','${background}','${username}','${introduction}','${recipeid}','${userResult[0].nickname}')`);
      if (result.affectedRows === 1) {
        return {
          code: 1,
          msg: "新增成功！",
        };
      }
    } else {
      return {
        code: 0,
        msg: "用户不存在！",
      };
    }
  }

  // 3、删除菜单
  async delMenu(id) {
    await this.app.mysql.query(
      `delete from menu where menuid in(${id.toString()})`
    );
    return {
      code: 0,
      message: "删除成功",
    };
  }

  // 4、获取某项菜单信息
  async queryMenu(id) {
    let result = await this.app.mysql.query(
      `SELECT * FROM menu WHere  menuid in(${id.toString()})`
    );
    return result;
  }

  // 5、修改菜单信息
  async updateMenu(
    menuid,
    menuname,
    introduction,
    username,
    recipeid,
    background
  ) {
    const userResult = await this.app.mysql.query(
      `SELECT * FROM user WHere  username='${username}'`
    );
    // 判断用户是否存在
    if (userResult.length !== 0) {
      await this.app.mysql.query(
        `update menu set menuname='${menuname}',introduction='${introduction}',username='${username}',recipeid='${JSON.stringify(
          recipeid
        )}',background='${background}',nickname='${
          userResult[0].nickname
        }' where menuid=${menuid}`
      );
      return { code: 1, msg: "修改成功！" };
    } else {
      return {
        code: 0,
        msg: "用户不存在！",
      };
    }
  }

  //*************菜谱****************

  //1、获取菜谱
  async getAllRecipe(value) {
    if (JSON.stringify(value) === "{}") {
      const result = await this.app.mysql.query(` SELECT * FROM recipe`);
      return result;
    } else {
      const result = await this.app.mysql.query(
        ` SELECT * FROM recipe where nickname  like '%${value.nickname}%' and menu_name like '%${value.menu_name}%' and username like '%${value.username}%'`
      );
      return result;
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

  //*************笔记****************

  //1、获取笔记
  async getAllNotes(value) {
    if (JSON.stringify(value) === "{}") {
      const result = await this.app.mysql.query(` SELECT * FROM notes`);
      return result;
    } else {
      const result = await this.app.mysql.query(
        ` SELECT * FROM notes where username  like '%${value.username}%' and account like '%${value.account}%' and title like '%${value.title}%'`
      );
      return result;
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

  //*************笔记****************

  //得到所有商品
  async getAllGoods(value) {
    if (JSON.stringify(value) === "{}") {
      const result = await this.app.mysql.query(`SELECT * FROM goods`);
      return result;
    } else {
      const result = await this.app.mysql.query(
        ` SELECT * FROM notes where username  like '%${value.username}%' and account like '%${value.account}%' and title like '%${value.title}%'`
      );
      return result;
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
}

module.exports = UserService;
