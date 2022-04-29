var respuesta;
var totalEntregado = 0;
var total;
var datitos;

var listado = document.getElementById("transactions");
var footer = document.getElementById("footer_id");
var cajero = document.getElementById("cajerito_id");
var main = document.getElementById("main_id");
var central = document.getElementById("central_id");
var depositar = document.getElementById("depositar_id")
var register = document.getElementById("transaccion")
var miCuenta = document.getElementById("miCuenta_id")
var tecla = document.getElementById("tecla_id");
var alerta = document.getElementById("alerta_id");
var entrega = document.getElementById("entrega_id");
var resultado = document.getElementById("resultado");
var usuario = document.getElementById("cajitatexto");
var otraVez = document.getElementById("reiniciar");
var boton = document.getElementById("extraer");

var clientela = [];
var transacciones = [];
var imagenes = [];
imagenes [1000] = "1000.jpg";
imagenes [500] = "500.jpg";
imagenes [100] = "100.jpg";
imagenes [50] = "50.jpg";
imagenes [20] = "20.jpg";
imagenes [10] = "10.jpg";
var billetera = [new Billete(1000, 500), new Billete(500, 100), new Billete(100, 10), new Billete(50, 10), new Billete(20, 10), new Billete(10, 10) ];

alertas();
cajero.addEventListener("click", atm);
register.addEventListener("click", registrar);
depositar.addEventListener("click", depositando);
miCuenta.addEventListener("click", estadoCuenta);
boton.addEventListener("click", entregarDinero);
otraVez.addEventListener("click", cerrarSesion);
usuario.addEventListener("keydown", sonidoTecla);