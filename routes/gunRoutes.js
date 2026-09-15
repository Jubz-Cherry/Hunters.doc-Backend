const express = require("express");

const router = express.Router();

const gunsList = require("../Data/gunsList");
const auth = require("../middleware/auth");

const withPublicAssetUrls = (gun, req) => {
    const publicBaseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;

    return {
        ...gun,
        banner: gun.banner.replace("http://localhost:3001", publicBaseUrl),
        image: gun.image.replace("http://localhost:3001", publicBaseUrl)
    };
};

/**
 * @swagger
 * /guns:
 *   get:
 *     tags:
 *       - Guns
 *     summary: Lista todas as armas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de armas retornada com sucesso
 *       500:
 *         description: Erro ao carregar armas
 */
router.get("/guns", auth, async (req, res) => {
    try {
        res.send(gunsList.map((gun) => withPublicAssetUrls(gun, req)));
    } catch (err) {
        res.status(500).json({
            error: "Erro ao carregar armas"
        });
    }
});

/**
 * @swagger
 * /guns/{name}:
 *   get:
 *     tags:
 *       - Guns
 *     summary: Busca uma arma pelo nome
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da arma
 *     responses:
 *       200:
 *         description: Arma encontrada
 *       404:
 *         description: Arma não encontrada
 *       500:
 *         description: Erro ao carregar a arma
 */
router.get("/guns/:name", auth, (req, res) => {
    const { name } = req.params;

    try {
        const guns = gunsList.find(
            (g) => g.name.toLowerCase() === name.toLowerCase()
        );

        if (!guns) {
            return res.status(404).json({
                error: "Arma não encontrada"
            });
        }

        res.status(200).json(withPublicAssetUrls(guns, req));
    } catch (err) {
        res.status(500).json({
            error: "Erro ao carregar a arma"
        });
    }
});

module.exports = router;

