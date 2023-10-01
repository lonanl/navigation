export class Settings {
	static auditoriumsColors = ['#3B3C41'] //цвета аудиторий
	static entrancesColors = ['#9CBBFF'] //цвета входов
	static entrancesTag = 'circle' //тэг точек входа
	static auditoriumsEntrances = new Map()
	static auditoriumsRusNames = new Map()
	
	static planStyleLink = '../css/plan-style.css' //путь к таблице стилей для плана
	
	static planName = 'resources/new-plan.svg'
	static graphName = 'resources/new-graph.svg'
}

//ассоциации для сэмпла
let auditoriumsEntrances = [
	[
		"pr1315",
		"pr1315-v1"
	],
	[
		"pr1309",
		"pr1309-v1"
	],
	[
		"pr1334",
		"pr1334-v1"
	]
]
Settings.auditoriumsEntrances = new Map(auditoriumsEntrances)

let auditoriumsRusNames = [
	[
		"pr1315",
		"Пр1315"
	],
	[
		"pr1309",
		"Пр1315"
	],
	[
		"pr1334",
		"Пр1315"
	]
]
Settings.auditoriumsRusNames = new Map(auditoriumsRusNames)