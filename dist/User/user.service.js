"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UserService = exports.UserService = class UserService {
    constructor(userModel, session) {
        this.userModel = userModel;
        this.session = session;
    }
    async createUser(userData) {
        try {
            const createdUser = new this.userModel(userData);
            await createdUser.save({ session: this.session });
            return createdUser;
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
    async getUsers() {
        return this.userModel.find().exec();
    }
    async getUserById(userId) {
        return this.userModel.findById(userId).exec();
    }
    async updateUser(userId, userData) {
        try {
            const updatedUser = await this.userModel
                .findByIdAndUpdate(userId, userData, {
                new: true,
                session: this.session,
            })
                .exec();
            return updatedUser;
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }
    async deleteUser(userId) {
        try {
            const deletedUser = await this.userModel
                .findByIdAndRemove(userId, { session: this.session })
                .exec();
            return deletedUser;
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)("DB_SESSION")),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], UserService);
//# sourceMappingURL=user.service.js.map