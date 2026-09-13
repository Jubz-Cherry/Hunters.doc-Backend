const rateLimit = require("express-rate-limit");

const message = {
    error: "Muitas tentativas. Aguarde alguns minutos e tente novamente."
};

// Login e registro: protege contra força bruta de senha e criação em massa de contas.
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message
});

// Recuperação de senha: protege o código de 6 dígitos contra força bruta e o envio
// de e-mail contra spam.
const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 6,
    standardHeaders: true,
    legacyHeaders: false,
    message
});

module.exports = { authLimiter, passwordResetLimiter };
