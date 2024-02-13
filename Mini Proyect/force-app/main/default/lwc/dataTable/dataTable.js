import { LightningElement } from 'lwc';
import { mapFields } from './dataInfoApex';
import getContacts from '@salesforce/apex/dataController.getContacts';
import updateContact from '@salesforce/apex/dataController.updateContact';
import insertContact from '@salesforce/apex/dataController.insertContact';
;

export default class DataTable extends LightningElement {
    displayModal=false;
    rowFields={};
    title="";
    data=[];
    fieldValues={};
    label="";
    isInsert = false;

    actions=[
        {label: "Show Details", name: 'showDetails' },
        {label: "Delete", name: 'delete'}
    ];

    columns=[
        {label: "Id", fieldName: 'id'},
        {label: "First Name", fieldName: 'firstName'},
        {label: "Last Name", fieldName: 'lastName'},
        {label: "Email", fieldName: 'email'},
        {type: "action", typeAttributes: {rowActions: this.actions}}

    ];

    //Table data stuff
    async connectedCallback(){
        const contacts =  await getContacts();
        this.data = mapFields(contacts);
    }

    //Modal stuff
    handleOpenModal(){
        this.displayModal=true;
    }

    handleCloseModal(event){
        this.displayModal=false;
    }

    handleRowActions(event){
        const actionName = event.detail.action.name;
        const rowFields= event.detail.row;//To obtain data form the rows
        this.rowFields=rowFields;
        switch(actionName){
            case 'delete': 
                this.title='Delete??';
                this.handleOpenModal();
                break;
            case 'showDetails':
                console.log('rowFields: ', rowFields);
                this.isEditing = true;
                this.title='Details';
                this.handleOpenModal();
                break;
        }
    }


    handleNewContact(){
        this.title='New Contact';
        this.rowFields={};
        this.handleOpenModal();
        this.isInsert = true;
    }

    handleSave(event){
        const updatedData = event.detail;
        const updatedIndex = this.data.findIndex(
            (item) => item.id === updatedData.id
        );

        if(updatedIndex !== -1){
            this.data[updatedIndex] = {...updatedData};
        }

        console.log("updated data: ", updatedData);
        console.log("Is insert? ", this.isInsert);

        if(this.isInsert){
            this.insertContact(updatedData)
            .then(() => {
                this.handleCloseModal();
                this.showToast();
            })
        } else{
            this.updateContact(updatedData)
            .then(() => {
                this.handleCloseModal();
                this.showToast();
            })
        }
        this.data = [...this.data];
    }


    showToast(){
        const event = new ShowToastEvent({
            title: 'Success!',
            message: 'Record created',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }




}