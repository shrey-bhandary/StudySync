// ========== DARK MODE TOGGLE ========== //
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-theme");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

// ========== HOME ========== //
 const quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Success doesn’t come from what you do occasionally. It comes from what you do consistently.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Start where you are. Use what you have. Do what you can."
  ];

  function initializePage() {
    const name = localStorage.getItem('studentName') || prompt("What's your name?");
    localStorage.setItem('studentName', name);
    document.getElementById("welcome-msg").innerText = `Welcome, ${name}!`;

    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote").innerText = quote;

    setInterval(() => {
      const now = new Date();
      document.getElementById("date").innerText = now.toLocaleDateString();
      document.getElementById("time").innerText = now.toLocaleTimeString();
    }, 1000);
  }



// ========== ASSIGNMENTS ========== //
const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");

function displayAssignments() {
  const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
  list.innerHTML = "";
  assignments.forEach((a, index) => {
    list.innerHTML += `
      <li>
        <strong>${a.title}</strong> (${a.subject}) - due ${a.deadline}
        <br><em>${a.type}</em><br>${a.details}
        <br><button onclick="deleteAssignment(${index})">🗑️ Delete</button>
        <hr>
      </li>
    `;
  });
}

function deleteAssignment(index) {
  const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
  assignments.splice(index, 1);
  localStorage.setItem("assignments", JSON.stringify(assignments));
  displayAssignments();
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const assignment = {
      title: document.getElementById("title").value,
      subject: document.getElementById("subject").value,
      deadline: document.getElementById("deadline").value,
      type: document.getElementById("type").value,
      details: document.getElementById("details").value,
    };
    const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
    assignments.push(assignment);
    localStorage.setItem("assignments", JSON.stringify(assignments));
    form.reset();
    displayAssignments();
  });

  displayAssignments();
}

// ========== NOTES ========== //
const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");

if (noteForm) {
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
    noteForm.reset();
    displayNotes();
  });

  function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      notesList.innerHTML += `<li><strong>${note.title}</strong><br>${note.content}<br><button onclick="deleteNote(${index})">🗑️ Delete</button><hr></li>`;
    });
  }

  function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }

  displayNotes();
}

// ========== SUBJECTS ========== //
const subjectForm = document.getElementById("subjectForm");
const subjectsList = document.getElementById("subjectsList");

if (subjectForm) {
  subjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("subName").value;
    const link = document.getElementById("subLink").value;
    const tag = document.getElementById("subTag").value;
    const resources = JSON.parse(localStorage.getItem("resources") || "[]");
    resources.push({ name, link, tag });
    localStorage.setItem("resources", JSON.stringify(resources));
    subjectForm.reset();
    displaySubjects();
  });

  function displaySubjects() {
    const resources = JSON.parse(localStorage.getItem("resources") || "[]");
    subjectsList.innerHTML = "";
    resources.forEach((res, index) => {
      subjectsList.innerHTML += `<li><strong>${res.name}</strong> ${res.tag}<br><a href="${res.link}" target="_blank">${res.link}</a><br><button onclick="deleteSubject(${index})">🗑️ Delete</button><hr></li>`;
    });
  }

  function deleteSubject(index) {
    const resources = JSON.parse(localStorage.getItem("resources") || "[]");
    resources.splice(index, 1);
    localStorage.setItem("resources", JSON.stringify(resources));
    displaySubjects();
  }

  displaySubjects();
}

// ========== TIMER ========== //
let time = 1500; // 25 min
let timer;
const display = document.getElementById("timerDisplay");

function updateTimer() {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  if (display) display.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      time--;
      updateTimer();
      if (time <= 0) {
        clearInterval(timer);
        timer = null;
        alert("Time’s up! Take a break.");
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  time = 1500;
  updateTimer();
}

updateTimer();

