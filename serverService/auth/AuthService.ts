import UserRepository from "../users/UserRepository.js";
import type { User } from "../../fileDB/interfaces/User.js";
import registerValidation from "../validator/registerValidator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import def from "ajv/dist/vocabularies/applicator/additionalItems.js";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthService {
  private generateToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "1h" });
  }

  async register(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    if (!registerValidation({ email, password, confirmPassword })) {
      throw new Error("Password or email is invalid.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = UserRepository.getByEmail(normalizedEmail);

    if (existingUser) {
      throw new Error("User already exists!");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = UserRepository.create({
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = this.generateToken(user.id, user.email);

    return {
      user: { id: user.id, email: user.email },
      token: `Bearer ${token}`,
    };
  }

  async login(dataUser: LoginData) {
    const normalizedEmail = dataUser.email.trim().toLowerCase();
    const existingUser = UserRepository.getByEmail(normalizedEmail);

    if (!existingUser) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(
      dataUser.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error("invalid_email_or_password");
    }

    const token = this.generateToken(existingUser.id, dataUser.email);
    return { token: `Bearer ${token}` };
  }
}
