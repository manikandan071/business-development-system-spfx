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
  Status : string;
  ManageAccess: IUserDetails[];
}

interface IcountriesType{
  ID:number,
  countryName:string,
  ISOCode:string,
    Manager:any[],
    Languages:string,
    Region:string,
    Currency:string,
    TimeZone:string,
    Status:string,
    Notes:string,
    ManageAccess: IUserDetails[],
    ManageAccessFormFormat:any[]
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

export { IProjectDetails,IcountriesType,IallCountriesType };