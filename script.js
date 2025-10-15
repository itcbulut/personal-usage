function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');
  const program = document.getElementById('program');

  if (program) {
    program.classList.remove('active');
    program.setAttribute('hidden', '');
  }

  tabs.forEach(tab => {
    const isActive = tab.id === tabId;
    tab.classList.toggle('active', isActive);
    tab.toggleAttribute('hidden', !isActive);
  });

  buttons.forEach(btn => {
    const isSelected = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', isSelected);
    btn.setAttribute('tabindex', isSelected ? '0' : '-1');
    if (isSelected) btn.focus();
  });
}

function toggleProgram() {
  const program = document.getElementById('program');
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');

  if (!program) return;

  const isVisible = program.classList.contains('active');

  if (isVisible) {
    program.classList.remove('active');
    program.setAttribute('hidden', '');
  } else {
    tabs.forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('hidden', '');
    });

    buttons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    });

    program.classList.add('active');
    program.removeAttribute('hidden');
  }
}

function openTDE() {
  window.open('tde/index.html', '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
