import {Settings} from "./Settings.js";

export class PlanHandler {
	constructor($mapObject) {
		this.$planObject = $mapObject //объект отображения плана
		// this.$planWrapper = $mapObject.parentElement //внешний контейнер с картами
	}
	
	$planDocument //содержимое документа плана
	auditoriums = new Map() //map ид-аудитории: dom-элемент аудитории
	entrances = new Map() //map ид-входа: dom-элемент входа
	$selector
	
	setSelectorElements($selector) {
		this.$selector = $selector
	}
	
	onPlanLoad() { //при загрузки плана
		this.$planDocument = this.$planObject.contentDocument
		
		let linkXmlToStylesheet = document.createElement('style') //тэг для задания стиля в свг
		linkXmlToStylesheet.innerHTML = `@import url(${Settings.planStyleLink});`
		
		let $svgPlan = this.$planDocument.getElementsByTagName('svg')[0]
		$svgPlan.prepend(linkXmlToStylesheet)
		console.log($svgPlan)
		
		let planElements = this.$planDocument.getElementsByTagName('*') //все элементы документа плана
		for (const $el of planElements) { //если элемент это аудитория - добавляем в аудитории
			if (Settings.auditoriumsColors.includes($el.getAttribute('fill'))) {
				this.auditoriums.set($el.id, $el)
				$el.classList.add('auditorium') //и добавляем аудитории соответствующий класс, для подсветки
			}
			else if ($el.tagName === Settings.entrancesTag //если элемент - вход - добавляем в входы
				&& Settings.entrancesColors.includes($el.getAttribute('fill'))) {
				this.entrances.set($el.id, $el)
				$el.classList.add('entrance') //и добавляем соответствующий класс для
				$el.setAttribute('fill-opacity', '0')
			}
		}
		
		for (const [auId, $au] of this.auditoriums) { //для каждой аудитории поставить слушатель клика
			$au.addEventListener('mousedown', event => this.onAuditoriumClicked(auId, event))
		}
	}
	
	
	onAuditoriumClicked(clickedAuId, event) { //когда нажато на аудиторию
		for (const [auditoriumID, $auditorium] of this.auditoriums) { //когда нажима
			if (auditoriumID !== clickedAuId) $auditorium.classList.remove('selected')
			else $auditorium.classList.toggle('selected')
		}
		
		let clickedAuditoriumEntranceId = Settings.auditoriumsEntrances.get(clickedAuId) //ид входа в нажатую аудиторию
		for (const [entranceID, $entrance] of this.entrances) {
			if (entranceID !== clickedAuditoriumEntranceId) $entrance.classList.remove('selected-entrance')
			else $entrance.classList.toggle('selected-entrance')
		}
		
		let isSelected = this.auditoriums.get(clickedAuId).classList.contains('selected')
		this.showSelector(event, isSelected, clickedAuId)
		
	}
	
	showSelector(event, isSelected, clickedAuId) {
		
		function show(planHandler) {
			planHandler.$selector.classList.remove('hidden-selector')
			planHandler.$selector.classList.add('showing-selector')
			planHandler.$selector.style.left = `${String(event.clientX)}px`
			planHandler.$selector.style.top = `${String(event.clientY)}px`
		}
		
		if (isSelected) {
			if (clickedAuId === this.$selector.getAttribute('auID') || this.$selector.getAttribute('auID' === '')) {
				this.$selector.style.left = `${String(event.clientX)}px`
				this.$selector.style.top = `${String(event.clientY)}px`
				this.$selector.classList.remove('hidden-selector')
				this.$selector.classList.add('showing-selector')
			}
			else{
				this.$selector.classList.remove('showing-selector')
				this.$selector.classList.add('hidden-selector')
				setTimeout(show, 20, this)
			}
		}
		else {
			this.$selector.classList.remove('showing-selector')
			this.$selector.classList.add('hidden-selector')
		}
		this.$selector.setAttribute('auID', clickedAuId)
	}
}