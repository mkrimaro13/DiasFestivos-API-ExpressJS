// const fechas = require('./services/dates.service');
// const año = 2024;
// const domingoramos = fechas.ObtenerSemanaSanta(año);
// const domingopascua = fechas.AgregarDias(domingoramos, 7);
// const reyesmagos = fechas.SiguienteLunes(new Date(año, 0, 6));
// const ascensionseñor = fechas.SiguienteLunes(fechas.AgregarDias(domingopascua, 40));

// console.log(`Domingo de ramos: ${domingoramos}`);
// console.log(`Domingo de pascua: ${domingopascua}`);
// console.log(`Ascension del Señor: ${ascensionseñor}`);
// console.log(`Reyes Magos: ${reyesmagos}`);

const express = require('express');
const app = express();
const bd = require('./services/db');
bd.connect();
const puerto = 3030;
app.use(express.json());
require('./routes/dates.routes')(app);
app.listen(puerto, () => {
	console.log(
		`Servicio iniciado a través de la url http://localhost:${puerto}`
	);
});