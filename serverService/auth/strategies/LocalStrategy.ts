import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import UserRepository from "../../users/UserRepository.js";

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();

      const user = UserRepository.getByEmail(normalizedEmail);

      if (!user) {
        return done(null, false);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

export default localStrategy;
