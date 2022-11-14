

const updateWeight= async (task,weight)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/api/v1/user/updateWeight',
            data :{
                task,weight
                }
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--add').addEventListener('submit',e=>{
    e.preventDefault();
  
   const task= document.getElementById('task').value;
   const weight= document.getElementById('weight').value;
   
  const weight1=parseInt(weight);
updateWeight(task,weight1)
window.alert("updated successfully")});





