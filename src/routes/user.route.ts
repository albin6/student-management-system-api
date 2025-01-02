import express, { Request, Response } from "express";
import { StudentController } from "../controllers/student/student.controller";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware";
import { AuthenticatedRequest } from "../middlewares/AuthenticatedRequest";

export class UserRoute {
  private studentController: StudentController;
  private userRouter: express.Router;
  constructor(studentController: StudentController) {
    this.studentController = studentController;
    this.userRouter = express.Router();
    this.setRoutes();
  }
  private setRoutes() {
    this.userRouter.post("/register", (req: Request, res: Response) =>
      this.studentController.studentRegister(req, res)
    );
    this.userRouter.post("/login", (req: Request, res: Response) =>
      this.studentController.studentLogin(req, res)
    );
    this.userRouter.post(
      "/logout",
      (req: AuthenticatedRequest, res: Response) =>
        this.studentController.studentLogout(req, res)
    );
    this.userRouter.get("/:id", (req: Request, res: Response) =>
      this.studentController.studentProfile(req, res)
    );
    this.userRouter.put("/profile/:id", (req: Request, res: Response) =>
      this.studentController.updateStudentProfile(req, res)
    );
  }
  public getStudentRouter() {
    return this.userRouter;
  }
}
