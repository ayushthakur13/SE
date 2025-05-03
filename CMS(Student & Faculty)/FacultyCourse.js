// Initialize courses from localStorage
let courses = JSON.parse(localStorage.getItem("courses")) || [];
let editingIndex = null;

// Save courses to localStorage and render them
function saveToLocalStorage() {
    localStorage.setItem("courses", JSON.stringify(courses));
    renderCourses();
}

// Open modal for adding or editing a course
function openModal(index = null) {
    document.getElementById("courseModal").style.display = "flex";
    if (index !== null) {
        editingIndex = index;
        const course = courses[index];
        document.getElementById("modalTitle").innerText = "Edit Course";
        document.getElementById("courseTitle").value = course.title;
        document.getElementById("courseStart").value = course.startDate;
        document.getElementById("courseDuration").value = course.duration;
        document.getElementById("courseStatus").value = course.status;
    } else {
        editingIndex = null;
        document.getElementById("modalTitle").innerText = "Add Course";
        document.getElementById("courseTitle").value = "";
        document.getElementById("courseStart").value = "";
        document.getElementById("courseDuration").value = "";
        document.getElementById("courseStatus").value = "active";
    }
}

// Close modal without saving
function closeModal() {
    document.getElementById("courseModal").style.display = "none";
}

// Save new or edited course
function saveCourse() {
    const title = document.getElementById("courseTitle").value;
    const startDate = document.getElementById("courseStart").value;
    const duration = document.getElementById("courseDuration").value;
    const status = document.getElementById("courseStatus").value;

    if (!title || !startDate || !duration) {
        alert("Please fill all fields");
        return;
    }

    const course = { title, startDate, duration, status };

    if (editingIndex !== null) {
        courses[editingIndex] = course;
    } else {
        courses.push(course);
    }

    saveToLocalStorage();
    closeModal();
}

// Delete a course
function deleteCourse(index) {
    if (confirm("Are you sure to delete this course?")) {
        courses.splice(index, 1);
        saveToLocalStorage();
    }
}

// Calculate and update course statistics (total, active, inactive)
function updateCourseStats() {
    const totalCourses = courses.length;
    const activeCourses = courses.filter(course => course.status === "active").length;
    const inactiveCourses = totalCourses - activeCourses;

    // Update the course summary on the page dynamically
    const courseSummaryText = document.getElementById("courseSummaryText");
    courseSummaryText.innerHTML = `
        Total Courses: ${totalCourses} <span class="active-text" style="color: rgb(53, 173, 53); padding-left: 12px;">Active: ${activeCourses}</span> 
        <span class="inactive-text" style="color: rgb(236, 48, 23); padding-left: 12px;">Inactive: ${inactiveCourses}</span>
    `;
}

// Render courses on the page
function renderCourses() {
    const container = document.getElementById("courseContainer");
    container.innerHTML = "";

    // Update course statistics
    updateCourseStats();

    // Create course cards dynamically
    courses.forEach((course, index) => {
        const card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `
            <div class="course-header ${course.status}">${course.status}</div>
            <h3>${course.title}</h3>
            <p><strong>Starting Date:</strong> ${course.startDate}</p>
            <p><strong>Duration:</strong> ${course.duration} months</p>
            <button class="blue-btn edit-btn" onclick="openModal(${index})">Edit</button>
            <button class="blue-btn delete-btn" onclick="deleteCourse(${index})">Delete</button>
        `;
        container.appendChild(card);
    });
}

// On page load
window.onload = renderCourses;

// Logout function
function logout() {
    alert("Logging out...");
    window.location.href = "../index.html";
}
