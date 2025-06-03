/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { SPLists } from "../../Config/config";
import { setCountriesData } from "../../Redux/Features/CountryContextSlice";
import {
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  peopleHandler,
} from "../CommonService/CommonService";
import SpServices from "../SPServices/SpServices";

const fetchCountryData = async (dispatch: any) => {
  await SpServices.SPReadItems({
    Listname: SPLists.Countrieslist,
    Select: "*,Manager/ID,Manager/Title,Manager/EMail",
    Expand: "Manager",
  }).then((items) => {
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
    dispatch(setCountriesData([...tempsetCountries]));
  });
};

export { fetchCountryData };
