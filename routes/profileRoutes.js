const express = require("express");

const router = express.Router();
const users = require("../Models/users");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Resend } = require("resend");
const { passwordResetLimiter } = require("../middleware/rate-limit");

const resend = new Resend(process.env.RESEND_API_KEY);

// A recuperacao por e-mail foi pausada ate que um dominio de envio seja
// configurado e verificado no Resend. Manter as rotas responde de forma
// previsivel sem executar nenhuma etapa de geracao ou validacao de codigo.
const passwordRecoveryUnavailable = (req, res) => {
    return res.status(503).json({
        error: "A recuperacao de senha por e-mail esta temporariamente indisponivel."
    });
};

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna o usuário autenticado
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido ou expirado
 */
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await users
            .findById(req.user.userId)
            .select("-senha -resetPasswordToken -resetPasswordExpires");

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        res.status(200).json({
            message: "Você está autenticada!",
            user
        });
    } catch (err) {
        console.error("Erro ao buscar perfil:", err);

        res.status(500).json({
            error: "Erro ao buscar perfil"
        });
    }
});

/**
 * @swagger
 * /profile/change:
 *   patch:
 *     summary: Atualiza o usuário
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
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
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar perfil
 */
router.patch("/profile/change", auth, async (req, res) => { 
    try {
        const { name, email, bio } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                error: "Todos os campos são obrigatórios"
            });
        }

        if (typeof bio !== 'undefined' && (typeof bio !== 'string' || bio.length > 280)) {
            return res.status(400).json({ error: "A biografia deve ter até 280 caracteres" });
        }

        const userChange = await users.findByIdAndUpdate(
            req.user.userId,
            { name, email, ...(typeof bio === 'string' ? { bio: bio.trim() } : {}) },
            { new: true }
        ).select("-senha -resetPasswordToken -resetPasswordExpires");

        if (!userChange) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: userChange
        });

    } catch (err) {
        console.error("Erro ao atualizar nome:", err);

        res.status(500).json({
            error: "Erro ao atualizar perfil"
        });
    }
});


/**
 * @swagger
 * /profile/password:
 *   patch:
 *     summary: Atualiza a senha do usuário
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senhaAtual:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       500:
 *         description: Erro ao mudar senha
 */
router.patch("/profile/password", auth, async (req, res) => {
    try {
        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha) {
            return res.status(400).json({
                error: "A senha atual e a nova senha são obrigatórias"
            });
        }

        const user = await users.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        const senhaValida = await bcrypt.compare(
            senhaAtual,
            user.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                error: "Senha atual incorreta"
            });
        }

        const novaSenhaHash = await bcrypt.hash(
            novaSenha,
            10
        );

        user.senha = novaSenhaHash;

        await user.save();

        res.status(200).json({
            message: "Senha atualizada com sucesso!"
        });

    } catch (err) {
        console.error("Erro ao atualizar senha:", err);

        res.status(500).json({
            error: "Erro ao atualizar senha"
        });
    }
});
[]
/**
 * @swagger
 * /profile/forgot-password:
 *   post:
 *     summary: Solicita recuperação de senha
 *     description: Gera um código de recuperação e envia para o e-mail do usuário.
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@exemplo.com
 *     responses:
 *       200:
 *         description: Código de recuperação enviado com sucesso
 *       400:
 *         description: E-mail não informado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao solicitar recuperação de senha
 */
router.post("/profile/forgot-password", passwordRecoveryUnavailable, passwordResetLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "O e-mail é obrigatório"
            });
        }

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        const resetToken = crypto
            .randomInt(100000, 1000000)
            .toString();

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        const { data, error } = await resend.emails.send({
            from: "Hunters.doc <onboarding@resend.dev>",
            to: [email],
            subject: "Código para redefinir sua senha",
            text: `Seu código de recuperação é: ${resetToken}`
        });

        if (error) {
            console.error("Erro ao enviar e-mail:", error);

            return res.status(500).json({
                error: "Não foi possível enviar o código de recuperação"
            });
        }

        console.log("E-mail enviado:", data);

        return res.status(200).json({
            message: "Código de recuperação enviado para o seu e-mail."
        });

    } catch (err) {
        console.error("Erro ao solicitar recuperação:", err);

        return res.status(500).json({
            error: "Erro ao solicitar recuperação de senha"
        });
    }
});


/**
 * @swagger
 * /profile/verify-code:
 *   post:
 *     summary: Verifica o código de recuperação de senha
 *     description: Verifica se o código enviado por e-mail é válido e ainda não expirou.
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - resetToken
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@exemplo.com
 *               resetToken:
 *                 type: string
 *                 example: "583214"
 *     responses:
 *       200:
 *         description: Código válido
 *       400:
 *         description: Código ou e-mail inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao verificar código de recuperação
 */
router.post("/profile/verify-code", passwordRecoveryUnavailable, passwordResetLimiter, async (req, res) => {

    try {
        const { email, resetToken } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "O e-mail é obrigatório"
            });
        }

        if (!resetToken) {
            return res.status(400).json({
                error: "O código é obrigatório"
            });
        }

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        if (user.resetPasswordToken !== resetToken) {
            return res.status(400).json({
                error: "Código de recuperação inválido"
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                error: "Código de recuperação expirado"
            });
        }

        return res.status(200).json({
            message: "Código válido. Você pode redefinir sua senha."
        });

    } catch (err) {

        console.error("Erro ao verificar código:", err);

        res.status(500).json({
            error: "Erro ao verificar código de recuperação"
        });
    }
});


/**
 * @swagger
 * /profile/reset-password:
 *   patch:
 *     summary: Redefine a senha usando um token de recuperação
 *     description: Redefine a senha do usuário usando o token de recuperação enviado por e-mail.
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - novaSenha
 *             properties:
 *               token:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao atualizar senha
 */
router.patch("/profile/reset-password", passwordRecoveryUnavailable, passwordResetLimiter, async (req, res) => {
    try {
        const { token, novaSenha } = req.body;

        if (!token || !novaSenha) {
            return res.status(400).json({
                error: "O token e a nova senha são obrigatórios"
            });
        }

        const user = await users.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                error: "Token inválido ou expirado"
            });
        }

        const novaSenhaHash = await bcrypt.hash(
            novaSenha,
            10
        );

        user.senha = novaSenhaHash;

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({
            message: "Senha atualizada com sucesso!"
        });

    } catch (err) {
        console.error("Erro ao atualizar senha:", err);

        res.status(500).json({
            error: "Erro ao atualizar senha"
        });
    }
});


/**
 * @swagger
 * /profile/delete-profile:
 *   delete:
 *     summary: Excluir o perfil do usuário autenticado
 *     description: Exclui permanentemente a conta do usuário atualmente autenticado.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil excluído com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao excluir perfil
 */
router.delete("/profile/delete-profile", auth, async (req, res) => {
    try {
        const userId = req.user.userId;

        const deletedUser = await users.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        res.status(200).json({
            message: "Perfil excluído com sucesso!"
        });

    } catch (err) {
        console.error("Erro ao excluir perfil:", err);

        res.status(500).json({
            error: "Erro ao excluir perfil"
        });
    }
});


module.exports = router;
