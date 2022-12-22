const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactPath, "utf-8");
  const contacts = JSON.parse(data);
  const contact = contacts.filter(
    (contact) => contact.id === contactId.toString()
  );
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToDelete = contacts.filter(
    (contact) => contact.id === contactId.toString()
  );
  if (!contactToDelete) {
    return null;
  }
  const remainingСontacts = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  await fs.writeFile(contactPath, JSON.stringify(remainingСontacts));
  return contactToDelete;
}

async function addContact(name, email, phone) {
  const id = shortid.generate();
  const contact = { id, name, email, phone };
  const contacts = await listContacts();
  contacts.push(contact);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  console.log(contact);
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
