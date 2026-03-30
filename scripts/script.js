(function initTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    setTheme(savedTheme);
  } else {
    setTheme('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = [...document.querySelectorAll('.header__theme-menu-button')];
  let currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '');
  if (!currentTheme || currentTheme === 'auto') {
    currentTheme = 'dark';
  }

  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_'))
        .split('_type_')[1];

      if (chosenTheme === 'auto') {
        setTheme('dark');
        setActiveButton(themeButtons, 'dark');   
      } else {
        setTheme(chosenTheme);
        setActiveButton(themeButtons, chosenTheme);
      }
    });
  });
});

function setTheme(theme) {
  document.documentElement.className = '';
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
  });
  const buttonType = (theme === 'dark') ? 'auto' : theme;

  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${buttonType}`)
  );

  if (target) {
    target.classList.add('header__theme-menu-button_active');
    target.setAttribute('disabled', true);
  }
}