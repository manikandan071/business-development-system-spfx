/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./SectionTreeMap.css";

interface ISectionTreeMapProps {
  CountryName: string;
  ProjectName: string;
  SectionName: string;
  setActiveProjectTab: any;
}

const SectionTreeMap: React.FC<ISectionTreeMapProps> = ({
  CountryName,
  ProjectName,
  SectionName,
  setActiveProjectTab,
}) => {
  return (
    <div className="section_tree_map_wrapper">
      <ArrowBackIcon
        className="back_icon"
        onClick={() => setActiveProjectTab()}
        style={{
          cursor: "pointer",
          color: "var(--section-header-secondary-font-color)",
          borderColor: "var(--section-header-secondary-font-color)",
        }}
      />
      <div className="align-center">
        <p className="tree_map_country_text">
          Country (
          <span style={{ color: "var(--section-header-secondary-font-color)" }}>
            {CountryName}
          </span>
          )
        </p>
        {<KeyboardArrowRightIcon sx={{ color: "var(--ad-grey)" }} />}
        <p
          className="tree_map_project_text"
          onClick={() => setActiveProjectTab()}
          style={{ cursor: "pointer" }}
        >
          Project (
          <span style={{ color: "var(--section-header-secondary-font-color)" }}>
            {ProjectName}
          </span>
          )
        </p>
        {<KeyboardArrowRightIcon sx={{ color: "var(--ad-grey)" }} />}
        <p>
          <span style={{ color: "var(--section-header-secondary-font-color)" }}>
            {SectionName}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SectionTreeMap;
