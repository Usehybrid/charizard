import * as React from "react";
import * as popover from "@zag-js/popover";
import clsx from "clsx";
import noteDownloadIcon from "../../assets/notes/note-download.svg";
import classes from "./table-export.module.css";
import { SVG } from "../../svg";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { getFileTypeIcon } from "../../upload/helper";

interface TableExportProps {
  exportConfig: {
    isPending: boolean;
    isError: boolean;
    handleExport: any;
    isLegacy?: boolean;
  };
}

export default function TableExport({ exportConfig }: TableExportProps) {
  const { isPending, handleExport } = exportConfig;
  const [isExportingLocally, setIsExportingLocally] = React.useState(false);
  const service = useMachine(popover.machine, { id: React.useId() });
  const api = popover.connect(service, normalizeProps);
  const Wrapper = api.portalled ? Portal : React.Fragment;
  const isExporting = isPending || isExportingLocally;

  const handleExportInternal = async (type: string) => {
    if (isExporting) return;

    setIsExportingLocally(true);
    try {
      await handleExport(type);
      api.setOpen(false);
    } finally {
      setIsExportingLocally(false);
    }
  };

  if (exportConfig?.isLegacy)
    return (
      <button
        onClick={() => handleExportInternal("csv")}
        className={clsx(classes.actionCommon, "zap-reset-btn")}
        disabled={isExporting}
        aria-busy={isExporting}
        aria-label={isExporting ? "Exporting table" : "Export table"}
      >
        <SVG
          path={noteDownloadIcon}
          width={16}
          height={16}
          spanClassName={clsx(isExporting && classes.exportingIcon)}
        />
      </button>
    );

  return (
    <div className={classes.tableExportBox}>
      <button
        {...api.getTriggerProps()}
        className={clsx(classes.actionCommon, "zap-reset-btn", api.open && classes.active)}
        disabled={isExporting}
        aria-busy={isExporting}
        aria-label={isExporting ? "Exporting table" : "Export table"}
      >
        <SVG
          path={noteDownloadIcon}
          width={16}
          height={16}
          spanClassName={clsx(isExporting && classes.exportingIcon)}
        />
      </button>

      <Wrapper>
        <div {...api.getPositionerProps()} className={classes.positioner}>
          <div {...api.getContentProps()} className={classes.content}>
            <div className={classes.options}>
              <div
                className={clsx(classes.option, isExporting && classes.optionPending)}
                onClick={() => handleExportInternal("csv")}
                aria-disabled={isExporting}
              >
                <img className={classes.uploadingImg} src={getFileTypeIcon("csv")} alt="csv icon" />
                <p className="zap-subcontent-medium">.csv</p>
              </div>

              <div
                className={clsx(classes.option, isExporting && classes.optionPending)}
                onClick={() => handleExportInternal("xlsx")}
                aria-disabled={isExporting}
              >
                <img
                  className={classes.uploadingImg}
                  src={getFileTypeIcon("xlsx")}
                  alt="xlsx icon"
                />
                <p className="zap-subcontent-medium">.xlsx</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
