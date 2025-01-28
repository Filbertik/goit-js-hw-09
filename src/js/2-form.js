console.log('From');

const localStorKey = 'feedback-form-state';
let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = key => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing data from localStorage', error);
    return null;
  }
};

const loadFormData = () => {
  const savedData = loadFromLocalStorage(localStorKey);
  if (savedData) {
    formData = savedData;
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }
};

const onInputChange = event => {
  formData[event.target.name] = event.target.value.trim();
  saveToLocalStorage(localStorKey, formData);
};

const onFormSubmit = event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Notification !!!    Add e-mail and you message');
    return;
  }
  console.log('Form Data:', formData);

  form.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem(localStorKey);
};

form.addEventListener('input', onInputChange);
form.addEventListener('submit', onFormSubmit);
loadFormData();
