const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

// Render (e a maioria dos PaaS) fica atrás de um único proxy reverso; sem isso o
// express-rate-limit não confia no X-Forwarded-For e não consegue identificar o IP do cliente.
app.set("trust proxy", 1);

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const monsterRoutes = require("./routes/monsterRoutes");;
const authRoutes = require("./routes/authRoutes");
const gunRoutes = require("./routes/gunRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notesRoutes = require("./routes/notesRoutes");
const auth = require("./middleware/auth");

app.use(express.json());
app.use(cors());

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//imagens
app.use(
    "/imagens",
    express.static(path.join(__dirname, "public/imagens"))
);
app.use(
    "/imguns",
    express.static(path.join(__dirname, "public/imguns"))
);


// Rotas públicas
app.use(authRoutes);

// Rotas autenticadas
app.use(monsterRoutes);
app.use(gunRoutes);
app.use(profileRoutes);
app.use(notesRoutes);

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
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