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
			let x1Value, y1Value, x2Value, y2Value

			x1Value = coordinates.substring(0, firstSpace)

			coordinates = coordinates.substring(firstSpace + 1)

			let secondSpace = coordinates.indexOf(' ')
			let lineType = ''
			let secondLetterPosition;

			if (coordinates.indexOf('H') !== -1) {
				lineType = 'horizontal'
				secondLetterPosition = coordinates.indexOf('H')
				y1Value = coordinates.substring(0, secondLetterPosition)
				y2Value = y1Value
				x2Value = coordinates.substring(secondLetterPosition+1)
			} else if (coordinates.indexOf('V') !== -1) {
				lineType = 'vertical'
				secondLetterPosition = coordinates.indexOf('V')
				y1Value = coordinates.substring(0, secondLetterPosition)
				x2Value = x1Value
				y2Value = coordinates.substring(secondLetterPosition+1)
			}

			function addTdToTR(value, cellClass, tr) {
				let td =  document.createElement('td')
				td.innerHTML = value
				// td.setAttribute('class', String(cellClass))
				tr.appendChild(td)
			}

			let weightValue = Number((((x2Value-x1Value)**2+(y2Value-y1Value)**2)**0.5).toFixed(2))

			addTdToTR($el.getAttribute('id'), 'id', row)
			addTdToTR(x1Value, 'x1', row)
			addTdToTR(y1Value, 'y1', row)
			addTdToTR(x2Value, 'x2', row)
			addTdToTR(y2Value, 'y2', row)
			addTdToTR(weightValue, 'weight', row)
			addTdToTR('same-floor', 'type', row)




			Graph.$tableContent.appendChild(row)
		}

		Graph.$objectGraph.addEventListener("load", () => {
			Graph.$graphSvg = Graph.$objectGraph.contentDocument.getElementsByTagName('svg')[0]
			let timeout = 500
			for (const $graphEl of Graph.$graphSvg.getElementsByTagName('path')) {
				if ($graphEl.getAttribute('stroke') === '#FF5F5F') {
					console.log($graphEl)
					setTimeout(erase, timeout, $graphEl)
					timeout += 300
				}
			}
		})
	}
}

export class Vertex {

}

export class Edge {

}