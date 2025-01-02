import { IUser } from "../../interfaces/IUser.interface";
import User from "../../models/user.model";
import { IStudentRepository } from "./IStudent.repository";

export class StudentRepository implements IStudentRepository {
  async createStudent(student: IUser): Promise<IUser> {
    return await User.create(student);
  }
  async updateStudent(
    id: string,
    student: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, student, { new: true });
  }
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email });
  }
  async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
}
