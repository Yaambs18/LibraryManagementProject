window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = '../Login/login.html';
    }
    else{
        const response = await axios.get(`http://localhost:3000/admin/issuedBooks`, { headers: {'Authorization': token }});
        console.log(response.data);
        buildTable(response.data.issuedBooks);
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
                        <td>${data[i].bookInfo._id}</td>
                        <td>${data[i].bookInfo.name}</td>
                        <td>${data[i].studentInfo.name}</td>
                        <td>${data[i].issueDate}</td>
                        <td>${data[i].returnDate}</td>
                        <td></td>
                  </tr>`;
        table.innerHTML += row;

        let rows = table.rows;
        let cols = rows[i].cells;
        let lastCol = rows[i]['cells'][cols.length - 1];
        
        let retButton = document.createElement('button');
        retButton.innerText = 'Return Book';
        retButton.className = 'delete';

        retButton.setAttribute('onclick', 'returnBook()');

        lastCol.appendChild(retButton);
    }
}

const returnBook = async () => {
    try{
        const token = localStorage.getItem('token');
        const currentRow = event.currentTarget.parentElement.parentElement
        const issuedId = currentRow.children[0].textContent;
        const bookId = currentRow.children[1].textContent;
        const res = await axios.delete(`http://localhost:3000/admin/issuedBook/${issuedId}/${bookId}`, { headers: {'Authorization': token }})
        console.log(res);
        currentRow.remove();
        alert(res.data.message);
    }
    catch(err){
        console.log(err);
        alert("Something went wrog try again")
    }
}
