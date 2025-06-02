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
  addCountriesList,
  filterCountryUnselected,
  getCountriesList,
  submitManageAccessForm,
} from "../../../../../Services/Countries/CountriesServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OnActionsRender, OnCountryRender, OnCountryStatusRender, OnManagerRender, OnProjectCountRender } from "../../../../../Utils/dataTable";
import CustomDataTable from "../../Common/DataTable/DataTable";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import CustomSearchInput from "../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import { togglePopupVisibility } from "../../../../../Utils/togglePopup";
import { countryFormDetails } from "../../../../../Config/initialStates";
import { deepClone } from "../../../../../Utils/deepClone";
import Popup from "../../Common/Popup/Popup";
import PopupSectionHeader from "../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import { onChangeFunction } from "../../../../../Utils/onChange";
import CustomAutoSelect from "../../Common/CustomInputFields/CustomAutoSelect/CustomAutoSelect";
// import CustomDatePicker from "../../Common/CustomInputFields/CustomDatePicker/CustomDatePicket";
import CustomDropDown from "../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import CustomInput from "../../Common/CustomInputFields/CustomInput/CustomInput";
import CustomPeoplePicker from "../../Common/CustomInputFields/CustomPeoplePicker/CustomPeoplePicker";
import ManageAccess from "../../Common/ManageAccess/ManageAccess";
import { validateForm } from "../../../../../Utils/validations";
import { useDispatch } from "react-redux";
import { IallCountriesType, IcountriesType } from "../../../../../Interface/ModulesInterface";

// import Profiles from "../../Common/Profile/Profiles";
// import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";

const Countries: React.FC = () => {
  const dispatch=useDispatch();
  const cloneFormDetails = deepClone(countryFormDetails);
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };
  const initialPopupController = [
    {
      open: false,
      popupTitle: "",
      popupWidth: "900px",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    },
    {
      open: false,
      popupTitle: "",
      popupWidth: "900px",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    },
  ];
  const [countries, setCountries] = useState<IcountriesType[]>([]);
  const [allCountries, setAllCountries] = useState<IallCountriesType[]>([]);
  const [selectedCountry,setSelectedCountry]=useState({
    ID:0,
    countryName:"",
    ISOCode:"",
    Manager:[],
    Languages:"",
    Region:"",
    Currency:"",
    TimeZone:"",
    Status:"",
    Notes:""
  });

  const [masterCountryData, setMasterCountryData] = useState<IcountriesType[]>();
  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [languagesOptions, setLanguagesOptions] = useState<any[]>([]);
 console.log("Master",masterCountryData)
 console.log("Country",countries)


  console.log("formDetails",formDetails);
  
  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="BASIC DETAILS" />
        <div className="section-wrapper">
          <CustomAutoSelect
            value={formDetails?.CountryName?.value}
            options={allCountries.map((country:any)=>({
              Text:country.CountryName,
              ...country
            }))}
            onChange={async (
              option: {
                CountryName: string;
                CountryISOCode: string;
                Languages: any;
                Region: string;
                Currency: string;
                TimeZone: string;
                languageOptions:any;
              } | null
            ) => {
              console.log("Optionsss",option)
              onChangeFunction("CountryName", option?.CountryName, setFormDetails);
              setLanguagesOptions(option?.languageOptions)
              onChangeFunction(
                "CountryISOCode",
                option?.CountryISOCode,
                setFormDetails
              );
              onChangeFunction("Region", option?.Region, setFormDetails);
              onChangeFunction("Currency", option?.Currency, setFormDetails);
              onChangeFunction("TimeZone", option?.TimeZone, setFormDetails);


            }}
            placeholder="Enter Country Name"
            sectionType="two"
            isValid={formDetails?.CountryName?.isValid}
            withLabel={true}
            mandatory={formDetails?.CountryName?.isMandatory}
            labelText="Country Name"
          />
          <CustomInput
            value={formDetails?.CountryISOCode?.value}
            type="text"
            placeholder="Enter Country ISO Code"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("CountryISOCode", value, setFormDetails);
            }}
            isValid={formDetails?.CountryISOCode?.isValid}
            withLabel={true}
            mandatory={formDetails?.CountryISOCode?.isMandatory}
            labelText="Country ISO Code"
            readOnly={true}
            disabled={true}
          />
          <CustomDropDown
            options={languagesOptions}
            value={formDetails?.Languages?.value}
            placeholder="Select Languages"
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
            placeholder="Enter Region"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Region", value, setFormDetails);
            }}
            isValid={formDetails?.Region?.isValid}
            withLabel={true}
            mandatory={formDetails?.Region?.isMandatory}
            labelText="Region"
            disabled={true}
          />
          <CustomInput
            value={formDetails?.Currency?.value}
            placeholder="Enter Currency"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Currency", value, setFormDetails);
            }}
            isValid={formDetails?.Currency?.isValid}
            withLabel={true}
            mandatory={formDetails?.Currency?.isMandatory}
            labelText="Currency"
            disabled={true}
            readOnly={true}
          />
          <CustomInput
            value={formDetails?.TimeZone?.value}
            placeholder="Enter TimeZone"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("TimeZone", value, setFormDetails);
            }}
            isValid={formDetails?.TimeZone?.isValid}
            withLabel={true}
            mandatory={formDetails?.TimeZone?.isMandatory}
            labelText="TimeZone"
            disabled={true}
            readOnly={true}
          />
        </div>
        <div>
          <PopupSectionHeader Title="PEOPLE & OTHERS" />
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
          </div>
          <div>
            <PopupSectionHeader Title="NOTES" />
            <CustomInput
              value={formDetails?.Notes?.value}
              type="text"
              placeholder="Enter Notes"
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
  const isFormValid = validateForm(
    formDetails,
    setFormDetails,
  );
  console.log("isFormValid", isFormValid);

  if (isFormValid) {
    console.log("Form is valid");
    // console.log("Form Details", formDetails);
    await addCountriesList(formDetails, setCountries);
    togglePopupVisibility(setPopupController, 0, "close");
  }
};
const handleManageAccessSubmitFuction = () => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    console.log("isFormValid", isFormValid);
    console.log("Countries",countries)
    if (isFormValid) {
      console.log("Form is valid");
      submitManageAccessForm(
        formDetails,
        selectedCountry?.ID,
        setMasterCountryData,
        setCountries,
        setPopupController,
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
     [          {
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
        ]
  ];
const countryManageAccessAction = (country: any) => {
  debugger;
    setSelectedCountry(country);
    console.log("country", country);
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
  const tableColumns = [
    [
      <DataTable
        value={countries}
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
          field="countryName"
          header="Country name"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnCountryRender rowData={rowData} />
          )}
          sortable
        />
        <Column
          field=""
          header="No of projects"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnProjectCountRender rowData={rowData}/>
          )}
        />
        <Column
          field=""
          header="Manager Access"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnManagerRender rowData={rowData?.Manager} />
          )}
        />
        <Column
          field=""
          header="Status"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
           <OnCountryStatusRender rowData={rowData}/>
          )}
        />{" "}
        <Column field="" header="Action" style={{ minWidth: "20%" }} 
        body={(rowData) => (
           <OnActionsRender 
           openProjectAction={()=>console.log("Working Properly")}
            userAccessAction={countryManageAccessAction}
             rowData={rowData}
            />
          )}
        />
      </DataTable>,
    ],
  ];
  useEffect(() => {
    getCountriesList(setCountries, setAllCountries,setMasterCountryData,dispatch);
  }, []);
  // console.log("Countries", countries);
  return (
    <div className={styles.countries_container}>
      <div className="justify-space-between margin-right-20">
        <ModuleHeader title="Countries" />
        <div className="gap-10">
          <CustomSearchInput />
          <DefaultButton
            btnType="primaryBtn"
            text="Add new country"
            startIcon={<AddIcon />}
            onClick={() => {
               filterCountryUnselected(countries,allCountries,setAllCountries)
              togglePopupVisibility(
                setPopupController,
                0,
                "open",
                `Add New Country`
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
      <div className={styles.countries_Wrapper}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default Countries;
