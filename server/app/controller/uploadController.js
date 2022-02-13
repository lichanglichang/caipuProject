const Controller = require('egg').Controller;
const fs = require('fs');
const path  = require("path");

class uploadController extends Controller {
  async upload() { 
    //单文件上传，获取前端传递的文件
	const file = ctx.request.files[0];

	//单文件上传，给文件拼接存储的完整路径+文件名
	let to = path.dirname(__dirname) + dest + path.basename(file.filepath);

	// 处理文件，放到指定的目录
	await fs.copyFileSync(file.filepath, to);

	fs.unlinkSync(file.filepath);//清除历史文件
   
	// 返回图片路径
	let cluster = this.app.config.cluster.listen;
	let fileUrl=`http://localhost:8200${cluster.port}${dest}${path.basename(file.filepath)}`
	ctx.body = fileUrl
  }
};

module.exports = uploadController