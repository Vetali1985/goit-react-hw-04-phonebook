const CONTACTS_KEY = 'phonebookContacts';

export const getContacts = () => {
  const contacts = localStorage.getItem(CONTACTS_KEY);

  const parsedContacts = JSON.parse(contacts);

  return parsedContacts;
};

export const setContacts = contacts =>
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));