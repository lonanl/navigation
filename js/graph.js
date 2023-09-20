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

			function addTdToTR(value, tr) {
				let td =  document.createElement('td')
				td.innerHTML = value
				tr.appendChild(td)
			}

			addTdToTR($el.getAttribute('id'), row)
			addTdToTR(x1Value, row)
			addTdToTR(x2Value, row)
			addTdToTR(y1Value, row)
			addTdToTR(y2Value, row)



			Graph.$tableContent.appendChild(row)
		}

		Graph.$objectGraph.addEventListener("load", () => {
			Graph.$graphSvg = Graph.$objectGraph.contentDocument.getElementsByTagName('svg')[0]
			let timeout = 500
			for (const $graphEl of Graph.$graphSvg.getElementsByTagName('path')) {
				if ($graphEl.getAttribute('stroke') === '#FF5F5F') {
					console.log($graphEl)
					setTimeout(erase, timeout, $graphEl)
					timeout += 50
				}
			}
		})
	}
}

export class Vertex {

}

export class Edge {

}