import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ClientSession } from "mongoose";
import { User } from "./schemas/user.schema";
import { Connection } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject("DB_SESSION") private session: ClientSession
  ) {}

  async createUser(userData): Promise<User> {
    try {
      const createdUser = new this.userModel(userData);
      await createdUser.save({ session: this.session });
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async updateUser(userId: string, userData): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, userData, {
          new: true,
          session: this.session,
        })
        .exec();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<User> {
    try {
      const deletedUser = await this.userModel
        .findByIdAndRemove(userId, { session: this.session })
        .exec();
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
