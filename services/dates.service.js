function ObtenerSemanaSanta(año) {
	const a = año % 19;
	const b = año % 4;
	const c = año % 7;
	const d = (19 * a + 24) % 30;

	const dias = d + ((2 * b + 4 * c + 6 * d + 5) % 7);
	let mes = 3; // Inicialmente es marzo
	let dia = 15 + dias;

	// Si es mayor a 31 entonces se pasa al mes siguiente
	if (dia > 31) {
		mes = 4;
		dia -= 31;
	}

	return new Date(año, mes - 1, dia);
}

function AgregarDias(fecha, dias) {
	const fechatemporal = new Date(fecha);
	fechatemporal.setDate(fechatemporal.getDate() + dias);
	return fechatemporal;
}

function SiguienteLunes(fecha) {
	let fechatemporal = new Date(fecha);
	const diasemana = fechatemporal.getDay();
	if (diasemana != 1) {
		fechatemporal = AgregarDias(fechatemporal, 8 - diasemana);
	}
	return fechatemporal;
}

module.exports = { ObtenerSemanaSanta, AgregarDias, SiguienteLunes };
