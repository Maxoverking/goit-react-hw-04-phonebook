import { FormContainer,Input,Label } from './Form.styled'
import { nanoid } from 'nanoid'
import { useState } from 'react'


export const Form = ({submitData}) => {
    const uniqueId = nanoid();
    
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    // console.log("🚀  uniqueId", uniqueId);

    const inputAddedName = evt => { 
        const { name, value } = evt.target;
        if (name === 'name') {
            setName(value);
            setId(uniqueId);
        } else if (name === 'number') {
            setNumber(value);
        } 
    }

    const onSubmitForm = evt => {
        evt.preventDefault();
//Передаем данные в Арр через пропс submitData
        submitData({
            name: name,
            number: number,
            id: id
        });
    resetForm();
    }

    const resetForm = ()=>{
    // useState(name: '',number:'',id:'')
    }

    return (
    <FormContainer>
        <form style={{
            display: 'flex',
            flexDirection: 'column'
        }}
                onSubmit={onSubmitForm}
                data-id
        >
        <Label >Name</Label>
            <Input
                autoComplete="off"
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="May contain only letters"
                value={name}
                onChange={inputAddedName}
                required />
                <br />
        <Label>Number</Label>
            <Input
                autoComplete="off"
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="May contain only number"
                value={number}
                onChange={inputAddedName}
                required />

            <br />
            <button type="submit">Add Contact</button>
            </form>
      </FormContainer>
    ) 
};
