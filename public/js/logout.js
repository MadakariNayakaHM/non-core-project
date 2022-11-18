const logoutBtn= document.getElementById('logout')


const logout= async ()=>
{
    try{
        const res = await axios ({

            method:'GET',
            url:'/api/v1/user/logout',
            data :{}
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
logoutBtn.addEventListener('click',e=>{
    e.preventDefault();
  
   
logout()
window.alert("loged out  successfuly")
});






