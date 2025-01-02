import mongoose from "mongoose";
import { IUser } from "../../interfaces/IUser.interface";
import { IAdminRepository } from "../../repositories/admin/IAdmin.repository";
import { BcryptPass } from "../../utils/bcrypt";
import { IAdminService } from "./IAdmin.service";

export class AdminService implements IAdminService {
  private adminRepository: IAdminRepository;
  private bcryptPass: BcryptPass;
  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
    this.bcryptPass = new BcryptPass();
  }

  async createAdmin(
    name: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const isEmailExistsInDB = await this.adminRepository.findUserWithEmail(
      email
    );
    if (isEmailExistsInDB) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await this.bcryptPass.hashPassword(password);
    return await this.adminRepository.createAdmin(name, email, hashedPassword);
  }

  async isAdminExists(email: string, password: string): Promise<IUser> {
    const isAdminWithEmailExists = await this.adminRepository.findUserWithEmail(
      email
    );
    if (!isAdminWithEmailExists) {
      throw new Error("Invalid Admin Credential");
    }
    const isAdminPasswordMatch = await this.bcryptPass.comparePassword(
      password,
      isAdminWithEmailExists.password
    );
    if (!isAdminPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    return isAdminWithEmailExists;
  }

  async getAllStudents(): Promise<IUser[] | []> {
    return await this.adminRepository.getAllStudents();
  }

  async getStudentById(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid student ID");
    }
    return this.adminRepository.getStudentById(id);
  }

  async findStudentByIdAndDelete(id: string): Promise<IUser> {
    const student = await this.adminRepository.findStudentByIdAndDelete(id);
    if (!student) {
      throw new Error("Invalid student ID");
    }
    return student;
  }
}
