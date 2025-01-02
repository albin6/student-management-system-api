import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { StudentController } from "./controllers/student/student.controller";
import { StudentRepository } from "./repositories/student/student.repository";
import { StudentService } from "./services/student/student.service";
import { UserRoute } from "./routes/user.route";
import { AdminRepository } from "./repositories/admin/AdminRepository";
import { AdminService } from "./services/admin/admin.service";
import { AdminController } from "./controllers/admin/admin.controller";
import { AdminRoute } from "./routes/admin.route";

export class App {
  private app: Application;
  constructor() {
    dotenv.config();
    this.app = express();
    this.setMiddlewares();
    this.setTestRoute();
    this.setStudentRoutes();
    this.setAdminRoutes();
  }
  private setMiddlewares() {
    this.app.use(
      cors({
        origin: process.env.CORS_ALLOWED_ORIGIN,
        credentials: true,
      })
    );
    this.app.use(express.json());
  }
  private setTestRoute() {
    this.app.get("/", (req, res) => {
      res.json({ message: "server is up and running" });
    });
  }
  private setStudentRoutes() {
    const studentController = this.injectStudent();
    const studentRouter = new UserRoute(studentController);
    this.app.use("/api/v_1/students", studentRouter.getStudentRouter());
  }
  private setAdminRoutes() {
    const adminController = this.injectAdmin();
    const adminRoute = new AdminRoute(adminController);
    this.app.use("/api/v_1/admin", adminRoute.getAdminRouter());
  }
  private injectStudent(): StudentController {
    const studentRepository = new StudentRepository();
    const studentService = new StudentService(studentRepository);
    return new StudentController(studentService);
  }
  private injectAdmin() {
    const adminRepository = new AdminRepository();
    const adminService = new AdminService(adminRepository);
    return new AdminController(adminService);
  }
  public getApp() {
    return this.app;
  }
}
