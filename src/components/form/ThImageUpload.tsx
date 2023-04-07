import React, { useState } from 'react';

import { Upload, notification, message, InputProps } from "antd";
import { RetweetOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import useTabhubContext from "@/lib/context/TabhubContext";
import { API_ROUTES } from '@/utils/constant';

interface ThImageUploadProps extends UploadProps {
    value?: UploadFile[]
}

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

export const ThImageUpload: React.FC<ThImageUploadProps> = ({ maxCount = 1, value = [], ...inputProps }) => {
    const [loading, setLoading] = React.useState(false);
    const { tokens } = useTabhubContext();

    const getUploadButton = () => {
        return (
            <div>
                {maxCount === 1 ? (value.length == 1 ? <RetweetOutlined /> : <PlusOutlined />) : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>
                    {maxCount === 1 ? (value.length == 1 ? "Remplacer" : "Charger") : "Charger"}
                </div>
            </div>
        )
    }

    return (<>
        <Upload
            listType="picture-card"
            className="avatar-uploader"
            action={`${API_ROUTES.FILE_CREATE}`}
            beforeUpload={beforeUpload}
            headers={{ Authorization: 'Bearer ' + tokens?.accessToken }}
            fileList={value}
            maxCount={maxCount}
            {...inputProps}
        >
            {getUploadButton()}
        </Upload></>);
}