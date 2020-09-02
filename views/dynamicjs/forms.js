
const addForm = document.getElementById("form");
const btn = document.getElementById("btnAbonner");

btn.addEventListener("click", (e) => {
    addForm.innerHTML = "";

    const form = document.createElement("form");
    form.id = "form";
    form.method = "post";
    form.action = "/email";
    form.enctype = "multipart/form-data";
    addForm.appendChild(form);

    const label = document.createElement("label");
    label.for = "email";
    label.textContent = "Votre email :";

    const input = document.createElement("input");
    input.id = "email";
    input.type = "email";
    input.value = "";
    input.classList.add("form-control");
    input.classList.add("mb-2");

    const submit = document.createElement("input");
    submit.id = "submit";
    submit.type = "submit";
    submit.classList.add("btn");
    submit.classList.add("bouton");
    submit.classList.add('mb-3');
    submit.value = "Valider";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(submit);


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userEmail = $('#email').val();
        console.log(userEmail);
        
        $.ajax({
            url: '/email',
            type: 'POST',
            data: {
                email: userEmail
            },
            success: response => {
                const div = document.createElement("div");
                div.classList.add("succes");
                div.textContent = "Votre email a bien été sauvegardé avec succès !";
                addForm.appendChild(div);
            },
        });
    
    });

});