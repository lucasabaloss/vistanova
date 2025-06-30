// carrito.js
document.addEventListener("DOMContentLoaded", () => {
 
  const botonesAgregar = document.querySelectorAll(".boton-agregar, .btn-promocion");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    const card = boton.closest(".destination-card, .plan-card, .promocion-card");
    if (!card) return;

    const nombre = card.querySelector(".plan-name, .destination-info h3, .promocion-title")?.textContent.trim() || "Producto";
    const precioTexto = card.querySelector(".plan-price strong, .destination-info strong, .precio-descuento")?.textContent.trim() || "$0";
    const precio = parseFloat(precioTexto.replace(/[^\d]/g, ""));

    const item = { nombre, precio };
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${nombre} agregado al carrito`);
  });
});




      
  const contenedorCarrito = document.getElementById("carrito-lista");
  if (contenedorCarrito) {
    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p class='sin-productos'>No hay productos en el carrito.</p>";
    } else {
      let total = 0;
      carrito.forEach(item => {
        total += item.precio;
        const div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `<span>${item.nombre}</span><span>$${item.precio.toLocaleString()}</span>`;
        contenedorCarrito.appendChild(div);
      });

      const totalDiv = document.createElement("div");
      totalDiv.classList.add("carrito-total");
      totalDiv.innerText = `Total: $${total.toLocaleString()}`;
      contenedorCarrito.appendChild(totalDiv);
    }

    document.getElementById("vaciar-carrito")?.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      location.reload();
    });
  }

  const loginForm = document.getElementById("form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
      if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
        alert("Inicio de sesión exitoso");
        window.location.href = "vuelos.html";
      } else {
        alert("Credenciales inválidas");
      }
    });
  }

  const registerForm = document.getElementById("form-register");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = registerForm.email.value;
      const password = registerForm.password.value;

      const usuario = { email, password };
      localStorage.setItem("usuario", JSON.stringify(usuario));
      alert("Registro exitoso. Ahora podés iniciar sesión.");
    });
  }
});

    document.addEventListener("DOMContentLoaded", () => {
      const lista = document.getElementById("carrito-lista");
      const totalDiv = document.getElementById("total-precio");
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      function renderCarrito() {
        lista.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
          lista.innerHTML = "<p class='sin-productos'>No hay productos en el carrito.</p>";
          totalDiv.innerText = "Total: $0";
          return;
        }

        carrito.forEach((item, index) => {
          const div = document.createElement("div");
          div.classList.add("carrito-item");
          div.innerHTML = `
            <span>${item.nombre}</span>
            <span>$${item.precio.toLocaleString()}</span>
            <button onclick="eliminarItem(${index})" style="background: none; border: none; color: red; font-weight: bold; cursor: pointer;">X</button>
          `;
          lista.appendChild(div);
          total += item.precio;
        });

        totalDiv.innerText = `Total: $${total.toLocaleString()}`;
      }

      window.eliminarItem = function(index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
      }

      document.getElementById("vaciar-carrito").addEventListener("click", () => {
        localStorage.removeItem("carrito");
        carrito = [];
        renderCarrito();
      });

      document.getElementById("btn-pagar").addEventListener("click", () => {
        if (carrito.length === 0) {
          alert("Tu carrito está vacío.");
          return;
        }
        //alert("Gracias por tu reserva. ¡Serás redirigido a la pasarela de pago!");
        // Aquí podrías redirigir a otro archivo si tenés uno como "pago.html"
      });

      renderCarrito();
    });

        function mostrarFormulario(tipo) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

      if (tipo === 'login') {
        document.querySelector('#form-login').classList.add('active');
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
      } else {
        document.querySelector('#form-register').classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      let total = carrito.reduce((sum, item) => sum + item.precio, 0);
      document.getElementById("monto-total").innerText = `Total: $${total.toLocaleString()}`;

      const form = document.getElementById("form-pago");
      form.addEventListener("submit", e => {
        e.preventDefault();
        alert("¡Pago realizado con éxito! Gracias por reservar con Vista Nova.");
        localStorage.removeItem("carrito");
        window.location.href = "vuelos.html"; // redirigir a inicio o a una página de éxito
      });
    });

    document.querySelectorAll('.boton-agregar').forEach(boton => {
  boton.addEventListener('click', function () {
    const card = this.closest('.destination-card');
    const titulo = card.querySelector('h3').innerText;
    const precioTexto = card.querySelector('strong').innerText.replace('$', '').replace('.', '').replace(',', '.');
    const precio = parseFloat(precioTexto);

    fetch('agregar_carrito.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `producto=${encodeURIComponent(titulo)}&precio=${precio}`
    })
    //.then(res => res.text())
    //.then(data => alert(data));
  });
});
