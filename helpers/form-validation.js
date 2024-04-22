const ERROR_CLASS = "error";
const ACTIVE_ERROR_CLASS = "error activo";

export const showError = ({ htmlInputElement, htmlSpanElement, errorMessages }) => {
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

export const createInputListenerWithConfig = ({
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

export const handleMultipleInputs = (inputs) => {
    inputs.forEach(createInputListenerWithConfig);
};