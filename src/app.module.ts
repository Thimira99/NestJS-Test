import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./User/user.module";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      "mongodb+srv://thimira:1111@new.m5idioa.mongodb.net/"
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
