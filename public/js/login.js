

const signin= async (email,password)=>
{
    try{
        const res = await axios ({

            method:'POST',
            url:'http://127.0.0.1:9000/api/v1/user/login',
            data :{
                email,password}
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--login').addEventListener('submit',e=>{
    e.preventDefault();
   const email= document.getElementById('email').value;
   const password= document.getElementById('password').value;
   
signin(email,password)
window.alert("signin successfull")});





