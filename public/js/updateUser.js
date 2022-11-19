

const updateUser= async (name,email,staffId,phone,oldStaffId)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/api/v1/user/updateUser',
            data :{
                name,email,staffId,phone,oldStaffId}
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--update').addEventListener('submit',e=>{
    e.preventDefault();
   const oldStaffId=document.getElementById('oldStaffId').value 
   const email= document.getElementById('email').value;
   const name=document.getElementById('name').value;
   const phone=document.getElementById('phone').value;
   const staffId=document.getElementById('staffId').value;
updateUser(name,email,staffId,phone,oldStaffId)
window.alert("updated successfuly")});





