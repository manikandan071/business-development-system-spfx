/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import "./Profiles.css";
import { DirectionalHint, TooltipHost } from "@fluentui/react";
import { IUserDetails } from "../../../../../Interface/CommonInterface";
interface ProfileProps {
  value: IUserDetails[];
  maxVisible: number;
}
const Profiles: React.FC<ProfileProps> = ({ value, maxVisible }) => {
  let visibleUsers = value;
  let remainingCount = 0;
  const tooltipValue = value?.map((user) => user.DisplayName).join("\n");
  if (maxVisible > 1) {
    visibleUsers = value?.slice(0, maxVisible);
    remainingCount = value?.length - maxVisible;
  }
  return (
    <>
      {maxVisible > 1 ? (
        <div className="avatarGroup">
          <TooltipHost
            content={tooltipValue}
            tooltipProps={{
              directionalHint: DirectionalHint.bottomCenter,
              onRenderContent: (props) => (
                <div style={{ whiteSpace: "pre-line" }}>{props?.content}</div>
              ),
            }}
          >
            <AvatarGroup>
              {visibleUsers?.map((user, index) => (
                <Avatar
                  key={index}
                  image={user.ImgUrl}
                  size="large"
                  shape="circle"
                  // style={{width:"25px",height:"25px"}}
                />
              ))}
              {remainingCount > 0 && (
                <Avatar
                  label={
                    remainingCount < 10
                      ? `+0${remainingCount}`
                      : `+${remainingCount}`
                  }
                  className="avatar"
                  shape="circle"
                  size="large"
                />
              )}
            </AvatarGroup>
          </TooltipHost>
        </div>
      ) : maxVisible === 1 ? (
        <div>
          <AvatarGroup>
            {visibleUsers?.map((user, index) => (
              <>
                <TooltipHost
                  content={user.DisplayName}
                  tooltipProps={{
                    directionalHint: DirectionalHint.bottomCenter,
                  }}
                >
                  <Avatar
                    key={index}
                    image={user.ImgUrl}
                    size="large"
                    shape="circle"
                  />
                  <span className="avatar_user_name">{user.DisplayName}</span>
                </TooltipHost>
                {/* <span style={{fontSize:"12px"}}>{user.text}</span> */}
              </>
            ))}
          </AvatarGroup>
        </div>
      ) : null}
    </>
  );
};
export default Profiles;
