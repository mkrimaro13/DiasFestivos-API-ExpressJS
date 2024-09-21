const fechas = require('./servicios/fechas');
const año = 2024;
const domingoramos = fechas.ObtenerSemanaSanta(año);
const domingopascua = fechas.AgregarDias(domingoramos, 7);
const reyesmagos = fechas.SiguienteLunes(new Date(año, 0, 6));
const ascensionseñor = fechas.SiguienteLunes(fechas.AgregarDias(domingopascua, 40));

console.log(`Domingo de ramos: ${domingoramos}`);
console.log(`Domingo de pascua: ${domingopascua}`);
console.log(`Ascension del Señor: ${ascensionseñor}`);
console.log(`Reyes Magos: ${reyesmagos}`);