interface IUserDetails {
  Id: number;
  Email: string;
  DisplayName: string;
  Permission?: string;
  ImgUrl: string;
  Key?: number;
}
interface FileItem {
  name: string;
  file: File;
  uploaded?: boolean;
  serverRelativeUrl?: string;
}
export { IUserDetails, FileItem };
