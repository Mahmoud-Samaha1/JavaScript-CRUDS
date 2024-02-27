// Define Dom Elements
let title = document.getElementById('title');
let total = document.getElementById('total');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let quantity = document.getElementById('quantity');
let category = document.getElementById('category');
let search = document.getElementById('search');
let tbody = document.getElementById('tbody');
let createbtn = document.getElementById('create');
let updatebtn = document.getElementById('update');
let deleteAllbtn = document.getElementById('deleteAll');
let updateDiv = document.querySelector('.create-btn');
let mode = "create";
let productIndex;
let searchMode = "title";

// console.log(title,total,price,taxes,ads,discount,quantity,category,search)

// ______________________________________________________________________________________________________________

// get total
function getTotalPrice() {
    if (price.value != "") {
        let totalPrice = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.innerHTML = `Total: ${totalPrice}`;
        total.style.backgroundColor = "rgb(32, 180, 51)";
    } else {
        total.innerHTML = `Total:`
        total.style.backgroundColor = "rgb(180, 2, 2)";
    }
}
// create product
let newProducts;
if (localStorage.products != null) {
    newProducts = JSON.parse(localStorage.products);
} else {
    newProducts = [];
}
createbtn.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML.substring(7, total.length),
        quantity: quantity.value,
        category: category.value
    }
    if (mode === "create") {
        newProducts.push(newProduct);
        // save localhost
            localStorage.setItem("products", JSON.stringify(newProducts));
            clearInputs();
            getProducts();
    } else {
        createbtn.innerHTML = "Create";
        console.log('updated');
        newProducts[productIndex] = newProduct;
        localStorage.setItem("products", JSON.stringify(newProducts));
        clearInputs();
        getProducts();
        mode = "create";
    }
}

category.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML.substring(7, total.length),
        quantity: quantity.value,
        category: category.value
    }
    if (mode === "create") {
        newProducts.push(newProduct);
        // save localhost
            localStorage.setItem("products", JSON.stringify(newProducts));
            clearInputs();
            getProducts();
    } else {
        createbtn.innerHTML = "Create";
        console.log('updated');
        newProducts[productIndex] = newProduct;
        localStorage.setItem("products", JSON.stringify(newProducts));
        clearInputs();
        getProducts();
        mode = "create";
    }
    // Trigger the button element with a click
        // document.getElementById("myBtn").click();
        
    }
});

// clear inputs
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    getTotalPrice()
    quantity.value = "";
    category.value = "";
}
// read
function getProducts() {
    let row = "" ;
    for (i = 0; i < newProducts.length; i++) {
        row += `<tr>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${i+1}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].title}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].price}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].taxes}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].ads}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].discount}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].total}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].quantity}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].category}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">
                            <div class="d-grid gap-2">
                                <button type="button" onclick="updateProduct(${i})" name="" id="" class="btn text-capitalize text-light">
                                    update
                                </button>
                        </td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">
                            <div class="d-grid gap-2">
                                <button type="button" onclick="deleteProduct(${i})" name="" id="" class="btn text-capitalize text-light">
                                    delete
                                </button>
                            </div>
                        </td>

                    </tr>`
    }
    tbody.innerHTML = row;
    showDeleteAllBtn();
}
getProducts();

// quantity
// delete
function deleteProduct(i) {
    newProducts.splice(i, 1);
    localStorage.products = JSON.stringify(newProducts);
    getProducts();
}
// ______________________________________________________________________________________________________
// delete All
function showDeleteAllBtn() {
    if (newProducts.length == 0) {
        deleteAllbtn.classList.add('disabled');
        deleteAllbtn.style.border = "none";
        deleteAllbtn.innerHTML = `Delete All`
    } else {
        deleteAllbtn.classList.remove('disabled');
        deleteAllbtn.innerHTML = `Delete All (${newProducts.length})`
    }
}
deleteAllbtn.onclick = function deleteAll() {
    newProducts.splice(0, newProducts.length);
    localStorage.products = JSON.stringify(newProducts);
    getProducts();
}
// ____________________________________________________________________________________________
// update
function updateProduct(i) {
    createbtn.innerHTML = "Update";
    mode = "update";
    title.value = newProducts[i].title;
    price.value = newProducts[i].price;
    ads.value = newProducts[i].ads;
    taxes.value = newProducts[i].taxes;
    discount.value = newProducts[i].discount;
    quantity.value = newProducts[i].quantity;
    category.value = newProducts[i].category;
    getTotalPrice();
    productIndex = i;
    window.scroll(top);
    title.focus();
    console.log(newProducts[i]);
}
// search
function getSearchMode(id) {
    let clickedBtn = document.getElementById(id);
    search.value = '';
    searchMode = clickedBtn.innerHTML.trim()
        .substring(clickedBtn.innerHTML.trim().lastIndexOf(" "))
        .trim().toLowerCase();
    search.placeholder = clickedBtn.innerHTML.trim().toLowerCase();
    search.focus();
    console.log(search.placeholder);
    console.log(searchMode);
}

function searchProducts(value) {
    let row = "";
    for (let i in newProducts) {
        if (searchMode == "title") {
            if (newProducts[i].title.includes(value.toLowerCase())) {
                console.log(newProducts[i].title);
                row += `<tr>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${+i + 1}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].title}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].price}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].taxes}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].ads}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].discount}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].total}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].quantity}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].category}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">
                            <div class="d-grid gap-2">
                                <button type="button" onclick="updateProduct(${i})" name="" id="" class="btn text-capitalize text-light">
                                    update
                                </button>
                        </td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">
                            <div class="d-grid gap-2">
                                <button type="button" onclick="deleteProduct(${i})" name="" id="" class="btn text-capitalize text-light">
                                    delete
                                </button>
                            </div>
                        </td>

                    </tr>`
            } else {
                getProducts();
            }
        } else {
            if (newProducts[i].category.includes(value.toLowerCase())) {
                console.log(newProducts[i].category);
                row += `<tr>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${+i + 1}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].title}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].price}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].taxes}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].ads}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].discount}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].total}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].quantity}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">${newProducts[i].category}</td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">
                            <div class="d-grid gap-2">
                                <button type="button" onclick="updateProduct(${i})" name="" id="" class="btn text-capitalize text-light">
                                    update
                                </button>
                        </td>
                        <td scope="row" class="bg-transparent border-0 text-light text-center">
                            <div class="d-grid gap-2">
                                <button type="button" onclick="deleteProduct(${i})" name="" id="" class="btn text-capitalize text-light">
                                    delete
                                </button>
                            </div>
                        </td>
                    </tr>`
            } else {
                getProducts()
            }
        }
        tbody.innerHTML = row;
        
    }
    
}
// clean data (validation)
