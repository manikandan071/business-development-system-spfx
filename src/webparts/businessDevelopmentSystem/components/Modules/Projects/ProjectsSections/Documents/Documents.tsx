/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import styles from "./Documents.module.scss";
import DefaultButton from "../../../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import CustomSearchInput from "../../../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import CustomDataTable from "../../../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnActionsRender,
  OnDateRender,
  OnTextRender,
  OnUsersRender,
} from "../../../../../../../Utils/dataTable";
import { useEffect, useState } from "react";
import { deepClone } from "../../../../../../../Utils/deepClone";
import {
  setPopupResponseFun,
  togglePopupVisibility,
} from "../../../../../../../Utils/togglePopup";
import Popup from "../../../../Common/Popup/Popup";
import PopupSectionHeader from "../../../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import { onChangeFunction } from "../../../../../../../Utils/onChange";
import { validateForm } from "../../../../../../../Utils/validations";
import CustomFileUpload from "../../../../Common/CustomInputFields/CustomFileUpload/CustomFileUpload";
import ManageAccess from "../../../../Common/ManageAccess/ManageAccess";
import { DocumentsFormDetails } from "../../../../../../../Config/initialStates";
import CustomDropDown from "../../../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import { DocumentsCategories } from "../../../../../../../Config/dropDownOptions";
import {
  ICountriesDetails,
  IDocumentsDetails,
  IProjectDetails,
} from "../../../../../../../Interface/ModulesInterface";
import {
  fetchDocumentsData,
  getLibraryAttachments,
  submitDocumentForm,
  updateDocumentForm,
} from "../../../../../../../Services/Document/DocumentService";
import { FileItem } from "../../../../../../../Interface/CommonInterface";
import { submitManageAccessForm } from "../../../../../../../Services/CommonService/CommonService";
import { SPLists } from "../../../../../../../Config/config";
import AppLoader from "../../../../Common/AppLoader/AppLoader";
import CustomInput from "../../../../Common/CustomInputFields/CustomInput/CustomInput";
import CustomDatePicker from "../../../../Common/CustomInputFields/CustomDatePicker/CustomDatePicket";

interface IDocumentsProps {
  countryDetails: ICountriesDetails;
  projectDetails: IProjectDetails;
}

const Documents: React.FC<IDocumentsProps> = ({
  countryDetails,
  projectDetails,
}) => {
  console.log("Project Details:",projectDetails)
  const cloneFormDetails = deepClone(DocumentsFormDetails);
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };
  const initialPopupController = [
    {
      open: false,
      popupTitle: "",
      popupWidth: "50%",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    },
    {
      open: false,
      popupTitle: "",
      popupWidth: "50%",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    },
  ];
  const initialPopupResponse = [
    {
      Loading: false,
      Title: "",
      Message: "",
    },
    {
      Loading: false,
      Title: "",
      Message: "",
    },
  ];
  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [popupResponse, setPopupResponse] = useState(initialPopupResponse);
  const [masterDocumentsData, setMasterDocumentsData] = useState<
    IDocumentsDetails[]
  >([]);
  const [documentsData, setDocumentsData] = useState<IDocumentsDetails[]>([]);
  const [isUpdateDetails, setIsUpdateDetails] = useState<any>({
    Id: null,
    Type: "",
  });
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [selectedDocument, setSelectedDocument] = useState<IDocumentsDetails>({
    Id: 0,
    Category: "",
    ContractType: "",
    Party: "",
    Date: "",
    ManageAccess: [],
    ProjectOfId: 0,
    ManageAccessFormFormat: [],
  });
   console.log("Form Details...",formDetails)
  const openDocumentAction = async (documentDetails: IDocumentsDetails) => {
    console.log("Documents Details",documentDetails);
    
    const tempAttachments: FileItem[] = await getLibraryAttachments(
      countryDetails?.countryName,
      projectDetails?.ProjectName,
      documentDetails?.Category
    );
    setFormDetails({
      Category: {
        value: documentDetails?.Category,
        isValid: true,
        isMandatory: true,
      },
      ContractType: {
        value: documentDetails?.ContractType,
        isValid: true,
        isMandatory: true,
      },
      Party: {
        value: documentDetails?.Party,
        isValid: true,
        isMandatory: true,
      },
      Date: {
        value: documentDetails?.Date,
        isValid: true,
        isMandatory: true,
      },
      Attachments: {
        value: [...tempAttachments],
        isValid: true,
        isMandatory: true,
      },
      AttachmentsDeletion: {
        value: [],
        isValid: true,
        isMandatory: false,
      },
      ManageAccess: {
        value: documentDetails?.ManageAccessFormFormat,
        isValid: true,
      },
       BreakPermission: {
          value: documentDetails?.BreakPermission,
          isValid: true,
          isMandatory: false,
       },
    });
    setIsUpdateDetails({
      Id: documentDetails?.Id,
      Type: "Update",
    });
    togglePopupVisibility(setPopupController, 0, "open", `Update Document`);
  };
  const documentManageAccessAction = (document: any) => {
    setSelectedDocument(document);
    setFormDetails({
      ManageAccess: {
        value: document?.ManageAccessFormFormat,
        isValid: true,
        isMandatory: true,
      },
      BreakPermission:{
       value: document?.BreakPermission,
       isValid:true
      }
    });
    togglePopupVisibility(
      setPopupController,
      1,
      "open",
      `Document Manage Access`
    );
  };

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomDropDown
            options={DocumentsCategories}
            value={formDetails?.Category?.value}
            placeholder="Select contract category"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Category", value, setFormDetails);
            }}
            isValid={formDetails?.Category?.isValid}
            withLabel={true}
            mandatory={formDetails?.Category?.isMandatory}
            labelText="Contract category"
          />
          <CustomDropDown
            options={DocumentsCategories}
            value={formDetails?.ContractType?.value}
            placeholder="Select contract type"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("ContractType", value, setFormDetails);
            }}
            isValid={formDetails?.ContractType?.isValid}
            withLabel={true}
            mandatory={formDetails?.ContractType?.isMandatory}
            labelText="Contract type"
          />
          <CustomInput
            value={formDetails?.Party?.value}
            type="text"
            placeholder="Enter party"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Party", value, setFormDetails);
            }}
            isValid={formDetails?.Party?.isValid}
            withLabel={true}
            mandatory={formDetails?.Party?.isMandatory}
            labelText="Party"
          />
          <CustomDatePicker
            value={formDetails?.Date?.value}
            placeholder="Select date"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Date", value, setFormDetails);
            }}
            isValid={formDetails?.Date?.isValid}
            withLabel={true}
            mandatory={formDetails?.Date?.isMandatory}
            labelText="Date"
            disabled={false}
            readOnly={false}
          />
        </div>
        <PopupSectionHeader Title="Attachments" />
        <CustomFileUpload
          value={formDetails?.Attachments?.value}
          DeletedValue={formDetails?.AttachmentsDeletion?.value}
          categoryValue={formDetails?.Category?.value}
          onChange={(value: any[], isDeletion: boolean) => {
            if (isDeletion) {
              onChangeFunction("AttachmentsDeletion", value, setFormDetails);
            } else {
              onChangeFunction("Attachments", value, setFormDetails);
            }
          }}
          isValid={formDetails?.Attachments?.isValid}
        />
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess.value}
          onChange={(value: any, isBreakeCondition?: boolean) => {
                     console.log("ManageAccess value", value);
                     console.log("isBreakeCondition", isBreakeCondition);
                     if (isBreakeCondition) {
                       onChangeFunction("BreakPermission", value, setFormDetails);
                     } else {
                       onChangeFunction("ManageAccess", value, setFormDetails);
                     }
                   }}
          showList="3"
          showSectionTitle={true}
          breakCondition={formDetails?.BreakPermission?.value || false}
          ifShowManageAccess={true}
        />
      </div>,
    ],
    [
      <div key={1} style={{ width: "100%" }}>
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess?.value}
           onChange={(value: any, isBreakeCondition?: boolean) => {
                     console.log("ManageAccess value", value);
                     console.log("isBreakeCondition", isBreakeCondition);
                     if (isBreakeCondition) {
                       onChangeFunction("BreakPermission", value, setFormDetails);
                     } else {
                       onChangeFunction("ManageAccess", value, setFormDetails);
                     }
                   }}
          showList="10"
          showSectionTitle={false}
          breakCondition={formDetails?.BreakPermission?.value || false}
          ifShowManageAccess={true}
        />
      </div>,
    ],
  ];

  const handleSubmitFuction = async (): Promise<void> => {
    debugger
    const isFormValid = validateForm(formDetails, setFormDetails);
    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 0, true, "", "");
      if (isUpdateDetails?.Type === "New") {
        submitDocumentForm(
          formDetails,
          setMasterDocumentsData,
          setDocumentsData,
          countryDetails,
          projectDetails,
          setPopupResponse,
          0
        );
      } else {
        updateDocumentForm(
          formDetails,
          isUpdateDetails,
          setMasterDocumentsData,
          setDocumentsData,
          countryDetails,
          projectDetails,
          setPopupResponse,
          0
        );
      }
    }
  };

  const handleManageAccessSubmitFuction = () => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 1, true, "", "");
      submitManageAccessForm(
        formDetails,
        selectedDocument?.Id,
        SPLists.DocumentsList,
        setMasterDocumentsData,
        setDocumentsData,
        setPopupResponse,
        1,
        SPLists.Projectslist,
        projectDetails?.Id,
        SPLists.Countrieslist,
        countryDetails?.Id
      );
    }
  };

  const popupActions: any[] = [
    [
      {
        text: "Cancel",
        btnType: "closeBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          setFormDetails(deepClone(cloneFormDetails));
          handleClosePopup(0);
          setPopupResponseFun(setPopupResponse, 0, false, "", "");
        },
      },
      {
        text: isUpdateDetails?.Type === "New" ? "Submit" : "Update",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          handleSubmitFuction();
        },
      },
    ],
    [
      {
        text: "Cancel",
        btnType: "closeBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          setFormDetails(deepClone(cloneFormDetails));
          handleClosePopup(1);
        },
      },
      {
        text: "Submit",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          handleManageAccessSubmitFuction();
        },
      },
    ],
  ];

  const tableColumns = [
    [
      <DataTable
        value={documentsData}
        className="min_height_48vh"
        scrollable
        scrollHeight="48vh"
        style={{ minWidth: "48%" }}
        key={0}
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${
          documentsData?.length === 1 ? "record" : "records"
        }`}
        emptyMessage="No data found."
      >
        <Column
          field="Category"
          header="Contract category"
          style={{ width: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.Category} />}
          sortable
        />
        <Column
          field="ContractType"
          header="Contract type"
          style={{ width: "15%" }}
          body={(rowData) => <OnTextRender text={rowData?.ContractType} />}
          sortable
        />
        <Column
          field="Party"
          header="Party"
          style={{ width: "15%" }}
          body={(rowData) => <OnTextRender text={rowData?.Party} />}
          sortable
        />
        <Column
          field="Date"
          header="Date"
          style={{ width: "15%" }}
          body={(rowData) => <OnDateRender date={rowData?.Date} />}
          sortable
        />
        <Column
          field="ManageAccess"
          header="Manage access"
          style={{ width: "20%" }}
          body={(rowData) => <OnUsersRender users={rowData?.ManageAccess} />}
          sortable
        />
        <Column
          field=""
          header="Actions"
          style={{ minWidth: "15%" }}
          body={(rowData) => (
            <OnActionsRender
              editAction={openDocumentAction}
              userAccessAction={documentManageAccessAction}
              isShowLunch={false}
              rowData={rowData}
            />
          )}
        />
      </DataTable>,
    ],
  ];

  useEffect(() => {
    fetchDocumentsData(
      setMasterDocumentsData,
      setDocumentsData,
      projectDetails?.Id,
      setIsLoader
    );
  }, []);

  const searchFilterFunctionality = (value: string) => {
    const filteredOptions = masterDocumentsData.filter(
      (item) =>
        item.ContractType.toLowerCase().includes(value.toLowerCase()) ||
        item.Category.toLowerCase().includes(value.toLowerCase())
    );
    setDocumentsData(filteredOptions);
  };

  return isLoader ? (
    <AppLoader />
  ) : (
    <div className={styles.Documents_wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput searchFunction={searchFilterFunctionality} />
        <DefaultButton
          btnType="primaryBtn"
          text="Add Document"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsUpdateDetails({
              Id: null,
              Type: "New",
            });
            togglePopupVisibility(
              setPopupController,
              0,
              "open",
              `Add Document`
            );
            const newFormTemp = deepClone(cloneFormDetails);
            setFormDetails({
              ...newFormTemp,
              ManageAccess:{
                value:projectDetails?.ManageAccessFormFormat,
                isValid:true
              }
            });
          }}
        />
      </div>
      <div className={styles.Documents_main}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
      <div>
        {popupController?.map((popupData: any, index: number) => (
          <Popup
            key={index}
            isLoading={false}
            PopupType={popupData.popupType}
            onHide={() => {
              togglePopupVisibility(setPopupController, index, "close");
              setPopupResponseFun(setPopupResponse, index, false, "", "");
            }}
            popupTitle={
              popupData.popupType !== "confimation" && popupData.popupTitle
            }
            popupActions={popupActions[index]}
            visibility={popupData.open}
            content={popupInputs[index]}
            response={popupResponse[index]}
            popupWidth={popupData.popupWidth}
            defaultCloseBtn={popupData.defaultCloseBtn || false}
            confirmationTitle={
              popupData.popupType !== "custom" ? popupData.popupTitle : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Documents;
