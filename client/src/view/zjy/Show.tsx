import React, { useEffect, useState } from 'react';
import { Comment, Tooltip, List, Avatar, Form, Button, Input } from 'antd';
import moment from 'moment';
import axios from 'axios';
import ThemeContext from './MyContext';
import GetC from "./GetC";


function Show() {
    const obj = React.useContext(ThemeContext);
    const cookie0 = document.cookie.split(';');
    const cookie1 = GetC(cookie0);

    function del1() {
        axios.get("http://localhost:8200/getDel", {
            params: {
                comment: obj.comments1,
                username: cookie1
            }
        })
            .then(function (res: any) {
                console.log(res.data);
                window.location.reload();
            })
    }
    function del2() {
        axios.get("http://localhost:8200/getDel", {
            params: {
                comment: obj.comments2,
                username: cookie1
            }
        })
            .then(function (res: any) {
                window.location.reload();
            })
    }
    function del3() {
        axios.get("http://localhost:8200/getDel", {
            params: {
                comment: obj.comments3,
                username: cookie1
            }
        })
            .then(function (res: any) {
                window.location.reload();
            })
    }

    const data = [
        {
            actions: [],
            author: <span>{obj.name1}</span>,
            avatar: obj.url1,
            content: (
                <p style={{ width: "600px", height: "60px", borderBottom: "1px solid #E5E3DF" }}>
                    {obj.comments1}
                    <span style={{ fontSize: "10px", float: "right", color:"gray"}} onClick={del1}>删除</span>
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}></Tooltip>
            ),
        },
        {
            author: <span>{obj.name2}</span>,
            avatar: obj.url2,
            content: (
                <p style={{ width: "600px", height: "60px", borderBottom: "1px solid #E5E3DF" }}>
                    {obj.comments2}
                    <span style={{ fontSize: "10px", float: "right", color:"gray" }} onClick={del2}>删除</span>
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}></Tooltip>
            ),
        },
        {
            author: <span>{obj.name3}</span>,
            avatar: obj.url3,
            content: (
                <p style={{ width: "600px", height: "60px", borderBottom: "1px solid #E5E3DF" }}>
                    {obj.comments3}
                    <span style={{ fontSize: "10px", float: "right", color:"gray"}} onClick={del3}>删除</span>
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}></Tooltip>
            ),
        }
    ];

    return (
        <div className='show'>
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
        </div>
    )
}


export default Show;