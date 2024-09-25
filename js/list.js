let elModalWrapper = document.querySelector(".modal-wrapper");
let elModalInner = document.querySelector(".modal-inner");
let elStudentList = document.querySelector(".student-tbody");
let elMoreWrapper = document.querySelector(".more-wrapper")

let students = JSON.parse(localStorage.getItem("students")) || [];
document.querySelector(".user-name").textContent = JSON.parse(localStorage.getItem("user")).username

// Add student
function handleAddStudentBtnClick() {
  elModalWrapper.classList.remove("scale-0");
  elModalInner.innerHTML = `
    <form class="add-student-form p-8" autocomplete="off">
        <h2 class="text-center text-2xl font-bold mb-6 text-white">Add New Student</h2>
        <label class="block mb-4 cursor-pointer">
            <input type="file" class="add-choose-input hidden">
            <img class="add-choose-img mx-auto w-80 h-60 object-cover border-2 border-dashed border-white p-2" src="./images/emptyimkg.png" alt="Empty img">
        </label>
        <div class="space-y-5">
        <div class="flex items-center gap-[20px]">
                <div class="w-[49%] space-y-5">
                <input type="text" class="outline-none py-3 rounded-md pl-2 border border-gray-300 w-full mr-2" required name="name" placeholder="Enter full name">
                <input class="outline-none py-3 rounded-md pl-2 border border-gray-300 w-full" type="email" name="email" placeholder="Enter email" required>
                </div>
                <div class="w-[49%] space-y-5">
                <input class="outline-none py-3 rounded-md pl-2 border border-gray-300 w-full" type="number" name="enrollnumber" placeholder="Enter enroll phone number" required>
                <input class="outline-none py-3 rounded-md pl-2 border border-gray-300 w-full" type="number" name="number" placeholder="Enter phone number" required>
                </div>
                </div>
                <input class="outline-none py-3 rounded-md pl-2 border border-gray-300 w-full" type="date" name="date" placeholder="Enter date time" required>
        </div>
        <button class="mt-6 w-[300px] mx-auto block py-2 bg-green-500 text-white rounded-md font-semibold hover:scale-[1.4] duration-200">ADD NEW STUDENT</button>
    </form>
  `;
  
  let elStudentForm = document.querySelector(".add-student-form");
  let elChooseInput = document.querySelector(".add-choose-input");
  let elChooseImg = document.querySelector(".add-choose-img");

  elChooseInput.addEventListener("change", function(e) {
    elChooseImg.src = URL.createObjectURL(e.target.files[0]);
    elChooseImg.classList.add("bg-white");
  });

  elStudentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
      id: students.length ? students[students.length - 1].id + 1 : 1,
      imgUrl: elChooseImg.src,
      name: e.target.name.value,
      email: e.target.email.value,
      number: e.target.number.value,
      date: e.target.date.value,
      enrollnumber: e.target.enrollnumber.value
      
    };
    e.target.lastElementChild.innerHTML = `
      <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
    `;
    setTimeout(() => {
      e.target.lastElementChild.innerHTML = "ADD NEW STUDENT";
      students.push(data);
      elModalWrapper.classList.add("scale-0");
      renderStudents(students);
      localStorage.setItem("students", JSON.stringify(students));
    }, 1000);
  });
}



// Close modal 
elModalWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    elModalWrapper.classList.add("scale-0");
  }
});
// Close modal 



// Render students
function renderStudents(arr) {
  elStudentList.innerHTML = '';

  arr.forEach(item => {
    let elStudentsRaw = document.createElement('tr');
    elStudentsRaw.className = 'bg-white border-b hover:bg-gray-100';

    elStudentsRaw.innerHTML = `
      <td class="py-4 flex items-center pl-4">
        <img class="w-12 h-12 object-cover rounded-full mr-4" src="${item.imgUrl}" alt="student image">
        <div>
          <div class="font-bold text-lg">${item.name}</div>
          <div class="text-sm text-gray-500">fenix</div>
        </div>
      </td>
      <td class="py-4 text-left pl-4">${item.email}</td>
      <td class="py-4 text-left pl-4">${item.enrollnumber}</td>
      <td class="py-4 text-left pl-4">${item.date}</td>
      <td class="py-4 text-center">
        <div class="flex justify-center items-center gap-4">
          <button onclick="handleEditCLickBtn(${item.id})" class="text-blue-600 hover:underline">
            <img src="./images/edit.svg" width="19" height="19"/>
          </button>
          <button onclick="handleDeleteCLickBtn(${item.id})" class="text-red-600 hover:underline">
            <img src="./images/delete.svg" width="16" height="18"/>
          </button>
          <button onclick="handleMoreClickBtn(${item.id})">
            <img src="./images/more.svg" width="19" height="6"/>
          </button>
        </div>
      </td>
    `;

    elStudentList.appendChild(elStudentsRaw);
  });
}
renderStudents(students);
// render students



// Delete student
function handleDeleteCLickBtn(id) {
  elModalWrapper.classList.remove("scale-0");
  elModalInner.classList.add("w-[500px]", "h-[200px]");
  elModalInner.innerHTML = `
    <div class="p-5">
       <h2 class="text-center text-[25px] text-white">Are you sure you want to delete?</h2>
       <div class="flex items-center gap-[10px]">
         <button onclick="handleDeleteProductClickBtn(${id})" class="delete-btn w-[49%] mt-[33px] block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-[25px]">Delete</button>
         <button onclick="handleCancelClickBtn()" class="w-[49%] mt-[33px] block mx-auto py-[6px] bg-green-500 text-white text-[20px] text-center font-bold rounded-[25px]">Cancel</button>
       </div>
    </div>
  `;
}

function handleDeleteProductClickBtn(id) {
  let elDeleteBtn = document.querySelector(".delete-btn");
  elDeleteBtn.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">`;
  const deleteIndex = students.findIndex(item => item.id == id);
  setTimeout(() => {
    students.splice(deleteIndex, 1);
    handleCancelClickBtn();
    renderStudents(students);
    localStorage.setItem("students", JSON.stringify(students));
  }, 1000);
}

function handleCancelClickBtn() {
  elModalWrapper.classList.add("scale-0");
  setTimeout(() => {
    elModalInner.className = "modal-inner w-[1000px] h-[700px] bg-slate-300 absolute top-0 bottom-0 right-0 left-0 m-auto rounded-md";
  }, 500);
}
// delete part 



// Edit student
function handleEditCLickBtn(id) {
  const foundObj = students.find(item => item.id == id);
  elModalWrapper.classList.remove("scale-0");
  elModalInner.innerHTML = `
    <form class="edit-student-form p-[41px]" autocomplete="off">
      <label class="block mb-[24px] cursor-pointer">
        <input type="file" class="edit-choose-input hidden">
        <img class="edit-choose-img mx-auto w-[500px] h-[300px] object-contain p-2 rounded-md" src="${foundObj.imgUrl}" alt="student image" width="691" height="316">
      </label>
      <div class="flex justify-between">
        <div class="w-[49%] space-y-[13px]">
          <input value="${foundObj.name}" type="text" class="outline-none py-3 rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer" required name="name" placeholder="Full name">
          <input value="${foundObj.email}" type="email" class="outline-none py-3 rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer" required name="email" placeholder="Email">
        </div>
        <div class="w-[49%] space-y-[13px]">
          <input value="${foundObj.number}" class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" type="number" name="number" placeholder="Phone number">
          <input value="${foundObj.enrollnumber}" class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" type="number" name="enrollnumber" placeholder="enroll phone number">
        </div>
      </div>
      <button class="hover:scale-[1.3] duration-300 w-[199px] block py-[14px] bg-green-500 text-white text-[14px] text-center font-medium rounded-[4px] mx-auto mt-8">EDIT</button>
    </form>
  `;
  
  let elStudentForm = document.querySelector(".edit-student-form");
  let elChooseInput = document.querySelector(".edit-choose-input");
  let elChooseImg = document.querySelector(".edit-choose-img");

  elChooseInput.addEventListener("change", function(e) {
    elChooseImg.src = URL.createObjectURL(e.target.files[0]);
    elChooseImg.classList.add("bg-white");
  });

  elStudentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
      id: foundObj.id,
      imgUrl: elChooseImg.src,
      name: e.target.name.value,
      email: e.target.email.value,
      number: e.target.number.value
    };
    e.target.lastElementChild.innerHTML = `
      <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
    `;
    setTimeout(() => {
      e.target.lastElementChild.innerHTML = "EDIT";
      students.splice(students.findIndex(item => item.id == id), 1, data);
      elModalWrapper.classList.add("scale-0");
      renderStudents(students);
      localStorage.setItem("students", JSON.stringify(students));
    }, 1000);
  });
}

function handleErrorImg(imgElement) {
  imgElement.src = "./images/error.png";
}
// edit student



// logout part 
function handleLogoutBtn() {
  elModalWrapper.classList.remove("scale-0");
  elModalInner.classList.remove("w-[1000px]");
  elModalInner.classList.add("w-[500px]");
  elModalInner.classList.remove("h-[680px]");
  elModalInner.classList.add("h-[200px]");

  elModalInner.innerHTML = `
    <div class="p-5">
      <h2 class="text-center text-[25px]">Are you sure you want to log out?</h2>
      <div class="flex items-center gap-[10px]">
        <button onclick="confirmLogout()" class="logout-btn w-[49%] mt-[33px] block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-[25px]">Logout</button>
        <button onclick="handleCancelClickBtn()" class="logout-btn w-[49%] mt-[33px] block mx-auto py-[6px] bg-[#3F8C8E] text-white text-[20px] text-center font-bold rounded-[25px]">Cancel</button>
      </div>
    </div>
  `;
}

function confirmLogout() {
  let elLogout = document.querySelector(".logout-btn");
  elLogout.innerHTML = `
    <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
  `;
  setTimeout(() => {
    localStorage.clear();
    sessionStorage.clear();
    location.pathname = "/";
  }, 1000);
}

// logout part 



// profile img part 
function handleProfileImageChange() {
  const input = document.querySelector('.choose-profile-img');
  const profileImage = document.querySelector('.profileImage');


  if (input.files && input.files[0]) {
    const reader = new FileReader();


    reader.onload = function (e) {
      profileImage.src = e.target.result;




      profileImage.style.width = '130px';
      profileImage.style.height = '130px';
      profileImage.style.borderRadius = '50%';
    };

    reader.readAsDataURL(input.files[0]);
  }
}
// profile img part 



// search part 
let elSearchInput = document.querySelector(".search-input");

elSearchInput.addEventListener("input", function(e) {
  const searchTerm = e.target.value.toLowerCase();

  const filteredAndSortedStudents = students
    .filter(item => item.name.toLowerCase().includes(searchTerm)) 
    .sort((a, b) => a.name.localeCompare(b.name)); 

  renderStudents(filteredAndSortedStudents);
});
// search part 




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