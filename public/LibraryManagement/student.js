window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = '../Login/login.html';
    }
    else{
        const response = await axios.get(`http://localhost:3000/student/books`, { headers: {'Authorization': token }});
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
                        <td>${data[i].bookInfo._id}</td>
                        <td>${data[i].bookInfo.name}</td>
                        <td>${data[i].bookInfo.author}</td>
                        <td>${data[i].issueDate}</td>
                        <td>${data[i].returnDate}</td>
                  </tr>`;
        table.innerHTML += row
    }
}
