

const searchOne = async(staffId)=>
{
    try{
        const res = await axios ({

            method:'POST',
            url:'127.0.0.1:8000/api/v1/user/searchUser',
            data :staffId
                
        })

        console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.search--form').addEventListener('submit',e=>{
    e.preventDefault();
   const staffId= document.getElementById('staffId').value;
   
   
 searchOne(staffId)
window.alert("viewed successfully")});





