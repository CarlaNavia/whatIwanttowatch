"use strict";

class Register {
  // Definir todos los valores del formulario
  constructor() {
    this.nameInput = document.querySelector("#name");
    this.lastNameInput = document.querySelector("#lastName");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.repeatPasswordInput = document.querySelector("#repeat-password");
    this.buttonInput = document.querySelector("#register-button");
    this.messageWrapper = document.querySelector(".message-container");
  }

  // Métodos para validar o manejar la información que insertamos en los inputs
  //no me funciona el target value... PREGUNTAR (min 21 del vídeo 1)
  handleEmailInput = (event) => {
    const email = event.target.value;
    //Invocaremos al objeto validator y después a su método validateValidEmail
    validator.validateValidEmail(email);
    //Ver si hay algún error

    const errorsObj = validator.getErrors();
    //Si no hay errores (si el email es válido), el email será único
    if (!errorsObj.invalidEmailError) {
      validator.validateUniqueEmail(email);
    }
    //Enviar errores en caso de que los haya
    this.setErrorMessages();
  };

  handlePasswordInput = (event) => {
    const password = event.target.value;

    const repeatPassword = this.repeatPasswordInput.value;
    //Invocamos al objeto validator para verificar las contraseñas
    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, repeatPassword);

    this.setErrorMessages();
  };

  handleRepeatPasswordInput = (event) => {
    const repeatPassword = event.target.value;

    const password = this.passwordInput.value;

    validator.validatePasswordRepeat(password, repeatPassword);
    validator.validatePassword(password);

    this.setErrorMessages();
  };

  //Almacenar datos que hemos recogido en los métodos anteriores. Se ejecuta cuando el ususario envía el formulario
  saveData = (event) => {
    //Previene el comportamiento por default del evento y no permite que la página cargue de nuevo
    event.preventDefault();

    const name = this.nameInput.value;
    const lastName = this.lastNameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    //Función para crear el usuario. Lo comentamos porque hemos creado la clase User en User.js
    // function createUser (name, lastName, email, password){
    //     const userObj = {
    //         name: name,
    //         lastName: lastName,
    //         email: email,
    //         password: password,
    //     }
    //     return userObj;
    // }

    // const newUser = createUser (name, lastName, email, password)

    const newUser = new User(name, lastName, email, password);

    // Guardaremos el usuario en la base de datos. Llámamos a database y creamos el nuevo usuario
    //database.createNewUser = (newUser); [esto era antes de crear el Database.js, lo substituimos por lo siguiente]

    validator.validateEmptyForm(name, lastName, email, password);

    this.setErrorMessages();

    if (!validator.errors.emptyRequiredFieldError) {
      db.saveNewUser(newUser);
      //Vaciar formulario
      this.nameInput.value = "";
      this.lastNameInput.value = "";
      this.emailInput.value = "";
      this.passwordInput.value = "";
      this.repeatPasswordInput.value = "";
      //Cuando guardemos los datos, querremos que resetee los errores
      validator.resetValidator();
    }
  };

  // Registrar métodos para cada uno de los inputs
  addListeners = () => {
    // En los inputs crear un evento. Para vincular lo que pasa en los inputs con las funciones que van a hacer algo con esos inputs
    this.emailInput.addEventListener(`input`, this.handleEmailInput);

    this.passwordInput.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );

    this.repeatPasswordInput.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );

    this.buttonInput.addEventListener("click", this.saveData);
  };

  //Crear los elementos HTML donde vamos a mostrar los errores
  setErrorMessages = () => {
    this.messageWrapper.innerHTML = "";

    const errorObj = validator.getErrors();

    const errorStrArr = Object.values(errorObj);
    //Para cada uno vamos a crear un párrafo
    errorStrArr.forEach((errorStr) => {
      const errorMessageP = document.createElement("p");
      errorMessageP.innerHTML = errorStr;
      this.messageWrapper.appendChild(errorMessageP);
    });
  };
}

const register = new Register();

//Cuando termine de cargar la página, registrará todos los eventos creados previamente y que están agrupados
window.addEventListener("load", register.addListeners);
