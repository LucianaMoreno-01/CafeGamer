document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


// ── SIMULACIÓN DE BASE DE DATOS Y NOTIFICACIÓN ──


// "base de datos" local temporal
const baseDeDatosSimulada = [];


// Seleccionamos el botón de submit o la sección donde está el formulario
const btnSubmit = document.querySelector('.btn-submit');
const inputs = {
  nombre: document.getElementById('nombre'),
  apellido: document.getElementById('apellido'),
  email: document.getElementById('email'),
  fecha: document.getElementById('fecha'),
  hora: document.getElementById('hora'),
  personas: document.getElementById('personas'),
  zona: document.getElementById('zona'),
  mensaje: document.getElementById('mensaje')
};


// Escuchamos el click en el botón de confirmar reserva
btnSubmit.addEventListener('click', (e) => {
  // Evitamos que recargue la página (comportamiento por defecto de un formulario)
  e.preventDefault();


  // Validación básica: verificar que los campos principales no estén vacíos
  if (!inputs.nombre.value || !inputs.email.value || !inputs.fecha.value || !inputs.hora.value) {
    alert("⚠️ Por favor, completa los campos principales (Nombre, Email, Fecha y Hora).");
    return;
  }


  // 1. Guardamos los datos en nuestro array simulando el "INSERT INTO" de una BD
  const nuevaReserva = {
    id: Date.now(), // ID único simulado
    nombre: inputs.nombre.value,
    apellido: inputs.apellido.value,
    email: inputs.email.value,
    fecha: inputs.fecha.value,
    hora: inputs.hora.value,
    personas: inputs.personas.value,
    zona: inputs.zona.value,
    mensaje: inputs.mensaje.value,
    registroFecha: new Date().toLocaleString()
  };


  baseDeDatosSimulada.push(nuevaReserva);


  // Mostramos en la consola del navegador cómo se guardó en nuestra "BD"
  console.log("💾 ¡Datos guardados en la Base de Datos Simulada!");
  console.table(baseDeDatosSimulada);


  // 2. Crear y mostrar el cartel de éxito dinámicamente
  mostrarCartelNeon(inputs.nombre.value);


  // 3. Limpiar el formulario para simular éxito completo
  Object.values(inputs).forEach(input => input.value = "");
});


// Función para renderizar el cartel cyberpunk en pantalla
function mostrarCartelNeon(nombreUsuario) {
  // Creamos el contenedor del cartel
  const cartel = document.createElement('div');
  cartel.className = 'cartel-notificacion';
 
  // Le metemos estructura HTML con diseño cyberpunk
  cartel.innerHTML = `
    <div class="cartel-header">// RESERVA REGISTRADA</div>
    <div class="cartel-body">
      <p>¡Listo, <span>${nombreUsuario.toUpperCase()}</span>!</p>
      <small>Datos enviados con éxito a la base de datos local de NEON BITES.</small>
    </div>
    <div class="cartel-progress"></div>
  `;


  // Lo inyectamos al body
  document.body.appendChild(cartel);


  // Hacemos que aparezca con una animación (agregando la clase active un milisegundo después)
  setTimeout(() => cartel.classList.add('show'), 100);


  // Lo removemos automáticamente a los 4 segundos
  setTimeout(() => {
    cartel.classList.remove('show');
    setTimeout(() => cartel.remove(), 400); // Espera que termine la animación de salida para destruirlo
  }, 4000);
}
