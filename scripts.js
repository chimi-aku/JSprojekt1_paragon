const addSection = document.querySelector('.add_section');
const addProductBtn = addSection.querySelector('.add_product_btn');
addProductBtn.addEventListener('click', addProduct);


class Product {
    constructor(name, price, amount){
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.sum = price * amount;
    }
}

let productList = [];

function showProducts() {
    const paragon = document.querySelector('.paragon');
    paragon.innerHTML = '';

    
    const list = document.createElement('ul');
    list.classList.add('list');
    paragon.appendChild(list);

    /* displaying labels */

    const productLabels = document.createElement('li');
    productLabels.classList.add('product_labels');


    const labels = ['number', 'name', 'price', 'amount', 'sum'];
    for(l of labels) {
        const p = document.createElement('p');
        p.textContent = l;
        p.classList.add('pruduct_label');
        productLabels.appendChild(p);
    }

    list.appendChild(productLabels);
    


    /* displaying products */

    console.log(productList);
    let i = 1;

    for(const product of productList){
        // productElement - product li HTML element
        // product object of Product class cointaing data
        
        console.log(product);

        const productElement = document.createElement('li');
        productElement.classList.add('product');

        const productNumber = document.createElement('p');
        productNumber.textContent = i + '.';
        productNumber.classList.add('product_property');
        productElement.appendChild(productNumber);

        for(prop in product) {
            const p = document.createElement('p');
            p.textContent = product[prop];
            p.classList.add('product_property');
            productElement.appendChild(p);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete_btn');
        deleteBtn.textContent = 'delete';
        productElement.appendChild(deleteBtn);

        list.appendChild(productElement)
        ///paragon.appendChild(productElement);

        i++;

    }

    listenDeleteBtns();

}

function addProduct() {
    console.log('add p');

    const inputProductName = addSection.querySelector('#add_product_name');
    const inputProductPrice = addSection.querySelector('#add_product_price');
    const inputProductAmount = addSection.querySelector('#add_product_amount');

    const name = inputProductName.value;
    const price = inputProductPrice.value;
    const amount = inputProductAmount.value;

    const newProduct = new Product(name, price, amount);
    productList.push(newProduct);

    

    showProducts();

    inputProductName.value = '';
    inputProductPrice.value = '';
    inputProductAmount.value = '';

    // Local storage to do

    updateLocalStorage();


}

function deleteProduct(e) {
    console.log('delete');
    console.log(e.target.parentNode);

    const id = parseInt(e.target.parentNode.firstChild.textContent, 10);
    console.log(e.target.parentNode.firstChild)
    for(let i = 0; i < productList.length; i++) {
        if(id - 1 === i){
            productList.splice(i, 1);
            break;
        }
    }

    showProducts();
    updateLocalStorage();
}


function listenDeleteBtns() {
    /* set listening on delete Task btns */
    deleteTaskBtns = document.querySelectorAll('.delete_btn').forEach(btn =>
    btn.addEventListener('click', deleteProduct));
}


/** Local storage **/

function updateLocalStorage() {
    if(typeof localStorage !== 'undefined'){
        localStorage.removeItem('product list');
        localStorage.setItem('product list', JSON.stringify(productList));
    }
}

function loadDataFromLocalStorage() {
    if(typeof localStorage !== 'undefined' && localStorage.getItem('product list') != 'undefined'){
        productList = JSON.parse(localStorage.getItem('product list'));
    }
}

/** MAIN **/
//loadDataFromLocalStorage();
