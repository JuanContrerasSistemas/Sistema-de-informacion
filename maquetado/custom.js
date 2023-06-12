//variables
//Selecciona el container productos del HTML
let allContainerCart = document.querySelector('.products');

let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
//Agrupa todos los Listeners
loadEventListeners();
function loadEventListeners(){
    //Se añade un Listener al container productos que al dar clic se activa la funcion addProduct
    allContainerCart.addEventListener('click', addProduct);
    //Se añade un Listener al container del carrito de compras que al dar clic se activa la funcion deleteProduct
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    //Imprime la interacción con el botón añadir en vez de recargar la pagina
    e.preventDefault();
    //Imprime la acción de clic solo cuando se toca el botón Añadir 
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; //parentElement muestra el padre del elemento seleccionado
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //Arreglo: El contador se quedaba en "1" aunque ya no hubiese productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    //Obtiene individualmente la info del producto
    const infoProduct = {
        image: product.querySelector('div img').src,
        //Se obtiene el nombre a traves de la clase title
        title: product.querySelector('.title').textContent,
        //Se obtiene el precio que está dentro de un div/p/span
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">$${price}</h5>
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}

 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }