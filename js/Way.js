import {Settings} from './Settings.js';

export class Way { //класс для обработки свг-пути
	$svg //элемент свг для путей
	
	constructor($svg) {
		this.$svg = $svg
	}
	
	setupWay($similarElement) {
		this.$svg.setAttribute('viewBox', $similarElement.getAttribute('viewBox'))
	}
	
	build(graph, wayAndDistance) { //построить путь -
		this.removeOldWays()
		let distance = wayAndDistance.distance
		this.$svg.setAttribute('style', `stroke-dashoffset: ${distance}; stroke-dasharray: ${distance};`)
		
		let d = 'M' //строка атрибута d - координаты точек линии маршрута
		for (const vertexID of wayAndDistance.way) { //для каждого айди вершины из полученного маршрута
			let vertex = graph.getVertexByID(vertexID) //получаем вершину
			d += `${vertex.x} ${vertex.y}L` //добавляем в линию координаты
		}
		d = d.slice(0, - 1); //удаляем последнюю L
		
		let $path = document.createElementNS('http://www.w3.org/2000/svg', 'path') //элемент path
		$path.setAttribute('d', d) //устанавливаем путь в атрибут d
		$path.setAttribute('stroke', Settings.wayColor) //цвет линии
		$path.setAttribute('stroke-width', Settings.wayWidth) //ширина линии
		$path.setAttribute('marker-start', 'url(#start-dot)') //маркер начала - кружочек
		$path.classList.add('way-path')
		this.$svg.prepend($path) //добавляем path в свг
		setTimeout(function () { //через секунду - когда линия полностью нарисуется добавить маркер конца - стрелочку
			$path.setAttribute('marker-end', 'url(#end-arrow)')
		}, 1000)
		console.log($path)
		console.log($path.pathLength)
	}
	
	removeOldWays() {
		for (const $oldPath of this.$svg.getElementsByClassName('way-path')) {
			$oldPath.remove()
		}
	}
}