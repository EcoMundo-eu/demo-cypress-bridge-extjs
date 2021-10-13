import {Component} from "./BaseComponent";

export class DateInput extends Component<ExtJS.DateInput>{

	/**
	 * Store all months index 0-11
	 */
	static MONTHS = {
		JANUARY: 0,
		FEBRUARY: 1,
		MARCH: 2,
		APRIL: 3,
		MAY: 4,
		JUNE: 5,
		JULY: 6,
		AUGUST: 7,
		SEPTEMBER: 8,
		OCTOBER: 9,
		NOVEMBER: 10,
		DECEMBER: 11
	}

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
		this.checkXType('datefield')
	}

	/**
	 * Set date in selected input without open a date picker
	 * @param year
	 * @param month
	 * @param day
	 */
	setDate(year: number, month: number, day: number): this {
		this.getExtJSCmp().setValue(new Date(year, month, day));
		return this;
	}

	/**
	 * Set date in selected input by opening a date picker
	 * @param year
	 * @param month
	 * @param day
	 */
	setDatePanelOpened(year: number, month: number, day: number): this {
		this.expandDatePanel();
		this.getExtJSCmp().getPicker('auto').setValue(new Date(year, month, day));
		this.setDate(year, month, day);
		return this;
	}

	/**
	 * Set today date in selected input
	 */
	setDateToday(): this {
		const date = new Date();
		this.setDate(date.getFullYear(), date.getMonth(), date.getDate())
		return this;
	}

	/**
	 * Set today date both in selected input and the date picker
	 */
	setTodayDatePanelOpened(): this {
		const date = new Date();
		this.setDatePanelOpened(date.getFullYear(), date.getMonth(), date.getDate());
		this.setDateToday();
		return this;
	}

	/**
	 * Get selected date
	 * @return {Date}
	 */
	getDate(): Date {
		return new Date(this.getExtJSCmp().value);
	}

	/**
	 * Open date picker
	 */
	expandDatePanel(): this {
		this.getExtJSCmp().expand();
		return this;
	}

	/**
	 * Close date picker
	 */
	collapseDatePanel(): this {
		this.getExtJSCmp().collapse();
		return this;
	}
}