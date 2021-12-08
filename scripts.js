const addSection = document.querySelector('.add_section');
const addProductBtn = addSection.querySelector('.add_product_btn');
addProductBtn.addEventListener('click', addProduct);
window.addEventListener('keypress', (e) =>  {
    if (e.key === 'Enter') {
        addProduct();
    }
});

class Product {
    constructor(name, price, amount){
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.sum = price * amount;
    }
}

let productList = [new Product('cola', 2.49, 3)];

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



    if(productList == null) {
        return 0;
    }

    for(const product of productList){
        // productElement - product li HTML element
        // product object of Product class cointaing data
        
        //console.log(product);

        const productElement = document.createElement('li');
        productElement.classList.add('product');

        const productNumber = document.createElement('p');
        productNumber.textContent = i + '.';
        productNumber.classList.add('product_property');
        productElement.appendChild(productNumber);

        for(prop in product) {
            const p = document.createElement('p');
            p.textContent = product[prop];
            if(prop == 'price' || prop == 'sum') p.textContent += 'zł';
            p.classList.add('product_property');
            p.classList.add(prop);
            productElement.appendChild(p);
        }

        const buttonsDiv = document.createElement('div');

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete_btn');
        deleteBtn.textContent = 'delete';
        buttonsDiv.appendChild(deleteBtn);
        
        /*
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit_btn');
        editBtn.textContent = 'edit';
        buttonsDiv.appendChild(editBtn);
        */
        const arrowUpBtn = document.createElement('i');
        arrowUpBtn.classList.add('arrow');
        arrowUpBtn.classList.add('up');
        buttonsDiv.appendChild(arrowUpBtn);

        const arrowDownBtn = document.createElement('i');
        arrowDownBtn.classList.add('arrow');
        arrowDownBtn.classList.add('down');
        buttonsDiv.appendChild(arrowDownBtn);


        productElement.appendChild(buttonsDiv)
        list.appendChild(productElement)
        ///paragon.appendChild(productElement);

        i++;

    }

    /* displaying summary */

    const summary = document.createElement('li');
    summary.classList.add('summary');
    
    for(let j = 0; j < 3; j++) {
        const p = document.createElement('p');
        summary.appendChild(p);
    }

    const totalText = document.createElement('p');
    totalText.textContent = 'total:';
    summary.appendChild(totalText);

    let sum = 0;
    for (const item of productList) {
        console.log(typeof item.sum);
        sum += item.sum;
    }
    const totalSum = document.createElement('p');
    totalSum.textContent = sum + 'zł';
    summary.appendChild(totalSum);
    
    list.appendChild(summary);

    listenDeleteBtns();
    listenEditBtns();
    listenUpArrows();
    listenDownArrows();
}

function addProduct() {
    const inputProductName = addSection.querySelector('#add_product_name');
    const inputProductPrice = addSection.querySelector('#add_product_price');
    const inputProductAmount = addSection.querySelector('#add_product_amount');

    const name = inputProductName.value;
    const price = parseInt(inputProductPrice.value, 10);
    const amount = parseInt(inputProductAmount.value, 10);

    /* Validation */
    if(!validateAddProduct(name, price, amount)) {
        return 0;
    }

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
    const id = parseInt(e.target.parentNode.parentNode.firstChild.textContent, 10);
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

function editProduct(e) {
    console.log('edit');
    const id = parseInt(e.target.parentNode.parentNode.firstChild.textContent, 10);
    const index = id - 1;
    const productToEdit = productList[index];
    console.log(productList[index]);

    const productEl = e.target.parentNode.parentNode;
}

function listenEditBtns() {
    /* set listening on edit Task btns */
    editTaskBtns = document.querySelectorAll('.edit_btn').forEach(btn =>
    btn.addEventListener('click', editProduct));
}

function swapProducts(product1Idx, product2Idx) {
    const swap = productList[product1Idx];
    productList[product1Idx] = productList[product2Idx];
    productList[product2Idx] = swap;
}

function moveProductUp(e) {
    //console.log('move up');
    //console.log(e.target.parentNode.parentNode);

    const id = parseInt(e.target.parentNode.parentNode.firstChild.textContent, 10);
    if(id < 1) {
        return 0;
    }
    const index = id - 1;
    //console.log(productList[index]);

    swapProducts(index, index - 1)
    showProducts();
}

function listenUpArrows() {
    /* set listening on up arrows  */
    arrowUpBtn = document.querySelectorAll('.up').forEach(btn =>
    btn.addEventListener('click', moveProductUp));
}

function moveProductDown(e) {
    //console.log('move down');
    //console.log(e.target.parentNode.parentNode);

    const id = parseInt(e.target.parentNode.parentNode.firstChild.textContent, 10);
    if(id >= productList.length) {
        return 0;
    }
    const index = id - 1;
    //console.log(productList[index]);

    swapProducts(index, index + 1)
    showProducts();
}

function listenDownArrows() {
    /* set listening on down arrows  */
    arrowDownBtn = document.querySelectorAll('.down').forEach(btn =>
    btn.addEventListener('click', moveProductDown));
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


function validateAddProduct(name, price, amount) {
    const message = document.getElementById('form_message');
    message.innerText = '';
    
    const priceReg = /^\d+$/;

    try{
        if(name == null || name == '') throw 'name field is empty';
        else if(parseInt(price, 10) <= 0) throw 'price is not positive number'
        else if(price == null || price == NaN || price == '') throw 'price field is empty'
        else if(!priceReg.test(price)) throw 'price is not a number'
        else if(parseInt(amount, 10) <= 0) throw 'amount is not positive number'
        else if(amount == null || amount == NaN || amount == '') throw 'amount field is empty'
        else if(!priceReg.test(amount)) throw 'amount is not a number'
    }
    catch(err) {
        message.innerText = err;
        return false;
    }

    return true;
    
}

/** MAIN **/
loadDataFromLocalStorage();

console.log(productList);
showProducts();


