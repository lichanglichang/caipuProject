import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./css/releaseNote.css";
import addImg from "../img/addImg.png";
import getNoteCookie from "./getNoteCookie";
import Header from "../components/header";
import Footer from "../components/footer";
import { Session } from "inspector";

function CreateNote() {
    const noteName = useRef<any>();
    const noteIntr = useRef<any>();
    const noteImg1 = useRef<any>();
    const noteImg2 = useRef<any>();
    const noteImg3 = useRef<any>();
    const [show1, setShow1] = useState<any>(addImg);
    const [show2, setShow2] = useState<any>(addImg);
    const [show3, setShow3] = useState<any>(addImg);
    console.log(document.cookie);
    const cookie0 = document.cookie.split(';');
    const cookie1 = getNoteCookie(cookie0);
    console.log( cookie0 );
    console.log(cookie1);

    function createNotes(e: any) {

        e.preventDefault();
        let title = noteName.current.value.trim();
        let content = noteIntr.current.value.trim();
        let img1 = noteImg1.current.files[0];
        let img2 = noteImg2.current.files[0];
        let img3 = noteImg3.current.files[0];
        if (document.cookie && title && img1 && img2 && img3) {
            let formData = new FormData();
            formData.append("uploadFile1", img1, img1.name);
            formData.append("uploadFile2", img2, img2.name);
            formData.append("uploadFile3", img3, img3.name);
            //上传文件时额外传递的参数
            formData.append("title", title);
            formData.append("content", content);
            formData.append("username", cookie1);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
                }
            };

            axios
                .post("http://localhost:8200/upload", formData, config)
                .then(function (res) {
                    console.log(res.data)
                    alert("添加笔记成功");
                    window.location.reload();

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (!title) {
            alert("请输入标题");
        } else if (!content) {
            alert("请输入介绍")
        } else if (!(img1 && img2 && img3)) {
            alert("三张图片都要上传！")
        }
        else {
            alert("请先登录再添加笔记");
        }
    }

    function uploadImg(noteImg: any, upImg: any) {
        let file1 = noteImg.current.files[0];
        let touX1 = window.URL.createObjectURL(file1);
        upImg(touX1);
    }

    return (
        <>
            <Header></Header>
            <form onSubmit={createNotes}>
                <div className='createNote'>
                    <h2>创建笔记</h2>
                    <input type="text" placeholder="笔记名称(必填)" ref={noteName} /><br />
                    <textarea className="createIntr" rows={40} placeholder='笔记介绍(必填)' ref={noteIntr} />
                    <h2>添加图片——三张，不多不少</h2>
                    <div className="createII">
                        <img src={show1} id="createShow" />
                        <label htmlFor="createImg1" className="createLable">上传图片</label>
                        <input type="file" id="createImg1" ref={noteImg1} style={{ display: "none" }} onChange={uploadImg.bind(null, noteImg1, setShow1)} /><br />
                    </div>
                    <div className="createII">
                        <img src={show2} id="createShow" />
                        <label htmlFor="createImg2" className="createLable">上传图片</label>
                        <input type="file" id="createImg2" ref={noteImg2} style={{ display: "none" }} onChange={uploadImg.bind(null, noteImg2, setShow2)} /><br />
                    </div>
                    <div className="createII">
                        <img src={show3} id="createShow" />
                        <label htmlFor="createImg3" className="createLable">上传图片</label>
                        <input type="file" id="createImg3" ref={noteImg3} style={{ display: "none" }} onChange={uploadImg.bind(null, noteImg3, setShow3)} /><br />
                    </div>
                    <input className="createBut" value="提交" type="submit"></input>
                </div>
            </form>
            <Footer></Footer>
        </>
    );
}
export default CreateNote;