export class DragHandler {
	$dragger
	$wrapper
	$bPlus
	$bMinus
	currentScale
	baseTop
	
	constructor($dragger, $bPlus, $bMinus, planHandler) {
		this.$dragger = $dragger
		this.$bPlus = $bPlus;
		this.$bMinus = $bMinus;
		this.$wrapper = this.$dragger.parentElement
		this.currentScale = 1
		
		let height = Math.floor(planHandler.$svgPlan.getBoundingClientRect().height) //высота map-objects и элементов
		                                                                             // карты
		let wrapperHeight = Math.round(this.$wrapper.getBoundingClientRect().height) //высота врапппера
		// console.log(height,wrapperHeight)
		$dragger.style.height = `${height}px` //устанавливаем вы
		this.baseTop = Math.floor(wrapperHeight - height) / 2
		$dragger.style.top = `${this.baseTop}px`
		console.log('TOP:', this.baseTop)
		
		this.$wrapper.addEventListener('mousedown', startMove)
		this.$wrapper.addEventListener('touchstart', startMove, 'mouse')
		
		function startMove(eventMD) {
			let startLeft = $dragger.offsetLeft
			let startTop = $dragger.offsetTop
			let startX;
			let startY;
			if (eventMD.type === 'mousedown') {
				startX = eventMD.clientX
				startY = eventMD.clientY
			}
			else if (eventMD.type === 'touchstart') {
				startX = eventMD.touches[0].clientX
				startY = eventMD.touches[0].clientY
			}
			
			document.addEventListener('mousemove', onMouseMove)
			document.addEventListener('touchmove', onMouseMove)
			
			function onMouseMove(eventMM) {
				// $dragger.classList.add('non-scaling')
				$dragger.style.transition = 'all .03s linear'
				// $dragger.style.transition = 'none'
				$dragger.style.pointerEvents = 'none'
				let clientX = eventMM.type === 'mousemove' ? eventMM.clientX : eventMM.touches[0].clientX
				let clientY = eventMM.type === 'mousemove' ? eventMM.clientY : eventMM.touches[0].clientY
				$dragger.style.top = `${clientY - startY + startTop}px`
				$dragger.style.left = `${clientX - startX + startLeft}px`
			}
			
			document.addEventListener('mouseup', moveEnd)
			document.addEventListener('touchend', moveEnd)
			document.addEventListener('touchcancel', moveEnd)
			
			function moveEnd() {
				// $dragger.classList.remove('non-scaling')
				$dragger.style.transition = ''
				$dragger.style.pointerEvents = 'auto'
				document.removeEventListener('mousemove', onMouseMove)
				document.removeEventListener('touchmove', onMouseMove)
				document.removeEventListener('mouseup', moveEnd)
				document.removeEventListener('touchend', moveEnd)
				document.removeEventListener('touchcancel', moveEnd)
				
			}
		}
		
		function scale(dragHandler, scaleValue) {
			let newScale = Math.round((dragHandler.currentScale * scaleValue) * 10) / 10;
			$dragger.style.transform = `scale(${newScale})`
			// console.log(`scale(${dragHandler.$scale})`)
			let relation = newScale / dragHandler.currentScale
			$dragger.style.left = `${$dragger.offsetLeft * relation}px`
			// $dragger.style.top = `${$dragger.offsetTop * relation - dragHandler.baseTop * dragHandler.$scale}px`
			$dragger.style.top = `${($dragger.offsetTop - dragHandler.baseTop) / dragHandler.currentScale * newScale + dragHandler.baseTop}px`
			console.log($dragger.offsetTop, dragHandler.baseTop, newScale, dragHandler.baseTop)
			dragHandler.currentScale = newScale
		}
		
		this.$bPlus.addEventListener('click', function () {
			scale(this, 1.5)
		}.bind(this))
		this.$bMinus.addEventListener('click', function () {
			scale(this, .6)
		}.bind(this))
	}
}

