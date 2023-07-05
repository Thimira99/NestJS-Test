import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { startSession } from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async startSession() {
    const session = await this.userModel.db.startSession();
    return session;
  }

  async createUser(userData): Promise<User> {
    try {
      const session = await this.startSession();
      session.startTransaction();

      const createdUser = new this.userModel(userData);
      await createdUser.save({ session });
      await session.commitTransaction();

      session.endSession();

      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  // async createUser(userData): Promise<User> {
  //   try {
  //     const session = await startSession();
  //     if (!session) {
  //       throw new Error("Failed to start a session.");
  //     }
  //     session.startTransaction();

  //     const createdUser = new this.userModel(userData);
  //     await createdUser.save({ session });
  //     await session.commitTransaction();

  //     session.endSession();

  //     return createdUser;
  //   } catch (error) {
  //     // Handle the error appropriately
  //     console.error("Error creating user:", error);
  //     throw error;
  //   }
  // }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async updateUser(userId: string, userData): Promise<User> {
    const session = await startSession();
    session.startTransaction();
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, userData, { new: true, session })
        .exec();
      await session.commitTransaction();
      return updatedUser;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async deleteUser(userId: string): Promise<User> {
    const session = await startSession();
    session.startTransaction();
    try {
      const deletedUser = await this.userModel
        .findByIdAndRemove(userId, { session })
        .exec();
      await session.commitTransaction();
      return deletedUser;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
