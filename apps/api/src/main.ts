import { NestFactory } from "@nestjs/core";
import { ValidationPipe, type INestApplication } from "@nestjs/common";
import { AppModule } from "./app.module.ts";

async function bootstrap() {
    const app:INestApplication = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    );
    
    await app.listen(Deno.env.get("PORT") || 3000);
}

void bootstrap();