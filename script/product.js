//footer year
document.querySelector('#currYear').textContent = new Date().getFullYear();
//productWrapper
let products = localStorage.getItem('products') ?
    JSON.parse(localStorage.getItem('products')) :
    localStorage.setItem('products', JSON.stringify([
        {
            id: 1,
            name: 'Protein Powder',
            image: "https://i.postimg.cc/RhfYmFwP/js-EOMP-prod1.jpg",
            detail: '24 grams of protein with low levels of fat and 120 calories.',
            amount: 1000
        },
        {
            id: 2,
            name: 'Gym Bag',
            image: "https://i.postimg.cc/sgmsbVPP/js-EOMP-prod2.jpg",
            detail: 'For carrying your gym essentials.',
            amount: 1500
        },
        {
            id: 3,
            name: 'Lifting Belt',
            image: "https://i.postimg.cc/J4H7FVtt/js-EOMP-prod3.jpg",
            detail: 'Offers support to the lower back during heavy compound lifts.',
            amount: 800
        },
        {
            id: 4,
            name: 'Fitness Tracker',
            image: "https://i.postimg.cc/BZN5Zz5q/js-EOMP-prod4.jpg",
            detail: 'Monitors and tracks your fitness metrics.',
            amount: 2500
        },
        {
            id: 5,
            name: 'Creatine',
            image: "https://i.postimg.cc/JzWR6R0x/js-EOMP-prod5.jpg",
            detail: 'Increase performance during high intensity training.',
            amount: 600
        },
        {
            id: 6,
            name: 'Trenbolone',
            image: "https://i.postimg.cc/RFQ1Cdrk/js-EOMP-prod6.jpg",
            detail: 'Increases muscle growth and appetite',
            amount: 5000
        },
        {
            id: 7,
            name: 'Compression Sweater',
            image: "https://i.postimg.cc/9Fjkm86f/js-EOMP-prod7.jpg",
            detail: 'Perfect material to control body temperature.',
            amount: 500
        },
        {
            id: 8,
            name: 'Boxing Gloves',
            image: "https://i.postimg.cc/MHRr9jv6/js-EOMP-prod-UP.jpg",
            detail: 'Combines durability and comfort for the ultimate training experience.',
            amount: 900
        },
        {
            id: 9,
            name: 'Water Bottle',
            image: "https://i.postimg.cc/bJXzr1c8/js-EOMP-prod9.jpg",
            detail: 'Great for on-the-go hydration and supplementation.',
            amount: 150
        },
        {
            id: 10,
            name: 'Headphones',
            image: "https://i.postimg.cc/VLS0JB20/js-EOMP-prod10.jpg",
            detail: 'Noise cancelation and comfortable fit for an emmersive experience.',
            amount: 3500
        }
    ]))
//this puts products/objects in html
let productWrapper = document.querySelector('[data-products]');
function displayProducts(args) {
    productWrapper.innerHTML = " "
    try {
        if (args) {
            args?.forEach((product) => {
                productWrapper.innerHTML += `
                <div class="col">
                <div class="card">
                <img src="${product.image}" class="card-img-top h-50 w-50 img-fluid align-self-center" alt="${product.id}">
                <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.detail}</p>
                <p class="card-text">${product.amount}</p>
                <a class="btn btn-secondary" id="cart" onclick='addToCart(${JSON.stringify(product)})'>Add To Cart</a>
                </div>
                </div>
                </div>
                `
            })
        } else {
            productWrapper.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                </div>
                <p>No Products Found</p>
            </div>
            `
        }
    } catch (e) {
        alert('Error Loading Products')
    }
};

displayProducts(products);

//searches products by name
let productSearch = document.querySelector('[data-search-product]');
productSearch.addEventListener('input', () => {
    try {
        let searchItem = products.filter(item => {
            return item.name.toLowerCase().includes(productSearch.value.toLowerCase());
        })
        displayProducts(searchItem);
    } catch (e) {
        alert('Function is under maintainance')
    }
})

//sorts by the price
let productSort = document.querySelector('.btn')
let highest = false;
productSort.addEventListener('click', () => {
    try {
        if (!highest) {
            products.sort((a, b) => b.amount - a.amount);
            highest = true;
        } else {
            products.sort((a, b) => a.amount - b.amount);
            highest = false;
        }
        displayProducts(products)
    } catch (e) {
        alert('This Function is under maintainance')
    }
});

//puts objects in new localStorage for other page
let cart = JSON.parse(localStorage.getItem('checkout')) || [];
function addToCart(product) {
    debugger
    try {
        cart.push(product);
        localStorage.setItem('checkout', JSON.stringify(cart));
    } catch (e) {
        alert('The Cart is under maintainance')
    }
}