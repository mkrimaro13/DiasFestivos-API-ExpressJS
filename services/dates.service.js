var db = require('./db');

const DATE = () => {};

DATE.verifyDate = async (year, month, day, response) => {
	try {
		temp_list = await listOfHolidays(year);
		temp_date = formatDate(new Date(year, month - 1, day));
		if (temp_list.includes(temp_date)) {
			return response(null, true);
		} else {
			return response(null, false);
		}
	} catch (error) {
		return response(error, null);
	}
};

DATE.listHolidays = async (year, response) => {
	try {
		holidays = await listOfHolidays(year);
		return response(null, holidays);
		// lista temporal que almacena
	} catch (error) {
		return response(error, null);
	}
};
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
const listDBInfo = async (response) => {
	const database = db.getDataBase();
	//Ejecutar la consulta
	try {
		const result = await database
			.collection('tipos')
			//***** Código Mongo *****
			.find({})
			.project({
				id: 1,
				tipo: 2,
				modoCalculo: 3,
				festivos: 4,
			})
			//************************
			.toArray();
		return response(null, result);
	} catch (error) {
		return response(error, null);
	}
};

async function listOfHolidays(year) {
	holidaysList = [];
	const domingoramos = ObtenerSemanaSanta(year);
	const domingopascua = AgregarDias(domingoramos, 7);

	// Convertir listDBInfo a una promesa;
	const holidays_temp = await new Promise((resolve, reject) => {
		listDBInfo((error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(listInfo(data));
			}
		});
	});
	// ==> Este pedazo fue chatgpt ya que estaba manejando todo el switch dentro de `listDBInfo` ya que no entendía como retornar el valor luego

	for (element of holidays_temp) {
		switch (element.id) {
			case 1:
				holidays = element.festivos;
				for (holiday of holidays) {
					holidaysList.push(
						formatDate(new Date(year, holiday.mes - 1, holiday.dia))
					);
				}
				break;
			case 2:
				holidays = element.festivos;
				for (holiday of holidays) {
					holidaysList.push(
						formatDate(
							SiguienteLunes(new Date(year, holiday.mes - 1, holiday.dia))
						)
					);
				}
				break;
			case 3:
				holidays = element.festivos;
				for (holiday of holidays) {
					holidaysList.push(
						formatDate(AgregarDias(domingopascua, holiday.diasPascua))
					);
				}
				break;
			case 4:
				holidays = element.festivos;
				for (holiday of holidays) {
					holidaysList.push(
						formatDate(
							SiguienteLunes(AgregarDias(domingopascua, holiday.diasPascua))
						)
					);
				}
				break;
		}
	}

	return holidaysList.sort();
}

function listInfo(data) {
	info = [];
	for (const element of data) {
		info.push(element);
	}
	return info;
}

function formatDate(date) {
	temp_date = new Date(date);
	return temp_date.toDateString();
}

module.exports = DATE;
