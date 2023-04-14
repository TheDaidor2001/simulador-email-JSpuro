document.addEventListener("DOMContentLoaded", function () {
  const correo = {
    email: "",
    cc: "",
    asunto: "",
    mensaje: "",
  };

  //seleccionar los campos
  const email = document.querySelector("#email");
  const emailTwo = document.querySelector("#emailTwo");
  const asunto = document.querySelector("#asunto");
  const mensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const spinner = document.querySelector("#spinner");

  //Asignar eventos a cada campo
  email.addEventListener("input", validarCampos);
  emailTwo.addEventListener("input", validarCampos);
  asunto.addEventListener("input", validarCampos);
  mensaje.addEventListener("input", validarCampos);
  formulario.addEventListener("submit", enviarEmail);

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      resetFormulario();

      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";
      formulario.appendChild(alertaExito)

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validarCampos(e) {
    if (e.target.value.trim() === "" && e.target.id === "emailTwo") {
      limpiarAlerta(e.target.parentElement);
      return;
    }

    if (
      e.target.id === "emailTwo" &&
      !validarEmail(e.target.value) &&
      e.target.name !== ""
    ) {
      mostrarAlerta("El email no es correcto", e.target.parentElement);
      return;
    }

    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El ${e.target.name} debe estar relleno`,
        e.target.parentElement
      );
      return;
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es correcto", e.target.parentElement);
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //asignar los valores
    correo[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarEmail();
  }

  function mostrarAlerta(msg, referencia) {
    limpiarAlerta(referencia);
    const error = document.createElement("P");
    error.textContent = msg;
    error.classList.add(
      "bg-red-600",
      "text-white",
      "p-2",
      "text-center",
      "alerta"
    );
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
  }

  function comprobarEmail() {
    if (
      Object.values(email).includes("") &&
      Object.values(mensaje).includes("")
    ) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetFormulario() {
    (correo.email = ""), (correo.cc = "");
    correo.asunto = "";
    correo.mensaje = "";

    formulario.reset();

    comprobarEmail();
  }
});
