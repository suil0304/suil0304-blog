import { registerAs } from "@nestjs/config";
import prismaConfig from "../../prisma.config.ts";

export default registerAs("database", () => {
    return {
        url: prismaConfig.datasource?.url!
    }
});