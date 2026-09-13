const express = require("express");

const router = express.Router();

const monstersList = require("../Data/monstersList");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /monsters:
 *   get:
 *     tags:
 *       - Monsters
 *     summary: Lista todos os monstros
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de monstros retornada com sucesso
 */
router.get("/monsters", auth, async (req, res) => {
    try {
        res.send(monstersList);
    } catch (err) {
        res.status(500).json({
            error: "Erro ao carregar monstros"
        });
    }
});

/**
 * @swagger
 * /monsters/{name}:
 *   get:
 *     tags:
 *       - Monsters
 *     summary: Busca um monstro pelo nome
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do monstro
 *     responses:
 *       200:
 *         description: Monstro encontrado
 *       404:
 *         description: Monstro não encontrado
 *       500:
 *         description: Erro ao carregar o monstro
 */
router.get("/monsters/:name", auth, async (req, res) => {
    const { name } = req.params;

    try {
        const monster = monstersList.find(
            (m) =>
                m.name.toLowerCase().trim() ===
                name.toLowerCase().trim()
        );

        if (!monster) {
            return res.status(404).json({
                error: "Monstro não encontrado"
            });
        }

        res.status(200).json(monster);
    } catch (err) {
        res.status(500).json({
            error: "Erro ao carregar o monstro"
        });
    }
});

module.exports = router;