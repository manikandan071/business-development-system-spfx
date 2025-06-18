/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { useSelector } from "react-redux";
import { memo, useState } from "react";
import CustomInputLabel from "../CustomInputLabel/CustomInputLabel";

interface ICustomPeoplePickerProps {
  selectedItem?: any;
  onChange?: (value: any[]) => void;
  placeholder?: string;
  personSelectionLimit?: number | any;
  size?: "SM" | "MD" | "XL";
  withLabel?: boolean;
  labelText?: string;
  disabled?: boolean;
  isValid?: boolean;
  minWidth?: any;
  maxWidth?: any;
  minHeight?: any;
  maxHeight?: any;
  noRemoveBtn?: boolean;
  multiUsers?: boolean;
  mandatory?: boolean;
  popupControl?: boolean;
  sectionType?: "three" | "two" | "one";
}

const CustomPeoplePicker: React.FC<ICustomPeoplePickerProps> = ({
  selectedItem,
  onChange,
  placeholder = "User",
  personSelectionLimit,
  size,
  withLabel,
  labelText,
  disabled,
  isValid = true,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  noRemoveBtn,
  multiUsers = false,
  mandatory,
  popupControl = false,
  sectionType,
}) => {
  console.log("selectedItem",selectedItem);
  const mainContext: any = useSelector(
    (state: any) => state.MainSPContext.value
  );
  const webUrl: any = useSelector((state: any) => state?.MainSPContext?.webUrl);
  const [pickerKey, setPickerKey] = useState<number>(0);
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
    const bindSelectUsers =
      selectedItem?.map(
        (item: any) => item.secondaryText || item.Email || item.email
      ) || [];

    return [bindSelectUsers];
  })();

  const multiPeoplePickerStyle = {
    root: {
      zIndex: "2",
      minWidth: minWidth ? minWidth : "100%",
      maxWidth: maxWidth ? maxWidth : "100%",
      background: "transparent",
      pointerEvents: popupControl && multiUsers ? "none" : "auto",
      selectors: {
        "input::placeholder": {
          fontWeight: "400",
          fontSize: "14px",
          color: "var(--input-placeholder-font-color)",
        },
      },
      ".ms-SelectionZone": {
        width: "100%",
      },
      ".ms-BasePicker-text": {
        alignItems: "start",
        // maxHeight: "50px",
        height: size === "SM" ? "34px" : size === "MD" ? "32px" : "43px",
        borderRadius: "2px",
        overflowX: "hidden",
        padding: "0px 4px",
        minHeight: minHeight ? minHeight : "34px",
        maxHeight: maxHeight ? maxHeight : "50px",
        // minWidth: minWidth ? minWidth : "290px",
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
      ".ms-BasePicker-text:hover": {
        border: "1px solid var(--input-fields-border-hovor-color)!important",
        background: "var(--input-fields-bg-hovor-color)!important",
      },
      ".ms-BasePicker-text:focus-within": {
        border: "1.5px solid var(--input-fields-border-hovor-color)!important",
        background: "var(--input-fields-bg-hovor-color)!important",
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
  React.useEffect(()=>{
    if(selectedItem?.length === 0){
      setPickerKey(prev => prev+1)
    }    
  },[selectedItem])

  return (
    <div
      className={`customPeoplePickerWrapper ${sectionType} ${
        isValid ? "" : "sectionError"
      }`}
    >
      {withLabel && (
        <CustomInputLabel
          labelText={labelText ?? ""}
          mandatory={mandatory ? true : false}
        />
      )}
      <PeoplePicker
      key={pickerKey}
        context={mainContext}
        webAbsoluteUrl={webUrl}
        personSelectionLimit={personSelectionLimit}
        showtooltip={false}
        ensureUser={true}
        placeholder={placeholder}
        onChange={handleChange}
        styles={multiPeoplePickerStyle}
        principalTypes={[PrincipalType.User]}
        // defaultSelectedUsers={selectedUserItem ? selectedUserItem : []}
        defaultSelectedUsers={
          selectedItem.length !== 0 ? selectedItem?.map(
            (u: any) => u.secondaryText || u.Email || u.email
          ) : []
        }
        resolveDelay={1000}
        disabled={disabled}
      />
    </div>
  );
};

export default memo(CustomPeoplePicker);
