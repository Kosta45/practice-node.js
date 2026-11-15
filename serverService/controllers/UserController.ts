import type { Request, Response, NextFunction } from "express";

class UserController {
  getUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, email } = req.user as { id: string; email: string };

      res.status(200).json({ id, email });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
