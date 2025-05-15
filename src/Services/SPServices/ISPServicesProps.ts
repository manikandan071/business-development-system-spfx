/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFilter {
  FilterKey: string | any;
  FilterValue: string | any;
  Operator: string | any;
}

export interface IListItems {
  Listname: string | any;
  Select?: string | any;
  Topcount?: number | any;
  Expand?: string | any;
  Orderby?: string | any;
  Orderbydecorasc?: boolean | any;
  Filter?: IFilter[] | any;
  FilterCondition?: string | any;
  PageCount?: number | any;
  PageNumber?: number | any;
}

export interface IListItemUsingId {
  Listname: string | any;
  Select?: string | any;
  Expand?: string | any;
  SelectedId: number | any;
}

export interface IAddList {
  Listname: string | any;
  RequestJSON: object;
}

export interface ISPList {
  Listname: string | any;
  ID: number | any;
}

export interface ISPListChoiceField {
  Listname: string | any;
  FieldName: string | any;
}

export interface IUpdateList {
  Listname: string | any;
  RequestJSON: object;
  ID: number | any;
}

export interface IDetailsListGroup {
  Data: any[] | any;
  Column: string | any;
}

export interface IPeopleObj {
  key: number | any;
  imageUrl: string | any;
  text: string | any;
  secondaryText: string | any;
  ID: number | any;
  isValid: boolean | any;
}

export interface IAttachContents {
  name: string | any;
  content: [] | any;
}

export interface IAttachDelete {
  ListName: string | any;
  ListID: number | any;
  AttachmentName: string | any;
}

export interface ISPAttachments {
  ListName: string | any;
  ListID: number | any;
  Attachments: IAttachContents[] | any;
}
export interface ISPAttachment {
  ListName: string | any;
  FileName: string | any;
  ListID: number | any;
  Attachments: IAttachContents[] | any;
}
