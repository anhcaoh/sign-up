import React, { useState } from "react";
import { Block, Card } from "Components/Layout";
import { H2, H4, Span, Label } from "Components/Typography";
import Table from "Components/Table";
import Textarea from "Components/Textarea";
import Button from "Components/Button";
import Modal from "react-modal";
import IconDownload from "Icons/cloud_download-24px.svg";
import IconUpload from "Icons/cloud_upload-24px.svg";
import IconCode from "Icons/code-24px.svg";
import IconTable from "Icons/table_chart-24px.svg";
import uiConfig from "Src/ui-config.json"; //can also pass down via props or HTTP GET
import "./uploadFile.scss";
const uiConfigMaster = JSON.parse( JSON.stringify(uiConfig) );
Modal.setAppElement("#upload-file-modal");
const UploadFile = ({ onUploadedFile, accept }) => {
  // const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     border: 0,
  //     borderRadius: 0,
  //     padding: 0,
  //     background: "none",
  //     transform: "translate(-50%, -50%)",
  //   },
  // };
  const [isUsingSample, setIsUsingSample] = useState(false);
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [file, setFile] = useState({});
  const [result, setResult] = useState(null);
  const [fileReadError, setFileReadError] = useState(null);
  const [viewResultAs, setViewResultAs] = useState("table");

  const handleOnClick = (e) => {
    if ((file && file.name) || result) {
      setIsOpenResult(true);
    } else if (e.target.files.length) {
      handleOnChange(e);
    }
  };
  const handleOnChange = (e) => {
    const _file = e.target.files[0];
    if (_file && _file.size) {
      readFile(_file);
      setIsOpenResult(true);
    } else {
      setIsOpenResult(false);
    }
  };
  const readFile = (file) => {
    const reader = new FileReader();
    reader.addEventListener("error", () => {
      const errorMessage = "Error occurred reading file " + file.name;
      console.error(errorMessage);
      setFileReadError({ message: errorMessage, error: true });
    });
    reader.addEventListener("load", (e) => {
      const result = e.target.result;
      let _resultJSON = null;
      const tryParseJsonString = (str) => {
        try {
          _resultJSON = JSON.parse(str);
        } catch (e) {
          const errorMessage = "Error occurred parsing file " + file.name;
          console.error(errorMessage);
          setFileReadError({ message: errorMessage, error: true });
          return false;
        }
        return true;
      };

      tryParseJsonString(result);

      if (_resultJSON) {
        setFile(file);
        setResult(_resultJSON);
        setIsUsingSample(false);
        setFileReadError(null);
      }
    });
    reader.readAsBinaryString(file);
  };

  const handleOnUploadedFile = (e) => {
    e.preventDefault();
    setIsOpenResult(false);
    onUploadedFile && onUploadedFile(e, result);
  };

  const getEncodedUri = (result, type) => {
    let encodedUri = "";
    if (type === "csv") {
      let _headings = [];
      const _elements = result.elements;
      _elements &&
        _elements.forEach((elem) => {
          let _keys = Object.keys(elem);
          _keys.forEach((key) => {
            const _keyIndex = _headings.indexOf(key);
            if (_keyIndex === -1) {
              _headings.push(key);
            }
          });
        });

      const replacer = (key, value) => {
        return "undefined" === typeof value || value === null ? "" : value;
      };

      let csv = _elements.map(function (row) {
        return _headings
          .map(function (fieldName) {
            return JSON.stringify(row[fieldName], replacer);
          })
          .join(",");
      });

      csv.unshift(_headings.join(","));
      csv = csv.join("\r\n");
      encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    } else {
      const _blob = new Blob([JSON.stringify(result, null, 4)]);
      encodedUri = window.URL.createObjectURL(_blob, { type: "octet/stream" });
    }
    return encodedUri;
  };

  const downloadFile = (content, type) => {
    let encodedUri = getEncodedUri(content || result, type);
    const fileNameCopyExt =
      ((file.name && file.name.split(".")[0] + "_copy.") || "sample.") + type;
    const a = document.createElement("a"); //create temp a tag
    a.href = encodedUri; //assign href
    a.download = fileNameCopyExt; //assign file name
    a.click(); //stimulate click event to download file
    window.URL.revokeObjectURL(encodedUri); //clean up URL after used;
  };

  const FileDesc = ({ className, onClick }) => {
    return (
      <Span className={className} onClick={onClick}>
        {file.name}&nbsp;
        <small className="text--small">({file.size / 1000 + " KB"})</small>
      </Span>
    );
  };

  const FileDescButton = ({ className }) => {
    return (
      (file.name && (
        <Block className="button__group">
          <FileDesc
            onClick={() => setIsOpenResult(!isOpenResult)}
            className={["button clear file-desc", className].join(" ").trim()}
          />
          <DeleteFileButton className="clear delete-file" />
        </Block>
      )) ||
      null
    );
  };

  const DeleteFileButton = ({ className }) => {
    return (
      (file.name && (
        <Button
          className={className}
          onClick={() => {
            setIsOpenResult(false);
            setIsUsingSample(false);
            setFile({});
            setResult(null);
          }}
        >
          &#x2715;
        </Button>
      )) ||
      null
    );
  };

  const UploadFileButton = ({
    showFileButton,
    showSampleButton,
    errorPlacement,
  }) => {
    return (
      <>
        <Block>
          <input
            type="file"
            accept={accept}
            id="upload-file"
            onChange={handleOnChange}
            onClick={handleOnClick}
          />
          <Label for="upload-file" className="button primary uppercase">
            <IconUpload className="icon icon--white margin-right--1" />
            Upload
          </Label>
          <ErrorMessage
            className={errorPlacement === "left" ? "float--left" : ""}
          />

          {(showFileButton && <FileDescButton />) || null}

          {(showSampleButton && !file.name && (
            <Button
              className="clear uppercase"
              onClick={() => {
                setIsUsingSample(!isUsingSample);
                setResult(!isUsingSample ? uiConfig : null);
                setIsOpenResult(!isOpenResult);
              }}
            >
              Use Sample
            </Button>
          )) ||
            null}
        </Block>
      </>
    );
  };

  const ErrorMessage = ({ className }) => {
    return (
      (!result || fileReadError) && (
        <Label
          className={["label--warning text--center", className]
            .join(" ")
            .trim()}
        >
          {fileReadError && fileReadError.error && fileReadError.message}{" "}
        </Label>
      )
    );
  };
  const CallToActions = () => {
    return (
      <>
        <Block className="call-to-actions margin-bottom--1 float--right">
          <Button
            disabled={!result ? true : false}
            onClick={handleOnUploadedFile}
            className="primary uppercase"
          >
            Submit
          </Button>
          <Button
            disabled={!result ? true : false}
            onClick={() => {
              if (isUsingSample) {
                setResult(uiConfigMaster);
              } else {
                readFile(file);
              }
            }}
            className="clear margin-left--1 uppercase"
          >
            Reset
          </Button>
          {(result && result.elements && (
            <Block className="button__group margin-right--1 margin-left--1">
              <Button
                className="clear uppercase"
                title={
                  "Download file (." +
                  (viewResultAs === "json" ? "CSV" : "JSON") +
                  ")"
                }
                onClick={() =>
                  downloadFile(
                    result,
                    viewResultAs === "table" ? "csv" : "json"
                  )
                }
              >
                <IconDownload /> {viewResultAs === "json" ? "json" : "csv"}
              </Button>
              <Button
                className="clear uppercase"
                title={
                  "View as " + (viewResultAs === "json" ? "table" : "JSON")
                }
                onClick={() => {
                  setViewResultAs(viewResultAs === "table" ? "json" : "table");
                }}
              >
                {viewResultAs === "json" ? <IconTable /> : <IconCode />}
              </Button>
            </Block>
          )) ||
            null}
          <Button
            className="clear uppercase"
            onClick={() => {
              if (isUsingSample) {
                //reset all
                setIsUsingSample(false);
                setIsOpenResult(false);
                setResult(null);
              } else {
                setIsOpenResult(false);
              }
            }}
          >
            close
          </Button>
        </Block>
      </>
    );
  };

  const ResultCard = () => {
    return (
      <>
        {viewResultAs === "table" ? (
          <Table
            id="file-result-table"
            className={"result-table"}
            data={result}
          />
        ) : viewResultAs === "json" ? (
          <Textarea
            className="card result-json"
            onBlurHandler={(e, props) => {
              setResult(JSON.parse(props.value));
            }}
          >
            {JSON.stringify(result, null, 2)}
          </Textarea>
        ) : null}
      </>
    );
  };

  return (
    <Block className="upload-file-container">
      <UploadFileButton showSampleButton={true} showFileButton={true} />
      {(isOpenResult && (
        <Card className="glass">
          <CallToActions />
          {(file.name && (
            <H2 className="margin-top--0 margin-bottom--0 display--inline-block">
              Form Configuration
            </H2>
          )) ||
            null}
          {(isUsingSample && (
            <H2 className="margin-top--0 margin-bottom--0 display--inline-block">
              Sample Form Configuration
            </H2>
          )) ||
            null}
          <H4 className="margin--0 margin-bottom--1 clearfix">
            Click to make field changes below as needed
            {(file.name && <FileDesc className="float--right" />) || null}
          </H4>
          <ResultCard />
        </Card>
      )) ||
        null}
    </Block>
  );
};

export default UploadFile;
