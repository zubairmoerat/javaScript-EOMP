//adding and removing objects from an empty array
//footer year
document.querySelector('#currYear').textContent = new Date().getFullYear()

let checkout = JSON.parse(localStorage.getItem('checkout'));
let checkoutTable = document.querySelector('[table-checkout]')
function cartItems(){
    checkoutTable.innerHTML = ""
    if(checkout){
        checkout.forEach((checkout, i)=>{
            checkoutTable.innerHTML +=`
                <tr>
                    <td><img src="${checkout.image}" class="img-thumbnail w-25 h-25"></td>
                    <td>${checkout.name}</td>
                    <td>${checkout.quantity}</td>
                    <td>${checkout.amount}</td>
                </tr>
            `
        });
    }else{
        checkoutTable.innerHTML = `
        <tr>
            <td>Please add products</td>
        </tr>
        `
    }
}
cartItems()

function productPayment(){
    alert('Payment Successful')
}
function clearProducts(){
    checkoutTable.innerHTML =`
    <tr>
        <td>Please add products</td>
    </tr>
    `
}