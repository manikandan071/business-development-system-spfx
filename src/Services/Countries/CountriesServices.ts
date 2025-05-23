/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpServices from "../SPServices/SpServices";
import { SPLists } from "../../Config/config";

const peopleHandler = (items: any[]) => {
  const tempperson: any[] = [];
  try {
    items.forEach((countries) =>
      countries?.Manager?.forEach((personVal: any) => {
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
      })
    );
  } catch (err) {
    console.log("Error from people Handler", err);
  }
  return tempperson;
};
export const countriesData = async (setCountries: any) => {
  const customCountries = [
    {
      name: "England",
      code: "gb-eng",
      flag: "https://flagcdn.com/w320/gb-eng.png",
    },
    {
      name: "Scotland",
      code: "gb-sct",
      flag: "https://flagcdn.com/w320/gb-sct.png",
    },
    {
      name: "Wales",
      code: "gb-wls",
      flag: "https://flagcdn.com/w320/gb-wls.png",
    },
    {
      name: "Northern Ireland",
      code: "gb-nir",
      flag: "https://flagcdn.com/w320/gb-nir.png",
    },
  ];
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  console.log("Countries Data: ", data);
  const tempData: any[] = [];
  data.forEach((country: any) =>
    tempData.push({
      name: country.name.common,
      code: country.cca2,
      flag: country.flags.png,
    })
  );
  setCountries([...customCountries, ...tempData]);
};
export const getCountriesList = async (setCountries: any, setManager: any) => {
  await SpServices.SPReadItems({
    Listname: SPLists.Countrieslist,
    Select: "*,Manager/ID,Manager/Title,Manager/EMail",
    Expand: "Manager",
  })
    .then((items) => {
      console.log("Successfull", items);
      const tempsetCountries: any[] = [];
      const tempperson = peopleHandler(items);

      for (let i = 0; i < 15; i++) {
        items.map((countries) => tempsetCountries.push(countries));
      }
      // setCountries(tempsetCountries)
      setManager(tempperson);
    })
    .catch((err) => console.log("error while read item", err));
};
