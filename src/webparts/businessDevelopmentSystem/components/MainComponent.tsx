/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useEffect, useState } from "react";
import NavBar from "./Modules/NavBar/NavBar";
// import MainHeader from "./Common/Headers/MainHeader/MainHeader";
import Dashboard from "./Modules/Dashboard/Dashboard";

import styles from "./MainComponent.module.scss";
import Countries from "./Modules/Countries/Countries";
import Projects from "./Modules/Projects/Projects";
import MyTasks from "./Modules/MyTasks/MyTasks";
import { useDispatch } from "react-redux";
import {
  setMainSPContext,
  setSiteUrl,
  setTenantUrl,
  setWebUrl,
} from "../../../Redux/Features/MainSPContextSlice";
import { sp } from "@pnp/sp";
import Events from "./Modules/Events/Events";

const MainComponent = (props: any) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    sp.web.currentUser
      .get()
      ?.then((res: any) => {
        console.log("Current User : ", res);
      })
      .catch((err: any) => {
        console.log("Error : ", err);
      });
    dispatch(setWebUrl(props?.context?._pageContext?._site?.absoluteUrl));
    dispatch(
      setTenantUrl(
        props?.context?._pageContext?._site?.absoluteUrl.split("/sites")[0]
      )
    );
    dispatch(
      setSiteUrl(props?.context?._pageContext?._site?.serverRelativeUrl)
    );
    dispatch(setMainSPContext(props.context));
  }, []);
  return (
    <div className={styles.container}>
      <div style={{ width: "100%" }}>
        <NavBar setActiveTab={setActiveTab} />
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "100%" }}>
          {/* <div style={{ width: "100%", padding: "0px 20px" }}>
            <MainHeader />
          </div> */}

          <div className={styles.screen_container}>
            {activeTab === "Dashboard" && <Dashboard />}
            {activeTab === "Countries" && <Countries />}
            {activeTab === "Projects" && <Projects />}
            {activeTab === "Events" && <Events />}
            {activeTab === "My Tasks" && <MyTasks />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
