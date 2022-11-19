

const removeUser= async (name)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/api/v1/user/removeUser',
            data :{
                name
                }
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--remove').addEventListener('submit',e=>{
    e.preventDefault();
   const name= document.getElementById('name').value;
  
  
   
removeUser(name)
window.alert("removed successfully")});





