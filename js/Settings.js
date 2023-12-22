export class Settings {
	static auditoriumsColors = ['#3B3C41', '#23242B'] //цвета аудиторий
	static entrancesColors = ['#9CBBFF'] //цвета входов
	static entrancesTag = 'circle' //тэг точек входа
	static auditoriumsEntrances = new Map()
	static auditoriumsRusNames = new Map()
	static auditoriumsEngNames = new Map()
	
	static planStyleLink = '../css/plan-style.css' //путь к таблице стилей для плана
	
	static planName = 'resources/plans/a/A-2.svg' //путь к плану
	static graphName = 'resources/plans/a/A-2-GRAPH.svg' //путь к графу
	
	static wayColor = '#3CD288'
	static wayWidth = '4px'
}

//ассоциации для сэмпла
let auditoriumsEntrances = [
	//Корпус A 1 этаж
	["a-112a", "8"], ["a-108", "6"], ["a-112v", "9"], ["a-1-stair-2", "20"], ["a-100", "33"], ["a-1-stair-1", "32"], ["a-112", "21"], ["a-113", "22"], ["a-114", "23"], ["a-115", "24"], ["a-116", "26"], ["a-117", "27"], ["a-118", "28"], ["a-119", "30"], ["a-120", "31"], ["a-1-wc-2", "29"], ["a-1-stair-5", "25"],
	//Корпус А 2 этаж
	["a-200", "27"], ["a-205", "8"], ["a-211", "17"], ["a-212", "15"], ["a-214", "14"], ["a-215", "18"], ["a-216", "20"], ["a-218", "25"], ["a-219", "22"], ["a-220", "21"], ["a-221", "19"], ["a-224", "23"], ["a-2-stair-2", "6"], ["a-2-stair-3", "26"], ["a-2-stair-4", "24"], ["a-2-wc-2", "16"],
]
Settings.auditoriumsEntrances = new Map(auditoriumsEntrances)

let auditoriumsRusNames = [['a-2-stair-1','Лестница #1 2 этаж А'],['a-204','А204'],['a-203','А203'],['a-205','А205'],['a-206','А206'],['a-207','А207'],['a-208','А208'],['a-209','А209'],['a-210','А210'],['a-200','А200'],['a-224','А224'],['a-216','А216'],['a-215','А215'],['a-211','А211'],['a-218','А218'],['a-219','А219'],['a-220','А220'],['a-221','А221'],['a-212','А212'],['a-2-wc-2','Туалет Ж'],['a-214','А214'],['a-202','А202'],['a-201','А201'],['a-2-wc-1','Туалет М'],['a-2-stair-2','Лестница #2 2 этаж А'],['a-2-stair-4','Лестница #4 2 этаж А'],['a-2-stair-3','Лестница #3 2 этаж А']
]
let auditoriumsEngNames = []
for (const auditoriumsRusName of auditoriumsRusNames) {
	let nameRusEng = [auditoriumsRusName[1], auditoriumsRusName[0]]
	auditoriumsEngNames.push(nameRusEng)
}
console.log(auditoriumsEngNames)
Settings.auditoriumsEngNames = new Map(auditoriumsEngNames)
Settings.auditoriumsRusNames = new Map(auditoriumsRusNames)