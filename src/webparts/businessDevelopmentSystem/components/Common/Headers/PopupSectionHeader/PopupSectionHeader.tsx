import * as React from "react";
import { memo } from "react";
import "./PopupSectionHeader.css";

interface IPopupSectionHeaderProps {
  Title: string;
}

const PopupSectionHeader: React.FC<IPopupSectionHeaderProps> = ({ Title }) => {
  return (
    <div className="popup-section-header">
      <span>{Title}</span>
    </div>
  );
};

export default memo(PopupSectionHeader);
