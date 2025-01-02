import { IUser } from "../../interfaces/IUser.interface";
import { IAdminRepository } from "./IAdmin.repository";
import User from "../../models/user.model";

export class AdminRepository implements IAdminRepository {
  async createAdmin(
    name: string,
    email: string,
    password: string
  ): Promise<IUser> {
    return await User.create({ name, email, password, role: "admin" });
  }
  async findUserWithEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
  async getAllStudents(): Promise<IUser[]> {
    return await User.find({ role: "user" }).select("-password");
  }
  async getStudentById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
  async findStudentByIdAndDelete(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}
