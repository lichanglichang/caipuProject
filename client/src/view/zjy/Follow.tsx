import React, { useState } from 'react';
import './css/Zjy.css';
import axios from 'axios';

function Follow() {

    const [text, setText] = useState<string>("+ 关注")

    function changeText() {


        axios.post("http://localhost/follow")

            .then(function (response: any) {
                console.log(response.data)
            })
            .catch(function (error: any) {
                console.log(error);
            });



        if (text == "+ 关注") {
            setText("已关注");
        } else {
            setText("+ 关注")
        }
    }

    return (
        <div className="follow">
            <button onClick={changeText}>{text}</button>
        </div>
    )
}

export default Follow;