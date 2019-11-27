import React from "react";

import { CloudUpload } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import FileDrop from "react-file-drop";

import { useStyles } from "./styles";

const UploadTab = ({ classes, allowedInputTypes, handleAudioUpload }) => {
  let inputElement = null;
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.uploadTabContainer}>
      <FileDrop onDrop={(files, event) => handleAudioUpload(files, event)}>
        <input
          id="myInput"
          type="file"
          accept={allowedInputTypes}
          onChange={e => handleAudioUpload(e.target.files, e)}
          ref={input => (inputElement = input)}
        />
        <div onClick={() => inputElement.click()} className={(classes.uploadBox, classes.Box)}>
          <div className={classes.uploadBoxContent}>
            <CloudUpload />
            <Typography className={classes.uploadBoxTitle}>
              Drag and drop file here or <a href="#">click</a>
            </Typography>
            <Typography className={classes.uploadBoxDescription} />
          </div>
        </div>
      </FileDrop>
    </Grid>
  );
};

export default withStyles(useStyles)(UploadTab);
