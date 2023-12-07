//footer year
document.querySelector('#currYear').textContent = new Date().getFullYear()
//productWrapper
let products = localStorage.getItem('products') ? 
JSON.parse(localStorage.getItem('products')) : 
localStorage.setItem('products', JSON.stringify([
    {
        id: 1,
        name: 'Protein Powder',
        image: "https://i.postimg.cc/RhfYmFwP/js-EOMP-prod1.jpg",
        detail: '24 grams of protein with low levels of fat and 120 calories.',
        amount: 'R1000',
        quantity: 1
    },
    {
        id: 2,
        name: 'Gym Bag',
        image: "https://i.postimg.cc/sgmsbVPP/js-EOMP-prod2.jpg",
        detail: 'For carrying your gym essentials.',
        amount: 'R1500',
        quantity: 1
    },
    {
        id: 3,
        name: 'Lifting Belt',
        image: "https://i.postimg.cc/J4H7FVtt/js-EOMP-prod3.jpg",
        detail: 'Offers support to the lower back during heavy compound lifts.',
        amount: 'R800',
        quantity: 1
    },
    {
        id: 4,
        name:'Fitness Tracker',
        image: "https://i.postimg.cc/BZN5Zz5q/js-EOMP-prod4.jpg",
        detail: 'Monitors and tracks your fitness metrics.',
        amount: 'R2500',
        quantity: 1
    },
    {
        id: 5,
        name: 'Creatine',
        image: "https://i.postimg.cc/JzWR6R0x/js-EOMP-prod5.jpg",
        detail: 'Increase performance during high intensity training.',
        amount: 'R600',
        quantity: 1
    },
    {
        id: 6,
        name: 'Trenbolone',
        image:"https://i.postimg.cc/RFQ1Cdrk/js-EOMP-prod6.jpg",
        detail: 'Increases muscle growth and appetite',
        amount: 'R5000',
        quantity: 1
    },
    {
        id: 7,
        name: 'Compression Sweater',
        image: "https://i.postimg.cc/9Fjkm86f/js-EOMP-prod7.jpg",
        detail: 'Perfect material to control body temperature.',
        amount: 'R500',
        quantity: 1
    },
    {
        id: 8,
        name: 'Boxing Gloves',
        image: "https://i.postimg.cc/MHRr9jv6/js-EOMP-prod-UP.jpg",
        detail: 'Combines durability and comfort for the ultimate training experience.',
        amount: 'R900',
        quantity: 1
    },
    {
        id: 9,
        name: 'Water Bottle',
        image: "https://i.postimg.cc/bJXzr1c8/js-EOMP-prod9.jpg",
        detail: 'Great for on-the-go hydration and supplementation.',
        amount: 'R150',
        quantity: 1
    },
    {
        id: 10,
        name: 'Headphones',
        image: "https://i.postimg.cc/VLS0JB20/js-EOMP-prod10.jpg",
        detail: 'Noise cancelation and comfortable fit for an emmersive experience.',
        amount: 'R3500',
        quantity: 1
    }
]))
let purchased = []  
let productWrapper = document.querySelector('[data-products]')
function displayProducts(){
    productWrapper.innerHTML = " "
    if(products){
        products.forEach((product, i)=>{
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
    }else{
        productWrapper.innerHTML = "No Products"
    }
}

displayProducts()

let productSearch = document.querySelector('[data-search-product]')
productSearch.addEventListener('keyup', ()=>{
    let searchItem =products.filter( prod=>{
        return prod.name.toLowerCase().includes(productSearch.value.toLowerCase())
    })
    if(searchItem.length != 0){
        productWrapper.innerHTML = ""
        searchItem.forEach( item=>{
            productWrapper.innerHTML += `
            <div class="col">
            <div class="card">
            <img src="${item.image}" class="card-img-top h-50 w-50 img-fluid align-self-center" alt="${item.id}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.detail}</p>
              <p class="card-text">${item.amount}</p>
              <a class="btn btn-secondary" id="cart" onclick='addToCart(${JSON.stringify(item)})'>Add To Cart</a>
            </div>
            </div>
            </div>
            `
        })
    }else{
        productWrapper.innerHTML = `
        <div class="col">
        <div class="d-flex justify-content-center">
        <div class="spinner-border text-secondary" role="status">
        </div>
        </div>
        <p class="text-center fs-1">No Item Found</p>
        </div>
        `
    }
})
let productSort = document.querySelector('.btn')
let highest = false;
productSort.addEventListener('click', function(){
    productWrapper.innerHTML = ''
    highest = highest ? false : true;
    let prods = [];
    if(highest){
        prods = products.sort( (prod1, prod2) => {
            return parseInt(prod1.amount.split('').slice(1, prod1.amount.length).join('')) - parseInt(prod2.amount.split('').slice(1, prod2.amount.length).join(''));
        } )
    } else {
        prods = products.sort( (prod1, prod2) => {
            return parseInt(prod2.amount.split('').slice(1, prod2.amount.length).join('')) - parseInt(prod1.amount.split('').slice(1, prod1.amount.length).join(''))
        } )
    }
    prods.forEach( item => {
        productWrapper.innerHTML += `
        <div class="col">
        <div class="card">
        <img src="${item.image}" class="card-img-top h-50 w-50 img-fluid align-self-center" alt="${item.id}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.detail}</p>
          <p class="card-text">${item.amount}</p>
          <a class="btn btn-secondary" id="cart" onclick='addToCart(${item})>Add To Cart</a>
        </div>
        </div>
        </div>
        `;
    } )
})

function addToCart(item) {
    if(item) {
        purchased = JSON.parse(localStorage.getItem('checkout'))
        purchased.push(item)
        localStorage.setItem('checkout', JSON.stringify(purchased))
    }
} 