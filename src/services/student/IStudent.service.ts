import { IUser } from "../../interfaces/IUser.interface";

export interface IStudentService {
  createStudent(student: IUser): Promise<IUser>;
  checkStudentExistence(email: string, password: string): Promise<IUser>;
  updateStudent(id: string, student: Partial<IUser>): Promise<IUser | null>;
  findUserById(id: string): Promise<IUser>;
}
