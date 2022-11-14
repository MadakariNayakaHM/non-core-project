

const optimiseTask= async ()=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'http://127.0.0.1:9000/api/v1/admin/optimise',
            data :{
             
                }
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--assign').addEventListener('submit',e=>{
    e.preventDefault();
   
  
   
optimiseTask();
window.alert("optimised successfully")});





