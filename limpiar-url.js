// Pega este script antes de </body> en tu index.html:
// <script src="limpiar-url.js"></script>
(function () {
  // 1) Quita el #hash si la página se abre con uno (ej: #inicio)
  if (location.hash) {
    var id = location.hash.slice(1);
    var el = document.getElementById(id);
    if (el) el.scrollIntoView();
    history.replaceState(null, "", location.pathname + location.search);
  }

  // 2) Evita que los enlaces internos (#servicios, #contacto...) vuelvan a poner el hash
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    e.preventDefault();
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
})();
