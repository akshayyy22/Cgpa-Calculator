// Constants for storing semester data
const semester1 = {
    subjects: [
      "Technical English",
      "Matrices and Calculus",
      "Chemistry ",
      "Electrical and Electronics Engineering ",
      "Programming in C ",
      "Chemistry Lab",
    ],
    credits: [3, 3, 3, 3, 4, 1],
    marks: [],
  };
  
  const semester2 = {
    subjects: [
      "Advanced Calculus and Statistics",
      "Physics",
      "Data Structures",
      "Programming in Python",
      "Engineering Drawing and Design",
      "Physics Lab",
      "Data Structures Lab",
    ],
    credits: [3, 3, 3, 4, 2, 1, 2],
    marks: [],
  };
  
  // Define other semesters similarly
  const semester3 = {
    subjects: [
      "Discrete Mathematics and Numerical Methods",
      "Computer Architecture and Organization",
      "Universal Human Values",
      "Theory of Computation",
      "Digital Logic Circuits",
      "Microprocessor and Microcontroller",
      "Programming in Java",
    ],
    credits: [3, 3, 3, 3, 4, 4, 4],
    marks: [],
  };
  
  const semester4 = {
    subjects: [
      "Probability and Statistics",
      "Operating Systems and Unix",
      "Professional Elective 1",
      "Open Elective 1",
      "Database Management Systems",
      "Operating Systems Lab ",
      "Design Thinking and Innovations",
      "Skill Enhancement Course -I",
    ],
    credits: [3, 3, 3, 3, 4, 2, 2,1],
    marks: [],
  };
  
  const semester5 = {
    subjects: [
      "Data Communication and Computer Networks",
      "Design and Analysis of Algorithms",
      "Professional Elective 2 ",
      "Open Elective 2",
      "Software Engineering Design and Development",
      "Augmented and Virtual Reality",
      "Computer Networks Lab",
      "Professional Training – I",
      "Skill Enhancement Course - II",
    ],
    credits: [3, 3, 3, 3, 4, 3, 2, 2, 1],
    marks: [],
  };
  
  const semester6 = {
    subjects: [
      "Compiler Design",
      "Network Security",
      "Parallel and Distributed Computing",
      "Professional Elective 3",
      "Open Elective 3",
      "Machine Learning",
      "Compiler Design Lab",
      "Professional Training - II / Interdisciplinary Project / Community Internship",
      "Skill Enhancement Course - III",
    ],
    credits: [3, 3, 3, 3, 3, 4, 2, 3, 1],
    marks: [],
  };
  
  const semester7 = {
    subjects: [
      "Management Elective",
      "Artificial Intelligence",
      "Professional Elective 4",
      "Open Elective 4",
      "Big Data Analytics ",
      "Project Phase 1 ",
    ],
    credits: [3, 3, 3, 3, 4, 3],
    marks: [],
  };
  
  const semester8 = {
    subjects: [
      "Professional Elective 5*",
      "Professional Elective 6*",
      "Project Phase 2",
    ],
    credits: [4, 3, 3, 3, 2, 3, 3],
    marks: [],
  };
  
  // Array to hold all semester data
  let semesterData = [semester1, semester2, semester3, semester4, semester5, semester6, semester7, semester8];
  
  // Function to initialize the semester table with default values
  function initializeSemester(semesterIndex) {
    const semesterDataFromLocalStorage = localStorage.getItem(`semester${semesterIndex}`);
    if (semesterDataFromLocalStorage) {
      semesterData[semesterIndex - 1] = JSON.parse(semesterDataFromLocalStorage);
    } else {
      localStorage.setItem(`semester${semesterIndex}`, JSON.stringify(semesterData[semesterIndex - 1]));
    }
    populateTable(semesterIndex);
  }
  
  // Function to populate the table with stored data
  function populateTable(semesterIndex) {
    const tableBody = document.getElementById(`tbody${semesterIndex}`);
    if (!tableBody) {
      console.error(`Table body with ID 'tbody${semesterIndex}' not found.`);
      return;
    }
    tableBody.innerHTML = "";
  
    for (let i = 0; i < semesterData[semesterIndex - 1].subjects.length; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${semesterData[semesterIndex - 1].subjects[i]}</td>
        <td><input type="number" class="form-control" id="marks${semesterIndex}-${i + 1}" value="${semesterData[semesterIndex - 1].marks[i]}" /></td>
        <td>${semesterData[semesterIndex - 1].credits[i]}</td>
        <td id="grade${semesterIndex}-${i + 1}"></td>
      `;
      tableBody.appendChild(row);
    }
  }
  
  // Function to calculate grade points based on marks
  function calculateGradePoints(marks) {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 40) return 5;
    return 0;
  }
  
  // Function to calculate GPA and total credits
  function calculateGPA(semesterIndex) {
    const registerNumber = document.getElementById("register__number").value;
    const studentName = document.getElementById("student__name").value;
  
    // Check if registration number and student name are filled
    if (registerNumber === "" || studentName === "") {
      alert("Please enter Register Number and Student Name before calculating GPA.");
      return;
    }
  
    let totalCredits = 0;
    let totalGradePoints = 0;
  
    for (let i = 0; i < semesterData[semesterIndex - 1].subjects.length; i++) {
      const marks = parseInt(document.getElementById(`marks${semesterIndex}-${i + 1}`).value);
      const credits = semesterData[semesterIndex - 1].credits[i];
      const gradePoints = calculateGradePoints(marks);
  
      document.getElementById(`grade${semesterIndex}-${i + 1}`).innerText = gradePoints;
  
      totalCredits += credits;
      totalGradePoints += gradePoints * credits;
    }
  
    const gpa = totalGradePoints / totalCredits;
  
    // Display GPA and Total Credits
    const gpaElement = document.getElementById(`GPA${semesterIndex}`);
    gpaElement.innerText = `GPA: ${gpa.toFixed(2)}`;
    gpaElement.classList.remove("hide");
  
    const totalCreditsElement = document.getElementById(`totalCredits${semesterIndex}`);
    totalCreditsElement.innerText = `Total Credits: ${totalCredits}`;
    totalCreditsElement.classList.remove("hide");
  }
  
  // Function to clear all input fields
  function ClearAll(semesterIndex) {
    document.getElementById("register__number").value = "";
    document.getElementById("student__name").value = "";
  
    for (let i = 0; i < semesterData[semesterIndex - 1].subjects.length; i++) {
      document.getElementById(`marks${semesterIndex}-${i + 1}`).value = "";
      document.getElementById(`grade${semesterIndex}-${i + 1}`).innerText = "";
    }
  
    document.getElementById(`GPA${semesterIndex}`).classList.add("hide");
    document.getElementById(`totalCredits${semesterIndex}`).classList.add("hide");
  }
  
  // Function to print the content
  function Print(semesterIndex) {
    const printContents = document.getElementById(`printArea${semesterIndex}`).cloneNode(true);
  
    printContents.querySelectorAll("input").forEach((input) => {
      input.remove();
    });
  
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = "";
    document.body.appendChild(printContents);
  
    window.print();
  
    document.body.innerHTML = originalContents;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize all semesters here
    for (let i = 1; i <= 8; i++) {
        initializeSemester(i);
    }
});
