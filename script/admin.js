//footer year
// debugger
document.querySelector('#currYear').textContent = new Date().getFullYear()
//variables
let tableContent = document.querySelector('[table-products]')

let products = JSON.parse(localStorage.getItem('products')) || []
document.querySelector('[admin-add-product]')

let savedProducts = document.getElementById('saveProduct')

let sortedProducts = document.getElementById('adminSortProduct')

function adminContent(args){
    try{
        tableContent.innerHTML = ""
        args?.forEach((product, i)=>{
            tableContent.innerHTML +=`
            <tr>
                <td>${product.name}</td>
                <td>${product.detail}</td>
                <td><img src="${product.image}" alt="${product.id}" class="img-thumbnail h-25 w-25"></td>
                <td>R${product.amount}</td>
                <td> 
                <div>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateProduct${product.id}"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-secondary" onclick="deleteProduct(${JSON.stringify(i)})"><i class="bi bi-trash"></i></button>
                    <div class="modal fade" id="updateProduct${product.id}" tabindex="-1" aria-labelledby="updateProduct${product.id}" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="updateProduct${product.id}">Update Product</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form>
                          <div class="container">
                          <input class="form-control" type="text" placeholder="Enter a Product Name" value="${product.name}" name ="admin-name" id="admin-name${product.id}" required>
                          <input class="form-control" type="text" placeholder="Enter Image URL" value="${product.image}" name="admin-image" id="admin-image${product.id}" required>
                          <textarea class="form-control my-2" placeholder="Enter your Product details" required name="admin-details" id="admin-details${product.id}">${product.detail}</textarea>
                          <input class="form-control" type="number" placeholder="Enter the Product Amount" value="${product.amount}" name="admin-amount" id="admin-amount${product.id}" required>
                          </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-secondary" onclick='new UpdateProduct(${product}, ${i})'>Save changes</button>
                        </div>
                      </div>
                        </div> 
                    </div>
                </div>
                </td>
            </tr>
            `
        })
    }catch(e){
        tableContent.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <p>No Products Found</p>
            </div>
        </div>
        `
    }
}
adminContent(products)

function UpdateProduct(item, index){
    try{
        this.id = item.id;
        this.name = document.querySelector(`#admin-name${item.id}`).value;
        this.detail = document.querySelector(`#admin-detail${item.id}`);
        this.amount = document.querySelector(`#admin-image${item.id}`).value;
        this.image = document.querySelector(`#admin${item.id}`).value;

        products[index] = Object.assign({}, this);
        localStorage.setItem('products',JSON.stringify(products));
        adminContent(products);
        location.reload();
    }catch(e){
        alert('Unable to Edit the Products')
    }
}

function deleteProduct(index){
    try{
        products.splice(index, 1)
        localStorage.setItem('products', JSON.stringify(products))
        adminContent(products);
        location.reload()
    }catch(e){
        alert('Unable to Delete')
    }
}

let highest = false;
sortedProducts.addEventListener('click', () => {
    try{
        if(!highest) {
            products.sort((a, b) => b.id - a.id);
            highest = true;
        }else{
            products.sort((a, b) => a.id - b.id);

            highest = false;
        }
        adminContent(products)
    }catch(e){
        alert('This Function is under maintainance')
    }
});

let adminSavedProduct = document.getElementById('saveProduct')
adminSavedProduct.addEventListener('click', () => {
    try{
        products.push({
            name: document.querySelector('#addName').value,
            detail: document.querySelector('#addDetail').value,
            amount: document.querySelector('#addAmount').value,
            image: document.querySelector('#addImage').value,
        });
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);
    }catch(e){
        alert('Unable to Add new product')
    }
})