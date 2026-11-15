import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

interface BaseEntity {
  id: string;
}

type Schema = Record<string, unknown>;

const schemas: Record<string, Schema> = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function registerSchema(name: string, schema: Schema): void {
  schemas[name] = schema;
}

class FileTable<T extends BaseEntity> {
  private file: string;
  private schema: Schema;

  constructor(name: string, schema: Schema) {
    this.file = path.join(__dirname, "data", `${name}.json`);
    this.schema = schema;
  }

  getAll(): T[] {
    const data = fs.readFileSync(this.file, "utf-8");
    const records = JSON.parse(data) as Record<string, unknown>[];

    return records.map((record) => {
      const entity = { ...record };

      for (const [key, fieldType] of Object.entries(this.schema)) {
        if (fieldType === Date && entity[key] !== undefined) {
          entity[key] = new Date(String(entity[key]));
        }
      }

      return entity as T;
    });
  }

  getById(id: string): T | undefined {
    const data = this.getAll();

    return data.find((item) => item.id === id);
  }

  create(data: Partial<Omit<T, "id">>): T {
    const records = this.getAll();

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key]) => key in this.schema && key !== "id",
      ),
    );

    for (const [key, fieldType] of Object.entries(this.schema)) {
      if (fieldType === Date && filteredData[key] === undefined) {
        filteredData[key] = new Date();
      }
    }

    const entity = {
      ...filteredData,
      id: randomUUID(),
    } as T;

    records.push(entity);

    fs.writeFileSync(this.file, JSON.stringify(records, null, 2));

    return entity;
  }

  update(id: string, updates: Partial<Omit<T, "id">>): T | null {
    const records = this.getAll();

    const index = records.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const current = records[index];

    if (!current) return null;

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(
        ([key]) => key in this.schema && key !== "id",
      ),
    );

    const updatedEntity = {
      ...current,
      ...filteredUpdates,
    };

    records[index] = updatedEntity as T;

    fs.writeFileSync(this.file, JSON.stringify(records, null, 2));

    return records[index] ?? null;
  }

  delete(id: string): string | null {
    const records = this.getAll();

    const newData = records.filter((item) => item.id !== id);

    if (newData.length === records.length) return null;

    fs.writeFileSync(this.file, JSON.stringify(newData, null, 2));

    return id;
  }
}

function getTable<T extends BaseEntity>(name: string): FileTable<T> {
  return new FileTable<T>(name, schemas[name] ?? {});
}

export default {
  registerSchema,
  getTable,
};
