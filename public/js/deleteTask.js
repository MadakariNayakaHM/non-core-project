

const removeTask= async (staffId,task)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'http://127.0.0.1:9000/api/v1/user/deleteTandW',
            data :{
                staffId,task
                }
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--remove').addEventListener('submit',e=>{
    e.preventDefault();
   const staffId= document.getElementById('staffId').value;
   const task= document.getElementById('task').value;
  
   
removeTask(staffId,task)
window.alert("Removed successfully")});





