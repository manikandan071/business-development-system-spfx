/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import LaunchIcon from "@mui/icons-material/Launch";
import * as React from "react";
import styles from "./Countries.module.scss";
import { useState, useEffect } from "react";
import { countriesData, getCountriesList } from "../../../../../Services/Countries/CountriesServices";
import Profiles from "../../Common/Profile/Profiles";
import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";

const Countries: React.FC = () => {
  // const flagImg = require("../../../assets/images/png/flag.png");
  // const flagImg = "https://flagcdn.com/64x48/in.png";
  const [countries, setCountries] = useState([]);
  const [Manager, setManager] = useState([]);
  useEffect(() => {
    getCountriesList(setCountries, setManager);
    countriesData(setCountries);
  }, []);
  console.log("Countries", countries);
  console.log("Manager", Manager);
  return (
    <div className={styles.countries_container}>
      <div className={styles.inner_container}>
        {countries.map((country: any, index) => {
          return (
            <div key={index} className={styles.card_container}>
              <div className={styles.cardFirst}>
                <div className={styles.cardCountry}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={country.flag}
                    height="40px"
                    width="40px"
                  />
                  <div className={styles.countryTag}>
                    <span style={{ fontSize: "large", fontWeight: "800" }}>
                      {country.name}
                    </span>
                    <div className={styles.projectCount}>
                      <span className={styles.projectnumber}>
                        {country.code}
                      </span>
                      <span>Projects</span>
                    </div>
                  </div>
                </div>
                <div className={styles.cardStatus}>
                  <i
                    className="pi pi-circle-fill"
                    style={{ fontSize: "6px", placeSelf: "center" }}
                  />
                  {/* <span>{country.Status}</span> */}
                    <span> Active</span>
                </div>
              </div>
              <div className={styles.peopleContainer}>
                <Profiles value={Manager} maxVisible={3} />
                <DefaultButton
                  btnType="openBtn"
                  text="Open"
                  startIcon={<LaunchIcon />}
                />
              </div>
              <div className={styles.manageAccess}>
                <span style={{ color: "#4e232a", fontWeight: "500" }}>
                  <u>Manage Access</u>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Countries;
