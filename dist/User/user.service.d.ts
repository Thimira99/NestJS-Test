import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    startSession(): Promise<import("mongodb").ClientSession>;
    createUser(userData: any): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserById(userId: string): Promise<User>;
    updateUser(userId: string, userData: any): Promise<User>;
    deleteUser(userId: string): Promise<User>;
}
