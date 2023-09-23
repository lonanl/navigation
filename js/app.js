import {Graph} from './graph.js'

let $map = document.querySelector(".map") //объект отображения карты
let mapContent, auditoriums, points //головной элемент документа карты, аудитории на карте, точки на карте

$map.addEventListener("load", () => { //при загрузке карты

	mapContent = $map.contentDocument //ищем контент
	auditoriums = mapContent.getElementsByClassName('au') //ищем аудитории по классу (ПОМЕНЯТЬ НА ЦВЕТ)
	points = mapContent.getElementsByClassName('point') //ищем точки на карте (ПОМЕНЯТЬ НА ЦВЕТ)

	for (const elAuditorium of auditoriums) { //проходимся по аудиториям
		elAuditorium.addEventListener("click", function () { //при нажатии на аудиторию

			for (const elErasingAuditorium of auditoriums) { //стираем все аудитории
				if (elErasingAuditorium !== this)
					elErasingAuditorium.classList.remove("selected")
			}
			//сюда добавить занесение аудитории в выбранную

			this.classList.toggle("selected") //стираем или закрашиваем аудиторию
			let $elPointPainting //здесь будет закрашиваемая точка аудитории
			for (const $elPoint of points) {
				$elPoint.classList.remove('selected-point') //стираем все точки
				if ($elPoint.id.indexOf(elAuditorium.id) !== -1) {
					$elPointPainting = $elPoint
				}
			}

			if (elAuditorium.classList.contains('selected')) // закрашиваем или нет точку
				$elPointPainting.classList.add('selected-point')
		})

	}
})

let planName = "plan-01"

export function change() { //смена схемы на другой файл
	if (planName === 'plan-01') {
		$map.data = "plan-01-all.svg"
		planName = "plan-01-all"
	} else {
		$map.data = "plan-01.svg"
		planName = "plan-01"
	}
}

export function eraseTable() { //стирание таблицы и восстановление плана
	console.log(Graph.$tableContent.childElementCount)
	while (Graph.$tableContent.firstChild)
		Graph.$tableContent.firstChild.remove()
	Graph.$objectGraph.data = "plan-01-graph.svg"
	activateButton('tracing')
	deactivateButton('erase')
	deactivateButton('get-list-of-edges')
}

export function activateButton(buttonClass) {
	document.getElementsByClassName(buttonClass)[0].classList.remove('non-active-button')

}
export function deactivateButton(buttonClass) {
	document.getElementsByClassName(buttonClass)[0].classList.add('non-active-button')
}