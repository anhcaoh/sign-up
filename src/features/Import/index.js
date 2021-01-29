import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import { readString } from "react-papaparse";
import { Block, Card } from "Components/Layout";
import { H2, H4, Span, Label } from "Components/Typography";
import Table from "Components/Table";
import Textarea from "Components/Textarea";
import Button from "Components/Button";
import IconDownload from "Icons/cloud_download-24px.svg";
import IconUpload from "Icons/cloud_upload-24px.svg";
import IconCode from "Icons/code-24px.svg";
import IconTable from "Icons/table_chart-24px.svg";
import uiConfig from "Src/ui-config.json"; // can also pass down via props or HTTP GET
import "./import.scss";
const uiConfigMaster = JSON.parse(JSON.stringify(uiConfig));
Modal.setAppElement("#import-file-modal");
const Import = ({ onImportedFile, accept, showFormHandler, isShowingForm }) => {
  const [isUsingSample, setIsUsingSample] = useState(false);
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [file, setFile] = useState({});
  const [headers, setHeaders] = useState(null);
  const [result, setResult] = useState(null);
  const [fileReadError, setFileReadError] = useState(null);
  const [viewResultAs, setViewResultAs] = useState("table");

  const handleOnChange = (e, File) => {
    const _file = (e?.target?.files && e.target.files[0]) || File;
    if (_file && _file.size) {
      readFile(_file);
      setIsOpenResult(true);
    } else {
      setIsOpenResult(false);
    }
  };

  const handleOnClick = (e) => {
    if ((file && file.name) || result) {
      setIsOpenResult(true);
    } else if (e.target.files.length) {
      handleOnChange(e);
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
          if(file.type === "text/csv"){
            const _result = readString(str);
            const _headers = _result?.data[0]; //get set headers
            setHeaders(_headers);
            _result?.data.shift();//remove headers from rows
            _resultJSON = {"elements":_result?.data};
          } else if (file.type === "application/json"){
            setHeaders(null);
            _resultJSON = JSON.parse(str);
          }
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

  const handleOnImportedFile = (e) => {
    e.preventDefault();
    setIsOpenResult(false);
    onImportedFile && onImportedFile(e, result);
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
      ((file.name && file.name.split(".")[0] + " copy.") || "sample.") + type;
    const a = document.createElement("a"); // create temp a tag
    a.href = encodedUri; // assign href
    a.download = fileNameCopyExt; // assign file name
    a.click(); // stimulate click event to download file
    window.URL.revokeObjectURL(encodedUri); // clean up URL after used;
  };
  const useSampleFile = () => {
    setIsUsingSample(true);
    setResult(uiConfig);
    setIsOpenResult(true);
    showFormHandler(false);
  };
  const ErrorMessage = ({ className }) => {
    return (
      (!result || fileReadError) && (
        <Label
          className={["label--warning text--center", className]
            .join(" ")
            .trim()}
        >
          {fileReadError && fileReadError.error && fileReadError.message}
        </Label>
      )
    );
  };

  const FileDesc = ({ className, onClick }) => {
    return (
      <Span
        className={className}
        title={"Edit Configuration of " + file.name}
        onClick={onClick}
      >
        <Span>
          
          {file.name}&nbsp;
          <small className="text--small">({file.size / 1000 + " KB"})</small>
        </Span>
      </Span>
    );
  };

  const FileDescButton = ({ className }) => {
    return (
      (file.name && (
        <>
          <Block className="button__group">
            <FileDesc
              onClick={() => setIsOpenResult(!isOpenResult)}
              className={["button clear file-desc", className].join(" ").trim()}
            />
            <DeleteFileButton className="clear delete-file" />
          </Block>
        </>
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

  const DropZone = ({
    accept,
    errorPlacement,
    onDropFileHandler,
    onClickFileHandler,
  }) => {
    const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles?.length && onDropFileHandler)
        onDropFileHandler(null, acceptedFiles[0]);
    }, []);
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
    } = useDropzone({ onDrop, accept: accept, noClick: true, multiple: false });

    return (
      <div
        className={[
          "dropzone",
          isDragActive ? "dropzone__accept" : "",
          isDragReject ? "dropzone__reject" : "",
        ]
          .join(" ")
          .trim()}
        {...getRootProps()}
        tabIndex={null}
      >
        <input
          {...getInputProps()}
          type="file"
          accept={accept}
          id="upload-file"
          onChange={onDropFileHandler}
          onClick={onClickFileHandler}
        />
        <Label for="upload-file" className="button primary uppercase">
          <IconUpload className="icon icon--white margin-right--1" />
          Import
        </Label>
        <ErrorMessage className={errorPlacement === "left" ? "float--left" : ""}
        />
      </div>
    );
  };

  const ImportButton = ({ showFileButton, errorPlacement }) => {
    return (
      <>
        <Block id="import-header" className="import-header glass">
          <DropZone
            accept={accept}
            errorPlacement={errorPlacement}
            onDropFileHandler={handleOnChange}
            onClickFileHandler={handleOnClick}
          />
          {(showFileButton && <FileDescButton />) || null}
          {(!file.name && !result && (
            <Button className="clear uppercase" onClick={useSampleFile}>
              Use Sample
            </Button>
          )) ||
            null}
          {(isShowingForm && !file.name && result && (
            <Button
              className="clear uppercase"
              onClick={() => {
                showFormHandler(false);
                setIsOpenResult(true);
              }}
            >
              <Span>Edit Configuration</Span>
            </Button>
          )) ||
            null}
        </Block>
      </>
    );
  };

  const CallToActions = () => {
    return (
      <>
        <Block className="call-to-actions margin-bottom--1 float--right">
          {(result && result.elements && (
            <Block className="button__group">
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
                <IconDownload />
                &nbsp;Download {viewResultAs === "json" ? "json" : "csv"}
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
            disabled={!result ? true : false}
            onClick={() => {
              if (isUsingSample) {
                setResult(uiConfigMaster);
              } else {
                readFile(file);
              }
            }}
            className="clear margin-left--1 margin-right--1  uppercase"
          >
            Reset
          </Button>
          <Button
            disabled={!result ? true : false}
            onClick={handleOnImportedFile}
            className="primary uppercase"
          >
            Submit
          </Button>
          {/* <Button
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
          </Button> */}
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
            headers={headers}
            hasHeaders={headers?.length ? true : false}
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
        ) : (
          <Block />
        )}
      </>
    );
  };

  return (
    <Block className="import-container">
      <ImportButton showFileButton={true} />
      {(isOpenResult && (
        <Card className="glass">
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
          <CallToActions />
          {(file.name && (
            <H4 className="margin--0 margin-bottom--1 clearfix">
              Make field changes below as needed
              {/* {(file.name && <FileDesc className="float--right" />) || null} */}
            </H4>
          )) ||
            null}
          <ResultCard />
        </Card>
      )) ||
        null}
    </Block>
  );
};

export default Import;
