const submittedAssignments = 54;
const totalAssignments = 54;

const progressPercentage = (submittedAssignments / totalAssignments) * 100;

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const completedAssignmentsText = document.getElementById('completedAssignmentsText');
const completionMessage = document.getElementById('completionMessage');

completedAssignmentsText.textContent = `Completed Assignments: ${submittedAssignments}/${totalAssignments}`;

progressBar.style.width = `${progressPercentage}%`;
progressText.textContent = `${Math.round(progressPercentage)}% completed`;

if (submittedAssignments === totalAssignments) {
    completionMessage.style.display = 'block';
}
