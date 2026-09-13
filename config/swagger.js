const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Hunters.doc API",
            version: "1.0.0",
            description: "Documentação da API do Hunters.doc"
        },

        servers: [
            {
                url: "http://localhost:3001"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        path.resolve(__dirname, "../routes/authRoutes.js"),
        path.resolve(__dirname, "../routes/monsterRoutes.js"),
        path.resolve(__dirname, "../routes/gunRoutes.js"),
        path.resolve(__dirname, "../routes/profileRoutes.js"),
        path.resolve(__dirname, "../routes/notesRoutes.js")
    ]
};

const swaggerSpec = swaggerJsdoc(options);

console.log(
    "Rotas encontradas pelo Swagger:",
    Object.keys(swaggerSpec.paths || {})
);

module.exports = swaggerSpec;