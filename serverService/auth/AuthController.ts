import { AuthService } from "./AuthService.js";
import { type Request, type Response } from "express";

class AuthController {
  private readonly authService = new AuthService();

  register = async (req: Request, res: Response) => {
    try {
      const { email, password, confirmPassword } = req.body;

      const result = await this.authService.register(
        email,
        password,
        confirmPassword,
      );

      res.status(201).json(result);
    } catch (err: unknown) {
      if (err instanceof Error) res.status(400).json({ error: err.message });
      else res.status(500).json({ error: "internal_server_error" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      res.status(201).json(result);
    } catch (err: unknown) {
      if (err instanceof Error) res.status(400).json({ error: err.message });
      else res.status(500).json({ error: "internal_server_error" });
    }
  };
}

export default new AuthController();
