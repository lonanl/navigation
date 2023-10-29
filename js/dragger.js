export class Dragger {
	$dragger
	$wrapper
	
	constructor($dragger) {
		this.$dragger = $dragger
		this.$wrapper = this.$dragger.parentElement
		
		this.$wrapper.addEventListener('mousedown', startMove, 'mouse')
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
			
			function moveEnd(eventME) {
				$dragger.style.pointerEvents = 'auto'
				document.removeEventListener('mousemove', onMouseMove)
				document.removeEventListener('touchmove', onMouseMove)
				document.removeEventListener('mouseup', moveEnd)
				document.removeEventListener('touchend', moveEnd)
				document.removeEventListener('touchcancel', moveEnd)
				
			}
		}
	}
}

