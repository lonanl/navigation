export class Graph {
	static $graphSvg
	static $objectGraph;
	static $tableContent = document.querySelector('.list-smezh')

	static tracing() {
		Graph.$objectGraph = document.querySelector('.graph');


		function erase($el) {
			$el.setAttribute('stroke-width', '3')
			let row = document.createElement('tr')

			let coordinates = $el.getAttribute('d').substring(1);
			let firstSpace = coordinates.indexOf(' ')
			let x1, y1, x2, y2

			x1 = coordinates.substring(0, firstSpace)

			coordinates = coordinates.substring(firstSpace + 1)

			let secondSpace = coordinates.indexOf(' ')
			let lineType = ''
			let secondLetterPosition;

			if (coordinates.indexOf('H') !== -1) {
				lineType = 'horizontal'
				secondLetterPosition = coordinates.indexOf('H')
				y1 = coordinates.substring(0, secondLetterPosition)
				y2 = y1
				x2 = coordinates.substring(secondLetterPosition+1)
			} else if (coordinates.indexOf('V') !== -1) {
				lineType = 'vertical'
				secondLetterPosition = coordinates.indexOf('V')
				y1 = coordinates.substring(0, secondLetterPosition)
				x2 = x1
				y2 = coordinates.substring(secondLetterPosition+1)
			}

			function addTdToTR(value, cellClass, tr) {
				let td =  document.createElement('td')
				td.innerHTML = value
				// td.setAttribute('class', String(cellClass))
				tr.appendChild(td)
			}

			let weight = Number((((x2-x1)**2+(y2-y1)**2)**0.5).toFixed(2))

			addTdToTR($el.getAttribute('id'), 'id', row)
			addTdToTR(x1, 'x1', row)
			addTdToTR(y1, 'y1', row)
			addTdToTR(x2, 'x2', row)
			addTdToTR(y2, 'y2', row)
			addTdToTR(weight, 'weight', row)
			addTdToTR('same-floor', 'type', row)




			Graph.$tableContent.appendChild(row)
		}

		// Graph.$objectGraph.addEventListener("load", () => {
			Graph.$graphSvg = Graph.$objectGraph.contentDocument.getElementsByTagName('svg')[0]
			let timeout = 0
			for (const $graphEl of Graph.$graphSvg.getElementsByTagName('path')) {
				if ($graphEl.getAttribute('stroke') === '#FF5F5F') {
					console.log($graphEl)
					setTimeout(erase, timeout, $graphEl)
					timeout += 70
				}
			}
		// })
	}
}

export class Vertex {
	constructor(x,y, adjacentPoints = []) {
		this.x = x
		this.y = y
		this.adjacentPoints = adjacentPoints
	}

}

export class Edge {
	constructor(vertex1, vertex2, weight = 0, type = '') {
		this.vertex1 = vertex1
		this.vertex2 = vertex2
		this.weight = weight
		this.type = type
	}
}