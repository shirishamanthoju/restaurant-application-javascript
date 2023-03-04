var tableId = document.getElementById("table-items");
var menuId = document.getElementById("menu-items");

//Initializing the app
function initialize() {
    if (localStorage.getItem("tables") == null) {
        localStorage.setItem("tables", JSON.stringify(tables));
    }
    displayTables();
    displayMenu();
}

//Creating a table
function createTable(id, price, items) {
    let table = `<li onclick="openModal('table${id}')" ondrop="drop(event,'table${id}')" ondragover="allowDrop(event)">
        <h2>Table-${id}</h2>
        <p>Rs ${price} | Total Items: ${items}</p>
        </li>`;
    return table;
}

//Showing tables
function displayTables() {
    let i = 1;
    let tables = JSON.parse(localStorage.getItem("tables"));
    tableId.innerHTML = "";
    while (tables["table" + i] != null) {
        let { price, items } = tables["table" + i];

        let table = createTable(i, price, items);
        tableId.insertAdjacentHTML("beforeend", table);
        i++;
    }
}

//Creating menu items
function createMenu(i, name, price, category) {
    let item = `<li id="item${i}" draggable="true" ondragstart="drag(event)">
        <h3>${name}</h3>
        <p>Rs:${price}.00</p>
		<h5>${category}</h5>
        </li>
        `;
    return item;
}


//Showing menu
function displayMenu() {
    let i = 1;
    menuId.innerHTML = "";
    while (menu["item" + i] != null) {
        let { name, price, category } = menu["item" + i];
        let item = createMenu(i, name, price, category);
        menuId.insertAdjacentHTML("beforeend", item);
        i++;
    }
}

