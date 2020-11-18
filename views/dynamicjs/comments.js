const formComment = document.getElementById("formComment");
const url = formComment.action;

const divAlert = document.getElementById("commentPost");


formComment.addEventListener('submit', e => {
    e.preventDefault();
    const pseudo = $('#pseudo').val();
    const title = $('#title').val();
    const comment = $('#comment').val();
    

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            pseudo: pseudo,
            title: title,
            comment: comment
        },
        success: response => {
                const success = document.createElement("div");
                success.classList.add("alert");
                success.classList.add("alert-success");
                success.classList.add("alert-dismissible");
                success.classList.add("fade");
                success.classList.add("show");
                success.classList.add("my-3");
                success.setAttribute("role", "alert");
                success.textContent = "Commentaire ajouté !";

                const boutonClose = document.createElement("button");
                boutonClose.type = "button";
                boutonClose.classList.add("close");
                boutonClose.setAttribute("data-dismiss", "alert");
                boutonClose.ariaLabel = "Close";

                const spanBtn = document.createElement("span");
                spanBtn.ariaHidden = "true";
                spanBtn.textContent = "×";

                boutonClose.appendChild(spanBtn);
                success.appendChild(boutonClose);
                divAlert.appendChild(success);

                setTimeout(() => {
                    location.reload();
                }, 1000);
        },
        error: response => {
                const fail = document.createElement("div");
                fail.classList.add("alert");
                fail.classList.add("alert-danger");
                fail.classList.add("alert-dismissible");
                fail.classList.add("fade");
                fail.classList.add("show");
                fail.classList.add("my-3");
                fail.setAttribute("role", "alert");
                fail.textContent = "Echec ! Une erreur est survenue.";

                const boutonFail = document.createElement("button");
                boutonFail.type = "button";
                boutonFail.classList.add("close");
                boutonFail.setAttribute("data-dismiss", "alert");
                boutonFail.ariaLabel = "Close";

                const spanFail = document.createElement("span");
                spanFail.ariaHidden = "true";
                spanFail.textContent = "×";

                boutonFail.appendChild(spanFail);
                fail.appendChild(boutonFail);
                divAlert.appendChild(fail);
        }
    });
});
