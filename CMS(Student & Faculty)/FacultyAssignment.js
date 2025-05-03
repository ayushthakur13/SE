let editingAssignment = null;
let retainedValues = { assigned: '', viewed: '', completed: '' };

window.onload = function () {
    loadAssignmentsFromStorage();
    toggleFields();
};

function logout() {
    alert("Logging out...");
    window.location.href = "../index.html";
}

function showCreateForm() {
    const modal = document.getElementById("assignmentForm");
    const form = modal.querySelector(".form-container");

    modal.style.display = "flex";

    form.style.animation = "none";
    void form.offsetWidth;
    form.style.animation = "popOut 0.3s ease forwards";

    editingAssignment = null;
    clearForm();
}

function closeForm() {
    document.getElementById("assignmentForm").style.display = "none";
    clearForm();
}

function saveAssignment() {
    const title = document.getElementById("title").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;
    const assignedInput = document.getElementById("assigned").value.trim();
    const viewedInput = document.getElementById("viewed").value.trim();
    const completedInput = document.getElementById("completed").value.trim();

    if (!title || !subject || !date || (status === "assigned" && (!assignedInput || !viewedInput || !completedInput))) {
        alert("Please fill all required fields.");
        return;
    }

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    const existingIndex = editingAssignment
        ? assignments.findIndex(item => item.title === editingAssignment.title && item.date === editingAssignment.date)
        : -1;

    const previousData = existingIndex !== -1 ? assignments[existingIndex] : {};

    const assignment = {
        title,
        subject,
        status,
        date,
        assigned: status === "assigned" ? assignedInput : previousData.assigned || '',
        viewed: status === "assigned" ? viewedInput : previousData.viewed || '',
        completed: status === "assigned" ? completedInput : previousData.completed || ''
    };

    if (existingIndex !== -1) {
        assignments[existingIndex] = assignment;
    } else {
        assignments.push(assignment);
    }

    localStorage.setItem("assignments", JSON.stringify(assignments));
    renderAssignments();
    closeForm();
    retainedValues = { assigned: '', viewed: '', completed: '' };
}

function loadAssignmentsFromStorage() {
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    renderAssignments(assignments);
}

function renderAssignments(assignments = null) {
    const container = document.getElementById("assignmentList");
    container.innerHTML = "";
    const allAssignments = assignments || JSON.parse(localStorage.getItem("assignments")) || [];

    updateAssignmentCounts(allAssignments);

    allAssignments.forEach(renderAssignment);
}

function updateAssignmentCounts(assignments) {
    let totalAssignments = assignments.length;
    let assignedCount = assignments.filter(assignment => assignment.status === "assigned").length;
    let unassignedCount = assignments.filter(assignment => assignment.status === "unassigned").length;

    document.getElementById("totalAssignments").textContent = totalAssignments;
    document.getElementById("assignedCount").textContent = `Assigned: ${assignedCount}`;
    document.getElementById("unassignedCount").textContent = `Unassigned: ${unassignedCount}`;
}

function renderAssignment(assignment) {
    const container = document.getElementById("assignmentList");
    const card = document.createElement("div");
    card.classList.add("course-card");

    const statusClass = assignment.status === "assigned" ? "assigned" : "unassigned";
    card.innerHTML = `
    <div class="course-header ${statusClass}">
        ${assignment.status === "assigned" ? "Assigned" : "Unassigned"}
    </div>
    <h3>${assignment.title}</h3>
    <p><strong>Subject:</strong> ${assignment.subject}</p>
    <p><strong>Date:</strong> ${new Date(assignment.date).toLocaleString()}</p>
    <p><strong>Assigned:</strong> ${assignment.assigned || "N/A"}</p>
    <p><strong>Viewed:</strong> ${assignment.viewed || "N/A"}</p>
    <p><strong>Completed:</strong> ${assignment.completed || "N/A"}</p>
    <div class="card-buttons">
        <button class="edit-btn" onclick='editAssignment(${JSON.stringify(assignment)})'>Edit</button>
        <button class="delete-btn" onclick='deleteAssignment("${assignment.title}", "${assignment.date}")'>Delete</button>
    </div>
`;

    container.appendChild(card);
}

function editAssignment(assignment) {
    editingAssignment = assignment;

    document.getElementById("title").value = assignment.title;
    document.getElementById("subject").value = assignment.subject;
    document.getElementById("status").value = assignment.status;
    document.getElementById("date").value = assignment.date;

    retainedValues = {
        assigned: assignment.assigned || '',
        viewed: assignment.viewed || '',
        completed: assignment.completed || ''
    };

    document.getElementById("assigned").value = assignment.assigned || '';
    document.getElementById("viewed").value = assignment.viewed || '';
    document.getElementById("completed").value = assignment.completed || '';

    toggleFields();
    showCreateForm();
}

function deleteAssignment(title, date) {
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments = assignments.filter(item => item.title !== title || item.date !== date);
    localStorage.setItem("assignments", JSON.stringify(assignments));
    renderAssignments();
}

function clearForm() {
    document.getElementById("title").value = '';
    document.getElementById("subject").value = '';
    document.getElementById("status").value = 'assigned';
    document.getElementById("date").value = '';
    document.getElementById("assigned").value = '';
    document.getElementById("viewed").value = '';
    document.getElementById("completed").value = '';
    toggleFields();
}

function toggleFields() {
    const status = document.getElementById("status").value;
    const assignedFields = document.getElementById("assignedFields");

    if (status === "unassigned") {
        assignedFields.style.display = "none";
    } else {
        assignedFields.style.display = "block";
        document.getElementById("assigned").value = retainedValues.assigned || '';
        document.getElementById("viewed").value = retainedValues.viewed || '';
        document.getElementById("completed").value = retainedValues.completed || '';
    }
}
