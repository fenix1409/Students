const data = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    imgUrl: elChooseImg.src,
    name: e.target.name.value,
    email: e.target.email.value,
    number: e.target.number.value,
    date: e.target.date.value,
    enrollnumber: e.target.enrollnumber.value
}


// more part 
function handleMoreClickBtn(studentId) {
    const student = students.find(item => item.id === studentId);
    
    
    document.querySelector('#studentImg').src = student.imgUrl[0];
    document.querySelector('#studentName').textContent = student.name;
    document.querySelector('#studentEmail').textContent = `Email: ${student.email}`;
    document.querySelector('#studentPhone').textContent = `Phone: ${student.number}`;
    document.querySelector('#studentEnroll').textContent = `Enroll: ${student.enrollnumber}`;
    document.querySelector('#studentDate').textContent = `Date: ${student.date}`;
    
    
    document.querySelector("#studentModal").classList.remove("scale-0");
    location.pathname = "./information.html"
}

function closeModal() {
    document.querySelector("#studentModal").classList.add("scale-0");
}

document.querySelector("#studentModal").addEventListener("click", function(e) {
    if (e.target === this) {
        closeModal();
    }
});
// more part 