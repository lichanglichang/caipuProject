import React, { useState } from 'react';
import {
    StarOutlined
} from '@ant-design/icons';

function Have() {

    const [have,setHave] = useState<string>("收藏");
    function changeHave() {

        if (have == "收藏") {
            setHave("已收藏");
        } else {
            setHave("收藏")
        }
    }
    return (
        <div className='have'>
            <div onClick={changeHave}>
                <StarOutlined />
                <span>{have}</span>
            </div>
        </div>
    )
}

export default Have;