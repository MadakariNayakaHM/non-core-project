

const assignTask= async (name,task)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/api/v1/user/assignTandW',
            data :{
                name,task
                }
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--assign').addEventListener('submit',e=>{
    e.preventDefault();
   const name= document.getElementById('name').value;
   const task= document.getElementById('task').value;
  
   
assignTask(name,task)
window.alert("assigned successfully")});





