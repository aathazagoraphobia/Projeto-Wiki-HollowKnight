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

        // Formulário válido: leva o usuário para a página de agradecimento.
        window.location.href = "obrigado.html";
    });
}


/* ===== Botão que recolhe/expande o formulário de feedback ===== */
// Só roda em páginas que têm o botão #feedback-toggle e o bloco #feedback-form-collapse.
const feedbackToggle = document.querySelector("#feedback-toggle");
const feedbackCollapse = document.querySelector("#feedback-form-collapse");

if (feedbackToggle && feedbackCollapse) {
    const textoAbrir = feedbackToggle.textContent.trim(); // texto original do botão
    const textoFechar = "Fechar formulário";

    // O formulário começa recolhido. Isso é feito aqui no JS (e não no HTML)
    // para que, se o JS falhar, o formulário continue visível para o usuário.
    feedbackCollapse.hidden = true;
    feedbackToggle.setAttribute("aria-expanded", "false");

    feedbackToggle.addEventListener("click", () => {
        const estaAberto = feedbackToggle.getAttribute("aria-expanded") === "true";

        // "hidden" é um atributo nativo do HTML: esconde ou mostra sem precisar de CSS.
        feedbackCollapse.hidden = estaAberto;
        feedbackToggle.setAttribute("aria-expanded", String(!estaAberto));
        feedbackToggle.textContent = estaAberto ? textoAbrir : textoFechar;
    });
}


/* ===== Fallback e lazy loading de imagens (todas as páginas) ===== */
const IMG_FALLBACK =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250'><rect width='100%' height='100%' fill='%23222'/><text x='50%' y='50%' fill='%23fff' font-size='18' text-anchor='middle' dominant-baseline='middle'>Imagem indisponível</text></svg>";

function aplicarFallback(img) {
    // evita loop infinito caso o próprio fallback falhe
    if (img.dataset.fallback === "true") return;
    img.dataset.fallback = "true";
    img.removeAttribute("srcset");
    img.src = IMG_FALLBACK;
    if (!img.alt) {
        img.alt = "Imagem indisponível";
    }
}

document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
        img.loading = "lazy";
    }

    img.addEventListener("error", () => aplicarFallback(img));

    // caso a imagem já tenha falhado antes de o script rodar
    if (img.complete && img.naturalWidth === 0) {
        aplicarFallback(img);
    }
});
