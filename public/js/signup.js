

const signup= async (name,email,staffId,phone,password,confirmPassword)=>
{
    try{
        const res = await axios ({

            method:'POST',
            url:'http://127.0.0.1:9000/api/v1/user/signup',
            data :{
                name,email,staffId,phone,password,confirmPassword}
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--signUp').addEventListener('submit',e=>{
    e.preventDefault();
   const email= document.getElementById('email').value;
   const password= document.getElementById('password').value;
   const confirmPassword=document.getElementById('confirmPassword').value;
   const name=document.getElementById('name').value;
   const phone=document.getElementById('phone').value;
   const staffId=document.getElementById('staffId').value;
signup(name,email,staffId,phone,password,confirmPassword,)
window.alert("signup successfull")});





