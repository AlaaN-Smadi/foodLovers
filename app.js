'use strict';

const formEl = document.getElementById("myForm");
let table = document.getElementById("myFood");

let nameF;
let typeF;

let foodArr = [];

function FoodCons(name, type) {
    this.name = name;
    this.type = type;

    this.price;
    foodArr.push(this);

    setData();

}

function rand(max) {
    return Math.floor(Math.random() * max);
}

formEl.addEventListener('submit', getFormData);

function getFormData(event){
    event.preventDefault();

    nameF = event.target.customer.value;
    typeF = event.target.typeF.value;

    new FoodCons(nameF, typeF);
    
    render();
}


function render() {

    table.textContent = "";

    let trHeader = document.createElement('tr');
    table.appendChild(trHeader);

    let tdHeader = document.createElement('th');
    let tdHeader2 = document.createElement('th');
    let tdHeader3 = document.createElement('th');

    tdHeader.textContent = "Order Image";
    tdHeader2.textContent = "Order Details";
    tdHeader3.textContent = "Delete";

    trHeader.appendChild(tdHeader);
    trHeader.appendChild(tdHeader2);
    trHeader.appendChild(tdHeader3);

    for (let row = 0; row < foodArr.length; row++) {
        let trEl = document.createElement('tr');
        table.appendChild(trEl);

        for (let data = 0; data < 3; data++) {
            let tdEl = document.createElement('td');
            trEl.appendChild(tdEl);
            if (data == 0) {
                let img = document.createElement('img');
                let src;
                if (foodArr[row].type == 'shawarma') {
                    src = "img/food/shawarma.jpg";
                } else if (foodArr[row].type == 'burger') {
                    src = 'img/food/burger.jpg'
                } else if (foodArr[row].type == 'pizza') {
                    src = 'img/food/pizza.jpg';
                }
                img.setAttribute('src', src);
                tdEl.appendChild(img);
            }
            else if (data == 1) {
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let p3 = document.createElement('p');

                foodArr[row].price = rand(100);

                p1.textContent = `Customer Name : ${foodArr[row].name}`;
                p2.textContent = `Food Type : ${foodArr[row].type}`;
                p3.textContent = `Food Price : ${foodArr[row].price}`;

                tdEl.appendChild(p1);
                tdEl.appendChild(p2);
                tdEl.appendChild(p3);
            }
            else if (data == 2) {
                let btn = document.createElement('button');
                btn.textContent = "Delete";
                tdEl.appendChild(btn);

                btn.addEventListener('click', function del() {
                    foodArr.splice(row, 1);
                    // table.deleteRow(row);

                    setData();
                });
            }
        }
    }
}


function setData() {
    let dataEl = JSON.stringify(foodArr);
    localStorage.setItem('Food', dataEl);
    render();
}
function getData() {
    let normalObj = JSON.parse(localStorage.getItem("Food"));
    if (normalObj !== null) {
        foodArr = normalObj;
        render();
    }
}

getData();