let carts = document.querySelectorAll('.add-cart');    //Add cart button

let products = [
    {
        name: "Headphone",
        tag: "Headphone",
        price: 200,
        inCart: 0
    },
    {
        name: "Watch",
        tag: "Watch",
        price: 300,
        inCart: 0
    },
    {
        name: "Laptop",
        tag: "Laptop",
        price: 400,
        inCart: 0
    }
]

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
   })
}
// press f12 and application and localstorage. it shows key value pair
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //  Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                 [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
    }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
// Convert a JavaScript object into a string with JSON.stringify().

}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}


function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                 <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>

            <div class="price">
               ${item.price}
            </div>

            <div class="quantity">
               <ion-icon name="caret-back-outline"></ion-icon>
               <span>${item.inCart}</span>
               <ion-icon name="caret-forward-outline"></ion-icon>
            </div>
            `
        })
    }
}
// this is used for when refresh the page add btn counting is not from 0 but from continues counting.
onLoadCartNumbers();
displayCart();
