const button = document.querySelectorAll(".text-left > button");

const remove = () => {
    console.log("Removed");
};


button.forEach(btn => {
    btn.addEventListener("click", e => {
        const divParent = btn.parentNode;
        const div = document.createElement("div");
        divParent.appendChild(div);
    
        const replyForm = document.createElement("form");
        replyForm.action = "/reply/" + btn.id;
        replyForm.setAttribute("method", "POST");
    
        const replyDiv = document.createElement("div");
        replyDiv.classList.add("form-group");
    
        const labelReply = document.createElement("label");
        labelReply.setAttribute("for", "rep");
        labelReply.textContent = "Réponse";
    
        const textarea = document.createElement("textarea");
        textarea.classList.add("form-control");
        textarea.setAttribute("name", "rep");
        textarea.setAttribute("id", "rep");
    
        replyDiv.appendChild(labelReply);
        replyDiv.appendChild(textarea);
    
        const replySubmit = document.createElement("button");
        replySubmit.classList.add("btn");
        replySubmit.classList.add("btn-primary");
        replySubmit.classList.add("d-line");
        replySubmit.textContent = "Répondre";
        replySubmit.setAttribute("type", "submit");
    
        const cancel = document.createElement("button");
        cancel.setAttribute("type", "button");
        cancel.classList.add("btn");
        cancel.classList.add("btn-info");
        cancel.classList.add("d-line");
        cancel.textContent = "Annuler";
    
        replyForm.appendChild(replyDiv);
        replyForm.appendChild(replySubmit);
        replyForm.appendChild(cancel);
    
        div.appendChild(replyForm);
    
        
        cancel.addEventListener("click", e => {
            div.innerHTML = "";
        });
        btn.addEventListener("click", e => {
            div.innerHTML = "";
        });
    });
});

