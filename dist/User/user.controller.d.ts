import { UserService } from './user.service';
import { User } from './schemas/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(userData: any): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserById(userId: string): Promise<User>;
    updateUser(userId: string, userData: any): Promise<User>;
    deleteUser(userId: string): Promise<User>;
}
