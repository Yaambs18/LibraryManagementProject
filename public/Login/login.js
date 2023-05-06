async function login(e) {
    e.preventDefault();
    let loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    };
    try{
        const category = e.target.category.value;
        const res = await axios.post(`http://localhost:3000/${category}/login`, loginDetails);
        if(res.status === 200){
            alert(res.data.message);
            window.localStorage.setItem('token', res.data.token);
            if(category == 'admin'){
                window.location.href = '../LibraryManagement/admin.html';
            }else{
                window.location.href = '../LibraryManagement/student.html';
            }
        }
        else{
            console.log(res);
            throw new Error(res);
        }
    }
    catch(error) {
        document.body.innerHTML += `<h1>Error: ${error.message}</h1>`;
        console.log(error);
    }
}