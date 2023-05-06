window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = '../Login/login.html';
    }
    else{
        const response = await axios.get(`http://localhost:3000/admin/books`, { headers: {'Authorization': token }});
        console.log(response.data);
        buildTable(response.data.books);
    }
});


function buildTable(data){
    var table = document.getElementById('myTable')

    for (var i = 0; i < data.length; i++){
        var delBtn = document.createElement('button');
        delBtn.className = 'delete';
        var delText = document.createTextNode('Delete');
        delBtn.appendChild(delText);
        var row = `<tr>
                        <td>${data[i]._id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].author}</td>
                        <td>${data[i].category}</td>
                        <td></td>
                  </tr>`;
        table.innerHTML += row
        
        let rows = table.rows;
        let cols = rows[i].cells;
        let lastCol = rows[i]['cells'][cols.length - 1];
        
        let delButton = document.createElement('button');
        delButton.innerText = 'Delete';
        delButton.className = 'delete';

        let issuButton = document.createElement('button');
        issuButton.innerText = 'Issue Book';
        issuButton.className = 'edit';

        delButton.setAttribute('onclick', 'deleteBook()');
        issuButton.setAttribute('onclick', 'issueBook()');

        lastCol.appendChild(delButton);
        lastCol.appendChild(issuButton);
    }
}

const deleteBook = async () => {
    try{
        const token = localStorage.getItem('token');
        const currentRow = event.currentTarget.parentElement.parentElement
        const bookId = currentRow.children[0].textContent;
        const res = await axios.delete(`http://localhost:3000/admin/book/${bookId}`, { headers: {'Authorization': token }})
        console.log(res);
        currentRow.remove();
        alert(res.data.message);
    }
    catch(err){
        console.log(err);
        alert("Something went wrog try again")
    }
}

const issueBook = async () => {
    try{
        const studentId = prompt('Enter Student Id.', '');
        if(studentId === '' || studentId === null){
            alert('Invalid Student Id');
            return;
        }
        const token = localStorage.getItem('token');
        const currentRow = event.currentTarget.parentElement.parentElement
        const bookId = currentRow.children[0].textContent;
        const res = await axios.post(`http://localhost:3000/admin/issueBook/${bookId}/${studentId}`, {}, { headers: {'Authorization': token }})
        console.log(res);
        alert(res.data.message);
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert("Something went wrog try again")
        }
    }
}