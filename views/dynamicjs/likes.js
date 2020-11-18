const likeForm = document.getElementById("like");
const likeUrl = likeForm.action;
const likes = document.getElementById("nbLikes");

likeForm.addEventListener("submit", e => {
    e.preventDefault();
    
    
    
    $.ajax({
        url: likeUrl,
        type: 'POST',
        success: response => {
            likes.textContent++;
            console.log(response);
        },
        error: response => {
            console.log(response);
        }
    });
});