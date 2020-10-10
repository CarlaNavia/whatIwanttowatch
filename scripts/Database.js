"use strict";
//Guardar objetos o arrays en localstorage
class Database {
//Crear un método para recuperar a los usuarios de la base de datos
    getAllUsers () {
        const usersStr = localStorage.getItem('users');
        const usersArr = JSON.parse(usersStr);

        //Validación por si no hay ningún dato guardado en el array que lo devuelva vacío
        if(usersArr === null){
            return [];
        } else {
            return usersArr;
        }
    }

    //Método para guardar el nuevo usuario una vez que complete el formulario
    saveNewUser (newUser){
        const usersArr = this.getAllUsers();
        //Agregar al array el nuevo usuario
        usersArr.push(newUser);
        //Una vez hemos hecho el push, lo volvemos a pasar a string
        const usersStr = JSON.stringify(usersArr);
        //Lo volvemos a guardar en localStorage, en la misma key
        localStorage.setItem('users', usersStr)
    }

}

//Creando un nuevo objeto Database en la constante db para tener acceso al método getAllUsers y setAllUsers
const db = new Database();