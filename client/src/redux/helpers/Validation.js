export const errorsResult = [];

export const startValidation = (field) => {
    errorsResult[field] = [];
}

export const isEmail = (value, field) => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
        errorsResult[field].push(`The field ${field} isn't valid email address.`);
    }
}

export const isRequire = (value, field) => {
    if (value === "" || !value) {
        errorsResult[field].push(`The field ${field} shouldn't be empty.`);
    }
}

export const minLength = (value, field, count) => {
    if (value.length < count) {
        errorsResult[field].push(`The field ${field} shouldn't consist less then ${count} characters.`);
    }
}

export const maxLength = (value, field, count) => {
    if (value.length > count) {
        errorsResult[field].push(`The field ${field} shouldn't consist more then ${count} characters.`);
    }
}