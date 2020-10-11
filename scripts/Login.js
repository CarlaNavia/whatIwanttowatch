"use strict";

class Login {
    //Creamos el constructor para definir propiedades
    constructor(){
        this.emailInput = document.querySelector("#email");
        this.passwordInput = document.querySelector("#password");
        this.loginButton = document.querySelector("#login-button");
        this.messageContainer = document.querySelector(".message-container");
    }
    //Crear el método submit que es lo que ocurrirá cuando le demos al botón
    submit = (event) => {
        event.preventDefault();

        //Traernos todos los usuarios de la base de datos
        const usersDB = db.getAllUsers();

        //Input del email y de la constraseña
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        //Queremos encontrar los datos que hemos dado en el submit en la base de datos y así poder iniciar sesión
        const user = usersDB.find(user0 => {
            if(user0.email === email && user0.password === password) {
                return true;
            }   
        })
        this.showMessage(user);
    }

    //Crear el mensaje de confirmación de inicio de sesión o de error 
    showMessage = (user) => {
        this.messageContainer.innerHTML = "";

        const message = document.createElement('p');

        if (user) {
            message.classList.add ("correct-message") //FALTA crear clase en css con la caja de color verde
            message.innerHTML = `Hello, ${user.name}`; //cuando inicie sesión le aparecerá un mensaje de Hola+name
        } else {
            message.innerHTML = `The email or password is wrong`;
        }
        //Haremos que el contenedor se llene
        this.messageContainer.appendChild(message);
    }



}

const login = new Login();
login.loginButton.addEventListener("click", login.submit);