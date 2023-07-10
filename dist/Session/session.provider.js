"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionProvider = void 0;
const mongoose_1 = require("mongoose");
exports.sessionProvider = {
    provide: "DB_SESSION",
    useFactory: async (connection) => {
        const session = await connection.startSession();
        session.startTransaction();
        return session;
    },
    inject: [mongoose_1.Connection],
};
//# sourceMappingURL=session.provider.js.map