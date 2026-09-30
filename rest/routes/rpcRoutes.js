const express = require("express");

const {
    calcularComisionEthereum
} = require("../services/rpcService");

const router = express.Router();


// ======================================================
// API INTERNA
// ======================================================

router.get("/rpc/ethereum/comision", async (req, res) => {

    try {

        console.log("");
        console.log("========================================");
        console.log("EJECUTANDO RPC - ETHEREUM");
        console.log("========================================");

        const ethereum =
            await calcularComisionEthereum();


        // ==================================================
        // RESPUESTA AL NAVEGADOR
        // ==================================================

        res.json(ethereum);

    }
    catch (error) {

        console.error(
            "Error Ethereum:",
            error.message
        );

        res
            .status(500)
            .json({
                error: error.message
            });

    }

});


// ======================================================
// EXPORTAR ROUTER
// ======================================================

module.exports = router;