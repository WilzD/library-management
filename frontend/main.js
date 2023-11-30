
async function showProduct() {
    try {
        const response = await axios.get('https://crudcrud.com/api/6a18a697ea62408f86e36de6d860e5bc/library')
        let userHtml = ''
        response.data.forEach(element => {
            userHtml += '<tr>'
            userHtml += `<td>${element.name}</td>`
            userHtml += `<td>${element.BoookOn}</td>`
            userHtml += `<td>${element.returnOn}</td>`
            userHtml +=`<td>${element.fine}</td>`
            userHtml += `<td>
                              <button class="btn btn-danger" onclick=DeleteProduct('${element._id}') > X </button>                                                                          
                          </td>`
            userHtml += '</tr>'
        });
        document.querySelector('#bookTable tbody').innerHTML = userHtml
    }
    catch (err) {
        console.log(err)
    }
}
document.onload = showProduct()

async function AddProduct() {
    document.getElementById('AddBtn').onclick = async () => {
        try {
            let name = document.getElementById('book').value
            let fine=100

            let date = new Date()
            let BoookOn=`date:${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}'\n'time:-${date.getHours()}-${date.getMinutes()}`
            let returnOn=`date:${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}'\n'time:-${date.getHours()+1}-${date.getMinutes()}`

            let Book = {
                name: name,
                BoookOn:BoookOn,
                returnOn:returnOn,
                fine:fine
            }
            await axios.post('https://crudcrud.com/api/6a18a697ea62408f86e36de6d860e5bc/library', Book)
            showProduct()
        }

        catch (err) {
            console.log(err)
        }
    }
}
AddProduct()

async function DeleteProduct(id) {
    try {
        const bookData=await axios.get(`https://crudcrud.com/api/6a18a697ea62408f86e36de6d860e5bc/library/${id}`)
        if(bookData.data.fine>0){
            let fineBtn=document.getElementById('PayFine')
            let fineDiv=document.getElementById('fine')

            fineBtn.style.display='block'
            fineDiv.style.display='block'

            fineDiv.innerHTML=`<h3>${bookData.data.fine}</h3>`


            fineBtn.onclick=async()=>{
                fineDiv.style.display='none'
                fineBtn.style.display='none'
 
                await axios.delete (`https://crudcrud.com/api/6a18a697ea62408f86e36de6d860e5bc/library/${id}`)
                showProduct()
            }

        }
        else{
      await axios.delete(`https://crudcrud.com/api/6a18a697ea62408f86e36de6d860e5bc/library/${id}`)
      showProduct()
        }
        // console.log(bookData.data.BoookOn)
        // console.log(bookData.data,)
  
    }
    catch (err) {
        console.log(err)
    }
}