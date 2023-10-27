class Vertex {
	constructor(x, y, id = '', type = '') {
		this.x = x
		this.y = y
		this.id = id
		this.type = type
		this.neighboringIDs = new Set()
	}
	
	// isSame(vertexOther) {
	// 	return this.x === vertexOther.x && this.y === vertexOther.y
	// }
}

class Edge {
	id;
	idVertex1;
	idVertex2;
	weight;
	type
	
	constructor(id = '', idVertex1 = '', idVertex2 = '', weight = 0, type = '') {
		this.id = id
		this.idVertex1 = idVertex1
		this.idVertex2 = idVertex2
		this.weight = weight
		this.type = type
	}
}

export class Graph {
	vertexes = [] //список вершин
	vertexIdIterator = 0 //итератор для вершин в списке
	rawEdges = [] //сырой список рёбер со свойствами
	edges = []
	$graphObject
	auditoriumsVertexesMap = new Map()
	
	constructor($graphObject) {
		this.$graphObject = $graphObject
	}
	
	hasVertexByXY(x, y) {
		for (let vertex of this.vertexes) if ((vertex.x === x) && (vertex.y === y)) {
			return true
		}
		return false
	} //есть ли вершина в списке по координатам
	
	addVertexByXY(x, y, type = '') {
		if (!this.hasVertexByXY(x, y)) {
			this.vertexes.push(new Vertex(x, y, String(this.vertexIdIterator), type))
			this.vertexIdIterator ++
		}
	}
	
	getVertexByXY(x, y) {
		for (let vertex of this.vertexes) if ((vertex.x === x) && (vertex.y === y)) {
			return vertex
		}
		return undefined
	} //возвращает вершину по координатам
	
	getVertexByID(id = '') {
		for (let vertex of this.vertexes)
			if (vertex.id === id) {
				return vertex
			}
		return undefined
	}
	
	getDistanceBetween2VertexesByID(idVertex1, idVertex2) {
		for (let edge of this.edges) {
			if (edge.idVertex1 === idVertex1 && edge.idVertex2 === idVertex2)
				return (edge.weight)
			else if (edge.idVertex1 === idVertex2 && edge.idVertex2 === idVertex1)
				return (edge.weight)
		}
	}
	
	tracing($tableOfEdges) { //трассировка - парсинг путей и добавление их в таблицу
		let allPaths = this.$graphObject.contentDocument.getElementsByTagName('path') //все path на картинке
		
		function getGraphPaths() {
			let paths = []
			for (let path of allPaths) {
				/*
				ЗДЕСЬ НАСТРАИВАЕТСЯ ЦВЕТ РЕБРА
				 */
				let edgeColor = '#FF5F5F'
				if (path.getAttribute('stroke') === edgeColor) paths.push(path)
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
			
			
			if (coordinates.indexOf('H') !== - 1) {
				// lineType = 'horizontal'
				secondLetterPosition = coordinates.indexOf('H')
				y1 = coordinates.substring(0, secondLetterPosition)
				y2 = y1
				x2 = coordinates.substring(secondLetterPosition + 1)
			}
			else if (coordinates.indexOf('V') !== - 1) {
				// lineType = 'vertical'
				secondLetterPosition = coordinates.indexOf('V')
				y1 = coordinates.substring(0, secondLetterPosition)
				x2 = x1
				y2 = coordinates.substring(secondLetterPosition + 1)
			}
			else if (coordinates.indexOf('L') !== - 1) {
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
	} // трассировка: по элементам свг-картинки графа делает сырой список рёбер и заносит их в таблицу, записывает в
      // rawEdges ребра со свойствами
	
	createVertexesList() {
		for (let rawEdge of this.rawEdges) {
			this.addVertexByXY(rawEdge.x1, rawEdge.y1, 'hallway')
			this.addVertexByXY(rawEdge.x2, rawEdge.y2, 'hallway')
		}
		console.table(this.vertexes)
	}
	
	fillGraph() {
		for (let rawEdge of this.rawEdges) {
			let vertex1 = this.getVertexByXY(rawEdge.x1, rawEdge.y1)
			let vertex2 = this.getVertexByXY(rawEdge.x2, rawEdge.y2)
			
			let type
			if (vertex1.type === 'entranceToAu' || vertex2.type === 'entranceToAu') type = 'entranceToAu'
			else type = rawEdge.type
			
			/*
			Здесь можно добавить чтобы была длина у лестниц / входов в лестницы побольше
			 */
			
			let edge = new Edge(
				rawEdge.id,
				vertex1.id,
				vertex2.id,
				rawEdge.weight,
				type)
			this.edges.push(edge)
			
			vertex1.neighboringIDs.add(vertex2.id)
			vertex2.neighboringIDs.add(vertex1.id)
		}
		
		console.groupCollapsed('Готовый граф')
		console.log('Готовый список рёбер')
		console.table(this.edges)
		console.log('Готовый список вершин')
		console.table(this.vertexes)
		console.log('Осталось добавить параметры экспорта')
		console.groupEnd()
	}
	
	showGraph() {
		let $wrapper = this.$graphObject.parentElement
		
		for (let vertex of this.vertexes) {
			let $idEl = document.createElement('div')
			$idEl.classList.add('vertex-id')
			$idEl.style.left = `${vertex.x}px`
			$idEl.style.top = `${vertex.y}px`
			$idEl.innerText = vertex.id
			$wrapper.appendChild($idEl)
		}
		
		for (let edge of this.edges) {
			let $idEl = document.createElement('div')
			let vertex1 = this.getVertexByID(edge.idVertex1)
			let vertex2 = this.getVertexByID(edge.idVertex2)
			let left = ((vertex1.x + vertex2.x) / 2).toFixed(0)
			let top = ((vertex1.y + vertex2.y) / 2 - 7).toFixed(0)
			$idEl.classList.add('edge-id')
			$idEl.style.left = `${left}px`
			$idEl.style.top = `${top}px`
			// $idEl.innerHTML = edge.id.replace('Vector ', '')+'<br>'+edge.weight
			$idEl.innerHTML = edge.weight
			$wrapper.appendChild($idEl)
		}
	}
	
	getShortestWayFromTo(idVertex1, idVertex2) {
		
		let distances = new Map() //расстояния до вершин от начальной точки (старта)
		let ways = new Map() //маршруты из точек
		for (let vertex of this.vertexes) { // для всех вершин устанавливаем бесконечную длину пути
			distances.set(vertex.id, Infinity)
			ways.set(vertex.id, [])
		}
		distances.set(idVertex1, 0) //для начальной вершины длина пути = 0
		
		let finals = new Set() //вершины с окончательной длиной (обработанные вершины)
		
		let currentVertexID = idVertex1 //ид обрабатываемой вершины
		// for (let i = 0; i < 2; i ++) {
			while(finals.size !== this.vertexes.length){ //пока не посетили все вершины (или пока не обнаружено, что
			// граф не связный)
			
			//релаксации для соседних вершин
			let currentVertexDistance = distances.get(currentVertexID) //длина до обрабатываемой вершины
			for (let neighborId of this.getVertexByID(currentVertexID).neighboringIDs) { //для всех айдишников соседей вершины по айди
				let distanceBetweenCurrentAndNeighbor = this.getDistanceBetween2VertexesByID(currentVertexID, neighborId)
				//расстояние между обрабатываемой и соседней вершиной
				
				let neighborDistance = distances.get(neighborId) //расстояние до соседней вершины от старта
				
				//если расстояние до обр верш + между соседней < расст до соседней вершины от старта
				if (currentVertexDistance + distanceBetweenCurrentAndNeighbor < neighborDistance) {
					//обновляем расстояние до соседней вершины
					distances.set(neighborId, currentVertexDistance + distanceBetweenCurrentAndNeighbor)
					//и путь для нёё, как путь до текущей вершины + текущая вершина
					let wayToRelaxingVertex = Array.from(ways.get(currentVertexID))
					wayToRelaxingVertex.push(currentVertexID)
					ways.set(neighborId, wayToRelaxingVertex)
				}
				
			}
			
			finals.add(currentVertexID) //помечаем текущую вершину как обработканную
			
			//поиск следующей обрабатываемой вершины (необработанная вершина с наименьшим расстоянием от начала)
			let minDistance = Infinity
			let nextVertexID = ''
			for (let [id, distance] of distances) {
				if (distance < minDistance && (!finals.has(id))) {
					minDistance = distance
					nextVertexID = id
					// console.log(minDistance, nextVertexID)
				}
			}
			if (minDistance === Infinity) //если граф несвязный то закончить поиск путей
				break
			currentVertexID = nextVertexID
		}
		
		for(let [id, way] of ways){
			way.push(id)
		}
		
		// console.log(distances)
		// console.log(ways)
		return {
			way: ways.get(idVertex2),
			distance: distances.get(idVertex2)
		}
	}
	
	fillAuditoriumsVertexes(auditoriumsEntrances, $svgPlan) {
		for(const [auditoriumID, entranceID] of auditoriumsEntrances){
			let $entrance = $svgPlan.getElementById(entranceID)
			let cx = Number($entrance.getAttribute('cx'))
			let cy = Number($entrance.getAttribute('cy'))
			let vertex = this.getVertexByXY(cx, cy)
			vertex.type = 'entrancesToAu'
			this.auditoriumsVertexesMap.set(auditoriumID, vertex.id)
		}
		console.log('Вершины аудиторий')
		console.log(this.auditoriumsVertexesMap)
	}
}