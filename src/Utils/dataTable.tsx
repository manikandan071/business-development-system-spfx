/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import * as React from "react";

export const OnTextRender = (text: any) => {
  console.log("text", text);

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "#0078d4",
        fontSize: "14px",
        fontWeight: "400",
      }}
    >
      {text?.text}
    </div>
  );
};
