import { Request, Response } from "express";
import { IStudentService } from "../../services/student/IStudent.service";
import { IUser } from "../../interfaces/IUser.interface";
import { AuthenticatedRequest } from "../../middlewares/AuthenticatedRequest";

export class StudentController {
  private studentService: IStudentService;

  constructor(studentService: IStudentService) {
    this.studentService = studentService;
  }
  async studentRegister(req: Request, res: Response): Promise<void> {
    try {
      const student: IUser = req.body;
      const result = await this.studentService.createStudent(student);
      res.status(201).json({
        success: true,
        message: "Registration successful",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
  async studentLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const student = await this.studentService.checkStudentExistence(
        email,
        password
      );

      const userData = {
        _id: student._id,
        email: student.email,
        role: student.role,
      };

      res
        .status(200)
        .json({ success: true, message: "Login successful", user: userData });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
  async studentLogout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      res.clearCookie("userToken");
      res.status(200).json({ success: true, message: "Logout success" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async studentProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const result = await this.studentService.findUserById(id);
      res.status(200).json({ success: true, student: result });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async updateStudentProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const { studentData } = req.body as { studentData: Partial<IUser> };
      await this.studentService.updateStudent(id, studentData);
      res
        .status(200)
        .json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
}
