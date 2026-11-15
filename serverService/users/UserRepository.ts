import fileDB from "../../fileDB/fileDB.js";
import type { User } from "../../fileDB/interfaces/User.js";

const userSchema = {
  id: String,
  email: String,
  password: String,
};

fileDB.registerSchema("users", userSchema);

const usersTable = fileDB.getTable<User>("users");

class UserRepository {
  getAll(): User[] {
    return usersTable.getAll();
  }

  getById(id: string): User | undefined {
    return usersTable.getById(id);
  }

  getByEmail(email: string): User | undefined {
    return usersTable.getAll().find((user) => user.email === email);
  }

  create(user: Omit<User, "id">): User {
    return usersTable.create(user);
  }
}

export default new UserRepository();
