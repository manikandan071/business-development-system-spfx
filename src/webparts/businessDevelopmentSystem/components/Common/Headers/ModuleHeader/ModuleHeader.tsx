/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "./ModuleHeader.module.scss";

interface ModuleHeaderProps {
  title: string;
  selectedCountry?: any;
  backToCountries?: any;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  selectedCountry,
  backToCountries,
}) => {
  return (
    <div className={styles.section_with_line}>
      {selectedCountry?.countryName ? (
        // <div style={{ display: "flex" }}>
        //   <ArrowBackIcon
        //     className="back_icon"
        //     onClick={() => backToCountries()}
        //     style={{
        //       cursor: "pointer",
        //       color: "var(--section-header-secondary-font-color)",
        //       borderColor: "var(--section-header-secondary-font-color)",
        //     }}
        //   />
        //   <span className={styles.section_title}>
        //     Country ({" "}
        //     <span
        //       style={{ color: "var(--section-header-secondary-font-color)" }}
        //     >
        //       {selectedCountry?.countryName}
        //     </span>{" "}
        //     )
        //   </span>
        //   <KeyboardArrowRightIcon sx={{ color: "var(--ad-grey)" }} />
        //   <span className={styles.section_title}>{title}</span>
        // </div>
        <div className="section_tree_map_wrapper">
          <ArrowBackIcon
            className="back_icon"
            onClick={() => backToCountries()}
            style={{
              cursor: "pointer",
              color: "var(--section-header-secondary-font-color)",
              borderColor: "var(--section-header-secondary-font-color)",
            }}
          />
          <div className="align-center">
            <p
              className="tree_map_country_text"
              onClick={() => backToCountries()}
              style={{ cursor: "pointer" }}
            >
              Country (
              <span
                style={{ color: "var(--section-header-secondary-font-color)" }}
              >
                {selectedCountry?.countryName}
              </span>
              )
            </p>
            {<KeyboardArrowRightIcon sx={{ color: "var(--ad-grey)" }} />}
            <p className="tree_map_project_text">{title}</p>
          </div>
        </div>
      ) : (
        <span className={styles.section_title}>{title}</span>
      )}
    </div>
  );
};

export default ModuleHeader;
