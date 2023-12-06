//adding and removing objects from an empty array
//footer year
document.querySelector('#currYear').textContent = new Date().getFullYear()

let checkouts = JSON.parse(localStorage.getItem('checkout')) 
let checkoutTable = document.querySelector('[data-checkout]')
function cartItems(){
    checkoutTable.innerHTML = ""
    if(checkouts){
        checkouts.forEach((checkout, i)=>{
            checkoutTable.innerHTML +=`
            <table class="table table-bordered">
               <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <td><img src="${checkout.image}" class="img-thumbnail"> ${checkout.name}</td>
                        <td>${checkout.quantity}</td>
                        <td>${checkout.amount}</td>
                    </tr>
                </tbody>
                <tfoot class="table-group-divider">
                    <tr>
                        <td><a class="btn btn-secondary" id="pay" onclick='productPayment()'>Pay Now</a></td>
                        <td>Total Quantity:</td>
                        <td>Total Amount:</td>
                    </tr>
                </tfoot>
            </table>
            `
        })
    }else{
        checkoutTable.innerHTML = `
        <table class="table table-bordered">
               <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <td>Please add products</td>
                    </tr>
                </tbody>
            </table>
        `
    }
}
cartItems()