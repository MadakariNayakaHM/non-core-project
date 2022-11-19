

const deleteAllTask= async ()=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/api/v1/user/deleteAllTasks',
            data :{}
        })

        // console.log(res)
    } catch (err){console.log(err)}
}

const deleteAllUserTasks= async ()=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/api/v1/user/deleteAllUserTasks',
            data :{}
        })

        // console.log(res)
    } catch (err){console.log(err)}
}
document.getElementById('deleteAllTask').addEventListener('click',e=>{
    e.preventDefault();
    deleteAllTask()
window.alert("Deleted All Tasks Successfully")});
document.getElementById('deleteAllUserTask').addEventListener('click',e=>{
    e.preventDefault();
    deleteAllUserTasks()
window.alert("Deleted All Users Tasks Successfully")});





