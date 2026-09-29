// ======================================================
// SERVICIO PARA REALIZAR LLAMADAS A APIs GRAPHQL
// ======================================================
 
 
// ======================================================
// 1. API GRAPHQL DE PAÍSES
// ======================================================
 
const COUNTRIES_API =
    "https://countries.trevorblades.com/";
 
 
// ======================================================
// FUNCIÓN 1
// Obtener información de países
// ======================================================
 
async function obtenerPaises() {
 
    // ----------------------------------------------
    // CONSULTA GRAPHQL
    // ----------------------------------------------
 
    const query = `
        query {
            countries {
                code
                name
                emoji
                capital
                currency
            }
        }
    `;
 
 
    // ----------------------------------------------
    // LLAMADA HTTP POST AL SERVIDOR GRAPHQL
    // ----------------------------------------------
 
    const respuesta = await fetch(COUNTRIES_API, {
 
        method: "POST",
 
        headers: {
            "Content-Type": "application/json"
        },
 
        body: JSON.stringify({
            query: query
        })
    });
 
 
    // ----------------------------------------------
    // Convertir respuesta a JSON
    // ----------------------------------------------
 
    const resultado = await respuesta.json();
 
 
    // ----------------------------------------------
    // Verificar errores GraphQL
    // ----------------------------------------------
 
    if (resultado.errors) {
 
        console.error(resultado.errors);
 
        throw new Error(
            "Error en la consulta GraphQL de países"
        );
    }
 
 
    // ----------------------------------------------
    // Retornar solamente los datos
    // ----------------------------------------------
 
    return resultado.data.countries;
}
 
 
 
module.exports = {
    obtenerPaises
};