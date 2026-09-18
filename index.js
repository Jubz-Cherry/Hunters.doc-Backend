const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "atlas-credentials.env") });

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000,http://127.0.0.1:3000").split(",").map((origin) => origin.trim()).filter(Boolean);
const isProduction = process.env.NODE_ENV === "production";

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET não configurada. Defina a variável de ambiente antes de iniciar a API.");
    process.exit(1);
}

// Render (e a maioria dos PaaS) fica atrás de um único proxy reverso; sem isso o
// express-rate-limit não confia no X-Forwarded-For e não consegue identificar o IP do cliente.
app.set("trust proxy", 1);
app.disable("x-powered-by");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const monsterRoutes = require("./routes/monsterRoutes");;
const authRoutes = require("./routes/authRoutes");
const gunRoutes = require("./routes/gunRoutes");
const markRoutes = require("./routes/markRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notesRoutes = require("./routes/notesRoutes");
const auth = require("./middleware/auth");

app.use(helmet({
    crossOriginResourcePolicy: false
}));
app.use(express.json({ limit: "1mb" }));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Origem não permitida pelo CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//swagger
if (!isProduction) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

//imagens
app.use(
    "/imagens",
    express.static(path.join(__dirname, "public/imagens"))
);
app.use(
    "/imguns",
    express.static(path.join(__dirname, "public/imguns"))
);
app.use(
    "/imgmark",
    express.static(path.join(__dirname, "public/imgmark"))
);


// Rotas públicas
app.use(authRoutes);

// Rotas autenticadas
app.use(monsterRoutes);
app.use(gunRoutes);
app.use(markRoutes)
app.use(profileRoutes);
app.use(notesRoutes);

// MongoDB
if (!mongoUri) {
    console.warn("MONGO_URI/MONGODB_URI não encontrado. O app vai subir sem banco conectado.");
}

mongoose
    .connect(mongoUri || "mongodb://127.0.0.1:27017/huntersdoc")
    .then(() => {
        console.log("Mongo funcionando!");
    })
    .catch((err) => {
        console.log("Mongo não está conectado", err);
    });


// Servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});