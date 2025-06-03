/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const togglePopupVisibility = (
  setPopupController: any,
  index: number,
  action: "open" | "close",
  popupTitle?: any,
  popupData?: any,
  popupWidth?: any
): void => {
  setPopupController((prev: any) =>
    prev.map((popup: any, popupIndex: any) =>
      popupIndex === index
        ? {
            ...popup,
            open: action === "open" ? true : false,
            popupTitle: popupTitle || popup.popupTitle,
            popupData: popupData || "",
            popupWidth: popupWidth || popup.popupWidth,
          }
        : { ...popup }
    )
  );
};
export const setPopupResponseFun = (
  setPopupResponse: any,
  index: number,
  loader: true | false,
  title?: any,
  message?: any
): void => {
  setPopupResponse((prev: any) =>
    prev.map((popup: any, popupIndex: any) =>
      popupIndex === index
        ? {
            ...popup,
            Loading: loader,
            Title: title,
            Message: message,
          }
        : { ...popup }
    )
  );
};
