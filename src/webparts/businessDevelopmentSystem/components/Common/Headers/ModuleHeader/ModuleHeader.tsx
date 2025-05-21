import * as React from "react";
import styles from "./ModuleHeader.module.scss";

interface ModuleHeaderProps {
  title: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title }) => {
  return (
    <div className={styles.section_with_line}>
      <span className={styles.section_title}>{title}</span>
    </div>
  );
};

export default ModuleHeader;
