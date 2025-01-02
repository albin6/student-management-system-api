import { IUser } from "../../interfaces/IUser.interface";

export interface IAdminRepository {
  createAdmin(name: string, email: string, password: string): Promise<IUser>;
  findUserWithEmail(email: string): Promise<IUser | null>;
  getAllStudents(): Promise<IUser[]>;
  getStudentById(id: string): Promise<IUser | null>;
  findStudentByIdAndDelete(id: string): Promise<IUser | null>;
}
