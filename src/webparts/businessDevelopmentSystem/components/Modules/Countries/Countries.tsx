/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
// import LaunchIcon from "@mui/icons-material/Launch";
import * as React from "react";
import styles from "./Countries.module.scss";
import { useState, useEffect } from "react";
import {
  filterCountryUnselected,
  getCountriesList,
  submitCountryForm,
  updateCountryForm,
} from "../../../../../Services/Countries/CountriesServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnActionsRender,
  OnCountryRender,
  // OnCountryStatusRender,
  OnProjectCountRender,
  OnTextRender,
  OnUsersRender,
} from "../../../../../Utils/dataTable";
import CustomDataTable from "../../Common/DataTable/DataTable";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import CustomSearchInput from "../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import {
  setPopupResponseFun,
  togglePopupVisibility,
} from "../../../../../Utils/togglePopup";
import { countryFormDetails } from "../../../../../Config/initialStates";
import { deepClone } from "../../../../../Utils/deepClone";
import Popup from "../../Common/Popup/Popup";
import PopupSectionHeader from "../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import { onChangeFunction } from "../../../../../Utils/onChange";
import CustomAutoSelect from "../../Common/CustomInputFields/CustomAutoSelect/CustomAutoSelect";
// import CustomDatePicker from "../../Common/CustomInputFields/CustomDatePicker/CustomDatePicket";
import CustomDropDown from "../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import CustomInput from "../../Common/CustomInputFields/CustomInput/CustomInput";
// import CustomPeoplePicker from "../../Common/CustomInputFields/CustomPeoplePicker/CustomPeoplePicker";
import ManageAccess from "../../Common/ManageAccess/ManageAccess";
import { validateForm } from "../../../../../Utils/validations";
import { useDispatch } from "react-redux";
import {
  IAllCountriesJson,
  ICountriesDetails,
} from "../../../../../Interface/ModulesInterface";
import { SPLists } from "../../../../../Config/config";
import { submitManageAccessForm } from "../../../../../Services/CommonService/CommonService";
import AppLoader from "../../Common/AppLoader/AppLoader";

// import Profiles from "../../Common/Profile/Profiles";
// import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";

interface ICountriesProps {
  onSelectCountry: any;
}

const Countries: React.FC<ICountriesProps> = ({ onSelectCountry }) => {
  const dispatch = useDispatch();
  const cloneFormDetails = deepClone(countryFormDetails);
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
  const [masterCountriesData, setMasterCountriesData] = useState<
    ICountriesDetails[]
  >([]);
  const [countriesData, setCountriesData] = useState<ICountriesDetails[]>([]);
  const [allCountries, setAllCountries] = useState<IAllCountriesJson[]>([]);
  const [selectedCountry, setSelectedCountry] = useState({
    ID: 0,
    countryName: "",
    ISOCode: "",
    Manager: [],
    Languages: "",
    Region: "",
    Currency: "",
    TimeZone: "",
    Status: "",
    Notes: "",
  });

  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [popupResponse, setPopupResponse] = useState(initialPopupResponse);
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [isUpdateDetails, setIsUpdateDetails] = useState<any>({
    Id: null,
    Type: "New",
  });
  const [languagesOptions, setLanguagesOptions] = useState<any[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(true);

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomAutoSelect
            value={formDetails?.CountryName?.value}
            options={allCountries.map((country: any) => ({
              Text: country.CountryName,
              ...country,
            }))}
            onChange={async (
              option: {
                CountryName: string;
                CountryISOCode: string;
                Languages: any;
                Region: string;
                Currency: string;
                TimeZone: string;
                languageOptions: any;
              } | null
            ) => {
              onChangeFunction(
                "CountryName",
                option?.CountryName,
                setFormDetails
              );
              setLanguagesOptions(option?.languageOptions);
              onChangeFunction(
                "CountryISOCode",
                option?.CountryISOCode,
                setFormDetails
              );
              onChangeFunction("Region", option?.Region, setFormDetails);
              onChangeFunction("Currency", option?.Currency, setFormDetails);
              onChangeFunction("TimeZone", option?.TimeZone, setFormDetails);
            }}
            placeholder="Enter country name"
            sectionType="two"
            isValid={formDetails?.CountryName?.isValid}
            withLabel={true}
            mandatory={formDetails?.CountryName?.isMandatory}
            labelText="Country name"
          />
          <CustomInput
            value={formDetails?.CountryISOCode?.value}
            type="text"
            placeholder="Enter country ISO code"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("CountryISOCode", value, setFormDetails);
            }}
            isValid={formDetails?.CountryISOCode?.isValid}
            withLabel={true}
            mandatory={formDetails?.CountryISOCode?.isMandatory}
            labelText="Country ISO code"
            readOnly={true}
            disabled={false}
          />
          <CustomDropDown
            options={languagesOptions}
            value={formDetails?.Languages?.value}
            placeholder="Select languages"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Languages", value, setFormDetails);
            }}
            isValid={formDetails?.Languages?.isValid}
            withLabel={true}
            mandatory={formDetails?.Languages?.isMandatory}
            labelText="Language"
            disabled={false}
            readOnly={false}
          />
          <CustomInput
            value={formDetails?.Region?.value}
            type="text"
            placeholder="Enter region"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Region", value, setFormDetails);
            }}
            isValid={formDetails?.Region?.isValid}
            withLabel={true}
            mandatory={formDetails?.Region?.isMandatory}
            labelText="Region"
            disabled={false}
            readOnly={false}
          />
          <CustomInput
            value={formDetails?.Currency?.value}
            placeholder="Enter currency"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Currency", value, setFormDetails);
            }}
            isValid={formDetails?.Currency?.isValid}
            withLabel={true}
            mandatory={formDetails?.Currency?.isMandatory}
            labelText="Currency"
            disabled={false}
            readOnly={false}
          />
          <CustomInput
            value={formDetails?.TimeZone?.value}
            placeholder="Enter time zone"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("TimeZone", value, setFormDetails);
            }}
            isValid={formDetails?.TimeZone?.isValid}
            withLabel={true}
            mandatory={formDetails?.TimeZone?.isMandatory}
            labelText="Time zone"
            disabled={false}
            readOnly={false}
          />
        </div>
        <div>
          {/* <PopupSectionHeader Title="PEOPLE & OTHERS" />
          <div className="section-wrapper">
            <CustomPeoplePicker
              selectedItem={formDetails?.selectedPeople?.value}
              sectionType="two"
              personSelectionLimit={1}
              minHeight="38px"
              maxHeight="38px"
              onChange={(value: any[]) => {
                onChangeFunction("selectedPeople", value, setFormDetails);
              }}
              isValid={formDetails?.selectedPeople?.isValid}
              withLabel={true}
              mandatory={formDetails?.selectedPeople?.isMandatory}
              labelText="Manager"
            />
            <CustomDropDown
              options={["Active", "inActive"]}
              value={formDetails?.Status?.value}
              placeholder="Select Status"
              sectionType="two"
              onChange={(value: string) => {
                onChangeFunction("Status", value, setFormDetails);
              }}
              isValid={formDetails?.Status?.isValid}
              withLabel={true}
              mandatory={formDetails?.Status?.isMandatory}
              labelText="Status"
              disabled={true}
            />
          </div> */}
          <div>
            <PopupSectionHeader Title="Notes" />
            <CustomInput
              value={formDetails?.Notes?.value}
              type="text"
              placeholder="Enter notes"
              rows={3}
              sectionType="one"
              onChange={(value: string) => {
                onChangeFunction("Notes", value, setFormDetails);
              }}
              isValid={formDetails?.Notes?.isValid}
              withLabel={true}
              mandatory={formDetails?.Notes?.isMandatory}
              disabled={false}
            />
          </div>
        </div>
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess?.value}
          onChange={(value: any) => {
            // console.log("value", value);
            onChangeFunction("ManageAccess", value, setFormDetails);
          }}
          showList="3"
          showSectionTitle={true}
        />
      </div>,
    ],
    [
      <div key={1} style={{ width: "100%" }}>
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess?.value}
          onChange={(value: any) => {
            // console.log("value", value);
            onChangeFunction("ManageAccess", value, setFormDetails);
          }}
          showList="10"
          showSectionTitle={false}
        />
      </div>,
    ],
  ];
  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);

    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 0, true, "", "");
      if (isUpdateDetails?.Type === "New") {
        await submitCountryForm(
          formDetails,
          setMasterCountriesData,
          setCountriesData,
          setPopupResponse,
          0,
          dispatch
        );
      } else {
        await updateCountryForm(
          formDetails,
          isUpdateDetails,
          setMasterCountriesData,
          setCountriesData,
          setPopupResponse,
          0,
          dispatch
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
        selectedCountry?.ID,
        SPLists.Countrieslist,
        setMasterCountriesData,
        setCountriesData,
        setPopupResponse,
        1
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
  const countryManageAccessAction = (country: any) => {
    setSelectedCountry(country);
    setFormDetails({
      ManageAccess: {
        value: country?.ManageAccessFormFormat,
        isValid: true,
        isMandatory: true,
      },
    });
    togglePopupVisibility(
      setPopupController,
      1,
      "open",
      `Country Manage Access`
    );
  };

  const projectCountClick = (countryDetails: any) => {
    onSelectCountry(countryDetails);
  };

  const setEditForm = (countryDetails: ICountriesDetails) => {
    filterCountryUnselected(
      countriesData,
      allCountries,
      setAllCountries,
      countryDetails
    );
    setFormDetails({
      CountryName: {
        value: countryDetails?.countryName,
        isValid: true,
        isMandatory: true,
      },
      CountryISOCode: {
        value: countryDetails?.ISOCode,
        isValid: true,
        isMandatory: true,
      },
      Languages: {
        value: countryDetails?.Languages,
        isValid: true,
        isMandatory: true,
      },
      Region: {
        value: countryDetails?.Region,
        isValid: true,
        isMandatory: true,
      },
      Currency: {
        value: countryDetails?.Currency,
        isValid: true,
        isMandatory: true,
      },
      TimeZone: {
        value: countryDetails?.TimeZone,
        isValid: true,
        isMandatory: true,
      },
      Status: {
        value: "Active",
        isValid: true,
        isMandatory: false,
      },
      Notes: {
        value: countryDetails?.Notes,
        isValid: true,
        isMandatory: false,
      },
      selectedPeople: {
        value: countryDetails?.Manager,
        isValid: true,
        isMandatory: false,
      },
      ManageAccess: {
        value: countryDetails?.ManageAccessFormFormat,
        isValid: true,
      },
    });
    setIsUpdateDetails({
      Id: countryDetails?.ID,
      Type: "Update",
    });
    togglePopupVisibility(setPopupController, 0, "open", `Update Country`);
  };
  const tableColumns = [
    [
      <DataTable
        value={countriesData}
        className="min_height_60vh"
        scrollable
        scrollHeight="60vh"
        style={{ minWidth: "100%" }}
        key={0}
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${
          countriesData?.length === 1 ? "record" : "records"
        }`}
        emptyMessage="No data found."
      >
        <Column
          field="countryName"
          header="Country name"
          style={{ minWidth: "20%" }}
          body={(rowData) => <OnCountryRender rowData={rowData} />}
          sortable
        />
        <Column
          field="ISOCode"
          header="ISO code"
          style={{ minWidth: "10%" }}
          body={(rowData) => <OnTextRender text={rowData?.ISOCode} />}
          sortable
        />
        <Column
          field="Region"
          header="Region"
          style={{ minWidth: "10%" }}
          body={(rowData) => <OnTextRender text={rowData?.Region} />}
          sortable
        />
        <Column
          field=""
          header="Project counts"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnProjectCountRender
              rowData={rowData}
              onClick={projectCountClick}
            />
          )}
        />
        <Column
          field=""
          header="Manage access"
          style={{ minWidth: "20%" }}
          body={(rowData) => <OnUsersRender users={rowData?.ManageAccess} />}
        />
        {/* <Column
          field="Status"
          header="Status"
          style={{ minWidth: "10%" }}
          body={(rowData) => <OnCountryStatusRender status={rowData?.Status} />}
        /> */}
        <Column
          field=""
          header="Action"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnActionsRender
              editAction={setEditForm}
              launchAction={onSelectCountry}
              userAccessAction={countryManageAccessAction}
              rowData={rowData}
            />
          )}
        />
      </DataTable>,
    ],
  ];
  useEffect(() => {
    getCountriesList(
      setAllCountries,
      setMasterCountriesData,
      setCountriesData,
      setIsLoader,
      dispatch
    );
  }, []);

  const searchFilterFunctionality = (value: string) => {
    const filteredOptions = masterCountriesData.filter(
      (item) =>
        item.countryName.toLowerCase().includes(value.toLowerCase()) ||
        item.Region.toLowerCase().includes(value.toLowerCase()) ||
        item.ISOCode.toLowerCase().includes(value.toLowerCase())
    );
    setCountriesData(filteredOptions);
  };
  return isLoader ? (
    <AppLoader />
  ) : (
    <div className={styles.countries_container}>
      <div className="justify-space-between margin-right-20">
        <ModuleHeader title="Countries" />
        <div className="gap-10">
          <CustomSearchInput searchFunction={searchFilterFunctionality} />
          <DefaultButton
            btnType="primaryBtn"
            text="Add Country"
            startIcon={<AddIcon />}
            onClick={() => {
              setIsUpdateDetails({
                Id: null,
                Type: "New",
              });
              filterCountryUnselected(
                countriesData,
                allCountries,
                setAllCountries,
                {}
              );
              togglePopupVisibility(
                setPopupController,
                0,
                "open",
                `Add Country`
              );
              setFormDetails(deepClone(cloneFormDetails));
            }}
          />
        </div>
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
      <div className={styles.countries_Wrapper}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default Countries;
