import {Graph, Vertex, Edge} from '/js/graph.js'

let $map = document.querySelector(".map")
let mapContent, auditoriums, points

$map.addEventListener("load", () => {
	mapContent = $map.contentDocument
	auditoriums = mapContent.getElementsByClassName('au')
	points = mapContent.getElementsByClassName('point')
	for (const elAuditorium of auditoriums) {
		elAuditorium.addEventListener("click", function () {
			for (const elErasingAuditorium of auditoriums) {
				if (elErasingAuditorium !== this)
					elErasingAuditorium.classList.remove("selected")
			}
			this.classList.toggle("selected")
			let elPointCrassing
			for (const elPoint of points) {
				elPoint.classList.remove('selected-point')
				if (elPoint.id.indexOf(elAuditorium.id) !== -1) {
					elPointCrassing = elPoint
				}
			}
			// console.log(elPointCrassing)
			if (elAuditorium.classList.contains('selected'))
				elPointCrassing.classList.add('selected-point')
		})
		// console.log(elAuditorium)
	}
})

let planName = "plan-01"

function change() {
	if (planName === 'plan-01'){
		$map.data = "plan-01-all.svg"
		planName = "plan-01-all"
	}
	else {
		$map.data = "plan-01.svg"
		planName = "plan-01"
	}
}


Graph.tracing()