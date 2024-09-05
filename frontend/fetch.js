// console.log("hel00888lo",{
//     method: 'POST',
//     headers:{
//         'content-type':'application/json'
//     },
//     body: JSON.stringify({

//     })
// }
// )
fetch('http://localhost:8000/api/register/',{
    method: 'POST',
    headers:{
        'content-type':'application/json'
    },
    body: JSON.stringify({
        "first_name": "2",
        "last_name": "2",
        "username": "talha3",
        "email": "talha3@here.com",
        // "image": "ljfvs",
        "password": "2"
        
    })

})
    .then(response => response.json()) 
    .then(res => {
        displayResponseData(res);
        // return res.json()
    })
    .catch(error => console.error('Error:', error));
        // .then(data => console.log(data))



function displayResponseData(res) {
    const responseDataDiv = document.getElementById('responseData');
    responseDataDiv.innerHTML = `
        <p>First Name: ${res.first_name}</p>
        <p>Last Name: ${res.last_name}</p>
        <p>Username: ${res.username}</p>
        <p>Email: ${res.email}</p>
        <p>id: ${res.id}</p>
        <p>image: ${res.image}</p>
        <img src="${res.image}" alt="mabats" width="500" height="600">
    `;
}