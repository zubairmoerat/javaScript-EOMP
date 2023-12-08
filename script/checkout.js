//adding and removing objects from an empty array
//footer year
document.querySelector('#currYear').textContent = new Date().getFullYear()

let cart = JSON.parse(localStorage.getItem('checkout'));
let checkoutTable = document.querySelector('[table-checkout]')
function cartItems(){
    try{
        let cartProducts = Object.groupBy(cart, item => { return item.id});
        let paymentAmount = 0;
        for(let i in cartProducts) {
            let totalAmount = cartProducts[i].length * cartProducts[i].amount;
            paymentAmount += totalAmount;
            checkoutTable.innerHTML += `
            <tr>
                 <td>${cartProducts[i][0].name}</td>
                 <td>${cartProducts[i][0].detail}</td>
                 <td>${cartProducts[i].length}</td>
                 <td>${cartProducts[i][0].amount}</td>
            </tr>
         `
        }
        checkoutTable.innerHTML +=`
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Your Total:${paymentAmount}</td>
        </tr>
        `
    }catch(e){
        checkoutTable.innerHTML = "Add items to your cart"
    }
}
cartItems()

function clearProducts(){
    location.reload()
    localStorage.removeItem('checkout')
    alert('Press "OK" removed items from your cart')
}
function productPayment(){
    alert('Payment Successful')
}
