import { translations } from './translations.js'

document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('.nav__container a');
	const accordionHeader = document.querySelectorAll('.accordion-header')
	const sections = document.querySelectorAll('.content-section');
	const projectsContent = document.querySelector('.projects-content-section');
	const languageButtons = document.querySelectorAll('.lang__button');

	let currentLang =
		localStorage.getItem('language')
		|| navigator.language.slice(0, 2)
		|| 'es';

	if(navLinks) {
		navLinks.forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				const sectionId = this.dataset.section;
	
				/* Remove active class from nav */
				navLinks.forEach(link => {
					link.parentElement.classList.remove("active");
				});
	
				/* activate nav */
				this.parentElement.classList.add("active");
	
				/* Hide sections */
				sections.forEach(section => {
					section.classList.remove("active");
				});
	
				/* Show section */
				const activeSection = document.getElementById(sectionId);
				activeSection.classList.add("active");
	
			});
	
		});
	}

	if(accordionHeader) {
		accordionHeader.forEach(header => {
			header.addEventListener('click', () => {
				const parent = header.parentElement;
				parent.classList.toggle('active');
			});
		});
	}

	if(projectsContent) {
		projectsContent.addEventListener('scroll', function () {
			const indicator = document.querySelector('.projects__scroll-indicator');
			if (indicator === null) return;
			if (projectsContent.scrollTop > 50) {
				indicator.classList.add('hidden');
			} else {
				indicator.classList.remove('hidden');
			}
		});
	}

	if(languageButtons) {
		languageButtons.forEach(button => {
			button.addEventListener('click', function (e) {
				const langActive = document.querySelector('.lang__button.active');
				currentLang = this.dataset.language;
				localStorage.setItem('language', currentLang);
				updateText();
			});
		});
	}

	function updateText() {
		languageButtons.forEach(button => {
			button.classList.toggle('active', button.dataset.language === currentLang);
		});

		const downloadBtn = document.getElementById('download-cv');
		if (downloadBtn) {
			// Construimos el nombre del archivo dinámicamente
			const fileName = `./assets/CV_Lidia_Andrade_${currentLang.toUpperCase()}.pdf`;
			downloadBtn.setAttribute('href', fileName);
		}

		const elements = document.querySelectorAll('[data-i18n]');
		elements.forEach(el => {
			const key = el.getAttribute('data-i18n');
			const text = key.split('.').reduce((obj, i) => obj?.[i], translations[currentLang]);
			el.textContent = text ?? key;
		});
	}
	updateText();
})
