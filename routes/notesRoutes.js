const express = require("express");

const router = express.Router();

const Note = require("../Models/notes.js");

const auth = require("../middleware/auth");

/**
 * @swagger
 * /notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Lista as notas do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas do usuário
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao buscar notas
 */
router.get("/notes", auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const userNote = await Note.find({ userId });

        res.status(200).json(userNote);
    } catch (error) {
        console.error("Erro ao buscar notas:", error);

        res.status(500).json({
            message: "Erro ao buscar notas"
        });
    }
});

/**
 * @swagger
 * /notes/makenote:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Cria uma nova nota
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Lembrar depois
 *               content:
 *                 type: string
 *                 example: Comprar ingredientes para a poção
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *       400:
 *         description: Título e conteúdo são obrigatórios
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao criar nota
 */
router.post("/notes/makenote", auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId;

        if (!title || !content) {
            return res.status(400).json({
                message: "Título e conteúdo são obrigatórios"
            });
        }

        const newNote = new Note({
            titulo: req.body.title,
            conteudo: req.body.content,
            userId: req.user.userId
        });

        await newNote.save();

        res.status(201).json(newNote);
    } catch (error) {
        console.error("Erro ao criar nota:", error);

        res.status(500).json({
            message: "Erro ao criar nota"
        });
    }
});

/**
 * @swagger
 * /notes/{id}:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Atualiza uma nota do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Título atualizado
 *               content:
 *                 type: string
 *                 example: Conteúdo atualizado
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       404:
 *         description: Nota não encontrada
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao atualizar nota
 */
router.patch("/notes/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.userId;

        if (!title || !content) {
            return res.status(400).json({
                message: "Título e conteúdo são obrigatórios"
            });
        }

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: id,
                userId: userId
            },
            {
                titulo: title,
                conteudo: content
            },
            {
                new: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Nota não encontrada"
            });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Erro ao atualizar nota:", error);

        res.status(500).json({
            message: "Erro ao atualizar nota"
        });
    }
});

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Deleta uma nota do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota deletada com sucesso
 *       404:
 *         description: Nota não encontrada
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao deletar nota
 */
router.delete("/notes/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            userId: userId
        });

        if (!deletedNote) {
            return res.status(404).json({
                message: "Nota não encontrada"
            });
        }

        res.status(200).json({
            message: "Nota deletada com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao deletar nota:", error);

        res.status(500).json({
            message: "Erro ao deletar nota"
        });
    }
});

module.exports = router;
