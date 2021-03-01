
var inputs = document.querySelectorAll(".input");

var labels = document.querySelectorAll(".label");

var tabRows = document.querySelectorAll(".tabs__rows");

var tabColumn = document.querySelector(".tabs__column");


for (var index = 0; index < inputs.length; index++) {
	const input = inputs[index];
	input.id = "tab-" + index;
}

for (var index = 0; index < labels.length; index++) {
	const label = labels[index];
	label.setAttribute("for", "tab-" + index);
}

var tabsLinks = document.querySelectorAll(".tabs-link");

var tabsSelected = document.querySelectorAll(".header__tabs-item");


if (tabsLinks.length > 0) {

	for (var index = 0; index < tabsLinks.length; index++) {
		const tabsLink = tabsLinks[index];
		tabsLink.addEventListener("click", function (e) {
			tabsLinkOpen(tabsLink.closest('.header__tabs-item'));
			e.preventDefault();
		});
	}
}
function tabsLinkOpen(selectTabs) {
	for (var index = 0; index < tabsSelected.length; index++) {
		const tabs = tabsSelected[index];
		tabs.classList.remove('selected');
	}
	selectTabs.classList.add('selected');
	var firstLink = selectTabs.querySelector(".tabs-link");

	for (var index = 0; index < inputs.length; index++) {
		const check = inputs[index];
		if (check.checked == true) {
			var lastSymbolId = check.id.slice(-1);
		}
	}

	var countNoTabRow = 0;
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
			const tabRow = tabRows[lastSymbolId];
			tabRow.style.borderBottom = 'none';
		}


	}
	else {
		tabColumn.style.display = 'block';
		for (var index = 0; index < inputs.length; index++) {
			const tabRow = tabRows[index]
			tabRow.style.display = 'block';
			if (index != inputs.length - 1) {
				tabRow.style.borderBottom = '0.5px solid #aaaaaa';
			}
		}
	}
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

if (inputs.length > 0) {

	for (var index = 0; index < inputs.length; index++) {
		const input = inputs[index];

		input.addEventListener('change', function () {
			if (this.checked) {
				const tabsCheck = this.closest('.tabs__checkbox');
				tabsCheck.classList.add('active');
			} else {
				const tabsCheck = this.closest('.tabs__checkbox');
				tabsCheck.classList.remove('active');
			}
		});
	}
}

