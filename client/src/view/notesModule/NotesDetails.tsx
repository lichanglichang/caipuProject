import React, { useEffect, useState } from "react";
import {
    HeartOutlined,
    StarOutlined
} from '@ant-design/icons';
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import "./css/noteDetails.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Commen from "../zjy/Commen";
import Cominput from "../zjy/Cominput";

function NotesDetails() {
    let notesId = useParams();
    let id = notesId.id;
    const [ranD, setranD] = useState<any>(null);
    const [noteD, setNoteD] = useState<any>(null);
    const [i, setI] = useState<any>(0);
    const [guanzhu,setGuanzhu] = useState<any>(true);

    useEffect(() => {
        showNotes();
    }, []);

    function showNotes() {
        axios.get("http://localhost:8200/randomNotes")
            .then(function (r: any) {
                setranD(r.data);
                console.log(r.data);

            })
        axios.post("http://localhost:8200/notesDetailInfo", {
            notesId: id
        }).then(function (r: any) {
            console.log(r.data);
            setNoteD(r.data)
        })
    };

    function getImg(e: any) {
        setI(e.target.id); 
    };

    function showDDD() {
        if (noteD != null && ranD != null) {
            return noteD.map(function (noteD: any) {
                var picture2 = JSON.parse(noteD.picture);
                return <div key={noteD.id}>
                    <div className="noteDeTop">
                        <div className="noteTopLeft">
                            <div>
                                <img src={picture2[i]} className="carouselImg" />
                            </div>
                            <div className="noteTopImgs">
                                <img className="topImg" onClick={getImg} id="0" src={picture2[0]} />
                                <img className="topImg" onClick={getImg} id="1" src={picture2[1]} />
                                <img className="topImg" onClick={getImg} id="2" src={picture2[2]} />
                            </div>
                        </div>
                        <div className="noteTopRight">
                            <h3>相关笔记</h3>
                            <div className="noteAbout">
                                <img id="0" src={eval('(' + ranD[0].picture + ')')[0]} />
                                <div>
                                    <h3>{ranD[0].title}</h3>
                                    <div className="noteAboutHeart">
                                        <HeartOutlined />
                                        <span>16</span>
                                    </div>
                                </div>
                            </div>
                            <div className="noteAbout">
                                <img id="1" src={eval('(' + ranD[1].picture + ')')[0]} />
                                <div>
                                    <h3>{ranD[1].title}</h3>
                                    <div className="noteAboutHeart">
                                        <HeartOutlined />
                                        <span>16</span>
                                    </div>
                                </div>
                            </div>
                            <div className="noteAbout">
                                <img id="2" src={eval('(' + ranD[2].picture + ')')[0]} />
                                <div>
                                    <h3>{ranD[2].title}</h3>
                                    <div className="noteAboutHeart">
                                        <HeartOutlined />
                                        <span>16</span>
                                    </div>
                                </div>
                            </div>
                            <div className="noteAbout">
                                <img id="3" src={eval('(' + ranD[3].picture + ')')[0]} />
                                <div>
                                    <h3>{ranD[3].title}</h3>
                                    <div className="noteAboutHeart">
                                        <HeartOutlined />
                                        <span>16</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="noteDeMiddle">
                        <div className="noteMiddle1">
                            <div className="noteMiddle1Left">
                                <img src={noteD.userpic} />
                                <span>{noteD.username}</span>
                                <div onClick={()=>{setGuanzhu(!guanzhu)}}>{guanzhu?"+关注":"已关注"}</div>
                            </div>
                            <div className="noteMiddle1Right">
                                <div>
                                    <HeartOutlined />
                                    <span>32</span>
                                </div>
                                <div>
                                    <StarOutlined />
                                    <span>收藏</span>
                                </div>
                            </div>
                        </div>
                        <div className="noteMiddle2">
                            <h2>{noteD.title}</h2>
                            <p>{noteD.content}</p>
                        </div>
                    </div>
                    <div className="noteDeBottom">评论
                    <Cominput params={{articel_id:id,type:"1"}} />
                    </div>
                </div>
            })
        }
    }

    return (
        <>
            <Header></Header>
            <div className="noteDetailsW">
                {
                    showDDD()
                }
            </div>
            <Footer></Footer>
        </>
    );
}

export default NotesDetails;