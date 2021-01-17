import React, { useState } from "react";
import { Block, Card } from "Components/Layout";
import { H2, Label } from "Components/Typography";
import Table from "Components/Table";
import Textarea from "Components/Textarea";
import Button from "Components/Button";
import Modal from "react-modal";
import "./uploadFile.scss";

Modal.setAppElement("#upload-file-modal");

const UploadFile = ({ onUploadedFile, accept }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      border: 0,
      borderRadius:0,
      padding: 0,
      backgrond: "transparent",
      transform: "translate(-50%, -50%)",
    },
  };

  const [isOpenModal, setIsOpen] = useState(false);
  const [file, setFile] = useState({});
  const [result, setResult] = useState(null);
  const [viewResultAs, setViewResultAs] = useState("table");
  const toggleModal = (file) => {
    if (!isOpenModal) setFile(file);
    setIsOpen(!isOpenModal);
    readFile(file);
  };

  const handleOnClick = (e) => {
    if( (file && file.name) || result || e.target.files[0] ) openModal();
  };
  const handleOnChange = (e) => {
    const _file = e.target.files[0];
    if (_file) {
      toggleModal(_file);
    }
  };
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const readFile = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
        const result = e.target.result;
        setResult( JSON.parse(result) );
    });
    reader.readAsBinaryString(file);
  };

  const handleOnUploadedFile = (e) => {
    e.preventDefault();
    closeModal();
    onUploadedFile && onUploadedFile(e, result );
  }; 
  const renderFileDesc = (file) => {
    return (
      <span>{file.name}&nbsp;<small className="text--small"> 
      ({ (file.size / 1000) + " KB" })
      </small></span>);
  };
  return (
    <Block>
      <input
        type="file"
        accept={accept}
        id="upload-file"
        onChange={handleOnChange}
        onClick={handleOnClick}
      /><>
      <Label for="upload-file" className="button primary uppercase">
        Upload
      </Label>
      {file.name && 
        (<Label className="button clear" 
        onClick={openModal}>
          {renderFileDesc(file)}
        </Label> || null ) 
      }
      <Modal
        isOpen={isOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel={file.name}>
        <Card className="upload-file-container glass">
            <Block>
                <H2 className="margin-top--0 display--inline-block">
                {renderFileDesc(file)}
                </H2>
                <Button className="uppercase float--right" 
                onClick={closeModal}>close</Button>
            </Block>
            <Block>
                <Block className="text--right"> 
                <Button className="uppercase" 
                onClick={() => {
                  setViewResultAs(viewResultAs === "table" ? "json" : "table");
                }}>View as {viewResultAs === "json" ? "Table" : "JSON"}</Button>
                </Block>
                
                {viewResultAs === "table" ? 
                <Table id="file-result-table" 
                className="result-table" 
                data={result} /> : 
                viewResultAs === "json" ?
                <Textarea className="card result-json" 
                  onBlurHandler={(e,props) => {
                    setResult( JSON.parse(props.value) );
                  }}>
                  {JSON.stringify(result, null, 4) }
                </Textarea> : null }
                <Block className="text--right">
                <Button onClick={handleOnUploadedFile} 
                  className="primary uppercase">
                    Submit
                </Button>
                </Block>
            </Block>
        </Card>
      </Modal>
      </>
    </Block>
  );
};

export default UploadFile;
