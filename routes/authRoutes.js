const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const users = require("../Models/users");
const auth = require("../middleware/auth");
const { authLimiter } = require("../middleware/rate-limit");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registro de usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro de usuário realizado com sucesso
 *       400:
 *         description: E-mail já cadastrado
 *       500:
 *         description: Erro ao criar usuário
 */
router.post("/register", authLimiter, async (req, res) => {
    try {
        const name = String(req.body.name || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const senha = String(req.body.senha || "");

        if (!name || !email || !senha) {
            return res.status(400).json({
                error: "Todos os campos são obrigatórios"
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                error: "A senha deve ter pelo menos 6 caracteres"
            });
        }

        const userExist = await users.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                error: "E-mail já cadastrado"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const newUser = new users({
            name,
            email,
            senha: senhaHash
        });

        await newUser.save();

        res.status(201).json({
            message: "Usuário criado com sucesso!"
        });

    } catch (err) {
        console.error("Erro ao criar usuário:", err);

        res.status(500).json({
            error: "Erro ao criar usuário"
        });
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Email ou senha inválidos
 */
router.post("/login", authLimiter, async (req, res) => {
    const email = String(req.body.email || "").trim().toLowerCase();
    const senha = String(req.body.senha || "");

    if (!email || !senha) {
        return res.status(400).json({
            error: "Email e senha são obrigatórios"
        });
    }

    try {
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            user.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login efetuado com sucesso!",
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Erro no login:", err);

        res.status(500).json({
            error: "Erro no servidor"
        });
    }
});


module.exports = router;
