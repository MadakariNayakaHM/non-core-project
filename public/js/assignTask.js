

const assignTask= async (staffId,task)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'http://127.0.0.1:8080/api/v1/user/assignTandW',
            data :{
                staffId,task
                }
        })

        console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--assign').addEventListener('submit',e=>{
    e.preventDefault();
   const staffId= document.getElementById('staffId').value;
   const task= document.getElementById('task').value;
  
   
assignTask(staffId,task)
window.alert("assigned successfully")});





