const inputs = document.querySelectorAll(".option input");

const handleUpdate = function() {
	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => {
	input.addEventListener("change", handleUpdate);
	input.addEventListener("mousemove", handleUpdate);
});