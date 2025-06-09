/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { IUserDetails } from "../../Interface/CommonInterface";
import { setPopupResponseFun } from "../../Utils/togglePopup";
import SpServices from "../SPServices/SpServices";

const peopleHandler = (Users: any[]): IUserDetails[] => {
  return Users?.map((user, index) => ({
    Id: parseInt(user.ID || user.Id || user.id),
    Email: user.EMail || user.Email || user.email,
    DisplayName: user.Title || user.DisplayName || user.name,
    Key: index,
    ImgUrl:
      `/_layouts/15/userphoto.aspx?size=S&accountname=` +
      `${user.EMail || user.Email || user.email}`,
  }));
  // const tempperson: any[] = [];
  // try {
  //   Manager?.forEach((personVal: any) => {
  //     tempperson.push({
  //       key: 1,
  //       imgUrl:
  //         `/_layouts/15/userphoto.aspx?size=S&accountname=` +
  //         `${personVal.EMail}`,
  //       text: personVal.Title,
  //       ID: personVal.ID,
  //       secondaryText: personVal.EMail,
  //       isValid: true,
  //     });
  //   });
  // } catch (err) {
  //   console.log("Error from people Handler", err);
  // }
  // return tempperson;
};

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
      Key: parseInt(id),
      ImgUrl: `/_layouts/15/userphoto.aspx?size=S&accountname=${email}`,
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

const appendCategoryToFileName = (
  fileName: string,
  category: string
): string => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) return `${fileName}_${category}`; // no extension
  const baseName = fileName.substring(0, dotIndex);
  const extension = fileName.substring(dotIndex);
  return `${baseName}_${category}${extension}`;
};

const removeCategoryFromFileName = (
  fileName: string,
  category: string
): string => {
  const suffix = `_${category}`;
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) return fileName;

  const baseName = fileName.substring(0, dotIndex);
  const extension = fileName.substring(dotIndex);

  // Only remove if baseName ends with _Category
  if (baseName.endsWith(suffix)) {
    const originalBase = baseName.slice(0, -suffix.length);
    return `${originalBase}${extension}`;
  }
  return fileName;
};

const submitManageAccessForm = (
  formDetails: any,
  recId: number,
  listName: string,
  setMasterState: any,
  setLocalState: any,
  setPopupResponse: any,
  index: number
) => {
  const payloadDetails = {
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
  };
  SpServices.SPUpdateItem({
    Listname: listName,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      const projectDetails = {
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
      };

      setMasterState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...projectDetails } : item
        )
      );
      setLocalState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...projectDetails } : item
        )
      );
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "The manage access have been updated successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};

export {
  peopleHandler,
  manageAccessUsersSerialized,
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  appendCategoryToFileName,
  removeCategoryFromFileName,
  submitManageAccessForm,
};
