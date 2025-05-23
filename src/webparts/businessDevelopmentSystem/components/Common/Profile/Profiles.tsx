/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import "./Profiles.css";

interface ProfileProps {
  value: any[];
  maxVisible: number;
}

const Profiles: React.FC<ProfileProps> = ({ value, maxVisible }) => {
  const visibleUsers = value.slice(0, maxVisible);
  const remainingCount = value.length - maxVisible;

  return (
    <>
      {maxVisible > 1 ? (
        <div className="avatarGroup">
          <AvatarGroup>
            {visibleUsers.map((user, index) => (
              <Avatar
                key={index}
                image={user.imgUrl}
                size="large"
                shape="circle"
                title={user.text}
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
        </div>
      ) : (
        <div>
          <AvatarGroup>
            {visibleUsers.map((user, index) => (
              <>
                <Avatar
                  key={index}
                  image={user.imgUrl}
                  size="large"
                  shape="circle"
                  title={user.text}
                />
                <span>{user.text}</span>
              </>
            ))}
          </AvatarGroup>
        </div>
      )}
    </>
  );
};

export default Profiles;
