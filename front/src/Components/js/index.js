/**
 * Esta funcion calcula el precio total de un nuevo pedido
 * @param {Array} products  el parametro es un array de objetos
 * @returns {number} que va a ser el total price 
 */

export const totalPrice = (products) =>{
    let sum = 0
    products.forEach(product => {
        sum += Number(product.price)
    });
    return sum
}
export const getCurrentDate=()=>{
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0, así que sumamos 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

