/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpServices from "../SPServices/SpServices";
import { SPLists } from "../../Config/config";
import {
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  manageAccessUsersSerialized,
  peopleHandler,
} from "../CommonService/CommonService";
import { togglePopupVisibility } from "../../Utils/togglePopup";
import { setCountriesData } from "../../Redux/Features/CountryContextSlice";

export const getCountriesList = async (
  setCountries: any,
  setAllCountries: any,
  setMasterProjectData: any,
  dispatch: any
) => {
  try {
    const customCountries = [
      {
        CountryName: "England",
        CountryISOCode: "gb-eng",
        Languages: "",
        languageOptions: ["English"],
        Region: "Northern Europe",
        Currency: "GBP",
        TimeZone: "UTC+0 / UTC+1",
      },
      {
        CountryName: "Scotland",
        CountryISOCode: "gb-sct",
        Languages: "",
        languageOptions: ["English", "Scots", "Scottish Gaelic"],
        Region: "Northern Europe",
        Currency: "GBP",
        TimeZone: "UTC+0 / UTC+1",
      },
      {
        CountryName: "Wales",
        CountryISOCode: "gb-wls",
        Languages: "",
        languageOptions: ["English", "Welsh"],
        Region: "Northern Europe",
        Currency: "GBP",
        TimeZone: "UTC+0 / UTC+1",
      },
      {
        CountryName: "Northern Ireland",
        CountryISOCode: "gb-nir",
        Languages: "",
        languageOptions: ["English", "Irish", "Ulster Scots"],
        Region: "Northern Europe",
        Currency: "GBP",
        TimeZone: "UTC+0 / UTC+1",
      },
    ];

    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const tempCountryData: any[] = [];

    data.forEach((country: any) => {
      const currencyKeys = Object.keys(country.currencies || {});
      tempCountryData.push({
        CountryName: country.name.common,
        CountryISOCode: country.cca2,
        Languages: "",
        languageOptions: Object.keys(country?.languages || {}).map(
          (languageKey) => country?.languages[languageKey]
        ),
        Region: country.region,
        Currency: currencyKeys[0] || null,
        TimeZone: country.timezones[0],
      });
    });

    console.log(tempCountryData);
    setAllCountries([...customCountries, ...tempCountryData]);

    await SpServices.SPReadItems({
      Listname: SPLists.Countrieslist,
      Select: "*,Manager/ID,Manager/Title,Manager/EMail",
      Expand: "Manager",
    })
      .then((items) => {
        const tempsetCountries: any[] = [];

        const sortedItems = items.sort(
          (a: any, b: any) =>
            new Date(b.Created).getTime() - new Date(a.Created).getTime()
        );

        sortedItems.map((country) =>
          tempsetCountries.push({
            ID: country.ID,
            countryName: country.Title,
            ISOCode: country.ISOCode,
            Manager: peopleHandler(country?.Manager),
            Languages: country?.Language,
            Region: country?.Region,
            Currency: country?.Currency,
            TimeZone: country?.TimeZone,
            Status: country?.Status,
            Notes: country?.Notes,
            ManageAccess: manageAccessUsersDeserialized(country?.ManageAccess),
            ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
              country?.ManageAccess
            ),
          })
        );

        setCountries(tempsetCountries);
        setMasterProjectData(tempsetCountries);
        dispatch(setCountriesData([...tempsetCountries]));
      })
      .catch((err) => console.log("Error reading SharePoint items:", err));
  } catch (err: any) {
    console.log("Error in getCountriesList:", err);
  }
};

export const addCountriesList = async (countryData: any, setCountries: any) => {
  const managerData = countryData?.selectedPeople?.value.map(
    (manager: any) => ({
      ID: manager.id,
      Title: manager.name,
      EMail: manager.email,
    })
  );
  const requestPayload = {
    Title: countryData.CountryName.value,
    ISOCode: countryData.CountryISOCode.value,
    Region: countryData.Region.value,
    Language: countryData?.Languages?.value,
    Currency: countryData.Currency.value,
    TimeZone: countryData.TimeZone.value,
    ManagerId: {
      results: countryData.selectedPeople.value?.map(
        (manager: any) => manager.id
      ),
    },
    Status: countryData.Status.value,
    Notes: countryData.Notes.value,
    ManageAccess: manageAccessUsersSerialized(countryData?.ManageAccess.value),
  };
  console.log(requestPayload);
  await SpServices.SPAddItem({
    Listname: SPLists.Countrieslist,
    RequestJSON: requestPayload,
  })
    .then((newValue: any) => {
      console.log(newValue);
      const newValueObj = {
        ID: newValue.data?.ID,
        countryName: newValue.data.Title,
        ISOCode: newValue.data.ISOCode,
        Manager: peopleHandler(managerData),
        Languages: newValue?.data.Language,
        Region: newValue?.data.Region,
        Currency: newValue?.data.Currency,
        TimeZone: newValue?.data.TimeZone,
        Status: newValue?.data.Status,
        Notes: newValue?.data.Notes,
        ManageAccess: manageAccessUsersDeserialized(
          newValue?.data?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          newValue?.data?.ManageAccess
        ),
      };
      setCountries((prev: any[]) => [newValueObj, ...prev]);
    })
    .catch((err) => console.error(err));
};
export const filterCountryUnselected = (
  countries: any,
  allCountries: any,
  setAllCountries: any
) => {
  const existing = countries.map((country: any) =>
    country.countryName?.toLowerCase().trim()
  );
  const filtered = allCountries.filter(
    (country: any) =>
      !existing.includes(country.CountryName?.toLowerCase().trim())
  );
  console.log(existing);
  setAllCountries(filtered);
};

export const submitManageAccessForm = (
  formDetails: any,
  recId: number,
  setMasterState: any,
  setCountries: any,
  setPopupController: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const payloadDetails = {
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
  };
  SpServices.SPUpdateItem({
    Listname: SPLists.Countrieslist,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      console.log("res", res);
      const countryDetails = {
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
      };
      setMasterState((prev: any) =>
        prev.map((item: any) =>
          item.ID === recId ? { ...item, ...countryDetails } : item
        )
      );
      setCountries((prev: any) =>
        prev.map((item: any) =>
          item.ID === recId ? { ...item, ...countryDetails } : item
        )
      );
      togglePopupVisibility(setPopupController, index, "close");
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
