import {
  Strategy,
  ExtractJwt,
  type StrategyOptions,
  type VerifiedCallback,
} from "passport-jwt";
import type { JwtPayload } from "jsonwebtoken";
import UserRepository from "../../users/UserRepository.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

interface CustomPayload extends JwtPayload {
  userId: string;
  email: string;
}

const jwtStrategy = new Strategy(
  options,
  (payload: CustomPayload, done: VerifiedCallback) => {
    try {
      const user = UserRepository.getById(payload.userId);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(null, error);
    }
  },
);

export default jwtStrategy;
