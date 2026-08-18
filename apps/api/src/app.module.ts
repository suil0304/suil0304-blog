import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./config/index.ts";
import { PrismaModule } from "./prisma/prisma.module.ts";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: config
        }),
        PrismaModule
    ],
})
export class AppModule {}