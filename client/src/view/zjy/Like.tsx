import React from 'react';
import {
    HeartOutlined,
} from '@ant-design/icons';

function Like() {
    return (
        <div  className='like'>
            <div>
                <HeartOutlined />
                <span className='notLike'>0</span>
            </div>
        </div>
    )
}

export default Like;