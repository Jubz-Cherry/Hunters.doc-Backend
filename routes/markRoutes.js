const express = require("express");

const router = express.Router();

const marksList = require("../Data/marksList");
const auth = require("../middleware/auth");

const normalizeAssetUrl = (assetUrl, publicBaseUrl) => {
    if (!assetUrl || typeof assetUrl !== "string") {
        return assetUrl || null;
    }

    try {
        const parsed = new URL(assetUrl);
        if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
            return `${publicBaseUrl}${parsed.pathname}`;
        }
        return assetUrl;
    } catch {
        return assetUrl;
    }
};

const withPublicAssetUrls = (mark, req) => {
    const publicBaseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;

    return {
        ...mark,
        banner: normalizeAssetUrl(mark.banner, publicBaseUrl),
        image: normalizeAssetUrl(mark.image || mark.banner, publicBaseUrl)
    };
};

/**
 * @swagger
 * /marks:
 *   get:
 *     tags:
 *       - Marks
 *     summary: Lista todas as marcas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de marcas retornada com sucesso
 */
router.get("/marks", auth, async (req, res) => {
    try {
        res.send(marksList.map((mark) => withPublicAssetUrls(mark, req)));
    } catch (err) {
        res.status(500).json({
            error: "Erro ao carregar marcas"
        });
    }
});

/**
 * @swagger
 * /marks/{name}:
 *   get:
 *     tags:
 *       - Marks
 *     summary: Busca uma marca pelo nome
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *       404:
 *         description: Marca não encontrada
 *       500:
 *         description: Erro ao carregar a marca
 */
router.get("/marks/:name", auth, async (req, res) => {
    const { name } = req.params;

    try {
        const mark = marksList.find(
            (m) =>
                m.name.toLowerCase().trim() ===
                name.toLowerCase().trim()
        );

        if (!mark) {
            return res.status(404).json({
                error: "Marca não encontrada"
            });
        }

        res.status(200).json(withPublicAssetUrls(mark, req));
    } catch (err) {
        res.status(500).json({
            error: "Erro ao carregar a marca"
        });
    }
});

module.exports = router;
