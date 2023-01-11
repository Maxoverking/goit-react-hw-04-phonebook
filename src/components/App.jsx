import { useState } from "react";
import { Container } from "./App.styled";
import  Form  from "./Form";
import  Contacts  from "./Contacts";
import Filter from "./Filter";
import useLocalStorage from './hooks/useLocalStorage'
import WrapperForPhonebook  from "./Wrapper";
import contactsData from './contactsData/contacts'

const LOCAL_STORAGE_KEY = 'contacts-list';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(LOCAL_STORAGE_KEY, contactsData);
  const [filter, setFilter] = useState('');
  
  const getFormData = dataFromUser => {
  //  console.log("object", dataFromUser);
  if (contacts.length === 0) {
    setContacts([dataFromUser]);
    return;
    } else {
    const existingContacts = contacts.find(contact => contact.name);

    //Проверка если контакт уже есть
    if(dataFromUser.name === existingContacts.name ){
      alert(`${existingContacts.name} is already in contacts.`)
      return;
    }
    setContacts(prevState => [dataFromUser, ...prevState])
    }
  }
  const deleteContact = uniqueId => {
    // console.log("🚀  uniqueId", uniqueId);
    setContacts(prevState => prevState.filter(
        contact => contact.id !== uniqueId)
      )  
    }
  const chooseFilterContact = (evt) => {
    setFilter(evt.target.value);
    // console.log("🚀  evt22", evt.target.value);
  }
  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact=>
       contact.name.toLowerCase().includes(normalizedFilter))
  }

  return (
    <Container>
        <WrapperForPhonebook>
          {/* Передаем в пропс метод который получит 
          данные из формы */}
        <Form submitData={getFormData} /> 
        {contacts.length === 0 ? '' :
          <>
        <Filter value={filter} onChangeProps={chooseFilterContact} />
        
        <Contacts contacts={filterContacts()}
            deleteContact={deleteContact} />
          </> }
        
        
        </WrapperForPhonebook>
    </Container>
  )
};