/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { IUserDetails } from "../../Interface/CommonInterface";

const manageAccessUsersSerialized = (userList: any[]) => {
  const serialized = userList
    .map((item) => {
      const user = item.User.value[0];
      return `${user.id}~_${user.email}~_${user.name}~_${item.Permission.value}`;
    })
    .join("\n");
  return serialized;
};
const manageAccessUsersDeserialized = (storedText: string) => {
  const deserialized: IUserDetails[] = storedText.split("\n").map((line) => {
    const [id, email, name, permission] = line.split("~_");
    return {
      Id: parseInt(id),
      Email: email,
      DisplayName: name,
      Permission: permission,
    };
  });
  return deserialized;
};
const manageAccessUsersDeserializedForForm = (storedText: string) => {
  const deserialized = storedText.split("\n").map((line) => {
    const [id, email, name, permission] = line.split("~_");
    return {
      User: {
        value: [
          {
            id: parseInt(id),
            email,
            name,
          },
        ],
        isValid: true,
      },
      Permission: {
        value: permission,
        isValid: true,
      },
    };
  });
  return deserialized;
};

export {
  manageAccessUsersSerialized,
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
};
