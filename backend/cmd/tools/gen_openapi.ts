import "reflect-metadata"
import { writeFileSync } from 'fs'
import apis from "backend/gateway/apis";

const OPENAPI_VERSION = "3.1.0";
const GENERATE_ROOT = "../openapi/backend";

const generateSwaggerDoc = () => {
    apis.forEach((generateFunc) => {
        const { honoAPI, config } = generateFunc();
        const doc = honoAPI.getOpenAPI31Document({
            openapi: OPENAPI_VERSION,
            info: {
                title: config.title,
                version: config.version,
                description:  config.description || `${config.title} API Documentation`,
            },
        })
        const filePath = `${GENERATE_ROOT}/${config.relativeFilePath}`;
        writeFileSync(filePath, JSON.stringify(doc, null, 2), 'utf8');
    });
}

// このファイルが実行されると、OpenAPIドキュメントが生成される
generateSwaggerDoc();