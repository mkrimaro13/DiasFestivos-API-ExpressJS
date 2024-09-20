const fechas = require('./servicios/fechas');
const año = 2023;
const domingoRamos = fechas.obtenerSemanaSanta(año);
const domingoPascua = fechas.agregarDias(domingoRamos, 7);
const reyesMagos = new Date(año, 0, 6);

console.log(`Domingo de ramos: ${domingoRamos}`);
console.log(`Domingo de pascua: ${domingoPascua}`);
console.log(`Reyes Magos: ${reyesMagos}`);