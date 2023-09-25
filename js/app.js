import {Graph} from "./Graph.js";

let $map = document.querySelector(".map") //объект отображения карты
let $mapContent, auditoriums, points //головной элемент документа карты, аудитории на карте, точки на карте

$map.addEventListener("load", () => { //при загрузке карты
	
	$mapContent = $map.contentDocument //ищем контент
	auditoriums = $mapContent.getElementsByClassName('au') //ищем аудитории по классу (ПОМЕНЯТЬ НА ЦВЕТ)
	points = $mapContent.getElementsByClassName('point') //ищем точки на карте (ПОМЕНЯТЬ НА ЦВЕТ)
	
	for (const elAuditorium of auditoriums) { //проходимся по аудиториям
		elAuditorium.addEventListener("click", function () { //при нажатии на аудиторию
			
			for (const elErasingAuditorium of auditoriums) { //стираем все аудитории
				if (elErasingAuditorium !== this) elErasingAuditorium.classList.remove("selected")
			}
			//сюда добавить занесение аудитории в выбранную
			
			this.classList.toggle("selected") //стираем или закрашиваем аудиторию
			let $elPointPainting //здесь будет закрашиваемая точка аудитории
			for (const $elPoint of points) {
				$elPoint.classList.remove('selected-point') //стираем все точки
				if ($elPoint.id.indexOf(elAuditorium.id) !== - 1) {
					$elPointPainting = $elPoint
				}
			}
			
			if (elAuditorium.classList.contains('selected')) // закрашиваем или нет точку
				$elPointPainting.classList.add('selected-point')
		})
		
	}
})

export function eraseTable($tableOfEdge, $svgGraph) { //стирание таблицы и восстановление плана
	while ($tableOfEdge.hasChildNodes()) $tableOfEdge.firstChild.remove()
	$svgGraph.data = "plan-01-graph.svg"
}

export function activateButton(buttonClassName) {
	document.getElementsByClassName(buttonClassName)[0].classList.remove('non-active-button')
}

export function deactivateButton(buttonClassName) {
	document.getElementsByClassName(buttonClassName)[0].classList.add('non-active-button')
}


export let graph = new Graph()

document.getElementsByClassName('tracing')[0].addEventListener("click", () => {
	let $tableOfEdge = document.getElementsByClassName('list-of-edges')[0];
	let $svgGraphContent = document.getElementsByClassName('graph')[0].contentDocument;
	
	graph.tracing($tableOfEdge, $svgGraphContent)
	
	deactivateButton('tracing')
	activateButton('erase')
	activateButton('create-list-of-vertexes')
})

document.getElementsByClassName('erase')[0].addEventListener("click", () => {
	let $tableOfEdge = document.getElementsByClassName('list-of-edges')[0];
	let $svgGraph = document.getElementsByClassName('graph')[0];
	
	eraseTable($tableOfEdge, $svgGraph)
	graph = new Graph()
	graph.rawEdges = []
	
	activateButton('tracing')
	deactivateButton('erase')
	deactivateButton('create-list-of-vertexes')
})

document.getElementsByClassName('create-list-of-vertexes')[0].addEventListener("click", () => {
	graph.createVertexesList($mapContent)
	deactivateButton('create-list-of-vertexes')
	deactivateButton('create-list-of-vertexes')
	activateButton('fill-graph')
})

document.getElementsByClassName('fill-graph')[0].addEventListener("click", () => {
	graph.fillGraph()
	deactivateButton('fill-graph')
})

// //////временно
// setTimeout(() => {
// 	let $tableOfEdge = document.getElementsByClassName('list-of-edges')[0];
// 	let $svgGraphContent = document.getElementsByClassName('graph')[0].contentDocument;
// 	graph.tracing($tableOfEdge, $svgGraphContent)
//
// 	deactivateButton('tracing')
// 	activateButton('erase')
// 	activateButton('create-list-of-vertexes')
//
// 	graph.createVertexesList($mapContent)
//
// }, 200)
//
