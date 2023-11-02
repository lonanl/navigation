export class DragHandler {
	$dragAble //Объект для премещения
	$scaleAble //Объект для масштабирования в центр
	$wrapper //Внешний контейнер за пределами которого не видно
	$bPlus //Кнопка увеличить масштаб
	$bMinus //Кнопка уменьшить масштаб
	
	constructor($dragAble, $scaleAble, $wrapper, $bPlus, $bMinus) {
		this.$dragAble = $dragAble
		this.$scaleAble = $scaleAble;
		this.$bPlus = $bPlus;
		this.$bMinus = $bMinus;
		this.$wrapper = $wrapper
		let currentScale = 1
		
		//слушатели нажатия на мышь или экран
		this.$wrapper.addEventListener('mousedown', startMove)
		this.$wrapper.addEventListener('touchstart', startMove, 'mouse')
		
		//при нажатии
		function startMove(eventMD) {
			//запоминаем начальную позицию перемещаемого объекта и начальные координаты касания/нажатия
			let startLeft = $dragAble.offsetLeft
			let startTop = $dragAble.offsetTop
			let startX = eventMD.type === 'mousedown' ? eventMD.clientX : eventMD.touches[0].clientX
			let startY = eventMD.type === 'mousedown' ? eventMD.clientY : eventMD.touches[0].clientY
			
			//устанавливаем слушатели на перемещение
			document.addEventListener('mousemove', onMouseMove)
			document.addEventListener('touchmove', onMouseMove)
			
			//при перемещении
			function onMouseMove(eventMM) {
				$dragAble.style.pointerEvents = 'none' //отключаем возможность нажатия/выделения
				//считаем текущие координаты касания/нажатия
				let clientX = eventMM.type === 'mousemove' ? eventMM.clientX : eventMM.touches[0].clientX
				let clientY = eventMM.type === 'mousemove' ? eventMM.clientY : eventMM.touches[0].clientY
				//перемещаем с учетом масштаба
				$dragAble.style.top = `${(clientY - startY) / currentScale + startTop}px`
				$dragAble.style.left = `${(clientX - startX) / currentScale + startLeft}px`
			}
			
			//слушатели отпускания мыши/пальца
			document.addEventListener('mouseup', moveEnd)
			document.addEventListener('touchend', moveEnd)
			document.addEventListener('touchcancel', moveEnd)
			
			//при отпускании удаляем слушатели и возвращаем возможность взаимодействовать с контентом
			function moveEnd() {
				$dragAble.style.pointerEvents = 'auto'
				document.removeEventListener('mousemove', onMouseMove)
				document.removeEventListener('touchmove', onMouseMove)
				document.removeEventListener('mouseup', moveEnd)
				document.removeEventListener('touchend', moveEnd)
				document.removeEventListener('touchcancel', moveEnd)
				
			}
		}
		
		//слушатели нажатия на кнопки масштаба
		this.$bPlus.addEventListener('click', () => scale(this, 1.5))
		this.$bMinus.addEventListener('click', () => scale(this, 1 / 1.5))
		
		//функция масштабирует масштабируемый объект
		function scale(dragHandler, scaleValue) {
			let newScale = Math.round((currentScale * scaleValue) * 100) / 100;
			dragHandler.$scaleAble.style.transform = `scale(${newScale})`
			currentScale = newScale
		}
		
		let wheelSum = 0
		$wrapper.addEventListener('wheel', function (eventWH) {
			wheelSum+=eventWH.wheelDelta
			if(Math.abs(wheelSum) > 120 ) {
				if (eventWH.wheelDelta > 0) scale(this, 1.15)
				else if (eventWH.wheelDelta < 0) scale(this, 1 / 1.15)
				wheelSum = 0
			}
		}.bind(this))
	}
}

