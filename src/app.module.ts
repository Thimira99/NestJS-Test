import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./User/user.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://thimira:1111@new.m5idioa.mongodb.net/"
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
