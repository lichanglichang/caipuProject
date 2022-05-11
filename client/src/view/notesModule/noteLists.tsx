import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    HeartOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import "./css/noteLists.css";
import Header from "../components/header";
import Footer from "../components/footer";

function Notes() {
    const [notes, setNotes] = useState<any>(null);
    useEffect(() => {
        showNotes();
    }, [])
    function showNotes() {
        axios.get("http://localhost:8200/notesInfo")
            .then(function (r: any) {
                setNotes(r.data);
                console.log(r.data);
                
            })
    };
    let navigate = useNavigate();
    function gotoD(id:number){
        navigate({pathname:`/Notes/Details/${id}`})
    };
    function mapNotes() {
        if (notes != null) {
            
            return notes.map(function (notes: any) {
                var picture1 = JSON.parse(notes.picture);
                return <div className="notesInfo" key={notes.id} onClick={gotoD.bind(null,notes.id)}>
                    <div className="notesImg">
                        <img src={picture1[0]} />
                    </div>
                    <div className="notesTitle">{notes.title}</div>
                    <div className="notesIntro">
                        <div className="intoLeft">{notes.username}</div>
                        <div className="intoRight">
                            <HeartOutlined />
                            <span>16</span>
                        </div>
                    </div>
                </div>
            })
        }
    }
    return (
        <>
            <Header></Header>
            <div className="noteW">
                {
                    mapNotes()
                }
            </div>
            <Footer></Footer>
        </>
    );
}

export default Notes;