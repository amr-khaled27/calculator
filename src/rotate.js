const frame = document.querySelector(".calc");

document.addEventListener("mousemove", (e) => {
  rotateElement(e, frame);
});

function rotateElement(event, element) {
  if (window.innerWidth < 640) return;
  const x = event.clientX;
  const y = event.clientY;

  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;

  const offsetX = ((x - middleX) / middleX) * 7.5;
  const offsetY = ((y - middleY) / middleY) * 7.5;

  element.style.setProperty("--rotateX", offsetX + "deg");
  element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}
