/* Valdaite the form */
/* Check if any field is empty disable the button */
$("input[type='text'], textarea").keyup(function () {
    if (document.getElementById("name").value !== "" && document.getElementById("email").value !== "" &&
        document.getElementById("phone").value !== "" && document.getElementById("message").value !== "") {
        document.getElementById("sendBtn").disabled = false;
    } else {
        document.getElementById("sendBtn").disabled = true;
    }
});
