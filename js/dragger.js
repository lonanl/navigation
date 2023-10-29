export class Dragger {
	$dragger
	$wrapper
	
	constructor($dragger) {
		this.$dragger = $dragger
		this.$wrapper = this.$dragger.parentElement
		
		this.$wrapper.addEventListener('mousedown', function (eventMD) {
			let startX = eventMD.clientX
			let startY = eventMD.clientY
			let startLeft = $dragger.offsetLeft
			let startTop = $dragger.offsetTop
			
			document.addEventListener('mousemove', onMouseMove)
			
			function onMouseMove(eventMM) {
				$dragger.style.pointerEvents = "none"
				// console.log($dragger.style.top)
				$dragger.style.top = `${eventMM.clientY - startY + startTop}px`
				$dragger.style.left = `${eventMM.clientX - startX + startLeft}px`
			}
			
			document.addEventListener('mouseup', onMouseUp)
			
			function onMouseUp() {
				$dragger.style.pointerEvents = "auto"
				document.removeEventListener('mousemove', onMouseMove)
				document.removeEventListener('mouseup', onMouseUp)
			}
		})
	}
}

