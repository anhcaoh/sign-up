import React, { useState } from "react";
import Input from "Components/Input";
import { Block } from "Components/Layout";
import { Label } from "Components/Typography";
import "./uploadFile.scss";

const UploadFile = ( { accept } ) => {
    const handleOnChange = (e) => {
        console.log(e.target.files);
    };
    return (<Block>
        <Input type="file"
        accept={accept} 
        id="uploadFile"
        onChange={handleOnChange} />
        <Label for="uploadFile" 
        className="button primary">Upload</Label>

    </Block>);
};

export default UploadFile;