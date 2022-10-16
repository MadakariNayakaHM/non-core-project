

const searchOne = async (staffId)=>
{
    try{
        const res = await axios ({

            method:'POST',
            url:'http://127.0.0.1:8000/api/v1/user/search',
            data :staffId
                
        })

        console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.search--form').addEventListener('submit',e=>{
    e.preventDefault();
   const staffId= document.getElementById('staffId').value;
   console.log(staffId)
   
 searchOne(staffId)
window.alert("viewed successfully")});





