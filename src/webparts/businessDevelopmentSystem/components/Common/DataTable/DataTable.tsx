/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable  @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import "./DataTable.css";
interface IDataTableProps {
  table: any;
}

const CustomDataTable: React.FC<IDataTableProps> = ({ table }) => {
  return <div className="custom-data-table">{table}</div>;
};

export default CustomDataTable;
