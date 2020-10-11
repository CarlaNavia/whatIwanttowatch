"use strict";

//Verificar email, constraseña...
class Validator{
    constructor(){
        this.invalidEmailError = "Please, enter a valid email";
        this.emailExistsError = "This email is already registered";
        this.passwordError = "The password must have minimum 7 characters";
        this.repeatPasswordError = "Password do not match";
        
        //this.errors es un objeto que guardará los mensajes de arriba. No ponemos el error de email existente porque no hemos llamado a la Base de Datos para comprobarlo
        this.errors = {
            invalidEmailError: this.invalidEmailError,
            passwordError: this.passwordError,
            repeatPasswordError: this.repeatPasswordError
        }
    }
    //Todo lo que queremos validar
    validateValidEmail = (email) => {
        if(this.emailIsValid(email)) {
            delete this.errors.invalidEmailError
        } else {
            this.errors.invalidEmailError = this.invalidEmailError;
        }
    }

    //Verificar si el email que le ha introducido el usuario cumple con la especificación que ponemos en emailRegEx
    emailIsValid = (email) => {
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        const isValid = emailRegEx.test(email);
        return isValid
    }

    //Comprobar si el email que ingresamos en el input es válido o no. Creamos una variable que sea igual al método que hemos creado en Database.js
    validateUniqueEmail = (newEmail) => {
        const userDb = db.getAllUsers;
        //Comprobar que el array de getAllUsers haya vuelto con algo
        
        let emailUnique = true;
         //iterar todas las posiciones del array para que lo busque. En caso de que encuentre uno igual, cambiamos el valo de unique a false
        if (userDb.length > 0) {
            userDb.forEach( (userObj) => {
                if(userObj.email == newEmail){
                    emailUnique = false;
                }
            });
            //si el email es único, decimos que no aparezca el error. Si el email está repetido, decimos que aparezca el error
            if (emailUnique){
                delete this.errors.emailExistsError;
            } else {
                this.errors.emailExistsError = this.emailExistsError; //Creamos el objeto de emailEcistsError dentro de errors
            }
        }
    }

    //La contraseña debe tener mínimo 7 carácteres
    validatePassword = (password) => {
        if (password.length > 6) {
            delete this.errors.passwordError;
        } else {
            this.errors.passwordError = this.passwordError;
        }
    }

    validatePasswordRepeat = (password, passwordrepeat) => {
        if (password == passwordrepeat) {
            delete this.errors.repeatPasswordError;
        } else {
            this.errors.repeatPasswordError = this.repeatPasswordError;
        }
    }

    getErrors = () => {
        return this.errors;
    }
    //Cada vez que cargas la página, creamos un nuevo validator
    resetValidator = () => {    
        this.errors = {
            invalidEmailError: this.invalidEmailError,
            passwordError: this.passwordError,
            repeatPasswordError: this.repeatPasswordError
        }
    }
}

//Crear nueva instancia para llamar a las funciones con Validator
const validator = new Validator();