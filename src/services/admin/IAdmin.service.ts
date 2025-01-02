import { IUser } from "../../interfaces/IUser.interface";

export interface IAdminService {
  createAdmin(name: string, email: string, password: string): Promise<IUser>;
  getAllStudents(): Promise<IUser[] | []>;
  getStudentById(id: string): Promise<IUser | null>;
  isAdminExists(email: string, password: string): Promise<IUser>;
  findStudentByIdAndDelete(id: string): Promise<IUser>;
}
