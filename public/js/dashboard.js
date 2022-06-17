console.log("dashboard linked")
document.querySelector("#newBlog").addEventListener("submit",e=>{
    e.preventDefault()
    const blogObj = {
        title:document.querySelector("#title").value,
        body:document.querySelector("#body").value,
    }
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert(" couldn't find blogs!")
        }
    })
})

document.querySelectorAll(".delete").forEach((deleteBtn)=>{
    deleteBtn.addEventListener("click",e=>{
        e.preventDefault()
        const id = e.target.getAttribute("id")
        fetch(`api/blogs/${id}`,{
            method:"DELETE",
        }).then(res=>{
            console.log("deleted")
            console.log(res)
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })  
})
})


console.log(document.querySelectorAll(".update"))
document.querySelectorAll(".update").forEach((updateBtn)=>{
    updateBtn.addEventListener("click",e=>{
        e.preventDefault()
        const blogObj = {
            body:e.target.previousElementSibling.value,
        }
        console.log(blogObj)
        const id = e.target.getAttribute("id")
        console.log(e.target.previousElementSibling.value)
        fetch(`api/blogs/${id}`,{
            method:"PUT",
            body:JSON.stringify(blogObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            console.log(res)
            if(res.ok){
               console.log("UPDATED")
            } else {
                alert("trumpet sound")
            }
        })  
})
})