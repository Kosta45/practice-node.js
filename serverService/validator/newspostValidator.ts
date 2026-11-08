import Ajv from "ajv";

const ajv = new Ajv();

const newspostSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 50 },
    text: {
      type: "string",
      maxLength: 256,
    },
    genre: {
      type: "string",
      enum: ["Politic", "Business", "Sport", "Other"],
    },
    isPrivate: { type: "boolean" },
  },
  required: ["title", "text", "genre", "isPrivate"],
  additionalProperties: false,
};

const updateNewspostSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 50 },
    text: {
      type: "string",
      maxLength: 256,
    },
    genre: {
      type: "string",
      enum: ["Politic", "Business", "Sport", "Other"],
    },
    isPrivate: { type: "boolean" },
  },
  minProperties: 1,
  additionalProperties: false,
};

const validateNewspost = ajv.compile(newspostSchema);
const validateUpdateNewspost = ajv.compile(updateNewspostSchema);

const newspostValidator = {
  create: validateNewspost,
  update: validateUpdateNewspost,
};

export default newspostValidator;
