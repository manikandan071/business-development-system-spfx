/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable  @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import { useState } from "react";
import styles from "./CustomSearchinput.module.scss";
const searchIcon = require("../../../../assets/images/png/search.png");

const CustomSearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={styles.search_input_wrapper}>
      <input
        type="text"
        placeholder="Search here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue === "" && (
        <img src={searchIcon} alt="Search" className={styles.search_icon} />
      )}
    </div>
  );
};

export default CustomSearchInput;
