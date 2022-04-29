class Billete {
    constructor(v, c)
    {
        this.valor = v;
        this.cantidad = c;
        this.imagen = new Image;

        this.imagen.src = imagenes[this.valor];
        this.imagen.className = "imagenes";
    }
} 
class Cliente {
    constructor( u, c, d) 
    {
        this.nombre = u;
        this.contraseña = c;
        this.dineroTotal = d;
        this.numeroCuenta = aleatorio(0, 11);
    }
}
class Transaction {
    constructor( u, c, t, m, b, f, h) 
    {
        this.cliente = u;
        this.contraseña = c;
        this.tipo = t;
        this.monto = m;
        this.balance = b;
        this.identificador = aleatorio(0, 11);
        this.fecha = f;
        this.hora = h;
    }
}