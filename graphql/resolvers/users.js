import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/keys.js";
import { UserInputError } from "apollo-server";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validator.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const usersResolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    register: async (
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirmPassword,
        email
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res.user);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
