import { Grid } from './BaseGrid';
import {ExtJS} from "../../definition/ExtJS";

export class PanelGrid extends Grid<ExtJS.GridPanel>{

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

}