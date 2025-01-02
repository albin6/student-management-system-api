import { IUser } from "../../interfaces/IUser.interface";
import { IStudentRepository } from "../../repositories/student/IStudent.repository";
import { BcryptPass } from "../../utils/bcrypt";
import { IStudentService } from "./IStudent.service";

export class StudentService implements IStudentService {
  private studentRepository: IStudentRepository;
  private bcryptPass: BcryptPass;
  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
    this.bcryptPass = new BcryptPass();
  }

  async createStudent(student: IUser): Promise<IUser> {
    const isEmailAlreadyExists = await this.studentRepository.findUserByEmail(
      student.email
    );
    if (isEmailAlreadyExists) {
      throw new Error("Email already exists.");
    }
    const hashedPassword = await this.bcryptPass.hashPassword(student.password);
    const studentData = {
      ...student,
      password: hashedPassword,
    };
    return await this.studentRepository.createStudent(studentData);
  }

  async checkStudentExistence(email: string, password: string): Promise<IUser> {
    const isStudentWithEmailExists =
      await this.studentRepository.findUserByEmail(email);
    if (!isStudentWithEmailExists) {
      throw new Error("Email not exists.");
    }
    const isPasswordMatch = await this.bcryptPass.comparePassword(
      password,
      isStudentWithEmailExists.password
    );
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password.");
    }
    return isStudentWithEmailExists;
  }

  async updateStudent(
    id: string,
    student: Partial<IUser>
  ): Promise<IUser | null> {
    const isPasswordUpdated = student.password;
    console.log(student);
    if (isPasswordUpdated) {
      const hashedPassword = await this.bcryptPass.hashPassword(
        isPasswordUpdated
      );
      student.password = hashedPassword;
    } else {
      delete student.password;
    }
    console.log(student);
    const updatedStudent = await this.studentRepository.updateStudent(
      id,
      student
    );
    if (!updatedStudent) {
      throw new Error("Student not found");
    }
    return updatedStudent;
  }

  async findUserById(id: string): Promise<IUser> {
    const isStudentExists = await this.studentRepository.findUserById(id);
    if (!isStudentExists) {
      throw new Error("Invalid student ID");
    }
    return isStudentExists;
  }
}
