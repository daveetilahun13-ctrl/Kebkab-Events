const events = [
{ name: "Tech Conference", date: "Feb 20, 2026" },
{ name: "Music Festival", date: "Mar 5, 2026" },
{ name: "Business Workshop", date: "Apr 10, 2026" }
];


const container = document.getElementById("eventsContainer");


if (container) {
events.forEach(event => {
const div = document.createElement("div");
div.className = "event";
div.innerHTML = `
<h3>${event.name}</h3>
<p>Date: ${event.date}</p>
<button onclick="bookEvent('${event.name}')">Book</button>
`;
container.appendChild(div);
});
}


function bookEvent(name) {
alert(name + " booked successfully!");
}


const form = document.getElementById("contactForm");
if (form) {
form.addEventListener("submit", function (e) {
e.preventDefault();
alert("Message sent successfully!");
form.reset();
});
}
