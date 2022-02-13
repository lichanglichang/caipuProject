'use strict';

const Controller = require('egg').Controller;
class NotesController extends Controller {
    async notesInfo() {
        const { ctx } = this;
        let result = await this.ctx.service.notes.notesInfo();
        ctx.response.body = result;
    }

    async notesDetailInfo() {
        const { ctx } = this;
        let result = await this.ctx.service.notes.notesDetailInfo(ctx.request.body.notesId);
        ctx.response.body = result;
    }

    async randomNotes() {
        const { ctx } = this;
        let result = await this.ctx.service.notes.randomNotes();
        ctx.response.body = result;
    }

    async upload() {
        let title = this.ctx.request.body.title;
        let content = this.ctx.request.body.content;
        let username = this.ctx.request.body.username;
        let r = await this.ctx.service.notes.upload(title, content, username);
        this.ctx.response.body = r;
    }

    async personalNote(){
        const { ctx } = this;
        let cookie = this.ctx.request.body.cookie;
        let result = await this.ctx.service.notes.personalNote(cookie);
        ctx.response.body = result;
    }

    async deleteNote1(){
        const { ctx } = this;
        let id = this.ctx.request.body.id;
        let result = await this.ctx.service.notes.deleteNote1(id);
        console.log(result);
        ctx.request.body = result;

    }
};
module.exports = NotesController;