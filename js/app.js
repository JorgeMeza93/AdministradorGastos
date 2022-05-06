const formulario = document.querySelector("#agregar-gasto ");
const gastoListado = document.querySelector("#gastos ul");

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];    
    }
}
class UserInterface{

    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;     // <-- crea variable presupuesto y restante del objeto cantidad
        document.querySelector("#total").textContent = presupuesto;  // <-- Los valores obtenidos los aplica a los parrafos
        document.querySelector("#restante").textContent = restante; 
    }
    imprimirAlerta(){

    }
}

function eventListeners(){
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto)   // <-- Al cargar la página preguntar por un presupuesto a través de la función preguntarPresupuesto
    formulario.addEventListener("submit", agregarGasto);
}
function preguntarPresupuesto(){ 

    const presupuestoUsuario = prompt("¿Cuál es tu presupuesto?");    //Pregunta el presupuesto
    presupuestoUsuario ?  presupuestoUsuario : window.location.reload();     // <-- Valida que el usuario haya escrito algo
    if(presupuestoUsuario.trim() === "" || isNaN(parseFloat(presupuestoUsuario)) || presupuestoUsuario<0){   // <-- Si se ha escrito valida que lo que ese algo sea una cantidad
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);    // <-- Instancia la clase Presupuesto
    UI.insertarPresupuesto(presupuesto)    // Llama al método insertarPresupuesto 
}
function agregarGasto(e){
    e.preventDefault();
    const nombre = document.querySelector("#gasto").value;
    const cantidad = document.querySelector("#cantidad").value;
    if(nombre === "" || cantidad === "" ){
        UI.imprimirAlerta();
    }
}


let presupuesto;
const UI = new UserInterface();
eventListeners();
