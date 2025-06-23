/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-use-before-define */

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
        isMandatory: true,
      },
      Permission: {
        value: permission,
        isValid: true,
        isMandatory: true,
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
  index: number,
  parentListName?: string,
  parentListId?: number
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
      if (parentListName !== "" && parentListId) {
        updateSecondaryMAUsers(
          manageAccessUsersDeserialized(payloadDetails?.ManageAccess),
          recId,
          parentListName || "",
          parentListId || 0
        );
      }
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
          item?.Id === recId ? { ...item, ...projectDetails } : item
        )
      );
      setLocalState((prev: any) =>
        prev.map((item: any) =>
          item?.Id === recId ? { ...item, ...projectDetails } : item
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

// const updateSecondaryMAUsers = async (
//   secondaryMAUsers: any[],
//   changedMAUsers: any[],
//   childId: number,
//   listName: string,
//   parentId: number
// ) => {
//   debugger;
//   console.log("changedMAUsers", changedMAUsers);

//   try {
//     await SpServices.SPReadItemUsingId({
//       Listname: listName,
//       SelectedId: parentId,
//       Select: "",
//       Expand: "",
//     }).then((res: any) => {
//       debugger;
//       console.log("Update Secondary MA Users Response:", res);
//       const tempSecondaryMAUsers = secondaryMAUsers.map((user) => user.email);
//       const initialMAUsersString = `${childId}|${tempSecondaryMAUsers.join(
//         ","
//       )}`;

//       // const inputString =
//       //   "23|Chandru@chandrudemo.onmicrosoft.com,leo@chandrudemo.onmicrosoft.com~24|Kali@chandrudemo.onmicrosoft.com,kamesh@chandrudemo.onmicrosoft.com";
//       if (res?.SecondaryManageAccess) {
//         // Step 1: Convert secondaryMAUsers to email string
//         const newEmails = Array.from(
//           new Set(secondaryMAUsers.map((u) => u.email.toLowerCase()))
//         );

//         // Step 2: Parse existing string into map
//         const accessMap: Record<number, string[]> = {};
//         (res?.SecondaryManageAccess || "").split("~").forEach((group: any) => {
//           const [projectIdStr, emailsStr] = group.split("|");
//           const projectId = parseInt(projectIdStr);
//           const emails = emailsStr?.split(",").map((e: any) => e.trim()) || [];
//           accessMap[projectId] = emails;
//         });

//         // Step 3: If childId already exists, merge. Else add.
//         if (accessMap[childId]) {
//           const existing = accessMap[childId].map((e) => e.toLowerCase());
//           accessMap[childId] = Array.from(new Set([...existing, ...newEmails]));
//         } else {
//           accessMap[childId] = newEmails;
//         }

//         // Step 4: Rebuild the final string
//         const updatedAccessString = Object.entries(accessMap)
//           .map(([projId, emails]) => `${projId}|${emails.join(",")}`)
//           .join("~");

//         console.log(
//           "✅ Final Updated SecondaryManageAccess:",
//           updatedAccessString
//         );

//         // Step 5: Update in SharePoint
//         SpServices.SPUpdateItem({
//           ID: parentId,
//           Listname: listName,
//           RequestJSON: {
//             SecondaryManageAccess: updatedAccessString,
//           },
//         });
//       } else {
//         SpServices.SPUpdateItem({
//           ID: parentId,
//           Listname: listName,
//           RequestJSON: {
//             SecondaryManageAccess: initialMAUsersString,
//           },
//         });
//       }
//     });
//   } catch (error) {
//     console.log("Error updating secondary MA users:", error);
//   }
// };

const updateSecondaryMAUsers = async (
  updatedCurrentUsersList: any[], // final selected users
  childId: number,
  listName: string,
  parentId: number
) => {
  try {
    const resRaw = await SpServices.SPReadItemUsingId({
      Listname: listName,
      SelectedId: parentId,
      Select: "",
      Expand: "",
    });
    // If resRaw is an array, get the first item; else use as is
    const res = Array.isArray(resRaw) ? resRaw[0] : resRaw;

    const finalEmails = updatedCurrentUsersList.map((u) =>
      u.Email.toLowerCase()
    );

    // Parse the SecondaryManageAccess string
    const accessMap: Record<number, string[]> = {};
    (res?.SecondaryManageAccess || "").split("~").forEach((group: any) => {
      const [projectIdStr, emailsStr] = group.split("|");
      const projectId = parseInt(projectIdStr);
      const emails = emailsStr?.split(",").map((e: any) => e.trim()) || [];
      accessMap[projectId] = emails;
    });

    // Update only the specified childId → override with finalEmails
    accessMap[childId] = finalEmails;

    // Rebuild the SecondaryManageAccess string
    const updatedAccessString = Object.entries(accessMap)
      .filter(([, emails]) => emails.length > 0) // skip empty lists
      .map(([projId, emails]) => `${projId}|${emails.join(",")}`)
      .join("~");

    // Update in SharePoint
    await SpServices.SPUpdateItem({
      ID: parentId,
      Listname: listName,
      RequestJSON: {
        SecondaryManageAccess: updatedAccessString,
      },
    });

    console.log("✅ Final Updated SecondaryManageAccess:", updatedAccessString);
  } catch (error) {
    console.log("❌ Error updating secondary MA users:", error);
  }
};

export {
  peopleHandler,
  manageAccessUsersSerialized,
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  appendCategoryToFileName,
  removeCategoryFromFileName,
  submitManageAccessForm,
  updateSecondaryMAUsers,
};
