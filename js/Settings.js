export class Settings {
	static auditoriumsColors = ['#3B3C41', '#23242B'] //цвета аудиторий
	static entrancesColors = ['#9CBBFF'] //цвета входов
	static entrancesTag = 'circle' //тэг точек входа
	static auditoriumsEntrances = new Map()
	static auditoriumsRusNames = new Map()
	
	static planStyleLink = '../css/plan-style.css' //путь к таблице стилей для плана
	
	static planName = 'resources/PK-24.svg' //путь к плану
	static graphName = 'resources/PK-24-GRAPH.svg' //путь к графу
	
	static wayColor = '#3CD288'
	static wayWidth = '4px'
}

//ассоциации для сэмпла
let auditoriumsEntrances = [
	[
		"PK-24-13",
		"5"
	],
	[
		"PK-2411",
		"6"
	],
	[
		"PK-24-S2",
		"21"
	],
	[
		"PK-24-S3",
		"11"
	],
	[
		"PK-2417",
		"3"
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
		"Пр1309"
	],
	[
		"pr1334",
		"Пр1334"
	]
]
Settings.auditoriumsRusNames = new Map(auditoriumsRusNames)