import { IUser } from "../../interfaces/IUser.interface";

export interface IStudentRepository {
  createStudent(student: IUser): Promise<IUser>;
  updateStudent(id: string, student: Partial<IUser>): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserById(id: string): Promise<IUser | null>;
}
