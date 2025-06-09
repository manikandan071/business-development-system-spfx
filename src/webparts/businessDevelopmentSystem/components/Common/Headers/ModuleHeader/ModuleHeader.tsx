/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "./ModuleHeader.module.scss";

interface ModuleHeaderProps {
  title: string;
  selectedCountry?: any;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  selectedCountry,
}) => {
  return (
    <div className={styles.section_with_line}>
      {selectedCountry?.countryName ? (
        <div style={{ display: "flex" }}>
          <span className={styles.section_title}>
            Country ({" "}
            <span
              style={{ color: "var(--section-header-secondary-font-color)" }}
            >
              {selectedCountry?.countryName}
            </span>{" "}
            )
          </span>
          <KeyboardArrowRightIcon sx={{ color: "var(--ad-grey)" }} />
          <span className={styles.section_title}>{title}</span>
        </div>
      ) : (
        <span className={styles.section_title}>{title}</span>
      )}
    </div>
  );
};

export default ModuleHeader;
