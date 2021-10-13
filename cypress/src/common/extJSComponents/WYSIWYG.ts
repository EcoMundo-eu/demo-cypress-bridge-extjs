import { Component } from './BaseComponent';


/**
 * @example
 * const textEditor = new WYSIWYG('comment', ExtJS);
 * textEditor.insertBoldText('Bold Text')
 * .insertBoldAndItalicText('Italic text')
 * .insertBoldAndItalicText('Bold and italic text')
 * .insertUnderlineText('Underline text')
 * .insertHyperLink('HyperLink Text')
 * .insertTextWithColor('Text colored')
 * .insertBulletList('one', 'two', 'three')
 * .alignCenter()
 */
// @ts-ignore
export class WYSIWYG extends Component<ExtJS.WYSIWYG> {

	/**
	 * @description This constructor inherits Base component which needs `testId` and `window.ExtJS`
	 * @param testId This holds testId of the current component
	 * @param ExtJS This holds global ExtJS variable provide by this command `window.Ext`
	 */
	constructor(testId: string, ExtJS?: ExtJS.Ext) {
		// @ts-ignore
		super(testId, ExtJS);
		this.checkXType('htmleditor');
	}

	/**
	 * set empty value current element
	 */
	resetField(): this {
		this.getExtJSCmp().reset();
		return this;
	}

	/**
	 * get current value
	 */
	getText(): string {
		return this.getExtJSCmp().value;
	}

	/**
	 * Insert basic text
	 * @param text
	 */
	insertText(text: string): this {
		this.getExtJSCmp().setValue(text);
		return this;
	}

	/**
	 * Insert bold text
	 * @param text
	 */
	insertBoldText(text: string): this {
		this.getExtJSCmp().setValue(`${this.getText()} <b>${text}</b>`);
		return this;
	}

	/**
	 * Insert italic text
	 * @param text
	 */
	insertItalicText(text: string): this {
		this.getExtJSCmp().setValue(`${this.getText()} <i>${text}</i>`);
		return this;
	}

	/**
	 * Insert underline text
	 * @param text
	 */
	insertUnderlineText(text: string): this {
		this.getExtJSCmp().setValue(`${this.getText()} <u>${text}</u>`);
		return this;
	}

	/**
	 * Insert bold text
	 * @param text
	 */
	insertBoldAndItalicText(text: string): this {
		this.getExtJSCmp().setValue(`${this.getText()} <b><i>${text}</i></b>`);
		return this;
	}

	/**
	 * Insert bold-italic-underline text
	 * @param text
	 */
	insertBoldItalicAndUnderLineText(text: string): this {
		this.getExtJSCmp().setValue(`${this.getText()} <u><b><i>${text}</i></b></u>`);
		return this;
	}

	/**
	 * Insert break line
	 */
	insertBreakLine(): this {
		this.getExtJSCmp().setValue(`${this.getText()}</br>`);
		return this;
	}

	/**
	 * Insert tabulation
	 */
	insertTabulation(): this {
		this.getExtJSCmp().setValue(`${this.getText()}<span style="white-space: pre">    </span>`);
		return this;
	}

	/**
	 * Insert text with color
	 * @param text
	 * @param color
	 */
	insertTextWithColor(text: string, color: string = "red"): this {
		this.getExtJSCmp().setValue(`${this.getText()} <span style="background-color: ${color}">${text}</span>`);
		return this;
	}

	/**
	 * align text to left
	 */
	alignLeft(): this {
		this.getExtJSCmp().setValue(`${this.getText()} <div style="text-align: left">${this.getText()}</div>`);
		return this;
	}

	/**
	 * align text to right
	 */
	alignRight(): this {
		this.getExtJSCmp().setValue(`<div style="text-align: right">${this.getText()}</div>`);
		return this;
	}

	/**
	 * align text to center
	 */
	alignCenter(): this {
		this.getExtJSCmp().setValue(`<div style="text-align: center">${this.getText()}</div>`);
		return this;
	}

	/**
	 * Insert link clickable
	 * @param link
	 */
	insertHyperLink(link: string): this {
		this.getExtJSCmp().setValue(`${this.getText()} <a href="${link}">${link}</a>`);
		return this;
	}

	/**
	 * Insert ordered list
	 * @param items
	 */
	insertOrderedList(...items: string[]): this {
		let temp = ''
		for(const item of items) {
			temp += `<li>${item}</li>`
		}

		this.getExtJSCmp().setValue(`${this.getText()}<ol>${temp}</ol>`);

		return this;
	}

	/**
	 * Insert unordered list
	 * @param items
	 */
	insertBulletList(...items: string[]): this {
		let temp = ''
		for(const item of items) {
			temp += `<li>${item}</li>`
		}

		this.getExtJSCmp().setValue(`${this.getText()}<ul>${temp}</ul>`);

		return this;
	}
}
