const feedbackForm = document.querySelector("#feedback-form");

if (feedbackForm) {
    const nameField = feedbackForm.querySelector("#feedback-name");
    const emailField = feedbackForm.querySelector("#feedback-email");
    const messageField = feedbackForm.querySelector("#feedback-message");
    const statusMessage = feedbackForm.querySelector("#feedback-status");
    const requiredFields = [nameField, emailField, messageField];

    function validateField(field) {
        const value = field.value.trim();

        if (field === nameField) {
            field.setCustomValidity(
                value.length < 2 ? "Informe um nome com pelo menos 2 caracteres." : ""
            );
        } else if (field === emailField) {
            field.setCustomValidity(
                !value || field.validity.typeMismatch
                    ? "Informe um endereço de e-mail válido."
                    : ""
            );
        } else if (field === messageField) {
            field.setCustomValidity(
                value.length < 30
                    ? "Escreva um comentário com pelo menos 30 caracteres."
                    : ""
            );
        }

        const isValid = field.validity.valid;
        field.classList.toggle("is-invalid", !isValid);
        field.setAttribute("aria-invalid", String(!isValid));
        return isValid;
    }

    requiredFields.forEach((field) => {
        field.addEventListener("input", () => {
            validateField(field);
            statusMessage.textContent = "";
        });
    });

    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const invalidField = requiredFields.find((field) => !validateField(field));

        if (invalidField) {
            statusMessage.textContent = "Revise os campos destacados antes de continuar.";
            invalidField.focus();
            return;
        }

        statusMessage.textContent =
            "Obrigado pelo seu feedback!";
    });
}
