export function mapFields(contactList){
    const data = contactList.map(contact => {
        const record= {
            "id": contact.Id,
            "firstName": contact.FirstName,
            "lastName": contact.LastName,
            "email": contact.Email
          };
        return record;
    });
    return data;    
}