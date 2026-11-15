import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const registerSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
    confirmPassword: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password", "confirmPassword"],
  additionalProperties: false,
};

const registerValidation = ajv.compile(registerSchema);

export default registerValidation;
