//modal 
var modal = document.getElementById("myModal");


//opening the modal on clicking the table items 
function openModal(tableNo) {
	modal.style.display = "block";
	document.getElementById("modal-header").innerHTML = `
	<h3>${tableNo.toUpperCase()}: ORDER DETAILS </h3>
	<span class="close" onclick="closeModal()">&times;</span>`;

	let rows = document.getElementById("tb-rows");
	rows.innerHTML = `<tr>
	<th>S.No</th>
	<th>Item</th>
	<th>Price</th>
	<th>Total Price</th>
	<th>Quantity</th>
	</tr>`;


	let tables = JSON.parse(localStorage.getItem("tables"));
	let table = tables[tableNo];
	let { price, orders: items } = table;
	let i = 1;
	for (let [item, qty] of Object.entries(items)) {
		rows.insertAdjacentHTML("beforeend",
			`<tr>
			<td>${i}.</td>
			<td>${menu[item].name}</td>
			<td>${menu[item].price}</td>
			<td>${menu[item].price * qty}</td>
			<td><input type="number" id="qty${i}" min = "1" value="${qty}" oninput="changeQty('${i}','${item}','${tableNo}')" /></td>
			<td><i class="fa fa-trash" aria-hidden="true" id="delete" onclick="deleteItem('${item}','${tableNo}')"></i></td>

		</tr>
		`
		);
		i++;
	}
	let total = document.getElementById("total");
	total.innerHTML = `TOTAL: ${price}`;
	document.getElementById("modal-footer").innerHTML = `<p id="bill" onclick="generateBill('${tableNo}') " >GENERATE BILL</p>`;
}

//Drop start
function drag(e) {
	e.dataTransfer.setData("id", e.target.id);
}

//DropOver
//By default dropping is not allowed but we disable it
function allowDrop(e) {
	e.preventDefault();
}

//After dropping the item on table
function drop(e, tableName) {
	addItemToTable(tableName, e.dataTransfer.getData("id"));
}

//For adding item to the table after dropping
function addItemToTable(tableName, itemId) {
	let tables = JSON.parse(localStorage.getItem("tables"));
	let item = menu[itemId];

	if (tables[tableName]["orders"][itemId] == undefined) {
		tables[tableName]["orders"][itemId] = 1;
	} else {
		tables[tableName]["orders"][itemId] += 1;
	}
	console.log(tables);

	//Displaying cost of items
	tables[tableName].price += parseInt(item.price);
	tables[tableName]["items"] += 1;
	localStorage.setItem("tables", JSON.stringify(tables));
	displayTables();
}

//Change quantity of item
function changeQty(i, itemId, tableNo) {
	let tables = JSON.parse(localStorage.getItem("tables"));
	let table = tables[tableNo];
	let qty = document.getElementById(`qty${i}`).value;
	table.orders[itemId] = parseInt(qty);
	let items = 0;
	let total = 0;
	for (let [item, qty] of Object.entries(table.orders)) {
		items += qty;
		total += menu[item].price * qty;
	}
	table.items = items;
	table.price = total;
	localStorage.setItem("tables", JSON.stringify(tables));
	displayTables();
	openModal(tableNo);
}

//Delete item from the order
function deleteItem(item, tableNo) {
	let tables = JSON.parse(localStorage.getItem("tables"));
	let table = tables[tableNo];
	let itemCost = menu[item].price;
	let itemQty = table.orders[item];

	delete table.orders[item];

	table.price -= itemCost * itemQty;
	table.items -= itemQty;
	tables[tableNo] = table;
	localStorage.setItem("tables", JSON.stringify(tables));
	displayTables();
	openModal(tableNo);
}


//Modal close
function closeModal() {
	modal.style.display = "none";
}

//Generating Bill
function generateBill(tableNo) {
	let tables = JSON.parse(localStorage.getItem("tables"));
	let table = tables[tableNo];
	let total = table.price;
	if (total > 0) {
		table.price = 0;
		table.items = 0;
		table.orders = {};
		tables[tableNo] = table;

		localStorage.setItem("tables", JSON.stringify(tables));

		alert(`Your total is Rs ${total}. Thank you! Visit Again :) `);
		closeModal();
		displayTables();
	}
}

