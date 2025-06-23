/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */

import * as React from "react";
import "./CountryDetails.css";
import { OnUsersRender } from "../../../../../../../Utils/dataTable";
interface ICountryDetailsProps {
  countryDetails: any;
}

const CountryDetails: React.FC<ICountryDetailsProps> = ({ countryDetails }) => {
  return (
    <div className="country-details-wrapper">
      <div className="country-details-header">
        <p>Country Details</p>
      </div>
      <div className="country-details-content">
        <div className="country-details-item">
          <span>Country ID</span>
          <p>{countryDetails?.Id}</p>
        </div>
        <div className="country-details-item">
          <span>Name</span>
          <p>{countryDetails?.Name}</p>
        </div>
        <div className="country-details-item">
          <span>Total projects</span>
          <p>{countryDetails?.projectsCount} projects</p>
        </div>
        <div className="country-details-item">
          <span style={{width:"100%"}}>Contributors</span>
          <OnUsersRender users={countryDetails?.manageAccess}/>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
