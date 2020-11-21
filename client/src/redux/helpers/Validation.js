export default class Validation {

    errors = [];

    isRequire(field, value) {
        if (value === "" || !value) {
            this.errors.push(`The field ${field} shouldn't be empty.`);
        }
    }

    email(field, value) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(value)) {
            this.errors.push(`The field ${field} isn't valid email address.`);
        }
    }

    maxString(field, value, count) {
        if (value.length > count) {
            this.errors.push(`The field ${field} shouldn't consist more then ${count} characters.`);
        }
    }

    minString(field, value, count) {
        if (value.length < count) {
            this.errors.push(`The field ${field} shouldn't consist less then ${count} characters.`);
        }
    }

}