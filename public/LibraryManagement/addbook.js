const myForm = document.querySelector('#expenses-form');
const name = document.querySelector('#name');
const author = document.querySelector('#author');
const quantity = document.querySelector('#quantity');
const category = document.querySelector('#category');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = '../Login/login.html';
    }
});

function onSubmit(e){
    e.preventDefault();
    if(name.value === '' || author.value === '' || category.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        let bookObj = {
            bookName : name.value,
            author : author.value,
            quantity : quantity.value,
            category: category.value,
        }
        if(document.querySelector('#submitBtn').value === 'Update'){
            // const expenseId = document.querySelector('#expenseId').value;
            // axios
            //   .put('https://expense-tracker-t2ho.onrender.com/expense/'+expenseId, expenseObj, { headers: {'Authorization': token }})
            //   .then((response) => {
            //     showExpensesOnScreen(response.data.result);
            //   })
            //   .catch((err) => {
            //     document.body.innerHTML += "Error: Something went wrong!!!!";
            //     console.log(err);
            //   });

        }
        else{
            const token = localStorage.getItem('token');
            axios.post('http://localhost:3000/admin/addBook', bookObj, { headers: {'Authorization': token }})
            .then((response) => {
                alert("Book added successfully!!");
            })
            .catch(err => {
                document.body.innerHTML += 'Error: Something went wrong!!!!';
                console.log(err)
            });
        };
        
        name.value = '';
        quantity.value = '';
        author.value = '';
        category.value = '';
    }
}

