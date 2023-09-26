import {Settings} from "./Settings.js";

export class PlanHandler {
	constructor($mapObject) {
		this.$planObject = $mapObject
	}
	
	$planObject //объект отображения плана
	$planDocument //содержимое документа плана
	$planWrapper //внешний контейнер с картами
	auditoriums = new Map() //map ид-аудитории: dom-элемент аудитории
	entrances = new Map() //map ид-входа: dom-элемент входа
	
	onPlanLoad() {
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
			$au.addEventListener('mousedown', () => this.onAuditoriumClicked(auId, $au))
		}
	}
	
	
	onAuditoriumClicked(clickedAuId) { //когда нажато на аудиторию
		for (const [auditoriumID, $auditorium] of this.auditoriums) { //когда нажима
			if (auditoriumID !== clickedAuId) $auditorium.classList.remove('selected')
			else $auditorium.classList.toggle('selected')
		}
		
		let clickedAuditoriumEntranceId = Settings.auditoriumsEntrances.get(clickedAuId) //ид входа в нажатую аудиторию
		for (const [entranceID, $entrance] of this.entrances) {
			if (entranceID !== clickedAuditoriumEntranceId) $entrance.classList.remove('selected-entrance')
			else $entrance.classList.toggle('selected-entrance')
		}
	}
}