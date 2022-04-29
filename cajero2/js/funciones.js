function entregarDinero() 
{  
    var dinero;
    var div;
    var papeles;
    var dineroCliente;
    totalEntregado = 0;
    contar();
    console.log(total);
    dinero = parseInt(usuario.value);

    if (dineroCliente >= dinero) 
    {
        if(total >= dinero)
        {
            for (var b of billetera)
            {
                procesoCajero(b);
            } 
            if (dinero == 0)
            {
                entrega.play();
                var dibujado = [];
                dinero = parseInt(usuario.value);
                for (var bi of billetera)
                {
                    procesoCajero(bi);
                    bi.cantidad -= papeles;
                    for (var i = 0; i < papeles; i++)
                    {
                        dibujado.push( new Billete(bi.valor, 1) );
                    }
                    papeles = 0;
                }
                totalEntregado = parseInt(usuario.value);
                resultado.innerHTML += "Se han retirado " + usuario.value + " Pesos <hr />";
                for (var bi of dibujado)
                {
                    resultado.innerHTML += "<img src=" + bi.imagen.src + " class=billetes />";
                }
                resultado.innerHTML += "<p></p>"
            }
            else
            {
                alerta.play();
                resultado.innerHTML += "No tengo los billetes para esa suma, intenta con otro valor <hr />";
            }
            contar();
            console.log(dineroCliente);
            for(var c of clientela)
            {
                if (respuesta[0] == c.nombre && respuesta[1] == c.contraseña)
                {
                    transacciones.push( new Transaction(c.nombre, c.contraseña, "Retiro", -totalEntregado, c.dineroTotal, momento(), tiempo() ) ); 
                }
            } 
        }
        else if (dinero % 10 == 0)
        {
            alerta.play();
            var timerInterval;
            swal.fire({
                customClass: {
                    popup: 'container-class',
                    denyButton: 'btn-class-1',
                },
                imageUrl: 'image-removebg-preview.png',
                imageHeight: 255,
                title: 'Lo sentimos, el cajero no tiene la cantidad de billetes para realizar su transacción.',
                html: '<p>Si espera <b></b> segundos repondremos los billetes para que pueda realizar su transacción.</p>',
                timer: 30000,
                timerProgressBar: true,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: 'No esperar',
                grow: 'fullscreen',
                didOpen: () => {
                    timerInterval = setInterval(() => {
                      const content = Swal.getContent()
                      if (content) {
                        var b = content.querySelector('b')
                        if (b) {
                          b.textContent = (Swal.getTimerLeft() / 1000).toFixed()
                        }
                      }
                    }, 1000)
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                },
            }).then((result) => {
                if (result.dismiss === swal.DismissReason.timer) {
                    for (var bi of billetera) {
                        if (dinero > 0) {
                            div = Math.floor(dinero / bi.valor);
                            bi.cantidad += div;
                            dinero -= (div * bi.valor);
                        }
                    } 
                }
            })
        }
        else
        {
            alerta.play();
            resultado.innerHTML += "No tengo los billetes para esa suma, intenta con otro valor. <hr />"; 
        }
    }
    else
    {
        alerta.play();
        resultado.innerHTML += "Eres pobre y no tienes esa cantidad de dinero :( <hr />";
    }
    function contar()
    {
        total = 0;
        for (var tot of billetera)
        {
            total = total + tot.valor * tot.cantidad;
        }
        for (var cl of clientela)
        {
            if (respuesta[0] == cl.nombre && respuesta[1] == cl.contraseña) 
            {
                cl.dineroTotal -= totalEntregado;
                dineroCliente = cl.dineroTotal;
            }
        }
    }
    function procesoCajero(c)
    {
        if (dinero > 0)
        {
            div = Math.floor(dinero / c.valor);
            if(div > c.cantidad) 
            {
                papeles = c.cantidad;
            }
            else 
            {
                papeles = div;
            }
            dinero -= (papeles * c.valor);
        }
    }    
}
function estadoCuenta() {
    var datos;
    for (var c of clientela)
    {
        if (respuesta[0] == c.nombre && respuesta[1] == c.contraseña)
        {
            datos = '<p>Titular de la cuenta: ' + c.nombre + '</p><p>Número de cuenta: ' + c.numeroCuenta + '</p><p>Saldo de la cuenta: <b>' + c.dineroTotal + ' Pesos</b></p>';
        }
    }
    swal.fire({
        customClass: {
            popup: 'container-class',
            confirmButton: 'btn-class',
        },
        title: 'Estado de la cuenta',
        html: datos,
        grow: 'fullscreen',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,                                  
        });     
}
function alertas() {
    atm();
    resultado.innerHTML = "";
    usuario.value = "";
    totalEntregado = 0;
    (async () => {
    await swal.fire({
        customClass: {
            popup: 'container-class',
            input: 'input-class',
            cancelButton: 'iniciar',
            confirmButton: 'iniciar registrar',
        },
        title: '¡Bienvenido al banco CBTIS!', 
        text: '¿Ya tienes una cuenta?',
        grow: 'fullscreen',
        imageUrl: 'image-removebg-preview.png',
        imageHeight: 250,
        showCancelButton: true,
        cancelButtonText: 'Iniciar Sesión',
        confirmButtonText: 'Registrarse',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        }).then((result) => {
            function crearse () {
                if (result.isConfirmed) {
                    swal.mixin({ 
                        customClass: {
                            popup: 'container-class',
                            input: 'input-class',
                            confirmButton: 'btn-class',
                        },
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        stopKeydownPropagation: false,
                        grow: 'fullscreen',
                        progressSteps: ['1','2','3'],
                    }).queue([
                        {
                            input: 'text',
                            inputPlaceholder: 'Nombre Apellido',
                            title: 'Ingresa tu nombre',
                            confirmButtonText: 'Siguiente',
                            inputValidator: nombre => {
                                if (!nombre) {
                                    return "Por favor escribe tu nombre.";
                                } else {
                                    return undefined;
                                }
                            },
                        },
                        {
                            /*Contraseña */
                            input: 'password',
                            inputPlaceholder: 'Siguiente',
                            title: 'Crea tu Contraseña',
                            confirmButtonText: 'Ingresar',
                            inputValidator: nombre => {
                                if (!nombre) {
                                    return "Por favor escribe tu contraseña.";
                                } else {
                                    return undefined;
                                }
                            }
                        },
                        {
                            /*Dinero minimo para depositar*/
                            input: 'number',
                            title: '¿Cuánto dinero quieres depositar para abrir tu cuenta?',
                            confirmButtonText: 'Abrir Cuenta',
                            inputValidator: nombre => {
                                if (parseInt(nombre) < 20 || !nombre) {
                                    return "El deposito mínimo para abir tu cuenta es de 20 Pesos.";
                                } else {
                                    return undefined;
                                }
                            }
                        },
                        /*Error de datos */
                    ]).then((datitos) => {
                        var datos = datitos.value;
                        respuesta = datitos.value;
                        var noEntra;
                        for(var c of clientela) {
                            if (datos[0] == c.nombre)
                            {
                                noEntra = true;
                            } 
                        }
                        if (noEntra == true)
                        {
                            swal.fire({
                                customClass: {
                                    popup: 'container-class',
                                    confirmButton: 'btn-class-1',                                    },
                                title: '¡Ups! Algo ha salido mal.',
                                text: 'Tu nombre o contraseña ya está en uso, tendrás que escribir otro.',
                                icon: 'error',
                                confirmButtonText: 'Volver a intentarlo',
                                grow: 'fullscreen',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                allowEnterKey: false,
                                stopKeydownPropagation: false,
                            }).then((resulta) => {
                                if (resulta.isConfirmed)
                                {
                                    alertas();
                                }
                            });
                        }
                        else
                        {
                            /*Aceptacion de datos */
                            swal.fire({
                                customClass: {
                                    popup: 'container-class',
                                    confirmButton: 'btn-class',
                                },
                                title: 'Excelente, has creado tu cuenta.',
                                text: 'Ahora, disfruta de todos los beneficios de ser cliente del Banco CBTIS.',
                                icon: 'success',
                                showConfirmButton: true,
                                confirmButtonText: '¡Perfecto!',
                                grow: 'fullscreen',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                allowEnterKey: false,
                                stopKeydownPropagation: false,
                            });
                            clientela.push( new Cliente(datos[0], datos[1], parseInt(datos[2])) );
                            for(var c of clientela)
                            {
                                if (respuesta[0] == c.nombre && respuesta[1] == c.contraseña)
                                {
                                    transacciones.push( new Transaction(c.nombre, c.contraseña, "Depósito", c.dineroTotal, c.dineroTotal, momento(), tiempo() ) ); 
                                }
                            }
                        }
                    });    
                }
                else {
                    pedirDatos();
                }
            }
            crearse();   
        });
        function pedirDatos ()
        {
            swal.mixin({ 
                customClass: {
                    popup: 'container-class',
                    input: 'input-class',
                    confirmButton: 'btn-class',
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
                grow: 'fullscreen',
                progressSteps: ['1','2'],
            }).queue([
                {
                    input: 'text',
                    inputPlaceholder: 'Nombre Apellido',
                    title: 'Ingresa tu nombre',
                    confirmButtonText: 'Siguiente',
                    inputValidator: nombre => {
                        if (!nombre) {
                            return "Por favor escribe tu nombre.";
                        } else {
                            return undefined;
                        }
                    }
                },
                {
                    input: 'password',
                    inputPlaceholder: 'Contraseña',
                    title: 'Ingresa tu Contraseña',
                    confirmButtonText: 'Ingresar',
                    inputValidator: nombre => {
                        if (!nombre) {
                            return "Por favor escribe tu contraseña.";
                        } else {
                            return undefined;
                        }
                    }
                },
            ]).then((result) => {
                    respuesta = result.value;
                    var user;
                    for(var c of clientela) {
                        if (respuesta[0] == c.nombre && respuesta[1] == c.contraseña)
                        {
                            user = true; 
                        }
                    }
                    if (user == true) 
                    {
                        swal.fire({
                            customClass: {
                                popup: 'container-class',
                            },
                            title: 'Has ingresado exitosamente.',
                            text: 'Prepárate para ver el estado de tu cuenta.',
                            icon: 'success',
                            timer: 3500,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading() 
                            },
                            showConfirmButton: false,
                            grow: 'fullscreen',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            stopKeydownPropagation: false,
                        }).then((resulto) => {
                            if (resulto) {
                                estadoCuenta();
                                }
                            });
                        }
                    else
                    {
                        swal.fire({
                            customClass: {
                                popup: 'container-class',
                                confirmButton: 'btn-class-1',
                            },
                            title: '¡Ups!',
                            text: 'El nombre o la contraseña son incorrectos.',
                            icon: 'error',
                            confirmButtonText: 'Volver a intentarlo',
                            grow: 'fullscreen',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            stopKeydownPropagation: false,
                            })
                        .then((resulta) => {
                            if (resulta.isConfirmed)
                            {
                                alertas();
                            }
                        });
                    }
            });      
        } 
 })();
}
function sonidoTecla() 
{
    tecla.play();
}
function cerrarSesion()
{
    if (totalEntregado > 0 && main.style.display == "block") {
        var saldo;
        for(var c of clientela)
        {
            if (respuesta[0] == c.nombre && respuesta[1] == c.contraseña)
            {
                saldo = 'Gracias por preferir al Banco CBTIS.<p>El saldo actual de su cuenta es: <b>' + c.dineroTotal + ' Pesos.</b></p>';
            }
        }
        swal.fire({
            customClass: {
                popup: 'container-class',
            },
            imageUrl: 'billetera.svg',
            imageHeight: 200,
            width: 850,
            timer: 6000,
            title: '¡Dinero Retirado!',
            html: saldo,
            timerProgressBar: true,
            showConfirmButton: false,  
        }).then((result) => {
            if (result) {
                alertas();   
            }
        });     
    }
    else {
        alertas();
    }
}
function aleatorio(inicio, cantidad)
{
    var resultado = inicio;
    var c;
    for (var i = 0; i < cantidad; i++) {
        c = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        resultado += c.toString();
    }
    return resultado;
}
function registrar (){
    central.style.display = "block"; 
    main.style.display = "none";
    footer.className = "futer";
    usuario.value = "";
    registrando();  
}
function atm (){
    central.style.display = "none"; 
    main.style.display = "block";
    footer.className = "footer";
}
function registrando()
{
    listado.innerHTML ="";
    var numeros = 0;
    for(var c of clientela)
    {
        if (respuesta[0] == c.nombre && respuesta[1] == c.contraseña)
        {
            for(var t of transacciones)
            {
                if (c.nombre == t.cliente && c.contraseña == t.contraseña)
                {
                    numeros++;
                    if (t.monto >= 0)
                    {
                        listado.innerHTML += '<tr><td><span class="texto">' + numeros + '</span></td><td><span class="texto">'+ t.identificador +'</span></td><td><span class="texto">'+ t.cliente +'</span></td><td><span class="texto">'+ t.tipo +'</span></td><td><span class="texto">+'+ t.monto +'</span></td><td><span class="texto">'+ t.balance +'</span></td><td><span class="texto">'+ t.fecha +'</span></td><td><span class="texto">'+ t.hora +'</span></td></tr>';                        
                    }
                    else 
                    {
                        listado.innerHTML += '<tr><td><span class="texto">' + numeros + '</span></td><td><span class="texto">'+ t.identificador +'</span></td><td><span class="texto">'+ t.cliente +'</span></td><td><span class="texto">'+ t.tipo +'</span></td><td><span class="texto">'+ t.monto +'</span></td><td><span class="texto">'+ t.balance +'</span></td><td><span class="texto">'+ t.fecha +'</span></td><td><span class="texto">'+ t.hora +'</span></td></tr>';
                    }
                }
            }
        }
    }
}
function depositando() {
    swal.fire({
        customClass: {
            popup: 'container-class',
            confirmButton: 'btn-class',
            input: 'input-class',
            image: 'bankerito',
        },
        imageUrl: 'banker.svg',
        title: '¿Cuánto dinero quieres depositar a tu cuenta?',
        grow: 'fullscreen',
        input: 'number',
        confirmButtonText: 'Depositar',
        inputValidator: cash => {
            if (!cash) {
                return "Por favor Ingrese una cantidad valida.";
            } else {
                return undefined;
            }
        }
    }).then((numerito) => {
        var deposito = parseInt(numerito.value);
        var saldo;
        for(var c of clientela)
        {
            if (respuesta[0] == c.nombre && respuesta[1] == c.contraseña)
            {
                c.dineroTotal += deposito;
                saldo = '<p>El saldo actual de su cuenta es: <b>' + c.dineroTotal + ' Pesos.</b></p>';
                transacciones.push( new Transaction(c.nombre, c.contraseña, "Depósito", deposito, c.dineroTotal, momento(), tiempo() ) ); 
            }
        }
        registrando();
        swal.fire({
            customClass: {
                popup: 'container-class',
                confirmButton: 'btn-class',
            },
            icon: 'success',
            grow: 'fullscreen',
            title: '¡Depósito Realizado!',
            html: saldo,  
        });
    });    
}
function momento ()
{
    var hoy = new Date();
    var fecha = ("0" + hoy.getDate()).slice(-2) + "/" + ("0" + (1 + hoy.getMonth() ) ).slice(-2) + "/" + hoy.getFullYear();
    return fecha; 
}
function tiempo ()
{
    var hoy = new Date();
    horitas = hoy.getHours();
    var ampm = "a.m.";
    if (horitas >= 12) {horitas -= 12; ampm = "p.m.";}
    if (horitas == 0) {horitas = 12;}
    var momento = horitas + ":" + ("0" + hoy.getMinutes() ).slice(-2) + " " + ampm;
    return momento;
}