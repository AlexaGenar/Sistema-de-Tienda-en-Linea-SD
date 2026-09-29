const express = require("express");
 
const {
    obtenerPaises
} = require("../services/graphqlService");
 
const router = express.Router();
 
 
// ============================================
// GET /api/paises
// ============================================
 
router.get("/paises", async (req, res) => {
 
    try {
 
        const datos = await obtenerPaises();
 
        res.json(datos);
 
    } catch (error) {
 
        console.error("Error obteniendo países:", error);
 
        res.status(500).json({
            error: "No fue posible obtener los países"
        });
    }
});
 
 
 
module.exports = router;