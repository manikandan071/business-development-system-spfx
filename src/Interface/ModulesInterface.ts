/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserDetails } from "./CommonInterface";

interface IProjectDetails {
  Id: number;
  ProjectName: string;
  Description: string;
  ProjectType: string;
  CountryId: number;
  CountryName: string;
  City: string;
  GoogleLocation: string;
  BrandingPartner: string;
  StartDate: string;
  EndDate: string;
  UnitSize: string;
  Status: string;
  ManageAccess: IUserDetails[];
  ManageAccessFormFormat: any[];
  BreakPermission: boolean;
}

interface ICountriesDetails {
  Id: number;
  countryName: string;
  ProjectCount?: number;
  ISOCode: string;
  Manager: any[];
  Languages: string;
  Region: string;
  Currency: string;
  TimeZone: string;
  Status: string;
  Notes: string;
  ManageAccess: IUserDetails[];
  ManageAccessFormFormat: any[];
}
interface IAllCountriesJson {
  CountryName: string;
  CountryISOCode: string;
  Languages: string;
  languageOptions: string[];
  Region: string;
  Currency: string;
  TimeZone: string;
}
interface IObligationDetails {
  Id: number;
  Title: string;
  Description: string;
  ObligationType: string;
  Priority: string;
  Status: string;
  StartDate: string;
  DueDate: string;
  Party: string;
  Clause: string;
  Remarks: string;
  ProjectOfId: number;
}

interface ICalenderDetails {
  Id: number;
  EventTitle: string;
  Description: string;
  EventType: string;
  Category: string;
  EventDateTime: string;
  Location: string;
  AssignedTo: any[];
  Status: string;
  ProjectOfId: number;
  CreatedBy?: IUserDetails[];
}

interface IProjectSubTaskDeatils {
  ID: number;
  TaskTitle: string;
  Description: string;
  Priority: string;
  Status: string;
  StartDate: string;
  DueDate: string;
  AssignTo: IUserDetails[];
  isReminder: boolean;
  isTaskOverdue: boolean;
  ProjectOfID: number;
  ProjectOfTitle: string;
  CreatedBy?: IUserDetails[];
  ParentId: number;
}
interface IProjectTaskDeatils {
  ID: number;
  TaskTitle: string;
  Description: string;
  Priority: string;
  Status: string;
  StartDate: string;
  DueDate: string;
  AssignTo: IUserDetails[];
  isReminder: boolean;
  isTaskOverdue: boolean;
  ProjectOfID: number;
  ProjectOfTitle: string;
  CreatedBy?: IUserDetails[];
  SubTasks?: IProjectSubTaskDeatils[];
}
interface ITasksDetails {
  ID: number;
  TaskTitle: string;
  Description: string;
  Priority: string;
  Status: string;
  StartDate: string;
  DueDate: string;
  AssignTo: IUserDetails[];
  isReminder: boolean;
  isTaskOverdue: boolean;
  ProjectOfID: number;
  ProjectOfTitle: string;
}
interface IDocumentsDetails {
  Id: number;
  Category: string;
  ContractType: string;
  Party: string;
  Date: string;
  ManageAccess: IUserDetails[];
  ManageAccessFormFormat: any[];
  ProjectOfId: number;
}

export {
  IProjectDetails,
  ICountriesDetails,
  IAllCountriesJson,
  ITasksDetails,
  IObligationDetails,
  ICalenderDetails,
  IProjectTaskDeatils,
  IProjectSubTaskDeatils,
  IDocumentsDetails,
};
