import React from 'react';
import "antd/dist/antd.css";
import Commen from './Commen';
import Follow from './Follow';
import Like from './Like';
import Have from './Have';

function Zjy() {
    return (
        <div>
            <h1>zjy组件</h1>
            <Commen/><br />
            <Follow></Follow><br />
            <Have></Have><br />
            <Like></Like><br />
        </div>
    )
}

export default Zjy;