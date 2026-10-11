document.getElementById('employeeForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const getValue = (id) => document.getElementById(id).value.trim();
  const name = getValue('name');
  const email = getValue('email');
  const password = getValue('password');
  const phone = getValue('phone');
  const department = getValue('department');
  const message = document.getElementById('message');
  const errors = [];

  if (name.length < 2) errors.push('Name must contain at least 2 characters.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Enter a valid email address.');
  if (password.length < 8) errors.push('Password must be at least 8 characters.');
  if (!/^[6-9]\d{9}$/.test(phone)) errors.push('Enter a valid 10-digit Indian mobile number.');
  if (!department) errors.push('Please select a department.');

  message.className = errors.length ? 'error' : 'success';
  message.textContent = errors.length
    ? errors.join(' ')
    : `Registration successful for ${name} (${department}).`;

  if (errors.length === 0) event.target.reset();
});
