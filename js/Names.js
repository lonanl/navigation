export class Names {
	constructor() {
	
	}
	
	static generateRusName(name=''){
		let rusName = ''
		let corpus = ''
		if(name.startsWith('a')) corpus='А'
		rusName+=corpus
		let firstTire = name.indexOf('-')
		let secondTire = name.indexOf('-', firstTire+1)
		if(secondTire === -1) secondTire = name.length
		rusName+=name.substring(firstTire+1,secondTire)
		console.log(rusName)
	}
}