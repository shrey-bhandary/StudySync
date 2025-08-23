// ========== DARK MODE TOGGLE ========== //
if ($("#themeToggle").length) {
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-theme");
    $("#themeToggle").prop("checked", true);
  }

  $("#themeToggle").on("change", function () {
    if ($(this).is(":checked")) {
      $("body").addClass("dark-theme");
      localStorage.setItem("darkMode", "enabled");
    } else {
      $("body").removeClass("dark-theme");
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
  const name = localStorage.getItem("studentName") || prompt("What's your name?");
  localStorage.setItem("studentName", name);
  $("#welcome-msg").text(`Welcome, ${name}!`);

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  $("#quote").hide().text(quote).fadeIn(800);

  setInterval(() => {
    const now = new Date();
    $("#date").text(now.toLocaleDateString());
    $("#time").text(now.toLocaleTimeString());
  }, 1000);
}

// ========== ASSIGNMENTS ========== //
const form = $("#assignmentForm");
const list = $("#assignmentList");

function displayAssignments() {
  const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
  list.empty();
  assignments.forEach((a, index) => {
    const item = $(`
      <li>
        <strong>${a.title}</strong> (${a.subject}) - due ${a.deadline}
        <br><em>${a.type}</em><br>${a.details}
        <br><button class="delete-assignment" data-index="${index}">🗑️ Delete</button>
        <hr>
      </li>
    `).hide().fadeIn(400);
    list.append(item);
  });
}

function deleteAssignment(index) {
  const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
  assignments.splice(index, 1);
  localStorage.setItem("assignments", JSON.stringify(assignments));
  displayAssignments();
}

if (form.length) {
  form.on("submit", function (e) {
    e.preventDefault();
    const assignment = {
      title: $("#title").val(),
      subject: $("#subject").val(),
      deadline: $("#deadline").val(),
      type: $("#type").val(),
      details: $("#details").val(),
    };
    const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
    assignments.push(assignment);
    localStorage.setItem("assignments", JSON.stringify(assignments));
    form.trigger("reset");
    displayAssignments();
  });

  $(document).on("click", ".delete-assignment", function () {
    const index = $(this).data("index");
    deleteAssignment(index);
  });

  displayAssignments();
}

// ========== NOTES ========== //
const noteForm = $("#noteForm");
const notesList = $("#notesList");

if (noteForm.length) {
  noteForm.on("submit", function (e) {
    e.preventDefault();
    const title = $("#noteTitle").val();
    const content = $("#noteContent").val();
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
    noteForm.trigger("reset");
    displayNotes();
  });

  function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notesList.empty();
    notes.forEach((note, index) => {
      const item = $(`
        <li>
          <strong>${note.title}</strong><br>${note.content}
          <br><button class="delete-note" data-index="${index}">🗑️ Delete</button>
          <hr>
        </li>
      `).hide().slideDown(300);
      notesList.append(item);
    });
  }

  $(document).on("click", ".delete-note", function () {
    const index = $(this).data("index");
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  });

  displayNotes();
}

// ========== SUBJECTS ========== //
const subjectForm = $("#subjectForm");
const subjectsList = $("#subjectsList");

if (subjectForm.length) {
  subjectForm.on("submit", function (e) {
    e.preventDefault();
    const name = $("#subName").val();
    const link = $("#subLink").val();
    const tag = $("#subTag").val();
    const resources = JSON.parse(localStorage.getItem("resources") || "[]");
    resources.push({ name, link, tag });
    localStorage.setItem("resources", JSON.stringify(resources));
    subjectForm.trigger("reset");
    displaySubjects();
  });

  function displaySubjects() {
    const resources = JSON.parse(localStorage.getItem("resources") || "[]");
    subjectsList.empty();
    resources.forEach((res, index) => {
      const item = $(`
        <li>
          <strong>${res.name}</strong> ${res.tag}
          <br><a href="${res.link}" target="_blank">${res.link}</a>
          <br><button class="delete-subject" data-index="${index}">🗑️ Delete</button>
          <hr>
        </li>
      `).css("display", "none").fadeIn(400);
      subjectsList.append(item);
    });
  }

  $(document).on("click", ".delete-subject", function () {
    const index = $(this).data("index");
    const resources = JSON.parse(localStorage.getItem("resources") || "[]");
    resources.splice(index, 1);
    localStorage.setItem("resources", JSON.stringify(resources));
    displaySubjects();
  });

  displaySubjects();
}

// ========== TIMER ========== //
let timer;
let timeLeft = 25 * 60; // default 25 min
let isRunning = false;
let currentMode = "pomodoro"; // track active mode

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}`;
}

function setActiveMode(button) {
  document.querySelectorAll(".mode-btn").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

// Mode Functions
function setPomodoro() {
  clearInterval(timer);
  isRunning = false;
  currentMode = "pomodoro";
  timeLeft = 25 * 60;
  updateDisplay();
  setActiveMode(document.querySelector(".mode-buttons button:nth-child(1)"));
}

function setShortBreak() {
  clearInterval(timer);
  isRunning = false;
  currentMode = "short";
  timeLeft = 5 * 60;
  updateDisplay();
  setActiveMode(document.querySelector(".mode-buttons button:nth-child(2)"));
}

function setLongBreak() {
  clearInterval(timer);
  isRunning = false;
  currentMode = "long";
  timeLeft = 15 * 60;
  updateDisplay();
  setActiveMode(document.querySelector(".mode-buttons button:nth-child(3)"));
}

// Start / Pause / Reset
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("⏰ Time’s up!");
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;

  // reset based on current mode
  if (currentMode === "pomodoro") {
    timeLeft = 25 * 60;
  } else if (currentMode === "short") {
    timeLeft = 5 * 60;
  } else if (currentMode === "long") {
    timeLeft = 15 * 60;
  }

  updateDisplay();
}

updateDisplay();
