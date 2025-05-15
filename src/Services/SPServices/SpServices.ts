/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-var */
// /* eslint-disable prefer-const */
// /* eslint-disable eqeqeq */
import { sp } from "@pnp/sp/presets/all";
import {
  IFilter,
  IListItems,
  IListItemUsingId,
  IAddList,
  IUpdateList,
  ISPList,
  IDetailsListGroup,
  ISPAttachments,
  ISPAttachment,
  IAttachDelete,
  ISPListChoiceField,
} from "./ISPServicesProps";
import { IItemAddResult } from "@pnp/sp/items";
import "@pnp/sp/webs";

const getAllUsers = async (): Promise<any[]> => {
  return await sp.web.siteUsers();
};

const SPAddItem = async (params: IAddList): Promise<IItemAddResult> => {
  return await sp.web.lists
    .getByTitle(params.Listname)
    .items.add(params.RequestJSON);
};

const SPUpdateItem = async (params: IUpdateList): Promise<IItemAddResult> => {
  return await sp.web.lists
    .getByTitle(params.Listname)
    .items.getById(params.ID)
    .update(params.RequestJSON);
};

const SPDeleteItem = async (params: ISPList): Promise<any> => {
  return await sp.web.lists
    .getByTitle(params.Listname)
    .items.getById(params.ID)
    .recycle();
};

const formatInputs = (data: IListItems): IListItems => {
  data.Select ??= "*";
  data.Topcount ??= 5000;
  data.Orderby ??= "ID";
  data.Expand ??= "";
  data.Orderbydecorasc ??= true;
  data.PageCount ??= 10;
  data.PageNumber ??= 1;

  return data;
};

const formatFilterValue = (
  params: IFilter[] | undefined,
  filterCondition: string
): string => {
  let strFilter: string = "";
  if (params) {
    for (let i = 0; i < params.length; i++) {
      if (params[i].FilterKey) {
        if (i !== 0) {
          if (filterCondition === "and" || filterCondition === "or") {
            strFilter += " " + filterCondition + " ";
          } else {
            strFilter += " and ";
          }
        }

        if (
          params[i].Operator.toLowerCase() === "eq" ||
          params[i].Operator.toLowerCase() === "ne" ||
          params[i].Operator.toLowerCase() === "gt" ||
          params[i].Operator.toLowerCase() === "lt" ||
          params[i].Operator.toLowerCase() === "ge" ||
          params[i].Operator.toLowerCase() === "le"
        )
          strFilter +=
            params[i].FilterKey +
            " " +
            params[i].Operator +
            " '" +
            params[i].FilterValue +
            "'";
        else if (params[i].Operator.toLowerCase() === "substringof")
          strFilter +=
            params[i].Operator +
            "('" +
            params[i].FilterKey +
            "','" +
            params[i].FilterValue +
            "')";
      }
    }
  }
  return strFilter;
};

const SPReadItems = async (params: IListItems): Promise<any[]> => {
  params = formatInputs(params);
  let filterValue: string = formatFilterValue(
    params.Filter,
    params.FilterCondition ? params.FilterCondition : ""
  );

  return await sp.web.lists
    .getByTitle(params.Listname)
    .items.select(params.Select)
    .filter(filterValue)
    .expand(params.Expand)
    .top(params.Topcount)
    .orderBy(params.Orderby, params.Orderbydecorasc)
    .get();
};

const SPReadItemUsingId = async (params: IListItemUsingId): Promise<any[]> => {
  return await sp.web.lists
    .getByTitle(params.Listname)
    .items.getById(params.SelectedId)
    .select(params.Select)
    .expand(params.Expand)
    .get();
};

const SPAddAttachments = async (params: ISPAttachments) => {
  const files: any[] = params.Attachments;
  return await sp.web.lists
    .getByTitle(params.ListName)
    .items.getById(params.ListID)
    .attachmentFiles.addMultiple(files);
};
const SPAddAttachment = async (params: ISPAttachment) => {
  return await sp.web.lists
    .getByTitle(params.ListName)
    .items.getById(params.ListID)
    .attachmentFiles.add(params.FileName, params.Attachments);
};

const SPGetAttachments = async (params: ISPList) => {
  const item: any = sp.web.lists
    .getByTitle(params.Listname)
    .items.getById(params.ID);
  return await item.attachmentFiles();
};

const SPDeleteAttachments = async (params: IAttachDelete) => {
  return await sp.web.lists
    .getByTitle(params.ListName)
    .items.getById(params.ListID)
    .attachmentFiles.getByName(params.AttachmentName)
    .recycle();
};
const SPReadAttachments = async (params: IAttachDelete) => {
  return await sp.web.lists
    .getByTitle(params.ListName)
    .items.getById(params.ListID)
    .attachmentFiles.getByName(params.AttachmentName)
    .getText();
};

const SPGetChoices = async (params: ISPListChoiceField) => {
  return await sp.web.lists
    .getByTitle(params.Listname)
    .fields.getByInternalNameOrTitle(params.FieldName)
    .get();
};

const SPDetailsListGroupItems = async (params: IDetailsListGroup) => {
  let newRecords: any = [];
  params.Data.forEach((arr: any, index: any) => {
    newRecords.push({
      Lesson: arr[params.Column],
      indexValue: index,
    });
  });

  let varGroup: any = [];
  let UniqueRecords = newRecords.reduce(function (item: any, e1: any) {
    var matches = item.filter(function (e2: any) {
      return e1[params.Column] === e2[params.Column];
    });

    if (matches.length === 0) {
      item.push(e1);
    }
    return item;
  }, []);

  UniqueRecords.forEach((ur: any) => {
    let recordLength = newRecords.filter((arr: any) => {
      return arr[params.Column] === ur[params.Column];
    }).length;
    varGroup.push({
      key: ur[params.Column],
      name: ur[params.Column],
      startIndex: ur.indexValue,
      count: recordLength,
    });
  });
  return varGroup;
};

const batchInsert = async (params: {
  ListName: string;
  responseData: any[];
}): Promise<any> => {
  const list = sp.web.lists.getByTitle(params.ListName);
  const batch = sp.web.createBatch();
  const promises: any[] = [];

  for (const data of params.responseData) {
    const promise = list.items.inBatch(batch).add(data);
    promises.push(promise);
  }

  await batch.execute();
  return promises;
};

const batchUpdate = async (params: {
  ListName: string;
  responseData: any[];
}): Promise<any> => {
  const list = sp.web.lists.getByTitle(params.ListName);
  const batch = sp.web.createBatch();
  const promises: any[] = [];

  for (const data of params.responseData) {
    const promise = list.items.getById(data.ID).inBatch(batch).update(data);
    promises.push(promise);
  }

  await batch.execute();
  return promises;
};

const batchDelete = async (params: {
  ListName: string;
  responseData: any[];
}): Promise<any> => {
  const list = sp.web.lists.getByTitle(params.ListName);
  const batch = sp.web.createBatch();
  const promises: any[] = [];

  for (const data of params.responseData) {
    const promise = list.items.getById(data.ID).inBatch(batch).recycle();
    promises.push(promise);
  }

  await batch.execute();
  return promises;
};

export default {
  getAllUsers,
  SPAddItem,
  SPUpdateItem,
  SPDeleteItem,
  SPReadItems,
  SPDetailsListGroupItems,
  SPGetChoices,
  SPAddAttachments,
  SPAddAttachment,
  SPGetAttachments,
  SPDeleteAttachments,
  SPReadItemUsingId,
  batchInsert,
  batchUpdate,
  batchDelete,
  SPReadAttachments,
};
