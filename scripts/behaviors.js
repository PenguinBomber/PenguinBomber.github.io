var mobile = false;

function buttonSetup() {
	width = document.body.clientWidth;
	mobile = (width < 700);
	
	nav = document.querySelector("nav");
	navButton = document.querySelector("button#nav");
	navBackground = document.querySelector("nav div.background");
	
	if (mobile) {
		navButton.className = "";
		nav.className = "hide";
		
		navButton.onclick = () => {
			nav.className = "show";
		};
		
		navBackground.onclick = () => {
			nav.className = "hide";
		};
	} else {
		nav.className = "show";
		navButton.className = "hide";
		
		navButton.onclick = null;
		navBackground.onclick = null;
	}
}

window.addEventListener('DOMContentLoaded', (event) => {
	buttonSetup();
});
window.addEventListener('resize', (event) => {
	buttonSetup();
});