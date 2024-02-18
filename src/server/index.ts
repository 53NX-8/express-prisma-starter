require("dotenv").config();
import config from "config";
import validateEnv from "../utils/validateEnv";
import prisma from "../lib/client";
import createServer from "../utils/server";

validateEnv();

const app = createServer()

async function bootstrap() {
    const port = config.get<number>("port");
    app.listen(port, () => {
        console.log(`🚀Server running on http://localhost:${port}`);
    });
}

bootstrap()
    .catch((err) => {
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
