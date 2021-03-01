// Количество всех input c классом .input
var inputs = document.querySelectorAll(".input");
// Количество всех label c классом .label
var labels = document.querySelectorAll(".label");
// Количество всех div c классом .tabs__rows
var tabRows = document.querySelectorAll(".tabs__rows");
// Класс .tabs__column (Для отключения рамки)
var tabColumn = document.querySelector(".tabs__column");

// Присовить всем input c классом .input уникальный id
for (var index = 0; index < inputs.length; index++) {
	const input = inputs[index];
	input.id = "tab-" + index;
}
// Присовить всем label c классом .label атрибут с id input'а
for (var index = 0; index < labels.length; index++) {
	const label = labels[index];
	label.setAttribute("for", "tab-" + index);
}

// Количество всех ссылок <а> с классом .tabs-link
var tabsLinks = document.querySelectorAll(".tabs-link");
// Количество всех блоков, у которых могут быть selected (класс .header__tabs-item)
var tabsSelected = document.querySelectorAll(".header__tabs-item");

// Если вкладки есть, то:
if (tabsLinks.length > 0) {
	// Перебраться все ссылки для того, чтобы повесить на них функцию клика
	for (var index = 0; index < tabsLinks.length; index++) {
		const tabsLink = tabsLinks[index];
		// Повесить на все .tabs-link функцию по клику
		tabsLink.addEventListener("click", function (e) {
			// Найти ближайшего родителя с классом .header__tabs-item
			tabsLinkOpen(tabsLink.closest('.header__tabs-item'));
			// Отключить переход по ссылке
			e.preventDefault();
		});
	}
}
// При клике на ссылку:
function tabsLinkOpen(selectTabs) {
	// Перебрать Количество всех блоков, у которых могут быть selected (класс .content__tabs-item)
	// Для удаления класса .selected
	for (var index = 0; index < tabsSelected.length; index++) {
		const tabs = tabsSelected[index];
		tabs.classList.remove('selected');
	}
	// Добавить на нажатый блок класс .selected
	selectTabs.classList.add('selected');
	// Найти в дочернем блоке элемент с классом .tabs-link
	var firstLink = selectTabs.querySelector(".tabs-link");

	// Перебрать все чекбоксы, чтобы запомнить последний чекбокс со значением true
	for (var index = 0; index < inputs.length; index++) {
		const check = inputs[index];
		if (check.checked == true) {
			// Записать номер последнего чекбокса, который включён для отключения рамки снизу
			var lastSymbolId = check.id.slice(-1);
		}
	}

	var countNoTabRow = 0; // Количество не выбранных чекбоксов
	// Если модификатор класса равен "link-select", 
	// то мы переходим во вкладку выбранные и убираем ненажатые чекбоксы
	if (firstLink.classList[1] == "link-select") {
		for (var index = 0; index < inputs.length; index++) {
			const checkBox = inputs[index];
			const tabRow = tabRows[index];
			if (checkBox.checked == true) {
				tabRow.style.display = 'block';
			} else {
				tabRow.style.display = 'none';
				countNoTabRow++;
			}
		}

		if (countNoTabRow == inputs.length) {
			tabColumn.style.display = 'none';
		}
		else {
			// Обратиться к номеру последнего чекбокса, который включён
			const tabRow = tabRows[lastSymbolId];
			tabRow.style.borderBottom = 'none';
		}


	}
	// Если возвращаемся во вкладку все, то возвращаем всё на место
	else {
		// Вернуть блок .tabs__column
		tabColumn.style.display = 'block';
		for (var index = 0; index < inputs.length; index++) {
			const tabRow = tabRows[index]
			// Установить стиль:
			tabRow.style.display = 'block';
			// Если блок не последний, то восстановить рамку снизу
			if (index != inputs.length - 1) {
				tabRow.style.borderBottom = '0.5px solid #aaaaaa';
			}
		}
	}
	// Поднять скролл вверх
	goUp();
}
var timeOut;
function goUp() {
	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	if (top > 0) {
		window.scrollBy(0, -100);
		timeOut = setTimeout('goUp()', 20);
	} else clearTimeout(timeOut);
}

var GradientBool = false;
var headerGradient = document.querySelector('.gradient-top');
window.addEventListener('scroll', function () {
	var scrollTop = window.pageYOffset;
	if (scrollTop >= 8.0 && !GradientBool) {
		fadeIn('.gradient-top');
		GradientBool = true;
	}
	if (scrollTop < 8.0 && GradientBool) {
		fadeOut('.gradient-top');
		GradientBool = false;
	}
});

function fadeOut(el) {
	var opacity = 1;
	var timer = setInterval(function () {
		if (opacity <= 0.1) {
			clearInterval(timer);
			document.querySelector(el).style.display = "none";
		}
		document.querySelector(el).style.opacity = opacity;
		opacity -= opacity * 0.1;
	}, 10);
}
function fadeIn(el) {
	var opacity = 0.2;
	var timer = setInterval(function () {
		if (opacity >= 1) {
			clearInterval(timer);
		}
		document.querySelector(el).style.opacity = opacity;
		document.querySelector(el).style.display = "block";
		opacity += opacity * 0.1;
	}, 10);
}

// CheckBox
if (inputs.length > 0) {

	for (var index = 0; index < inputs.length; index++) {
		const input = inputs[index];

		input.addEventListener('change', function () {
			if (this.checked) {
				// console.log("Checkbox is checked..");
				const tabsCheck = this.closest('.tabs__checkbox');
				tabsCheck.classList.add('active');
			} else {
				// console.log("Checkbox is not checked..");
				const tabsCheck = this.closest('.tabs__checkbox');
				tabsCheck.classList.remove('active');
			}
		});
	}
}

