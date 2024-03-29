import {Graph} from './Graph.js';
import {PlanHandler} from './PlanHandler.js'
import {Settings} from './Settings.js'
import {Way} from './Way.js'
import {DragHandler} from "./DragHandler.js";
import {Names} from "./Names.js";

//обработчик карты, передаем объект содержащий карту
export let planHandler = new PlanHandler(document.querySelector('.plan-object'))
planHandler.$planObject.data = Settings.planName
planHandler.setSelectorElements(document.querySelector('.selector'),
	document.querySelector('.button-from'),
	document.querySelector('.button-to'))


export let dragHandler
planHandler.$planObject.addEventListener('load', () => { //при загрузке плана
	console.log('план загружен')
	planHandler.onPlanLoad()
	way.setupWay(planHandler.$svgPlan)
	
	setTimeout(() => {
		document.querySelector('.tracing').click()
		document.querySelector('.create-list-of-vertexes').click()
		document.querySelector('.fill-graph').click()
		document.querySelector('.tracing-cross').click()
		document.querySelector('.fill-auditoriums-vertexes').click()
		// document.querySelector('.hide-graph').click()
		// document.querySelector('.show-graph').click()
	}, 200)
	
})

dragHandler = new DragHandler(
	document.querySelector('.drag-able'),
	document.querySelector('.scale-able'),
	document.querySelector('.map-wrapper'),
	document.querySelector('.button-plus'),
	document.querySelector('.button-minus'));

export let graph = new Graph(document.querySelector('.graph'))
graph.$graphObject.data = Settings.graphName

export let way = new Way(document.querySelector('.svg-way'),)


let $tableOfEdge = document.getElementsByClassName('list-of-edges')[0]

function eraseTable($tableOfEdge, $svgGraph) { //стирание таблицы и восстановление плана
	while ($tableOfEdge.hasChildNodes()) $tableOfEdge.firstChild.remove()
	$svgGraph.data = Settings.graphName
}

export function activateButton(buttonClassName) {
	document.getElementsByClassName(buttonClassName)[0].classList.remove('non-active-button')
}

export function deactivateButton(buttonClassName) {
	document.getElementsByClassName(buttonClassName)[0].classList.add('non-active-button')
}


document.querySelector('.erase').addEventListener('click', () => {
	let $tableOfEdge = document.getElementsByClassName('list-of-edges')[0];
	let $svgGraph = document.getElementsByClassName('graph')[0];
	
	eraseTable($tableOfEdge, $svgGraph)
	graph = new Graph(document.querySelector('.graph'))
	graph.rawEdges = []
	
	let $mapObjects = document.getElementsByClassName('map-objects')[0]
	let erasingElements = Array.from($mapObjects.getElementsByClassName('vertex-id'))
		.concat(Array.from($mapObjects.getElementsByClassName('edge-id')))
	erasingElements.forEach($erasingEl => {
		$erasingEl.remove()
	})
	
	
	activateButton('tracing')
	deactivateButton('erase')
	deactivateButton('create-list-of-vertexes')
})

document.querySelector('.tracing').addEventListener('click', () => {
	graph.tracing($tableOfEdge)
	
	deactivateButton('tracing')
	activateButton('erase')
	activateButton('create-list-of-vertexes')
})

document.querySelector('.create-list-of-vertexes').addEventListener('click', () => {
	graph.createVertexesList()
	deactivateButton('create-list-of-vertexes')
	deactivateButton('create-list-of-vertexes')
	activateButton('fill-graph')
})

document.querySelector('.fill-graph').addEventListener('click', () => {
	graph.fillGraph()
	deactivateButton('fill-graph')
	activateButton('show-graph')
	activateButton('fill-auditoriums-vertexes')
})

document.querySelector('.fill-auditoriums-vertexes').addEventListener('click', () => {
	graph.fillAuditoriumsVertexes(planHandler.AuditoriumsIdEntrancesId, planHandler.$svgPlan)
	deactivateButton('fill-auditoriums-vertexes')
	activateButton('build-way')
})

document.querySelector('.show-graph').addEventListener('click', () => {
	graph.showGraph(document.querySelector('.graph-markers'), planHandler.$svgPlan)
	graph.$graphObject.style.visibility = 'visible'
	deactivateButton('show-graph')
	activateButton('get-way')
})

document.querySelector('.get-way').addEventListener('click', () => {
	let idVertex1 = document.getElementById('input-idPoint1').value
	let idVertex2 = document.getElementById('input-idPoint2').value
	
	let wayAndDistance = graph.getShortestWayFromTo(idVertex1, idVertex2)
	
	let outputContent = ''
	wayAndDistance.way.forEach(vertexId => {
		outputContent += `→ ${vertexId} `
	})
	outputContent = outputContent.substring(2)
	outputContent += `<br>Длина: ${wayAndDistance.distance}`
	
	let $output = document.getElementsByClassName('output-found-way')[0]
	$output.innerHTML = outputContent
	
	
})

document.querySelector('.build-way').addEventListener('click', () => {
	let idVertex1 = planHandler.fromId
	let idVertex2 = planHandler.toId
	let wayAndDistance = graph.getShortestWayFromTo(idVertex1, idVertex2)
	let outputContent = ''
	wayAndDistance.way.forEach(vertexId => {
		outputContent += `→ ${vertexId} `
	})
	outputContent = outputContent.substring(2)
	outputContent += `<br>Длина: ${wayAndDistance.distance}`
	
	let $output = document.getElementsByClassName('output-way-between-au')[0]
	$output.innerHTML = outputContent
	way.build(graph, wayAndDistance)
	
})

document.querySelector('.hide-graph').addEventListener('click', () => {
	graph.$graphObject.style.visibility = 'hidden'
})

document.querySelector('.tracing-cross').addEventListener('click', () => {
	graph.tracingCross()
})


/*
Это потом убрать
 */
