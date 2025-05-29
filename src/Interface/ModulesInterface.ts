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
  ManageAccess: IUserDetails[];
}
export { IProjectDetails };
