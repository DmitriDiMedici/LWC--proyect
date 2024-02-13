import { LightningElement, api } from 'lwc';



export default class DataForm extends LightningElement {
    @api record;
    @api displayModal;
    @api rowFields;
    @api columns;
    @api fieldValues=[];
    @api isEditing;




    //Data population
    connectedCallback(){
        console.log("Columns: ", this.columns);
        for (const column of this.columns){
            if(column.fieldName !== 'id' && column.type !== 'action' ){
                this.fieldValues.push({
                    ...column,
                    value: this.rowFields[column.fieldName]
                })
            }

        }
    }

    //Comm with table stuff
    handleCancel(){
        const event = new CustomEvent('close',{
            detail: {
                flag: false
            }
        });
        this.dispatchEvent(event);
    }

    handleSave(event){
        const saveEvent = new CustomEvent('save', {
            detail: this.rowFields
        });
        this.dispatchEvent(saveEvent);
    }
    
    handleFieldChange(event){
        const fieldName = event.target.dataset.id;
        const fieldValue = event.target.value;
        const rowFields = {...this.rowFields};
        rowFields[fieldName] = fieldValue;
        this.rowFields = rowFields;
        console.log("Row fields---->", rowFields);
    }


    handleSuccess(event){
        const successEvent = new CustomEvent("success", {
            detail: {
                record: event.detail.fields
            }

        });
        this.dispatchEvent(successEvent);
    }
}