

const deleteTaskList= async (task)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/api/v1/user/deleteTaskList',
            data :{
                task
                }
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--remove--list').addEventListener('submit',e=>{
    e.preventDefault();
  
   const task= document.getElementById('task').value;


deleteTaskList(task)
window.alert("removed task from list successfully")});





