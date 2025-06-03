import { IUserDetails } from "./CommonInterface";

interface IProjectDetails {
  Id: number;
  ProjectName: string;
  Description: string;
  ProjectType: string;
  CountryId: number;
  CountryName: string;
  City: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  ManageAccess: IUserDetails[];
}

interface IcountriesType {
  ID: number;
  countryName: string;
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
interface IallCountriesType {
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
}

interface IallTasksType {
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
  ManageAccess: IUserDetails[];
  ManageAccessFormFormat: any[];
  ProjectOfId: number;
}

export {
  IProjectDetails,
  IcountriesType,
  IallCountriesType,
  IObligationDetails,
  ICalenderDetails,
  IallTasksType,
  IDocumentsDetails,
};
