// ======================================================
// SERVICIO RPC
// ======================================================


// ======================================================
// RPC - ETHEREUM: PRECIO DEL GAS
// ======================================================

async function obtenerPrecioGas() {

    const url = "https://ethereum-rpc.publicnode.com";


    // --------------------------------------------------
    // MENSAJE JSON-RPC
    // --------------------------------------------------

    const solicitudRPC = {

        jsonrpc: "2.0",

        method: "eth_gasPrice",

        params: [],

        id: 1

    };


    console.log("");
    console.log("========================================");
    console.log("RPC - ETHEREUM: PRECIO DEL GAS");
    console.log("========================================");

    console.log("Solicitud:");

    console.log(
        JSON.stringify(
            solicitudRPC,
            null,
            2
        )
    );


    // --------------------------------------------------
    // LLAMADA RPC
    // --------------------------------------------------

    const respuesta = await fetch(url, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(
            solicitudRPC
        )

    });


    console.log(
        "HTTP Status Ethereum:",
        respuesta.status
    );


    // --------------------------------------------------
    // VERIFICAR HTTP
    // --------------------------------------------------

    if (!respuesta.ok) {

        throw new Error(
            `Error HTTP Ethereum: ${respuesta.status}`
        );

    }


    // --------------------------------------------------
    // CONVERTIR A JSON
    // --------------------------------------------------

    const datos =
        await respuesta.json();


    console.log("Respuesta Ethereum:");

    console.log(
        JSON.stringify(
            datos,
            null,
            2
        )
    );


    // --------------------------------------------------
    // VERIFICAR ERROR JSON-RPC
    // --------------------------------------------------

    if (datos.error) {

        throw new Error(
            `Ethereum RPC ${datos.error.code}: ${datos.error.message}`
        );

    }


    // --------------------------------------------------
    // DEVOLVER RESPUESTA
    // --------------------------------------------------

    return datos;

}

async function estimarGas() {

    const url = "https://ethereum-rpc.publicnode.com";

    const solicitudRPC = {

        jsonrpc: "2.0",

        method: "eth_estimateGas",

        params: [
            {
                from: "0x0000000000000000000000000000000000000001",
                to: "0x0000000000000000000000000000000000000002",
                value: "0x0"
            }
        ],

        id: 2

    };


    console.log("");
    console.log("========================================");
    console.log("RPC - ETHEREUM: ESTIMACIÓN DE GAS");
    console.log("========================================");

    console.log("Solicitud:");

    console.log(
        JSON.stringify(
            solicitudRPC,
            null,
            2
        )
    );


    const respuesta = await fetch(url, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(
            solicitudRPC
        )

    });


    console.log(
        "HTTP Status Ethereum:",
        respuesta.status
    );


    if (!respuesta.ok) {

        throw new Error(
            `Error HTTP Ethereum: ${respuesta.status}`
        );

    }


    const datos =
        await respuesta.json();


    console.log("Respuesta Ethereum:");

    console.log(
        JSON.stringify(
            datos,
            null,
            2
        )
    );


    if (datos.error) {

        throw new Error(
            `Ethereum RPC ${datos.error.code}: ${datos.error.message}`
        );

    }


    return datos;

}

async function calcularComisionEthereum() {

    const precioGas = await obtenerPrecioGas();
    const gasEstimado = await estimarGas();

    const precioGasWei = BigInt(precioGas.result);
    const unidadesGas = BigInt(gasEstimado.result);

    const comisionWei = precioGasWei * unidadesGas;

    const comisionEth =
        Number(comisionWei) / 1e18;

    return {
        precioGas: precioGas.result,
        gasEstimado: gasEstimado.result,
        comisionWei: comisionWei.toString(),
        comisionEth
    };

}


// ======================================================
// EXPORTAR
// ======================================================

module.exports = {

    obtenerPrecioGas,
    estimarGas,
    calcularComisionEthereum

};