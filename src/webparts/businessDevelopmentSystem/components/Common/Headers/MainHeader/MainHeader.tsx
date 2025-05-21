/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { Persona, PersonaSize } from "@fluentui/react";
import styles from "./MainHeader.module.scss";

const MainHeader = () => {
  const [person, setPerson] = React.useState({
    name: "Kali Muthu",
    email: "kalimuthu@chandrudemo.onmicrosoft.com",
  });

  React.useEffect(() => {
    setPerson({
      name: "Kali Muthu",
      email: "kalimuthu@chandrudemo.onmicrosoft.com",
    });
  }, []);
  return (
    <div className={styles.mainHeader_container}>
      <div className={styles.mainHeader_UserDetails}>
        <Persona
          styles={{
            root: {
              margin: "0 !important;",
              borderRadius: "50%",
              border: "3px solid #e26868",
              height: "35px !important",
              ".ms-Persona-details": {
                display: "none",
              },
              ".ms-Persona-image": {
                width: "30px !important",
                height: "30px !important",
              },
              ".ms-Persona-imageArea": {
                width: "30px !important",
                height: "30px !important",
              },
            },
          }}
          imageUrl={
            "/_layouts/15/userphoto.aspx?size=S&username=" + person.email
          }
          title={person.name}
          size={PersonaSize.size24}
        />
        <div className={styles.mainHeader_UserDetails_text}>
          <p>Good Morning, {person.name}!</p>
          <span>Have a great day on your management </span>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
