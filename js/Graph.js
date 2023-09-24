class Vertex {
	constructor(x, y, id = '', type = '') {
		this.x = x
		this.y = y
		if (id !== '' && id !== undefined) {
			this.id = id
		}
		if (id !== '' && id !== undefined) {
			this.type = type
		}
	}
}

export class Graph {
	constructor() {
		this.vertexes = [] //список вершин
		this.vertexIdIterator = 0 //итератор для вершин в списке
		this.rawEdges = [] //сырой список рёбер со свойствами
		// this.edges = []
	}

	hasVertexByXY(x, y) {
		for (let vertex of this.vertexes)
			if ((vertex.x === x) && (vertex.y === y)) {
				return true
			}
		return false
	} //есть ли вершина в списке по координатам

	addVertexByXY(x, y) {
		if (!this.hasVertexByXY(x, y))
			this.vertexes.push(new Vertex(x, y, this.vertexIdIterator))
		this.vertexIdIterator++
	}

	getVertexByXY(x, y) {
		for (let vertex of this.vertexes)
			if ((vertex.x === x) && (vertex.y === y)) {
				return vertex
			}
		return undefined
	} //возвращает вершину по координатам

	tracing($tableOfEdges, $svgGraphContent) { //трассировка - парсинг путей и добавление их в таблицу
		let allPaths = $svgGraphContent.getElementsByTagName('path') //все path на картинке

		function getGraphPaths() {
			let paths = []
			for (let path of allPaths) {
				if (path.getAttribute('stroke') === '#FF5F5F')
					paths.push(path)
			}
			return paths
		}

		let graphPaths = getGraphPaths() //path рёбер графа с картинки по цвету

		function parseEdgesFromPaths(path) {
			let id = path.getAttribute('id')


			let coordinates = path.getAttribute('d').substring(1).replaceAll('.5', '')

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
				coordinates = coordinates.substring(secondLetterPosition + 1)
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

			let weight = Number((((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5).toFixed(2))
			return {
				id: id,
				x1: Number(x1),
				y1: Number(y1),
				x2: Number(x2),
				y2: Number(y2),
				weight: weight,
				type: 'same-floor'
			}
		} //возвращает свойства ребра из элемента path с картинки
		let edgesProperties = [] //список ребер со свойствами
		graphPaths.forEach(path => {
			edgesProperties.push(parseEdgesFromPaths(path))
			path.setAttribute('stroke-width', '3')
		})  //создаем список рёбер со свойствами

		function addTdToTr(value, cellClass, tr) {
			let td = document.createElement('td')
			td.innerHTML = value
			td.setAttribute('class', String(cellClass))
			tr.appendChild(td)
		} //добавление ячеек в строку
		function timeoutAppendRowToTable(row) {
			$tableOfEdges.appendChild(row)
		} //добавление строки в таблицу с таймаутом
		let timeout = 0
		edgesProperties.forEach(edge => {
			let row = document.createElement('tr')
			addTdToTr(edge.id, 'id', row)
			addTdToTr(edge.x1, 'id', row)
			addTdToTr(edge.y1, 'id', row)
			addTdToTr(edge.x2, 'id', row)
			addTdToTr(edge.y2, 'id', row)
			addTdToTr(edge.weight, 'id', row)
			addTdToTr(edge.type, 'id', row)
			setTimeout(timeoutAppendRowToTable, timeout, row)
			timeout += 50
		}) //формирование таблицы из списка рёбер
		this.rawEdges = edgesProperties

		console.log('Сырой список рёбер: ')
		console.table(this.rawEdges)
	} // трассировка: по элементам свг-картинки графа делает сырой список рёбер и заносит их в таблицу, записывает в rawEdges ребра со свойствами

	createVertexesList($mapContent) {
		for (let rawEdge of this.rawEdges) {
			this.addVertexByXY(rawEdge.x1, rawEdge.y1)
			this.addVertexByXY(rawEdge.x2, rawEdge.y2)
		}


		let circlesOnMap = $mapContent.getElementsByTagName('circle');
		console.group('Входы в аудитории: ')
		for (let $el of circlesOnMap) {
			if ($el.getAttribute('fill')) {
				let x = Number($el.getAttribute('cx'))
				let y = Number($el.getAttribute('cy'))

				let vertexEntrance = this.getVertexByXY(x, y)
				vertexEntrance.type = 'entranceToAu'

				/*
				Сюда добавить обработку ассоциации с аудиторией
				 */

				console.log(x, y, vertexEntrance)
			}
		}
		console.groupEnd()
		console.table(this.vertexes)
	}
}

