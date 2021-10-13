import { Input } from './Input';

export class SearchInput extends Input {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	runSearch(): void {
		const event = this.extJs.create('Ext.event.Event',{ keyCode: 13 })
		this.fireEvent('keypress',event)
	}

	runSpecialSearch(): void{
		const event = this.extJs.create('Ext.event.Event',{ keyCode: 13 })
		this.fireEvent('specialkey',event)
	}
}