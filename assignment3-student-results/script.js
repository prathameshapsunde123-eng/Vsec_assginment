const form = document.getElementById('resultForm');
const students = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const roll = document.getElementById('roll').value.trim();
  const department = document.getElementById('dept').value.trim();
  const marks = ['m1', 'm2', 'm3'].map((id) =>
    Number(document.getElementById(id).value)
  );
  const error = document.getElementById('error');

  if (!name || !roll || !department || marks.some((mark) => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
    error.textContent = 'Please enter valid details and marks between 0 and 100.';
    return;
  }

  if (students.some((student) => student.roll.toLowerCase() === roll.toLowerCase())) {
    error.textContent = 'Roll number already exists.';
    return;
  }

  error.textContent = '';
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  students.push({ name, roll, dept: department, total, percentage: total / 3 });
  render();
  form.reset();
});

function render() {
  const tbody = document.getElementById('records');
  tbody.innerHTML = '';

  students.forEach((student) => {
    const row = document.createElement('tr');
    [
      student.name,
      student.roll,
      student.dept,
      `${student.total} / 300`,
      `${student.percentage.toFixed(2)}%`,
    ].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  const topper = students.reduce(
    (best, student) => (!best || student.total > best.total ? student : best),
    null
  );
  document.getElementById('topper').textContent = topper
    ? `Topper: ${topper.name} (Roll ${topper.roll}) — ${topper.percentage.toFixed(2)}%`
    : 'Topper: —';
}
