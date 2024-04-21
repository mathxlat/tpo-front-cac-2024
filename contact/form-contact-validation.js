const form = document.querySelector("#form");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject + span.error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email + span.error");

const reason = document.querySelector("#reason");
const reasonError = document.querySelector("#reason + span.error");

const matter = document.querySelector("#matter");
const matterError = document.querySelector("#matter + span.error");

const description = document.querySelector("#description");
const descriptionError = document.querySelector("#description + span.error");

const attachments = document.querySelector("#attachments");
const attachmentsError = document.querySelector("#attachments + span.error");

const terms = document.querySelector("#terms");
const termsError = document.querySelector("#terms + span.error");

const subjectErrorMessages = {
    valueMissing: "El campo de archivos adjuntos es obligatorio.",
};

const emailErrorMessages = {
    valueMissing: "El campo de correo electrónico es obligatorio.",
    typeMismatch: "Introduce un correo electrónico.",
    patternMismatch: "Introduce un correo electrónico válido.",
};

const reasonErrorMessages = {
    valueMissing: "El campo de motivo es obligatorio.",
    tooShort: "El campo de motivo debe tener al menos {{minLength}} caracteres.",
    patternMismatch: "Utiliza solo caracteres alfanuméricos en este campo.",
};

const matterErrorMessages = {
    valueMissing: "El campo de asunto es obligatorio.",
    tooShort: "El campo de asunto debe tener al menos {{minLength}} caracteres.",
    patternMismatch: "Utiliza solo caracteres alfanuméricos en este campo.",
};

const descriptionErrorMessages = {
    valueMissing: "El campo de descripción es obligatorio.",
};

const attachmentsErrorMessages = {
    valueMissing: "El campo de archivos adjuntos es obligatorio.",
};

const termsErrorMessages = {
    valueMissing: "El campo de acepto términos y condiones es obligatorio.",
};

const ERROR_CLASS = "error";
const ACTIVE_ERROR_CLASS = "error activo";

const showError = ({ htmlInputElement, htmlSpanElement, errorMessages }) => {
    if (htmlInputElement.validity.valueMissing) {
        htmlSpanElement.textContent = errorMessages.valueMissing;
    } else if (htmlInputElement.validity.typeMismatch) {
        htmlSpanElement.textContent = errorMessages.typeMismatch;
    } else if (htmlInputElement.validity.tooShort) {
        htmlSpanElement.textContent = errorMessages.tooShort.replace("{{minLength}}", htmlInputElement.minLength);
    } else if (htmlInputElement.validity.patternMismatch) {
        htmlSpanElement.textContent = errorMessages.patternMismatch;
    }

    htmlSpanElement.className = ACTIVE_ERROR_CLASS;
};

const createInputListenerWithConfig = ({
    htmlInputElement,
    htmlSpanElement,
    errorMessages,
}) => {
    htmlInputElement.addEventListener("input", (event) => {
        if (htmlInputElement.validity.valid) {
            htmlSpanElement.textContent = "";
            htmlSpanElement.className = ERROR_CLASS;
        } else {
            showError({ htmlInputElement, htmlSpanElement, errorMessages });
        }
    });
};

const handleMultipleInputs = (inputs) => {
    inputs.forEach(createInputListenerWithConfig);
};

const inputs = [
    {
        htmlInputElement: subject,
        htmlSpanElement: subjectError,
        errorMessages: subjectErrorMessages,
    },
    {
        htmlInputElement: email,
        htmlSpanElement: emailError,
        errorMessages: emailErrorMessages,
    },
    {
        htmlInputElement: reason,
        htmlSpanElement: reasonError,
        errorMessages: reasonErrorMessages,
    },
    {
        htmlInputElement: matter,
        htmlSpanElement: matterError,
        errorMessages: matterErrorMessages,
    },
    {
        htmlInputElement: description,
        htmlSpanElement: descriptionError,
        errorMessages: descriptionErrorMessages,
    },
    {
        htmlInputElement: attachments,
        htmlSpanElement: attachmentsError,
        errorMessages: attachmentsErrorMessages,
    },
    {
        htmlInputElement: terms,
        htmlSpanElement: termsError,
        errorMessages: termsErrorMessages,
    },
];

handleMultipleInputs(inputs);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
        console.log("Todos los inputs son validos");
        form.reset();
    } else {
        inputs.forEach(
            ({ htmlInputElement, htmlSpanElement, errorMessages }) => {
                if (!htmlInputElement.validity.valid) {
                    showError({
                        htmlInputElement,
                        htmlSpanElement,
                        errorMessages,
                    });
                }
            }
        );
    }
});
