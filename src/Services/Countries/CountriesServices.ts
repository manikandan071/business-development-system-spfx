/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpServices from "../SPServices/SpServices";
import { SPLists } from "../../Config/config";
const peopleHandler = (Manager: any[]) => {
  const tempperson: any[] = [];
  try {
    Manager?.forEach((personVal: any) => {
      tempperson.push({
        key: 1,
        imgUrl:
          `/_layouts/15/userphoto.aspx?size=S&accountname=` +
          `${personVal.EMail}`,
        text: personVal.Title,
        ID: personVal.ID,
        secondaryText: personVal.EMail,
        isValid: true,
      });
    });
  } catch (err) {
    console.log("Error from people Handler", err);
  }
  return tempperson;
};

export const getCountriesList = async (
  setCountries: any,
  setAllCountries: any,
) => {
   const customCountries = [
    {
      CountryName: "England",
      CountryISOCode: "gb-eng",
       Languages:"",
      languageOptions:["English"],
      Region:"Northern Europe",
      Currency:"GBP",
      TimeZone:"UTC+0 / UTC+1"
    },
    {
      CountryName: "Scotland",
      CountryISOCode: "gb-sct",
       Languages:"",
      languageOptions: ["English", "Scots", "Scottish Gaelic"],
      Region:"Northern Europe",
      Currency:"GBP",
      TimeZone:"UTC+0 / UTC+1"
    },
    {
      CountryName: "Wales",
      CountryISOCode: "gb-wls",
       Languages:"",
      languageOptions: ["English", "Welsh"],
      Region:"Northern Europe",
      Currency:"GBP",
      TimeZone:"UTC+0 / UTC+1"
    },
    {
      CountryName: "Northern Ireland",
      CountryISOCode: "gb-nir",
      Languages:"",
      languageOptions: ["English", "Irish", "Ulster Scots"],
      Region:"Northern Europe",
      Currency:"GBP",
      TimeZone:"UTC+0 / UTC+1"
    },
  ];
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  let tempCountryData: any[] = [];
  data.forEach((country: any) => {
    const currencyKeys = Object.keys(country.currencies || {});
    tempCountryData.push({
      CountryName: country.name.common,
      CountryISOCode: country.cca2,
      Languages:"",
      languageOptions: ( Object.keys(country?.languages || {}).map(
      (languageKey) => country?.languages[languageKey]
      )),
      Region: country.region,
      Currency: currencyKeys[0] || null,
      TimeZone: country.timezones[0],
    });
  });
  console.log(tempCountryData);
  setAllCountries([...customCountries,...tempCountryData]);
  await SpServices.SPReadItems({
    Listname: SPLists.Countrieslist,
    Select: "*,Manager/ID,Manager/Title,Manager/EMail",
    Expand: "Manager",
  })
    .then((items) => {
      const tempsetCountries: any[] = [];
      const sortedItems = items.sort(
        (a: any, b: any) => new Date(b.Created).getTime() - new Date(a.Created).getTime()
      );
        sortedItems.map((country) =>
          tempsetCountries.push({
            countryName: country.Title,
            ISOCode: country.ISOCode,
            Manager: peopleHandler(country?.Manager),
            Languages: country?.languages,
            Region: country?.region,
            Currency: country?.Currency,
            TimeZone: country?.TimeZone,
            Status: country?.Status,
            Notes: country?.Notes,
          })
        );
      setCountries(tempsetCountries);
    })
    .catch((err) => console.log("error while read item", err));
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
    Language: countryData?.selectedLanguage?.value,
    Currency: countryData.Currency.value,
    TimeZone: countryData.TimeZone.value,
    ManagerId: {
      results: countryData.selectedPeople.value?.map(
        (manager: any) => manager.id
      ),
    },
    Status: countryData.Status.value,
    Notes: countryData.Notes.value,
  };
  await SpServices.SPAddItem({
    Listname: SPLists.Countrieslist,
    RequestJSON: requestPayload,
  })
    .then((newValue: any) => {
      let newValueObj = {
        countryName: newValue.data.Title,
        ISOCode: newValue.data.ISOCode,
        Manager: peopleHandler(managerData),
        Languages: newValue?.data.Language,
        Region: newValue?.data.Region,
        Currency: newValue?.data.Currency,
        TimeZone: newValue?.data.TimeZone,
        Status: newValue?.data.Status,
        Notes: newValue?.data.Notes,
      };
      setCountries((prev: any[]) => [newValueObj, ...prev]);
    })
    .catch((err) => console.error(err));
};
