import { ExtJS } from '../../definition/ExtJS';
import { Component } from './BaseComponent';

export class Chart extends Component<ExtJS.Chart> {

    constructor(testId:string, extJs: ExtJS.Ext) {
        super(testId, extJs);
    }

    toggleLegendItem(index:number ,value:boolean){
        const legendStore = this.getExtJSCmp().getLegendStore();
        var record = legendStore.getAt(index);
		record.data["disabled"] = !value;
		record.commit();
        console.log(record);
    }
    getHidden(index: number) : boolean[]{
        const legendStore = this.getExtJSCmp().getLegendStore();
        var record = legendStore.getAt(index).data["series"];
        var seriesList = this.getExtJSCmp().getSeries();
        var series = seriesList.find(x=>x.id===record);
        if(series !== undefined)
            return series.getHidden();
        else
            return [];
    }
    // getItem ( index: number ) : Object{
    //     const d= this.getExtJSCmp().getLegendStore();
    //     //console.log("getActiveItem",this.getExtJSCmp().getActiveItem());
    //     // console.log("getActiveItem",this.getExtJSCmp().getItems());
    //     console.log(this.getExtJSCmp().getSeries());
    //     console.log(this.getExtJSCmp().getSeries()[0].getHidden());
    //     // console.log("d",d);
    //     // const d2= this.getExtJSCmp().getLegend();
    //     // console.log("d2",d2);
    //     // console.log("selected",d2.all);
    //     console.log("d",d.getAt(0).data);
    //     var record = d.getAt(0);
	// 	record.data["disabled"] = true;
	// 	record.commit();
    //     console.log(this.getExtJSCmp().getSeries()[0].getHidden());
    //     console.log(this.getExtJSCmp().items);

    //     var record = d.getAt(2);
	// 	record.data["disabled"] = true;
	// 	record.commit();
    //     console.log(this.getExtJSCmp().getSeries()[0].getHidden());
    //     console.log(this.getExtJSCmp().items);
    //     return d;
    // }
}