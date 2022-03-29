/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cluster = {
    listen: {
      path: '',
      port: 8200,
      //hostname: 'localhost',//默认localhost和ip地址,上线时用0.0.0.0
    }
  };


  // config.session = {
  //   key: 'HQYJ_SSION',
  //   maxAge: 24 * 3600 * 1000, // 1 天
  //   httpOnly: true,
  //   encrypt: true,
  // };

    // 配置session
    config.session = {
      // 设置session cookie里面的key
      key: 'SESSION_ID',
      // 设置最大的过期时间
      maxAge: 30 * 1000 * 60,
      // 设置是否只服务端可以访问
      httpOnly: true,
      // 设置是否加密
      encrypt: true,
      // 设置为true每次刷新页面的时候session都会被延期
      renew: true
  }

  //配置post请求才能成功，文件上传才能成功
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }
  //配置数据库
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'foods_share'
    },
    app: true,
    agent: false
  }
  
  // 跨域的配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    // credentials: true //携带凭证时,orgin 设置不能为通配符
  };
  
  //获取上传文件，启用file模式
  exports.multipart = {
    mode: 'file',
    fontSize:11048576000,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631001821068_3019';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
