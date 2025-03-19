const toggleSwitch = document.getElementById('darkModeToggle');
const body = document.body;

toggleSwitch.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});
