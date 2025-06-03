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
  OnTextRender,
} from "../../../../../../../Utils/dataTable";
import { useEffect, useState } from "react";
import { deepClone } from "../../../../../../../Utils/deepClone";
import { togglePopupVisibility } from "../../../../../../../Utils/togglePopup";
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
  IcountriesType,
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

interface IDocumentsProps {
  countryDetails: IcountriesType;
  projectDetails: IProjectDetails;
}

const Documents: React.FC<IDocumentsProps> = ({
  countryDetails,
  projectDetails,
}) => {
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
  ];
  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [masterDocumentsData, setMasterDocumentsData] = useState<
    IDocumentsDetails[]
  >([]);
  const [documentsData, setDocumentsData] = useState<IDocumentsDetails[]>([]);
  const [isUpdateDetails, setIsUpdateDetails] = useState<any>({
    Id: null,
    Type: "New",
  });
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));

  console.log("formDetails", formDetails, masterDocumentsData);

  const openDocumentAction = async (project: any) => {
    console.log("project", project);
    const tempAttachments: FileItem[] = await getLibraryAttachments(
      countryDetails?.countryName,
      projectDetails?.ProjectName,
      project?.Category
    );
    console.log("tempAttachments", tempAttachments);
    setFormDetails({
      Category: {
        value: project?.Category,
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
        value: project?.ManageAccessFormFormat,
        isValid: true,
      },
    });
    setIsUpdateDetails({
      Id: project?.Id,
      Type: "Update",
    });
    togglePopupVisibility(setPopupController, 0, "open", `Update Document`);
  };
  const documentManageAccessAction = (project: any) => {
    console.log("project", project);
  };

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div>
          <CustomDropDown
            options={DocumentsCategories}
            value={formDetails?.Category?.value}
            placeholder="Select category"
            sectionType="three"
            onChange={(value: string) => {
              onChangeFunction("Category", value, setFormDetails);
            }}
            isValid={formDetails?.Category?.isValid}
            withLabel={true}
            mandatory={formDetails?.Category?.isMandatory}
            labelText="Category"
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
          ManageAccess={formDetails?.ManageAccess?.value}
          onChange={(value: any) => {
            console.log("value", value);
            onChangeFunction("ManageAccess", value, setFormDetails);
          }}
          showList="3"
          showSectionTitle={true}
        />
      </div>,
    ],
  ];

  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    console.log("isFormValid", isFormValid);
    if (isFormValid) {
      console.log("Form is valid");
      isUpdateDetails?.Type === "New"
        ? submitDocumentForm(
            formDetails,
            setMasterDocumentsData,
            setDocumentsData,
            countryDetails,
            projectDetails,
            setPopupController,
            0
          )
        : updateDocumentForm(
            formDetails,
            isUpdateDetails,
            setMasterDocumentsData,
            setDocumentsData,
            countryDetails,
            projectDetails,
            setPopupController,
            0
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
        },
      },
      {
        text: "Submit",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          handleSubmitFuction();
        },
      },
    ],
  ];

  const tableColumns = [
    [
      <DataTable
        value={documentsData}
        scrollable
        scrollHeight="60vh"
        style={{ minWidth: "100%" }}
        key={0}
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
      >
        <Column
          field="Category"
          header="Document Category"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.Category} />}
          sortable
        />
        <Column
          field="ManageAccess"
          header="Manage Access"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => (
            <OnTextRender text={rowData?.ManageAccess?.length} />
          )}
          sortable
        />
        <Column
          field=""
          header="Actions"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnActionsRender
              openProjectAction={openDocumentAction}
              userAccessAction={documentManageAccessAction}
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
      projectDetails?.Id
    );
  }, []);

  return (
    <div className={styles.Documents_wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput />
        <DefaultButton
          btnType="primaryBtn"
          text="Add new documents"
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
              `Add New Document`
            );
            setFormDetails(deepClone(cloneFormDetails));
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
            onHide={() =>
              togglePopupVisibility(setPopupController, index, "close")
            }
            popupTitle={
              popupData.popupType !== "confimation" && popupData.popupTitle
            }
            popupActions={popupActions[index]}
            visibility={popupData.open}
            content={popupInputs[index]}
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
