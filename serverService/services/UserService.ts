import UserRepository from "../users/UserRepository.js";

class UserService {
  getUserById(id: string) {
    const user = UserRepository.getById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}

export default new UserService();
