import { useState } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './PhoneBookList/PhoneBookList';
import { Filter } from './Filter/Filter';
import { CONTACTS_KEY } from '../utils/localStorageKey';

import { Title, Container } from './Container/Container.styled';
import { useLocalStorage } from 'hooks/useLocalStorage';
import contactsDefault from '../data/contactsDefault';

function App() {
  const [contacts, setContacts] = useLocalStorage(
    CONTACTS_KEY,
    contactsDefault
  );
  const [filter, setFilter] = useState('');

  const contactAdd = contact => {
    const checkingName = contacts.find(item => {
      return item.name === contact.name;
    });

    if (checkingName) {
      return alert(`${contact.name} is already in contacts`);
    }

    setContacts(prevState => [contact, ...prevState]);
  };

  const contactDel = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilter = evt => {
    setFilter(evt.currentTarget.value);
  };
  const getFilteredContacts = (inputValue, arrayToFilter) => {
    const normalizedFilter = inputValue.toLowerCase();

    return arrayToFilter.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm ContactAdd={contactAdd} />
      <Title>Contacts</Title>
      <Filter filter={filter} handleFilter={handleFilter} />
      <ContactList
        filteredContacts={getFilteredContacts(filter, contacts)}
        ContactDel={contactDel}
      />
    </Container>
  );
}

export default App;
