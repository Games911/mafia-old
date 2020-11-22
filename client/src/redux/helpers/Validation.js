export default class Validation {

    errors = [];

    constructor() {
        this.errors['valid'] = true;
    }

    isRequire(field, value) {
        if (value === "" || !value) {
            if (!this.errors[field]) {
                this.errors[field] = [];
            }
            this.errors[field].push(`The field ${field} shouldn't be empty.`);
            this.errors['valid'] = false;
        }
    }

    email(field, value) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(value)) {
            if (!this.errors[field]) {
                this.errors[field] = [];
            }
            this.errors[field].push(`The field ${field} isn't valid email address.`);
            this.errors['valid'] = false;
        }
    }

    maxString(field, value, count) {
        if (value.length > count) {
            if (!this.errors[field]) {
                this.errors[field] = [];
            }
            this.errors[field].push(`The field ${field} shouldn't consist more then ${count} characters.`);
            this.errors['valid'] = false;
        }
    }

    minString(field, value, count) {
        if (value.length < count) {
            if (!this.errors[field]) {
                this.errors[field] = [];
            }
            this.errors[field].push(`The field ${field} shouldn't consist less then ${count} characters.`);
            this.errors['valid'] = false;
        }
    }

}