import React, { useState } from 'react';

import { Upload, notification, message, InputProps } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { API_ROUTES } from '@/utils/constant';



const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M;
};

export const ThImageUpload: React.FC<InputProps> = ({ value }) => {
    const [loading, setLoading] = React.useState(false);
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (<>
        <Upload
            //name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            multiple={false}
            maxCount={1}
            action={`${API_ROUTES.FILE_CREATE}`}
            beforeUpload={beforeUpload}
        //onChange={handleChange}
        >
            {value ? <img src={value.toString()} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload></>);
}