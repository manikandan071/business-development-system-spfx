/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpServices from "../SPServices/SpServices";
import { SPLists } from "../../Config/config";
import {
  // checkCurrentUserForManageAccess,
  countriesPermissionbyUser,
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  manageAccessUsersSerialized,
  peopleHandler,
} from "../CommonService/CommonService";
import {
  setPopupResponseFun,
  togglePopupVisibility,
} from "../../Utils/togglePopup";
import { setCountriesData } from "../../Redux/Features/CountryContextSlice";
import { ICountriesDetails } from "../../Interface/ModulesInterface";
export const getCountriesList = async (
  isAdmin: boolean,
  setAllCountries: any,
  setMasterProjectData: any,
  setCountries: any,
  setIsLoader: any,
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

    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,languages,region,timezones,currencies"
    ).then();
    const data = await response.json();
    const tempCountryData: any[] = [];
    data?.forEach((country: any) => {
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
    tempCountryData.push(...customCountries);
    tempCountryData.sort((a: any, b: any) =>
      a.CountryName.localeCompare(b.CountryName)
    );
    setAllCountries(tempCountryData);

    // await SpServices.SPReadItems({
    //   Listname: SPLists.Countrieslist,
    //   Select: "*,Manager/ID,Manager/Title,Manager/EMail",
    //   Expand: "Manager",
    // })
    //   .then(async (items) => {
    //     const tempsetCountries: any[] = [];
    //     items.forEach(async (country) => {
    //       const response = await SpServices.SPReadItems({
    //         Listname: SPLists.Projectslist,
    //         Select: "*,CountryOf/Id,CountryOf/Title",
    //         Expand: "CountryOf",
    //         Filter: [
    //           {
    //             FilterKey: "CountryOfId",
    //             Operator: "eq",
    //             FilterValue: country?.ID,
    //           },
    //         ],
    //       }).then();
    //       tempsetCountries.push({
    //         ID: country.ID,
    //         countryName: country.Title,
    //         ProjectCount: response?.length,
    //         ISOCode: country.ISOCode,
    //         Manager: peopleHandler(country?.Manager),
    //         Languages: country?.Language,
    //         Region: country?.Region,
    //         Currency: country?.Currency,
    //         TimeZone: country?.TimeZone,
    //         Status: country?.Status,
    //         Notes: country?.Notes,
    //         ManageAccess: manageAccessUsersDeserialized(country?.ManageAccess),
    //         ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
    //           country?.ManageAccess
    //         ),
    //       });
    //     });
    //     console.log("tempsetCountries", tempsetCountries);

    //     setCountries(tempsetCountries);
    //     setMasterProjectData(tempsetCountries);
    //     dispatch(setCountriesData([...tempsetCountries]));
    //   })
    //   .catch((err) => console.log("Error reading SharePoint items:", err));

    const items = await SpServices.SPReadItems({
      Listname: SPLists.Countrieslist,
      Select: "*,Manager/ID,Manager/Title,Manager/EMail",
      Expand: "Manager",
      Orderby: "ID",
      Orderbydecorasc: false,
    });

    const filteredResponse: any[] = isAdmin
      ? items
      : await countriesPermissionbyUser(
          items,
          "ManageAccess",
          "SecondaryManageAccess",
          "ThirdManageAccess"
        );
    // : await checkCurrentUserForManageAccess(
    //     items,
    //     "ManageAccess",
    //     "SecondaryManageAccess",
    //     "ThirdManageAccess"
    //   );
    console.log("filteredResponse", filteredResponse);

    const tempsetCountries = await Promise.all(
      filteredResponse.map(async (country) => {
        const response = await SpServices.SPReadItems({
          Listname: SPLists.Projectslist,
          Select: "*,CountryOf/Id,CountryOf/Title",
          Expand: "CountryOf",
          Filter: [
            {
              FilterKey: "CountryOfId",
              Operator: "eq",
              FilterValue: country?.Id,
            },
          ],
        });

        return {
          Id: country.Id,
          countryName: country.Title,
          ProjectCount: response?.length || 0,
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
          isManageAccessPermission: isAdmin ? true : country?.isPermission,
        };
      })
    );

    // Only runs after ALL are ready
    setCountries([...tempsetCountries]);
    setMasterProjectData([...tempsetCountries]);
    dispatch(setCountriesData([...tempsetCountries]));
    setIsLoader(false);
  } catch (err: any) {
    console.log("Error in getCountriesList:", err);
  }
};

export const submitCountryForm = async (
  formDetails: any,
  setMasterState: any,
  setLocalState: any,
  setPopupResponse: any,
  index: number,
  setDispatch: any
) => {
  const managerData = formDetails?.selectedPeople?.value.map(
    (manager: any) => ({
      ID: manager.id,
      Title: manager.name,
      EMail: manager.email,
    })
  );
  const requestPayload = {
    Title: formDetails.CountryName.value,
    ISOCode: formDetails.CountryISOCode.value,
    Region: formDetails.Region.value,
    Language: formDetails?.Languages?.value,
    Currency: formDetails.Currency.value,
    TimeZone: formDetails.TimeZone.value,
    // ManagerId: {
    //   results: formDetails.selectedPeople.value?.map(
    //     (manager: any) => manager.id
    //   ),
    // },
    Status: formDetails.Status.value,
    Notes: formDetails.Notes.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess.value),
  };
  await SpServices.SPAddItem({
    Listname: SPLists.Countrieslist,
    RequestJSON: requestPayload,
  })
    .then((newValue: any) => {
      const countryDetails: ICountriesDetails = {
        Id: newValue.data?.ID,
        countryName: requestPayload.Title,
        ISOCode: requestPayload.ISOCode,
        Manager: peopleHandler(managerData) || [],
        Languages: requestPayload.Language,
        Region: requestPayload.Region,
        Currency: requestPayload.Currency,
        TimeZone: requestPayload.TimeZone,
        Status: requestPayload.Status,
        Notes: requestPayload.Notes,
        ManageAccess: manageAccessUsersDeserialized(
          requestPayload?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          requestPayload?.ManageAccess
        ),
        ProjectCount: 0,
      };
      setMasterState((prev: any) => {
        const updated = [countryDetails, ...prev];
        setDispatch(setCountriesData(updated));
        return updated;
      });
      setLocalState((prev: any) => {
        const updated = [countryDetails, ...prev];
        return updated;
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "New country have been added successfully."
      );
    })
    .catch((err) => console.error(err));
};
export const updateCountryForm = async (
  formDetails: any,
  isUpdateDetails: any,
  setMasterState: any,
  setLocalState: any,
  setPopupResponse: any,
  index: number,
  setDispatch: any
) => {
  const recId = isUpdateDetails?.Id;
  // const managerData = formDetails?.selectedPeople?.value.map(
  //   (manager: any) => ({
  //     ID: manager.id,
  //     Title: manager.name,
  //     EMail: manager.email,
  //   })
  // );
  const requestPayload = {
    Title: formDetails.CountryName.value,
    ISOCode: formDetails.CountryISOCode.value,
    Region: formDetails.Region.value,
    Language: formDetails?.Languages?.value,
    Currency: formDetails.Currency.value,
    TimeZone: formDetails.TimeZone.value,
    // ManagerId: {
    //   results: formDetails.selectedPeople.value?.map(
    //     (manager: any) => manager.id
    //   ),
    // },
    Status: formDetails.Status.value,
    Notes: formDetails.Notes.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess.value),
  };
  await SpServices.SPUpdateItem({
    Listname: SPLists.Countrieslist,
    ID: recId,
    RequestJSON: requestPayload,
  })
    .then((newValue: any) => {
      const countryDetails: ICountriesDetails = {
        Id: recId,
        countryName: requestPayload.Title,
        ISOCode: requestPayload.ISOCode,
        Manager: peopleHandler(formDetails.selectedPeople.value) || [],
        Languages: requestPayload.Language,
        Region: requestPayload.Region,
        Currency: requestPayload.Currency,
        TimeZone: requestPayload.TimeZone,
        Status: requestPayload.Status,
        Notes: requestPayload.Notes,
        ManageAccess: manageAccessUsersDeserialized(
          requestPayload.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          requestPayload.ManageAccess
        ),
      };
      setMasterState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...countryDetails } : item
        );
        setDispatch(setCountriesData(updated));
        return updated;
      });
      setLocalState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...countryDetails } : item
        );
        return updated;
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "The country have been updated successfully."
      );
    })
    .catch((err) => console.error(err));
};
export const filterCountryUnselected = (
  countries: any,
  allCountries: any,
  setAllCountries: any,
  currentCountryDetails: any
) => {
  const existing = countries.map((country: any) =>
    country.countryName?.toLowerCase().trim()
  );
  const currentName = currentCountryDetails?.countryName?.toLowerCase().trim();
  const filtered = allCountries.filter((country: any) => {
    const name = country.CountryName?.toLowerCase().trim();
    return !existing.includes(name) || name === currentName;
  });
  setAllCountries(filtered);
};

export const submitManageAccessForm = (
  formDetails: any,
  recId: number,
  setMasterState: any,
  setLocalState: any,
  setPopupController: any,
  index: number
) => {
  const payloadDetails = {
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
  };
  SpServices.SPUpdateItem({
    Listname: SPLists.Countrieslist,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
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
          item.Id === recId ? { ...item, ...countryDetails } : item
        )
      );
      setLocalState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...countryDetails } : item
        )
      );
      togglePopupVisibility(setPopupController, index, "close");
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
