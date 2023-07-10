import { Model, ClientSession } from "mongoose";
import { User } from "./schemas/user.schema";
export declare class UserService {
    private userModel;
    private session;
    constructor(userModel: Model<User>, session: ClientSession);
    createUser(userData: any): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserById(userId: string): Promise<User>;
    updateUser(userId: string, userData: any): Promise<User>;
    deleteUser(userId: string): Promise<User>;
}
