/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { Dialog } from "primereact/dialog";
// styles
import styles from "./Popup.module.scss";
import { CircularProgress } from "@mui/material";
import { memo, useEffect, useState } from "react";
import "./popupsStyle.css";
import DefaultButton from "../Buttons/DefaultButton/DefaultButton";
const InfoIcon = require("../../../assets/images/png/info.png");
const verified = require("../../../assets/images/gif/verified.gif");

interface Props {
  popupTitle?: string;
  PopupType: "custom" | "confirmation";
  popupActions: PopupActionBtn[]; // Ensure type safety for popup actions
  defaultCloseBtn?: boolean;
  content?: React.ReactNode;
  response?: any;
  popupWidth?: string | number;
  onHide: () => void;
  visibility: boolean;
  confirmationTitle?: string;
  isLoading?: boolean;
  popupHeight?: boolean;
}

interface PopupActionBtn {
  text: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  btnType: any;
  onClick: any;
}

const Popup = ({
  PopupType,
  popupActions,
  popupTitle,
  defaultCloseBtn,
  onHide,
  visibility,
  content,
  response = {
    Loading: false,
    Title: "",
    Message: "",
  },
  popupWidth,
  confirmationTitle,
  isLoading,
  popupHeight,
  ...btnRest
}: Props): JSX.Element => {
  const [label, setLabel] = useState("3s");
  const headerElement = (
    <div
      className={`${
        !defaultCloseBtn
          ? styles.popupHeaderWithoutCloseIcon
          : styles.popupHeader
      }`}
    >
      <div className={styles.header}>{popupTitle}</div>
      <span className="requirement_message">
        <img src={InfoIcon} alt="info" />
        Fill out the required fields to submit the form
      </span>
    </div>
  );

  const footerContent = (): JSX.Element => (
    <div
      className={
        PopupType === "confirmation"
          ? styles.popupFooterConfirmation
          : styles.popupFooter
      }
    >
      {popupActions?.map((btn, id) => (
        <DefaultButton
          style={{
            minWidth: PopupType === "confirmation" ? "85px" : "auto",
          }}
          key={id}
          btnType={btn.btnType}
          text={btn.text}
          disabled={btn.disabled}
          endIcon={btn.endIcon}
          startIcon={btn.startIcon}
          onClick={btn.onClick}
          {...btnRest}
        />
      ))}
    </div>
  );

  const popupContent =
    PopupType === "confirmation" ? (
      <div className={styles.contentWrapper}>
        <div
          className={
            popupHeight
              ? styles.promoteContentContainer
              : styles.contentContainer
          }
        >
          <span className={styles.confirmTitleText}>{confirmationTitle}</span>
        </div>
      </div>
    ) : PopupType === "custom" ? (
      <div className={styles.contentWrapper}>
        <div
          className={
            popupHeight
              ? styles.promoteContentContainer
              : styles.contentContainer
          }
        >
          {content}
        </div>
      </div>
    ) : (
      "some thing is wrong with the properties!, please check."
    );

  const startCountdown = () => {
    let seconds = 3;
    setLabel(`${seconds}s`);

    const interval = setInterval(() => {
      seconds--;
      if (seconds > 0) {
        setLabel(`${seconds}s`);
      } else {
        clearInterval(interval);
        onHide();
        setTimeout(() => {
          setLabel("0s");
        }, 1000);
      }
    }, 1000);
  };

  const responseContent = () => {
    return (
      <div className="popup_response_wrapper">
        <div className="popup_response_content">
          <img
            src={verified}
            alt="Success"
            style={{ width: "100px", height: "107px" }}
          />
          <p style={{ margin: "0px 0px 15px 0px" }}>{response?.Title}</p>
          <span>{response?.Message}</span>
          <div style={{ marginTop: "15px" }}>
            <DefaultButton
              btnType="openBtn"
              text={`Close ${label}`}
              onClick={() => onHide()}
            />
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (response?.Title !== "") {
      startCountdown();
    }
  }, [response?.Title]);

  return (
    <Dialog
      // closeIcon={defaultCloseBtn}

      closable={defaultCloseBtn}
      draggable={false}
      position="right"
      className={`popupWrapper ${styles.popupWrapper}  ${
        response?.Title && "response_dialog"
      }`}
      visible={visibility}
      modal
      header={PopupType !== "confirmation" && headerElement}
      style={{ width: popupWidth }}
      onHide={onHide}
      footer={response?.Title === "" && footerContent()}
    >
      {isLoading || response?.Loading ? (
        <div className={styles?.loaderElement}>
          <CircularProgress
            sx={{
              width: "40px",
              height: "40px",
              animationDuration: "450ms",
              color: "#555555ac",
            }}
            size={"30px"}
            disableShrink
            variant="indeterminate"
            color="inherit"
          />
        </div>
      ) : response?.Title === "" ? (
        popupContent
      ) : (
        responseContent()
      )}
    </Dialog>
  );
};

export default memo(Popup);
