import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";

export const sessionProvider: Provider = {
  provide: "DB_SESSION",
  useFactory: async (connection: Connection): Promise<any> => {
    const session = await connection.startSession();
    session.startTransaction();
    return session;
  },
  inject: [Connection],
};
