import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Span, Button } from './ContactForm.styled';
import { nanoid } from 'nanoid';

export function ContactForm({ ContactAdd }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const hadleSubmit = e => {
    e.preventDefault();

    ContactAdd({
      id: nanoid(5),
      name,
      number,
    });

    setName('');
    setNumber('');
  };

  return (
    <Form autoComplete="off" onSubmit={hadleSubmit}>
      <Label>
        <Span> Name</Span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <br />
      <Label>
        <Span>Number</Span>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}
ContactForm.propTypes = {
  ContactAdd: PropTypes.func.isRequired,
};
