/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { useSelector } from "react-redux";

interface ICustomPeoplePickerProps {
  selectedItem?: any;
  tempselectedItem?: any;
  onChange?: (value: any[]) => void;
  onSubmit?: any;
  placeholder?: string;
  personSelectionLimit?: number | any;
  size?: "SM" | "MD" | "XL";
  isValid?: boolean;
  errorMsg?: string;
  labelText?: string;
  withLabel?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  minWidth?: any;
  hideErrMsg?: boolean;
  noErrorMsg?: boolean; // if true, no error message will be shown
  noBorderInput?: boolean;
  maxWidth?: any;
  minHeight?: any;
  maxHeight?: any;
  noRemoveBtn?: boolean;
  multiUsers?: boolean;
  mandatory?: boolean;
  popupControl?: boolean;
  hasSubmitBtn?: boolean;
  sectionType?: "three" | "two" | "one";
}

const CustomPeoplePicker: React.FC<ICustomPeoplePickerProps> = ({
  onChange,
  tempselectedItem,
  onSubmit,
  placeholder = "User",
  personSelectionLimit,
  selectedItem,
  size,
  withLabel,
  labelText,
  disabled,
  isValid = true,
  errorMsg,
  minWidth,
  noErrorMsg = false,
  readOnly,
  noBorderInput,
  maxWidth,
  noRemoveBtn,
  minHeight,
  maxHeight,
  mandatory,
  multiUsers = false,
  popupControl = false,
  hasSubmitBtn = false,
  sectionType,
}) => {
  const mainContext: any = useSelector(
    (state: any) => state.MainSPContext.value
  );
  const webUrl: any = useSelector((state: any) => state?.MainSPContext?.webUrl);

  const handleChange = (items: any[]): void => {
    const obj = items?.map((item: any) => {
      return {
        id: item.id,
        email: item?.secondaryText,
        name: item?.text,
      };
    });
    onChange?.(obj);
  };
  const selectedUserItem = (() => {
    if (!multiUsers) {
      return personSelectionLimit > 1 ? [] : [selectedItem];
    } else {
      if (personSelectionLimit >= 1) {
        return (
          selectedItem?.map(
            (item: any) => item.secondaryText || item.Email || item.email
          ) || []
        );
      }
    }
    return [selectedItem];
  })();

  const multiPeoplePickerStyle = {
    root: {
      zIndex: "2",
      minWidth: minWidth ? minWidth : "100%",
      maxWidth: maxWidth ? maxWidth : "100%",
      background: "rgba(218, 218, 218, 0.29)",
      pointerEvents: popupControl && multiUsers ? "none" : "auto",
      ".ms-BasePicker-text": {
        alignItems: "start",
        // maxHeight: "50px",
        height: size === "SM" ? "34px" : size === "MD" ? "32px" : "43px",
        borderRadius: "2px",
        overflowX: "hidden",
        padding: "0px 4px",
        minHeight: minHeight ? minHeight : "34px",
        maxHeight: maxHeight ? maxHeight : "50px",
        minWidth: minWidth ? minWidth : "290px",
        maxWidth: maxWidth ? maxWidth : "100%",
        background: "#fff",
        border: "1px solid var(--input-fields-border-color)",
        outline: "none",
        // fontFamily: "interMedium",
      },
      ".ms-Persona-details": {
        display: multiUsers ? "none" : "block",
      },
      ".ms-BasePicker-input": {
        alignSelf: "start",
        height: size === "SM" ? "30px" : size === "MD" ? "30px" : "32px",
        // fontFamily: "interMedium",
        display:
          popupControl && selectedUserItem?.length !== 0 ? "none" : "block",
      },
      //   ".ms-BasePicker-input::placeholder": {
      //     fontFamily: "interMedium",
      //   },
      ".ms-BasePicker-text:hover": {
        border: "1px solid #8295aa",
      },
      ".ms-BasePicker-text:focus-within": {
        border: "1.5px solid #8295aa",
      },
      ".ms-BasePicker-text:after": {
        display: "none",
      },
      ".ms-TooltipHost": {
        // fontFamily: "interMedium",
        fontSize: "13px",
        color: "#414141",
      },
      ".ms-PickerPersona-container": {
        background: "#e8e8e8",
        maxWidth: "auto",
        minWidth: "auto",
      },
      ".ms-PickerItem-removeButton": {
        display:
          noRemoveBtn || (popupControl && selectedUserItem?.length !== 0)
            ? "none"
            : "block",
      },
      ".ms-PickerItem-removeButton:focus": {
        background: "#555",
      },
      ".ms-BasePicker-itemsWrapper": {
        // height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "2px",
        overflow: "auto",
        padding: "5px",
      },
    },
  };

  return (
    <div
      className={`customPeoplePickerWrapper ${sectionType} ${
        isValid ? "" : "sectionError"
      }`}
    >
      <PeoplePicker
        context={mainContext ? mainContext : null}
        webAbsoluteUrl={webUrl ? webUrl : null}
        personSelectionLimit={personSelectionLimit}
        showtooltip={false}
        ensureUser={true}
        placeholder={placeholder}
        onChange={handleChange}
        styles={multiPeoplePickerStyle}
        principalTypes={[PrincipalType.User]}
        defaultSelectedUsers={selectedUserItem}
        resolveDelay={1000}
        disabled={readOnly}
      />
    </div>
  );
};

export default CustomPeoplePicker;
