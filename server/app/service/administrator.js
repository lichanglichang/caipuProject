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

  // 10、移除购物车
  async deleteShoppingCart(id) {
    const result = await this.app.mysql.query(
      `DELETE FROM shoppingcart WHERE id='${id}'`
    );

    if (result.affectedRows === 1) {
      return {
        msg: "移除成功！",
      };
    } else {
      return {
        msg: "移除失败！",
      };
    }
  }

  //11、修改数量
  async updateNumber(id, number, total_price) {
    await this.app.mysql.query(
      `update shoppingcart set number='${number}',total_price='${total_price}',unit_price=${
        total_price * number
      } where id=${id}`
    );
    return {
      msg: "修改成功！",
    };
  }

  //12、用户收藏菜单
  async queryCollectMenu(id) {
    const result = await this.app.mysql.query(
      `SELECT collectMenu FROM user WHERE id = "${id}"`
    );
    let collectArr = [];
    for (let i = 0; i < JSON.parse(result[0].collectMenu).length; i++) {
      let collect = await this.app.mysql.query(
        `SELECT * FROM menu WHERE menuid = "${
          JSON.parse(result[0].collectMenu)[i]
        }"`
      );
      collectArr = collectArr.concat(collect);
    }
    return collectArr;
  }

  //13、用户收藏菜谱
  async queryCollectRecipe(id) {
    const result = await this.app.mysql.query(
      `SELECT collectRecipe FROM user WHERE id = "${id}"`
    );
    let collectArr = [];
    for (let i = 0; i < JSON.parse(result[0].collectRecipe).length; i++) {
      let collect = await this.app.mysql.query(
        `SELECT * FROM recipe WHERE id = "${
          JSON.parse(result[0].collectRecipe)[i]
        }"`
      );
      collectArr = collectArr.concat(collect);
    }
    return collectArr;
  }

  //14、用户收藏笔记
  async queryCollectNotes(id) {
    const result = await this.app.mysql.query(
      `SELECT collectNotes FROM user WHERE id = "${id}"`
    );
    let collectArr = [];
    for (let i = 0; i < JSON.parse(result[0].collectNotes).length; i++) {
      let collect = await this.app.mysql.query(
        `SELECT * FROM notes WHERE id = "${
          JSON.parse(result[0].collectNotes)[i]
        }"`
      );
      collectArr = collectArr.concat(collect);
    }
    return collectArr;
  }

  // 15、移除收藏菜单
  async deleteCollectMenu(id, deleteId) {
    const userInfo = await this.app.mysql.query(
      `SELECT collectMenu FROM user WHERE id = "${id}"`
    );
    let Arr = JSON.parse(userInfo[0].collectMenu);
    const value = Arr.indexOf(deleteId);
    if (value > -1) {
      Arr.splice(value, 1);
      await this.app.mysql.query(
        `update user set collectMenu='${JSON.stringify(Arr)}' where id=${id}`
      );
    } else {
      return { msg: "未查询到相关菜单" };
    }
    return { msg: "移除菜单成功！" };
  }

  // 16、移除收藏菜谱
  async deleteCollectRecipe(id, deleteId) {
    const userInfo = await this.app.mysql.query(
      `SELECT collectRecipe FROM user WHERE id = "${id}"`
    );
    let Arr = JSON.parse(userInfo[0].collectRecipe);
    const value = Arr.indexOf(deleteId);
    if (value > -1) {
      Arr.splice(value, 1);
      await this.app.mysql.query(
        `update user set collectRecipe='${JSON.stringify(Arr)}' where id=${id}`
      );
    } else {
      return { msg: "未查询到相关菜谱" };
    }
    return { msg: "移除菜谱成功！" };
  }

  // 17、移除收藏笔记
  async deleteCollectNotes(id, deleteId) {
    const userInfo = await this.app.mysql.query(
      `SELECT collectNotes FROM user WHERE id = "${id}"`
    );
    let Arr = JSON.parse(userInfo[0].collectNotes);
    const value = Arr.indexOf(deleteId);
    if (value > -1) {
      Arr.splice(value, 1);
      await this.app.mysql.query(
        `update user set collectNotes='${JSON.stringify(Arr)}' where id=${id}`
      );
    } else {
      return { msg: "未查询到相关笔记" };
    }
    return { msg: "移除笔记成功！" };
  }

  // 18、获取用户发布菜单
  async queryPublishMenu(username) {
    const result = await this.app.mysql.query(
      `SELECT * FROM menu WHERE username = "${username}"`
    );
    return result;
  }

  // 19、获取用户发布菜谱
  async queryPublishRecipe(username) {
    const result = await this.app.mysql.query(
      `SELECT * FROM recipe WHERE username = "${username}"`
    );
    return result;
  }

  // 20、获取用户发布笔记
  async queryPublishNotes(username) {
    const result = await this.app.mysql.query(
      `SELECT * FROM notes WHERE account = "${username}"`
    );
    return result;
  }

  // 21、移除用户发布
  async deleteUserPublish(deleteId, type) {
    if (type === "Menu") {
      const result = await this.app.mysql.query(
        `DELETE FROM ${type.toLowerCase()} WHERE menuid='${deleteId}'`
      );
      if (result.affectedRows === 1) {
        return {
          msg: "移除成功！",
        };
      } else {
        return {
          msg: "移除失败！",
        };
      }
    } else {
      const result = await this.app.mysql.query(
        `DELETE FROM ${type.toLowerCase()} WHERE id='${deleteId}'`
      );
      if (result.affectedRows === 1) {
        return {
          msg: "移除成功！",
        };
      } else {
        return {
          msg: "移除失败！",
        };
      }
    }
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

  //2、删除菜谱
  async delRecipe(id) {
    await this.app.mysql.query(
      `delete from recipe where id in(${id.toString()})`
    );
    return {
      code: 0,
      msg: "删除成功",
    };
  }

  // 3、获取某项菜谱
  async queryRecipe(id) {
    const result = await this.app.mysql.query(
      ` SELECT * FROM recipe where id='${id}'`
    );
    return result;
  }

  // 4、新增菜谱
  async addRecipe(menu_name, img, username, type, introduce, discrib, steps) {
    const userResult = await this.app.mysql.query(
      `SELECT * FROM user WHere  username='${username}'`
    );
    // 判断用户是否存在
    if (userResult.length !== 0) {
      const result = await this.app.mysql
        .query(`insert into recipe(menu_name, img, username,type, introduce,nickname,describ,steps)
      values('${menu_name}','${img}','${username}','${type}','${introduce}','${userResult[0].nickname}','${discrib}','${steps}')`);
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
  //2、删除笔记
  async delNotes(id) {
    await this.app.mysql.query(
      `delete from notes where id in(${id.toString()})`
    );
    return {
      code: 0,
      message: "删除成功",
    };
  }

  // 3、新增笔记
  async addNotes(account, title, content, picture) {
    const userResult = await this.app.mysql.query(
      `SELECT * FROM user WHere  username='${account}'`
    );
    // 判断用户是否存在
    if (userResult.length !== 0) {
      const result = await this.app.mysql
        .query(`insert into notes(title, picture, account,content, username)
      values('${title}','${picture}','${account}','${content}','${userResult[0].nickname}')`);
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

  // 4、获取某项笔记详情
  async getNote(id) {
    const result = await this.app.mysql.query(
      ` SELECT * FROM notes where id='${id}'`
    );
    return result;
  }

  // 5、修改笔记信息
  async updateNotes(id, title, account, content, picture) {
    const userResult = await this.app.mysql.query(
      `SELECT * FROM user WHere  username='${account}'`
    );
    // 判断用户是否存在
    if (userResult.length !== 0) {
      await this.app.mysql.query(
        `update notes set title='${title}',content='${content}',account='${account}',picture='${picture}',username='${userResult[0].nickname}' where id=${id}`
      );
      return { code: 1, msg: "修改成功！" };
    } else {
      return {
        code: 0,
        msg: "用户不存在！",
      };
    }
  }

  //*************商品****************

  //得到所有商品
  async getAllGoods(value) {
    if (JSON.stringify(value) === "{}") {
      const result = await this.app.mysql.query(`SELECT * FROM goods`);
      return result;
    } else {
      console.log(value, "value值");
      if (value.highPrice) {
        const result = await this.app.mysql.query(
          `select * from goods where  goodsname like '%${value.goodsname}%' and address like '%${value.address}%' and price between ${value.lowerPrice} and ${value.highPrice}`
        );
        return result;
      } else {
        const result = await this.app.mysql.query(
          `select * from goods where  goodsname like '%${value.goodsname}%' and address like '%${value.address}%' and price>${value.lowerPrice}`
        );
        return result;
      }
    }
  }

  //管理员删除商品
  async delGoods(id) {
    let result = await this.app.mysql.query(
      `delete from goods where id in(${id.toString()})`
    );
    console.log(result, id, "结果");
    return {
      code: 0,
      message: "删除成功",
    };
  }

  // 3、新增商品
  async addGoods(goodsname, address, price, picture, detailimg, introduction) {
    const result = await this.app.mysql
      .query(`insert into goods(goodsname, address, price,picture, detailimg,introduction)
    values('${goodsname}','${address}','${price}','${picture}','${detailimg}','${introduction}')`);
    return {
      code: 1,
      msg: "新增成功！",
    };
  }
}

module.exports = UserService;
