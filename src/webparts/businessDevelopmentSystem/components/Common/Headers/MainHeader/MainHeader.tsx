/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { Persona, PersonaSize } from "@fluentui/react";
import styles from "./MainHeader.module.scss";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const currentUserDetails = useSelector((state: any) => state?.MainSPContext?.currentUserDetails);
const [person, setPerson] = React.useState({
  name: "",
  email: "",
});

React.useEffect(() => {
  if (currentUserDetails[0]?.DisplayName && currentUserDetails[0]?.Email) {
    setPerson({
      name: currentUserDetails[0].DisplayName,
      email: currentUserDetails[0].Email,
    });
  }
}, [currentUserDetails]);
  return (
    <div className={styles.mainHeader_container}>
      <div className={styles.mainHeader_UserDetails}>
        <div className={styles.mainHeader_UserDetails_text}>
          <p>
            Welcome,{" "}
            <strong style={{ fontSize: "16px" }}>{person.name}!</strong>
          </p>
          <span>Have a great day on your management </span>
        </div>
        <Persona
          styles={{
            root: {
              margin: "0 !important;",
              borderRadius: "50%",
              // border: "3px solid #e26868",
              height: "37px !important",
              ".ms-Persona-details": {
                display: "none",
              },
              ".ms-Persona-image": {
                width: "34px !important",
                height: "34px !important",
              },
              ".ms-Persona-imageArea": {
                width: "34px !important",
                height: "34px !important",
              },
            },
          }}
          imageUrl={
            "/_layouts/15/userphoto.aspx?size=S&username=" + person.email
          }
          title={person.name}
          size={PersonaSize.size24}
        />
      </div>
    </div>
  );
};
export default MainHeader;
