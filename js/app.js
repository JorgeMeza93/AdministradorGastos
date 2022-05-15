const formulario = document.querySelector("#agregar-gasto ");
const gastoListado = document.querySelector("#gastos ul");
const botonAgregar = document.querySelector(".btn-primary");

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];    
    }
    nuevoGasto(gasto){  
        this.gastos = [...this.gastos, gasto];  // <-- Cada vez que se llame a este método añade un nuevo gasto al array
        this.calcularRestante();        
    }
    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto) => total );
    }
}
class UserInterface{

    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;     // <-- crea variable presupuesto y restante del objeto cantidad
        document.querySelector("#total").textContent = presupuesto;  // <-- Los valores obtenidos los aplica a los parrafos
        document.querySelector("#restante").textContent = restante; 
    }
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert");
        tipo === "error" ? divMensaje.classList.add("alert-danger") : divMensaje.classList.add("alert-success");
        divMensaje.textContent = mensaje;
        document.querySelector(".primario").insertBefore(divMensaje, formulario);
        setTimeout( ()=>{
            divMensaje.remove();
        }, 3000)
    }
    agregarGastoListado(gastos){
        this.limpiarHTML();  //Evita que se acumule la info de la consulta anterior
        gastos.forEach( gasto =>{   // <-- Itera sobre el array
            const { cantidad, nombre, id } = gasto;
            const gastoNuevo = document.createElement("li");
            gastoNuevo.className = "list-group-item d-flex justify-content-between align-items-center";
            gastoNuevo.dataset.id = id;
            gastoNuevo.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>`;
            const btnBorrar = document.createElement("button");
            btnBorrar.className = "btn btn-danger borrar-gasto";
            btnBorrar.innerHTML = "Borrar &times" 
            gastoNuevo.appendChild(btnBorrar);
            gastoListado.appendChild(gastoNuevo);  
        });
    }
    limpiarHTML(){
        while( gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
}

function eventListeners(){
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto)   // <-- Al cargar la página preguntar por un presupuesto a través de la función preguntarPresupuesto
    formulario.addEventListener("submit", agregarGasto);
}
function preguntarPresupuesto(){ 

    const presupuestoUsuario = prompt("¿Cuál es tu presupuesto?");    //Pregunta el presupuesto
    presupuestoUsuario ?  presupuestoUsuario : window.location.reload();     // <-- Valida que el resultado sea un null osea que usuario haya escrito algo 
    if(presupuestoUsuario.trim() === "" || isNaN(parseFloat(presupuestoUsuario)) || presupuestoUsuario<0){   // <-- Si se ha escrito valida que lo que ese algo sea una cantidad
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);    // <-- Instancia la clase Presupuesto
    UI.insertarPresupuesto(presupuesto);    // Llama al método insertarPresupuesto 

}
function agregarGasto(e){
    e.preventDefault();
    setTimeout(()=>{      // <- Deshabilita temporalmente el boton de agregar para evitar que el usuario envie multiples gastos simultaneamente
        botonAgregar.disabled = false;
    }, 3000)
    const nombre = document.querySelector("#gasto").value;
    const cantidad = document.querySelector("#cantidad").value;  
    
    nombre === "" || cantidad === "" ? UI.imprimirAlerta("Ambos campos son obligatorios", "error") : isNaN(cantidad) || cantidad < 0? UI.imprimirAlerta("Cantidad no válida. Por favor ingrese un valor correcto", "error") : construirGasto(nombre, cantidad);
    botonAgregar.disabled = true;
}
function construirGasto(nombre, cantidad){  // <-- Construye un objeto gasto con los valores de los campos de gasto y cantidad
    const objetoGasto = {nombre, cantidad, id: Date.now() }
    presupuesto.nuevoGasto(objetoGasto);
    UI.imprimirAlerta("Gasto añadido correctamente");
    const { gastos } = presupuesto // <-- Hace un destructuring del objeto de presupuesto y obtiene su propiedad de gastos 
    UI.agregarGastoListado(gastos);
    formulario.reset();
    
}

let presupuesto;
const UI = new UserInterface();
eventListeners();
