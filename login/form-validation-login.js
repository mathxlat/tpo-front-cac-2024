import { showError, handleMultipleInputs } from "../helpers/form-validation.js";
const form = document.querySelector("#form");

const username = document.querySelector("#username");
const usernameError = document.querySelector("#username + span.error");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + span.error");

const usernameErrorMessages = {
    valueMissing: "El campo de nombre de usuario es obligatorio.",
    tooShort:
        "El campo de nombre de usuario debe tener al menos {{minLength}} caracteres.",
    patternMismatch: "Utiliza solo caracteres alfanuméricos en este campo.",
};

const passwordErrorMessages = {
    valueMissing: "El campo de contraseña es obligatorio.",
    tooShort:
        "El campo de contraseña debe tener al menos {{minLength}} caracteres.",
    patternMismatch: "Utiliza solo caracteres alfanuméricos en este campo.",
};

const inputs = [
    {
        htmlInputElement: username,
        htmlSpanElement: usernameError,
        errorMessages: usernameErrorMessages,
    },
    {
        htmlInputElement: password,
        htmlSpanElement: passwordError,
        errorMessages: passwordErrorMessages,
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
