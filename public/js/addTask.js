

const addTask= async (task,weight)=>
{
    try{
        const res = await axios ({

            method:'POST',
            url:'http://127.0.0.1:9000/api/v1/user/addTasks',
            data :{
                task,weight
                }
        })

        console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--add').addEventListener('submit',e=>{
    e.preventDefault();
  
   const task= document.getElementById('task').value;
   const weight= document.getElementById('weight').value;
   
const weight1=parseInt(weight);
addTask(task,weight1)
window.alert("assigned successfully")});





