

const assignTask= async (staffId,task,weight)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'http://127.0.0.1:8000/api/v1/user/assignTandW',
            data :{
                staffId,task,weight
                }
        })

        console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--assign').addEventListener('submit',e=>{
    e.preventDefault();
   const staffId= document.getElementById('staffId').value;
   const task= document.getElementById('task').value;
   const weight= document.getElementById('weight').value;
   console.log(staffId, task , weight)
   const weight1=parseInt(weight);
assignTask(staffId,task,weight1)
window.alert("assigned successfully")});





