import React ,{ Component } from "react";
import { Container } from "./App.styled";
import { WrapperForPhonebook } from "./Wrapper/Wrapper";
import { Form } from "./Form/Form";
import { Contacts } from "./Contacts/Contacts";
import { Filter } from "./Filter/Filter";

export class App extends Component{
  state = {
    contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    filter:''
  }
  //Получаем данные из формы 
  //добавляем в массив контактов
  getFormData = dataFromUser => {
    console.log("object",dataFromUser);
    const { contacts } = this.state;
    const existingContacts = contacts.find(contact => contact.name);
    //Проверка если контакт уже есть
    if(dataFromUser.name === existingContacts.name ){
      alert(`${existingContacts.name} is already in contacts.`)
      return;
    }

    this.setState(({ contacts })=>({
      contacts:[dataFromUser,...contacts]
    }))
    // localStorage.setItem('dfsdfsdf', JSON.stringify(this.state.contacts));
  }

  //получаем значение уникального id фильтруем масив и contacts
  //возвращаем (оставляем в массиве) обьекты без уникального id
  deleteContact = uniqueId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== uniqueId)
      }))  
    }
  chooseFilterContact = (evt) => {
    this.setState({filter: evt.target.value})
    // console.log("🚀  evt", evt.currentTarget.value);
  }
  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact=>
       contact.name.toLowerCase().includes(normalizedFilter))
  }

  
  render() {
    const { filter } = this.state;
    const visibleContact = this.filterContacts();
    return (
    <Container>
        <WrapperForPhonebook>
          {/* Передаем в пропс метод который получит 
          данные из формы */}
          <Form submitData={this.getFormData} /> 
          
          <Filter  value={filter} onChangeProps={this.chooseFilterContact}/>
          {/* передаем propsами contacts данные для отрисовки разметки 
          и метод deleteContact для удаления разметки по id  */}
          <Contacts contacts={visibleContact}
            deleteContact={this.deleteContact} />
          
        </WrapperForPhonebook>
    </Container>
  );
  }
  
};



