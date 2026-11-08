import type { Request, Response, NextFunction } from "express";
import { ValidatorError } from "./ValidatorError";
import { NewspostsServiceError } from "./NewspostsServiceError";
import logger from "../logger.js";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ValidatorError) {
    logger.warn(err.message);

    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof NewspostsServiceError) {
    logger.error(err.message, { stack: err.stack });

    return res.status(500).json({
      message: err.message,
    });
  }

  logger.error(err.message, { stack: err.stack });

  return res.status(500).json({
    message: "Internal Server Error",
  });
};

export default errorHandler;
