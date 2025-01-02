import express, { Request, Response } from "express";
import { AdminController } from "../controllers/admin/admin.controller";

export class AdminRoute {
  private adminController: AdminController;
  private adminRouter: express.Router;
  constructor(adminController: AdminController) {
    this.adminController = adminController;
    this.adminRouter = express.Router();
    this.setRoutes();
  }
  private setRoutes() {
    this.adminRouter.post("/register", (req: Request, res: Response) =>
      this.adminController.registerAdmin(req, res)
    );
    this.adminRouter.post("/login", (req: Request, res: Response) =>
      this.adminController.adminLogin(req, res)
    );
    this.adminRouter.post("/logout", (req: Request, res: Response) =>
      this.adminController.adminLogout(req, res)
    );
    this.adminRouter.get("/students", (req: Request, res: Response) =>
      this.adminController.getAllStudents(req, res)
    );
    this.adminRouter.delete("/students/:id", (req: Request, res: Response) =>
      this.adminController.deleteStudent(req, res)
    );
  }
  public getAdminRouter() {
    return this.adminRouter;
  }
}
