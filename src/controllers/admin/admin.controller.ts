import { Request, Response } from "express";
import { IAdminService } from "../../services/admin/IAdmin.service";
import { generateAccessToken } from "../../utils/jwt";
import { set_token } from "../../utils/setToken";

export class AdminController {
  private adminService: IAdminService;
  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }
  async registerAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body as {
        name: string;
        email: string;
        password: string;
      };
      await this.adminService.createAdmin(name, email, password);
      res
        .status(201)
        .json({ success: true, message: "Registered Successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const admin = await this.adminService.isAdminExists(email, password);
      const token = generateAccessToken({ id: admin._id!, role: admin.role });
      set_token("adminToken", token, 24 * 60 * 60 * 1000, res);
      res.status(200).json({
        success: true,
        message: "Login successful",
        admin: {
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async adminLogout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("adminToken");
      res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await this.adminService.getAllStudents();
      res.status(200).json({ success: true, students });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async getStudentDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const student = await this.adminService.getStudentById(id);
      res.status(200).json({ success: true, student });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      await this.adminService.findStudentByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Student removed" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
}
