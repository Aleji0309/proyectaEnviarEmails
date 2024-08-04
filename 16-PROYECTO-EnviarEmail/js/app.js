// Función que se ejecuta una vez que todo el código HTML está cargado
document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const btnSpinner = document.querySelector("#spinner");

  // Agregar eventos
  inputEmail.addEventListener("input", validarCampos);
  inputAsunto.addEventListener("input", validarCampos);
  inputMensaje.addEventListener("input", validarCampos);
  formulario.addEventListener("submit", enviarEmail);

  

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();
    btnSpinner.classList.add("flex");
    btnSpinner.classList.remove("hidden");

    setTimeout(() => {
      btnSpinner.classList.remove("flex");
      btnSpinner.classList.add("hidden");

      //Reiniciar el objeto
      resetFormulario();

      // Crear una alerta de exito
      const alertaExito = document.createElement("P");
      alertaExito.textContent = "El formulario se envió de manera exitosa";
      alertaExito.classList.add(
        "bg-green-500",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "text-sm",
        "uppercase",
        "text-white"
      );

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validarCampos(e) {
    e.preventDefault();
    const valorInputs = e.target.value.trim();

    if (valorInputs === "") {
      mensajeError(
        `El campo ${e.target.id} es obligatorio `,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return; // Detiene la ejecución del codigo
    }

    if (e.target.id === "email"  && !validarEmail(e.target.value)) {
      mensajeError("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    //  Comprobar el objeto de email
    comprobarEmail();
  }



  function mensajeError(mensaje, referencia) {
    //Comprueba si ya existe  una alerta
    limpiarAlerta(referencia);

    // Genearar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");

    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }

  function resetFormulario() {
    //Reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
    formulario.reset();
    comprobarEmail();
  }




});
