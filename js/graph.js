import {activateButton, deactivateButton} from "./app.js";

function indexOfVertex(vertex, vertexesList) {
	for (let i = 0; i < vertexesList.length; i++) {
		if (vertex.x === vertexesList[i].x && vertex.y === vertexesList[i].y) {
			return i
		}
	}
	return -1
}

export class Graph {
	static $graphSvg
	static $objectGraph
	static $tableContent = document.querySelector('.list-smezh')
	static fileName

	constructor() {
		this.rawEdgesList = {}
		this.vertexesList = {}
		this.edgesList = {}
		console.log('Граф создан')
	}

	alertGraph(){
		console.log('alert graph')
	}

	tracing() {
		Graph.$objectGraph = document.querySelector('.graph')

		Graph.fileName = Graph.$objectGraph.data
		Graph.fileName = Graph.fileName.substring(Graph.fileName.lastIndexOf('/')+1)


		function erase($el) {
			$el.setAttribute('stroke-width', '3')
			let row = document.createElement('tr')

			let coordinates = $el.getAttribute('d').substring(1).replaceAll('.5', '');
			let firstSpace = coordinates.indexOf(' ')
			let x1, y1, x2, y2

			x1 = coordinates.substring(0, firstSpace)

			coordinates = coordinates.substring(firstSpace + 1)

			// let lineType = ''
			let secondLetterPosition;


			if (coordinates.indexOf('H') !== -1) {
				// lineType = 'horizontal'
				secondLetterPosition = coordinates.indexOf('H')
				y1 = coordinates.substring(0, secondLetterPosition)
				y2 = y1
				x2 = coordinates.substring(secondLetterPosition + 1)
			} else if (coordinates.indexOf('V') !== -1) {
				// lineType = 'vertical'
				secondLetterPosition = coordinates.indexOf('V')
				y1 = coordinates.substring(0, secondLetterPosition)
				x2 = x1
				y2 = coordinates.substring(secondLetterPosition + 1)
			} else if (coordinates.indexOf('L') !== -1) {
				secondLetterPosition = coordinates.indexOf('L')
				y1 = coordinates.substring(0, secondLetterPosition)
				coordinates = coordinates.substring(secondLetterPosition+1)
				let secondSpace = coordinates.indexOf(' ')
				x2 = coordinates.substring(0, secondSpace)
				y2 = coordinates.substring(secondSpace + 1)
			}

			if (x1 >= x2 && y1 >= y2) {
				let t = x2
				x2 = x1
				x1 = t
				t = y2
				y2 = y1
				y1 = t
			}

			function addTdToTR(value, cellClass, tr) {
				let td = document.createElement('td')
				td.innerHTML = value
				td.setAttribute('class', String(cellClass))
				tr.appendChild(td)
			}

			let weight = Number((((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5).toFixed(2))

			addTdToTR($el.getAttribute('id'), 'id', row)
			addTdToTR(x1, 'x1', row)
			addTdToTR(y1, 'y1', row)
			addTdToTR(x2, 'x2', row)
			addTdToTR(y2, 'y2', row)
			addTdToTR(weight, 'weight', row)
			addTdToTR('same-floor', 'type', row)

			Graph.$tableContent.appendChild(row)
		}

		Graph.$graphSvg = Graph.$objectGraph.contentDocument.getElementsByTagName('svg')[0]
		let timeout = 0
		for (const $graphEl of Graph.$graphSvg.getElementsByTagName('path')) {
			if ($graphEl.getAttribute('stroke') === '#FF5F5F') {
				console.log($graphEl)
				setTimeout(erase, timeout, $graphEl)
				timeout += 70
			}
		}
		deactivateButton('tracing')
		activateButton('erase')
		activateButton('get-list-of-edges')
		activateButton('get-list-of-adjacency')
	}

	static getRawListOfEdges() {
		let rows = Graph.$tableContent.getElementsByTagName('tr')
		let listOfEdges = []
		for (const $row of rows) {
			let id = $row.getElementsByClassName('id')[0].innerText
			let x1 = Number($row.getElementsByClassName('x1')[0].innerText)
			let y1 = Number($row.getElementsByClassName('y1')[0].innerText)
			let x2 = Number($row.getElementsByClassName('x2')[0].innerText)
			let y2 = Number($row.getElementsByClassName('y2')[0].innerText)
			let weight = Number($row.getElementsByClassName('weight')[0].innerText)
			let type = $row.getElementsByClassName('type')[0].innerText
			listOfEdges.push(new Edge(id, new Vertex(x1, y1), new Vertex(x2, y2), weight, type))

		}
		console.group('list of raw edges')
		console.log(listOfEdges)
		console.groupEnd()
		return (listOfEdges)
	}

	static getListOfVertexes(edgesList) {
		console.group('list of vertexes')
		let vertexesList = []
		let idsOfList = 0
		let vertex1, vertex2
		for (let edge of edgesList) {
			if (indexOfVertex(edge.vertex1, vertexesList) === -1) {
				vertex1 = new Vertex(edge.vertex1.x, edge.vertex1.y, `${Graph.fileName} ${idsOfList}`)
				idsOfList++
				vertexesList.push(vertex1)
			} else vertex1 = vertexesList[indexOfVertex(edge.vertex1, vertexesList)]
			if (indexOfVertex(edge.vertex2, vertexesList) === -1) {
				vertex2 = new Vertex(edge.vertex2.x, edge.vertex2.y, `${Graph.fileName} ${idsOfList}`)
				idsOfList++
				vertexesList.push(vertex2)
			} else vertex2 = vertexesList[indexOfVertex(edge.vertex2, vertexesList)]
			vertex1.adjacentVertexesId.push(vertex2.id)
			vertex2.adjacentVertexesId.push(vertex1.id)
			edge.vertex1.id = vertex1.id
			edge.vertex2.id = vertex2.id
		}
		console.log(vertexesList)
		console.log(edgesList)
	}
}

export class Vertex {
	constructor(x, y, id = '', adjacentVertexesId = [], edges = []) {
		this.id = id
		this.x = x
		this.y = y
		this.adjacentVertexesId = adjacentVertexesId
	}
}

export class Edge {
	constructor(id = '', vertex1, vertex2, weight = 0, type = '') {
		this.id = id
		this.vertex1 = vertex1
		this.vertex2 = vertex2
		this.weight = weight
		this.type = type
	}
}