console.log("comment linked!")

const commentHandler = async function(e) {

    e.preventDefault();
    console.log("clicked the add comment button")
    
    commentBody = document.querySelector("#commentInput").value,
    blogId = document.querySelector('input[name="blog-id"]').value


    console.log("blog id " + blogId)
    console.log(typeof(commentBody))
    if (commentBody) {
    await fetch("/api/comments",{
            method:"POST",
            body: JSON.stringify({
                blogId,
                commentBody
            }),
            
            headers:{
                "Content-Type":"application/json"
            }
        });
        document.location.reload()
    }

}



document.querySelector("#comment").addEventListener("click", commentHandler)