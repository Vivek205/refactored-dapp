import React from "react";
import { useDropzone } from "react-dropzone";
import CloudUpload from "@mui/icons-material/Backup";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import TaskIcon from "@mui/icons-material/Task";

import { useStyles } from "./styles";
import FileStats from "./FileStats";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const SNETFileUpload = (props) => {
  const {
    disabled,
    minSize,
    maxSize,
    multiple,
    accept,
    onDrop,
    onDropAccepted,
    onDropRejected,
    showFileDetails,
    fileName,
    fileSize,
    uploadSuccess,
    error,
    cleanCurrentFile,
    helperText = null,
    isFileStatsDisplay = true,
  } = props;
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const { getRootProps, getInputProps } = useDropzone({
    disabled,
    minSize,
    maxSize,
    multiple,
    accept,
    onDrop,
    onDropAccepted,
    onDropRejected,
  });

  const handleFileClean = (e) => {
    e.stopPropagation();
    cleanCurrentFile();
  };

  return (
    <Box className={classes.fileUploaderContainer}>
      <input {...getInputProps()} />
      <Box className={classes.grayBox} {...getRootProps()}>
        {uploadSuccess ? (
          <>
            {cleanCurrentFile && (
              <IconButton className={classes.cleanButton} onClick={(event) => handleFileClean(event)}>
                <Close />
              </IconButton>
            )}
            <TaskIcon />
            <Typography>{fileName}</Typography>
          </>
        ) : (
          <>
            <CloudUpload />
            <Typography>
              Drag and drop image here or<span> click</span>
            </Typography>
          </>
        )}
        {helperText === null ? (
          <Typography>(Package must be under {maxSize}mb. Make sure the extension is .zip or .tar)</Typography>
        ) : (
          helperText
        )}
      </Box>
      {isFileStatsDisplay && (
        <FileStats
          show={showFileDetails}
          fileName={fileName}
          fileSize={fileSize}
          uploadSuccess={uploadSuccess}
          error={error}
        />
      )}
    </Box>
  );
};

SNETFileUpload.prototypes = {
  disabled: PropTypes.disabled,
  isFileStatsDisplay: PropTypes.bool,
  onFileSelect: PropTypes.func,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), //https://github.com/react-dropzone/attr-accept
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  showFileDetails: PropTypes.bool,
  fileName: PropTypes.string,
  fileSize: PropTypes.number,
  fileDownloadURL: PropTypes.string,
  uploadSuccess: PropTypes.bool,
  helperText: PropTypes.any,
};

export default SNETFileUpload;
