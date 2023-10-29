export class DragHandler {
	$dragger
	$wrapper
	$bPlus
	$bMinus
	$scale = 1
	
	constructor($dragger, $bPlus, $bMinus) {
		this.$dragger = $dragger
		this.$bPlus = $bPlus;
		this.$bMinus = $bMinus;
		this.$wrapper = this.$dragger.parentElement
		
		this.$wrapper.addEventListener('mousedown', startMove)
		this.$wrapper.addEventListener('touchstart', startMove, 'mouse')
		
		function startMove(eventMD) {
			let startLeft = $dragger.offsetLeft
			let startTop = $dragger.offsetTop
			let startX;
			let startY;
			if(eventMD.type === 'mousedown'){
				startX = eventMD.clientX
				startY = eventMD.clientY
			}
			else if(eventMD.type === 'touchstart'){
				startX = eventMD.touches[0].clientX
				startY = eventMD.touches[0].clientY
			}
			
			document.addEventListener('mousemove', onMouseMove)
			document.addEventListener('touchmove', onMouseMove)
			
			function onMouseMove(eventMM) {
				$dragger.classList.add('non-scaling')
				$dragger.style.pointerEvents = 'none'
				if(eventMM.type === 'mousemove'){
					$dragger.style.top = `${eventMM.clientY - startY + startTop}px`
					$dragger.style.left = `${eventMM.clientX - startX + startLeft}px`
				}
				else if(eventMM.type === 'touchmove'){
					$dragger.style.top = `${eventMM.touches[0].clientY - startY + startTop}px`
					$dragger.style.left = `${eventMM.touches[0].clientX - startX + startLeft}px`
				}
			}
			
			document.addEventListener('mouseup', moveEnd)
			document.addEventListener('touchend', moveEnd)
			document.addEventListener('touchcancel', moveEnd)
			
			function moveEnd() {
				$dragger.classList.remove('non-scaling')
				$dragger.style.pointerEvents = 'auto'
				document.removeEventListener('mousemove', onMouseMove)
				document.removeEventListener('touchmove', onMouseMove)
				document.removeEventListener('mouseup', moveEnd)
				document.removeEventListener('touchend', moveEnd)
				document.removeEventListener('touchcancel', moveEnd)
				
			}
		}
		
		function scale(dragHandler, typeScale) {
			let newScale
			if (typeScale === 'plus') {
				newScale = Math.round((dragHandler.$scale * 1.2) * 10) / 10;
			}
			else if (typeScale === 'minus') {
				newScale = Math.round((dragHandler.$scale * 0.8) * 10) / 10;
			}
			$dragger.style.transform = `scale(${newScale})`
			console.log(`scale(${dragHandler.$scale})`)
			$dragger.style.left = `${$dragger.offsetLeft * (newScale / dragHandler.$scale)}px`
			dragHandler.$scale = newScale
		}
		
		this.$bPlus.addEventListener('click', () => scale(this, 'plus'))
		this.$bMinus.addEventListener('click', () => scale(this, 'minus'))
	}
}

