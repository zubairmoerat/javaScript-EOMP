//adding and removing objects from an empty array
//footer year
document.querySelector('#currYear').textContent = new Date().getFullYear()

//gettting my products from the localStorage to display in my table
let cart = JSON.parse(localStorage.getItem('checkout'));
let checkoutTable = document.querySelector('[table-checkout]')
function cartItems(){
    try{
        let cartProducts = Object.groupBy(cart, item => { return item.id});
        for(let i in cartProducts) {
            checkoutTable.innerHTML += `
            <tr>
                <td>${cartProducts[i][0].name}</td>
                <td>${cartProducts[i].length}</td>
                <td>${cartProducts[i][0].amount}</td>
                <td>${eval(`${cartProducts[i][0].amount} * ${cartProducts[i].length}`)}</td>
            </tr>
         `
        }
    }catch(e){
        checkoutTable.innerHTML = "Add items to your cart"
    }
}
cartItems()

//this function is to clear the products in my table and is linked to onclick
function clearProducts(){
    location.reload()
    localStorage.removeItem('checkout')
    alert('Press "OK" to remove items from your cart')
}
//this function is for product payment and clear products on my table
function productPayment(){
    location.reload()
    localStorage.removeItem('checkout')
    alert('Payment Successful')
}
