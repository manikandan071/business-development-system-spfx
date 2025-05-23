import * as React from "react";
import { useState } from "react";
import styles from "./NavBar.module.scss";
import MainHeader from "../../Common/Headers/MainHeader/MainHeader";

interface NavBarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ setActiveTab }) => {
  const [activeIndex, setActiveIndex] = useState("");

  const navOptions = [
    {
      name: "Dashboard",
      icon: require("../../../assets/images/png/navImages/user-edit.png"),
      activeIcon: require("../../../assets/images/png/navImages/user-edit-active.png"),
    },
    {
      name: "Countries",
      icon: require("../../../assets/images/png/navImages/building.png"),
      activeIcon: require("../../../assets/images/png/navImages/building-active.png"),
    },
    {
      name: "Projects",
      icon: require("../../../assets/images/png/navImages/box-open.png"),
      activeIcon: require("../../../assets/images/png/navImages/box-open-active.png"),
    },
    {
      name: "Events",
      icon: require("../../../assets/images/png/navImages/calendar-check.png"),
      activeIcon: require("../../../assets/images/png/navImages/calendar-check-active.png"),
    },
    {
      name: "My Tasks",
      icon: require("../../../assets/images/png/navImages/list-check.png"),
      activeIcon: require("../../../assets/images/png/navImages/list-check-active.png"),
    },
  ];
  React.useEffect(() => {
    setActiveIndex("Dashboard");
    setActiveTab("Dashboard");
  }, []);
  return (
    <div>
      {/* <div className={styles.navBar_wrapper}>
        <div className={styles.navBar_logo}>
          <img
            src={require("../../../assets/images/png/navImages/logo.svg")}
            alt="Logo"
          />
        </div>
        <div className={styles.navBar_options}>
          {navOptions.map((option, index) =>
            activeIndex === option?.name ? (
              <div
                key={index}
                className={styles.navBar_active_option}
                onClick={() => {
                  setActiveIndex(option.name);
                  setActiveTab(option.name);
                }}
              >
                <img
                  src={option.activeIcon}
                  alt={option.name}
                  width={15}
                  height={15}
                />
                <span>{option.name}</span>
              </div>
            ) : (
              <div
                key={index}
                className={styles.navBar_option}
                onClick={() => {
                  setActiveIndex(option.name);
                  setActiveTab(option.name);
                }}
              >
                <img
                  src={option.icon}
                  alt={option.name}
                  width={15}
                  height={15}
                />
                <span>{option.name}</span>
              </div>
            )
          )}
        </div>
      </div> */}
      <div className={styles.navBar_wrapper}>
        <div className={styles.navBar_logo_options}>
          <img
            src={require("../../../assets/images/png/navImages/logo.svg")}
            alt="Logo"
          />
          {navOptions.map((option, index) =>
            activeIndex === option?.name ? (
              <div
                key={index}
                className={styles.navBar_active_option}
                onClick={() => {
                  setActiveIndex(option.name);
                  setActiveTab(option.name);
                }}
              >
                <img
                  src={option.activeIcon}
                  alt={option.name}
                  width={15}
                  height={15}
                />
                <span>{option.name}</span>
              </div>
            ) : (
              <div
                key={index}
                className={styles.navBar_option}
                onClick={() => {
                  setActiveIndex(option.name);
                  setActiveTab(option.name);
                }}
              >
                <img
                  src={option.icon}
                  alt={option.name}
                  width={15}
                  height={15}
                />
                <span>{option.name}</span>
              </div>
            )
          )}
        </div>
        <div>
          <MainHeader />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
