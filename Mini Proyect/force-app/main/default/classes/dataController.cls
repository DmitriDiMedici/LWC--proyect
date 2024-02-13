public with sharing class dataController {

    @AuraEnabled
    public static List<Contact> getContacts(){
        try {
            List<Contact> lstContacts = [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 10];
            return lstContacts;
            
        } catch (Exception e) {
            System.debug(e.getMessage());
            throw e;
        }
    }

    @AuraEnabled
    public static Contact updateContact(String id, String firstName, String lastName,  String email ){
        try {
            Contact contact = [SELECT Id FROM Contact WHERE Id =: id LIMIT 1];
            contact.firstName = firstName;
            contact.lastName = lastName;
            contact.email = email;

            update contact;
            return contact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Contact insertContact(String firstName, String lastName,  String email){
        try {
            Contact newContact = new Contact(
                firstName = firstName,
                lastName = lastName,
                email = email
            );

            insert newContact;
            return newContact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}