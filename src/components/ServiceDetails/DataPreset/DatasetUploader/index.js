import { useState } from "react";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import { publishDatasetForImproving } from "../../../../Redux/actionCreators/ServiceTrainingActions";
import SNETFileUpload from "../../../common/SNETFileUpload";
import { isEmpty } from "lodash";
import { Typography } from "@mui/material";
import ExampleDatasets from "../ExampleDatasets";
import DatasetInfo from "../DatasetInfo";
import StyledButton from "../../../common/StyledButton";
import DashboardModal from "../DashboardModal";

// import TaskIcon from "@mui/icons-material/Task";

const acceptedFileTypes = ["application/zip", "application/x-zip-compressed"];
const datasetParameters = [
  { title: "Size", value: "11.2Mb" },
  { title: "Format", value: "TXT" },
  {
    title: "Rate",
    value: "5.5/10",
    additionalInfo: [
      { value: "11", title: "Outlier filtering1" },
      { value: "11", title: "Outlier filtering2" },
      { value: "11", title: "Outlier filtering3" },
      { value: "11", title: "Outlier filtering4" },
    ],
  },
];
const DatasetUploader = ({ classes, setDatasetInfo, datasetInfo, cleanDatasetInfo }) => {
  const [trainingDataFileName, setTrainingDataFileName] = useState(datasetInfo?.name);
  const [trainingDataFileSize, setTrainingDataFileSize] = useState(datasetInfo?.size);
  const [isDashbordOpen, setIsDashbordOpen] = useState(false);

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    if (!isEmpty(rejectedFiles)) {
      return;
    }
    if (!isEmpty(acceptedFiles)) {
      try {
        const fileBlob = acceptedFiles[0];
        const { name, size } = fileBlob;

        setTrainingDataFileName(name);
        setTrainingDataFileSize(size);
        const url = await publishDatasetForImproving(fileBlob, name);
        setDatasetInfo({ link: url, name });
      } catch (error) {
        console.log("error: ", error);

        // setAlert({ type: alertTypes.ERROR, message: error.message });
      }
    }
  };

  const Helpertext = () => {
    return (
      isEmpty(datasetInfo) && (
        <>
          <Typography>Package must be under 50mb</Typography>
          <Typography>Make sure the extension is .zip</Typography>
        </>
      )
    );
  };

  const openDashbordModal = () => {
    setIsDashbordOpen(true);
  };

  const closeDashbordModal = () => {
    setIsDashbordOpen(false);
  };

  const cleanCurrentDataset = () => {
    cleanDatasetInfo();
    setTrainingDataFileName();
    setTrainingDataFileSize();
  };

  return (
    <div className={classes.datasetUploader}>
      <div className={classes.uploaderContainer}>
        <p>Drag & Drop or Select File</p>
        <SNETFileUpload
          onDrop={handleDrop}
          accept={acceptedFileTypes}
          multiple={false}
          showFileDetails
          helperText={<Helpertext />}
          fileName={trainingDataFileName}
          fileSize={trainingDataFileSize}
          uploadSuccess={Boolean(trainingDataFileName || datasetInfo)}
          cleanCurrentFile={cleanCurrentDataset}
          isFileStatsDisplay={false}
        />
      </div>
      {isEmpty(datasetInfo) ? (
        <ExampleDatasets setDatasetInfo={setDatasetInfo} />
      ) : (
        <>
          <DatasetInfo datasetParameters={datasetParameters} />
          <StyledButton type="gradient" btnText="Improvment options" onClick={openDashbordModal} />
        </>
      )}
      {isDashbordOpen && <DashboardModal onClose={closeDashbordModal} isShow={isDashbordOpen} />}
    </div>
  );
};

export default withStyles(useStyles)(DatasetUploader);
