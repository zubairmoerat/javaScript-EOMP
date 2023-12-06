//edit your products in a table
//footer year
document.querySelector('#currYear').textContent = new Date().getFullYear()
let tableContent = document.querySelector('[table-products]')

function adminContent(){
    try{
        let products = JSON.parse(localStorage.getItem('products'))
        tableContent.innerHTML = ""
        products.forEach((product, i)=>{
            tableContent.innerHTML +=`
            <tr>
                <td>${product.name}</td>
                <td><img src="${product.image}" alt="${product.id}" class="img-thumbnail"></td>
                <td>${product.amount}</td>
                <td>
                <div>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateProduct"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-secondary"><i class="bi bi-trash"></i></button>
                    
                </div>
                </td>
            </tr>
            `
        })
    }catch(e){}
}