"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const pets = [];
const petArr = [];
const validateData = tableBodyEl;
const validate = validateData;
const healthyBtn = document.getElementById("healthy-btn");
const healthyPetArr = [];
let idSet = new Set();

submitBtn.addEventListener("click", function (e) {
  //2. Lấy được dữ liệu từ các Input Form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    weight: parseInt(weightInput.value),
    lengthh: parseInt(lengthInput.value),
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // Validate dữ liệu hợp lệ
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
    }
  }

  if (data.id == "") {
    alert("ID must be filled");
    return false;
  }

  if (data.name == "") {
    alert("Name must be filled");
    return false;
  }

  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  if (data.lengthh < 1 || data.lengthh > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  if (data.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }

  if (data.breed == "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  //4. Thêm thú cưng vào danh sách
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
});
function clearInput(data) {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `
    <th>${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].lengthh}</td>
    <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td>${petArr[i].breed}</td>
    <td><i class="bi ${
      petArr[i].vaccinated === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }"></i></td>
    <td>${date}</td>
    <td><button onclick="deletePet('${
      petArr[i].id
    }')" type="button" class="btn btn-danger">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
}
let today = new Date();
let date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  lengthh: 50,
  color: "#f00",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: "01/03/2022",
};
const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  lengthh: 40,
  color: "#00f",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: "01/03/2022",
};
petArr.push(data1);
petArr.push(data2);

//7. Xóa một thú cưng
function deletePet(petId) {
  if (confirm("Are you sure?")) {
    const petIndex = petArr.findIndex((pet) => pet.id === petId);
    if (petIndex !== -1) {
      petArr.splice(petIndex, 1);
    }
  }
  renderTableData(petArr);
}
//8. Hiển thị các thú cưng khỏe mạnh
let healthyCheck = true;
let displayPetArr = petArr; // Biến mới để thể hiện danh sách thú cưng cần hiển thị

function toggleHealthyPets() {
  tableBodyEl.innerHTML = "";

  if (healthyCheck) {
    healthyCheck = false;
    healthyBtn.textContent = "Show Healthy Pet";
    displayPetArr = petArr; // Chuyển sang hiển thị tất cả thú cưng
  } else {
    healthyCheck = true;
    healthyBtn.textContent = "Show All Pet";
    displayPetArr = petArr.filter(function (e) {
      return e.vaccinated && e.dewormed && e.sterilized;
    }); // Lọc các thú cưng khỏe mạnh vào displayPetArr
  }

  renderTableData(displayPetArr); // Sử dụng displayPetArr để hiển thị dữ liệu
}

healthyBtn.addEventListener("click", toggleHealthyPets);
