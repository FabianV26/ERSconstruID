var config = {
    apiKey: "AIzaSyByj43ga3fBT8k3yo5qJhuaLvsqKCos4Ys",
    authDomain: "presupuestosconstruid-37693.firebaseapp.com",
    databaseURL: "https://presupuestosconstruid-37693-default-rtdb.firebaseio.com",
    projectId: "presupuestosconstruid-37693",
    storageBucket: "presupuestosconstruid-37693.appspot.com",
    messagingSenderId: "922271215592",
    appId: "1:922271215592:web:5265b9883763d3a383fe5d",
    measurementId: "G-WJLQLPXBVP"
};

firebase.initializeApp(config); //inicializamos firebase
var db = firebase.database();

$(document).ready(function () {


    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const añoActual = fecha.getFullYear();


    //creamos constantes para los iconos editar y borrar     
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
    const iconoIntercambiar  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/></svg>';


    var cuentapep = 0;


    var scores = [];
    var $select = $('#codigo');
    db.ref("proyectos").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            scores.push(childSnap.val());
            $select.append('<option>' + childSnap.val().nombre + '</option>');

        });
    });

//Funcion que genera el listado de proyectos en el form--------------------------------------
var listaProyecto = [];
var $select2 = $('#pActual');
db.ref("proyectos").once("value", function (snap) {
    snap.forEach(function (childSnap) {
        listaProyecto.push(childSnap.val());
        $select2.append('<option>' + childSnap.val().nombre + '</option>');

    });
});

var listaProyecto = [];
var $select3 = $('#codigoEnviar');
db.ref("proyectos").once("value", function (snap) {
    snap.forEach(function (childSnap) {
        listaProyecto.push(childSnap.val());
        $select3.append('<option>' + childSnap.val().nombre + '</option>');

    });
});

    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#tablaProductos').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: dataSet,
        columnDefs: [
            {
                targets: [0],
                visible: false, //ocultamos la columna de ID que es la [0]                        
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-info' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" + iconoBorrar + "</button></div></div><div class='btn-group'><button class='btnIntercambiar btn btn-secondary' data-toggle='tooltip' title='Intercambiar'>" + iconoIntercambiar + "</button>"
                //<button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button>
            }
        ]
    });




    function sumarArreglo(numeros) {


        if (numeros instanceof Array) {
            let suma = numeros.reduce((acumulador, numero) => acumulador + numero);

            return suma;
        } else {
            throw TypeError('El argumento debe ser un arreglo.');
        }
    }



    sumita = [];
    var pep = [];


    var cuenta = [
        'Instal provis',
        'Acero',
        'Concreto',
        'Malla Electrosoldada',
        'Mano de obra',
        'Encofrados',
        'Entrepiso Liviano',
        'Contr Cubierta He y Policarbonato',
        'Cúpulas, manto y otros',
        'Tejas',
        'Boceles y pulidos',
        'Pared externa liviana',
        'Pared interna liviana',
        'Enchapes',
        'Pintura Fachada',
        'Pintura Interna',
        'Repellos y pasta',
        'Contr vidri y alumin',
        'Llavines',
        'Marcos para puertas',
        'Puertas y portones',
        'Rodapie',
        'Cables conduc y acc',
        'Piezas eléc y acces',
        'Pzas sanit grif acc',
        'Sumin y coloc tuberi',
        'Closets',
        'Muebles de cocina y baño',
        'Sobres granito y marmol',
        'Arboriz ornat jardin',
        'Muebles externos concreto',
        'Canal Acc Vehic Serv',
        'Cerca, Tapia y o Muros',
        'Cuarto de basura',
        'Piscina',
        'Alquiler Maq y Equip',
        'Herram-equip menores',
        'Limpieza general',
        'Conf lastr pied tier',
        'Corte y acarreo',
        'Muro Gavion',
        'Relleno y compactación',
        'Sumid bocas visita',
        'Hidrantes y siamesas',
        'Cables, conduc y acc',
        'Contrato elec urbana',
        'Poste estruc y lumin',
        'Tanquillas',
        'Aceras y caminerias',
        'Brocales',
        'Adoquin',
        'Asfalto',
        'Lastre',
        'Planta de tratamiento',
        'Pozo',
        'Sis bom hidro caseta',
        'Tanque de agua',
        'Contr Replanteo',
        'Alineamiento INVU',
        'Andamiaje',
        'Bodeguero',
        'Cabañas Sanitarias',
        'Direccion Tecnica',
        'Electricidad y agua (servicios temporales)',
        'Equipo de seguridad ocupacional',
        'Estudio de suelos',
        'Gastos legales',
        'Ingeniero Residente',
        'Maestro de obras',
        'Multas',
        'Oficina temporal',
        'Permisos Municipales',
        'Planillero',
        'Planos arquitectonicos y mecanicos',
        'Planos electricos',
        'Planos estructurales',
        'Planos mecanicos',
        'Poliza Ins Riegos de construcción',
        'Pruebas de laboratorio',
        'Tasado CFIA',
        'Vigilancia',
        'Imprevistos',
        'Utilidad'];

    for (i = 0; i < 26; i++) {

        cuentapep = cuentapep + 1;

        if (cuentapep >= 10) {
            pep.push('Pep 21X-' + cuentapep + '-C');
        } else {
            pep.push('Pep 21X-0' + cuentapep + '-C');
        }

    }




   /*  db.ref("proyectos").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            nombre = childSnap.val().nombre;

            for (i = 0; i < pep.length; i++) {
                pepId = pep[i];

                for (e = 0; e < cuenta.length; e++) {
                    cuentaId = cuenta[e];


                    db.ref("proyectos").child(nombre).child(pepId).child(cuentaId).child("gasto").once("value", function (snap) {
                        sumita.length = 0;
                        snap.forEach(function (childSnap) {


                            sumita.push(childSnap.val().cantidad);
                            cuenta = childSnap.val().cuenta;
                            codigo = childSnap.val().codigo;
                            peps = childSnap.val().pep;

                            sumarArreglo(sumita);

                            suma = sumarArreglo(sumita);
                            
                            db.ref("proyectos").child(codigo).child(peps).child(cuenta).update({
                                gastos: suma,

                            });
                        });
                    });

                };
            };
        });
    }); */

  
             db.ref("moneda").on('value', (snapshot) => {
                 nombre = snapshot.val().pActual;
                 nombrePep = snapshot.val().pepActual;
                 cuentaId = snapshot.val().cuentaActual;

                    var coleccionProductos = db.ref().child("proyectos").child(nombre).child(nombrePep).child(cuentaId).child("gasto");

                    coleccionProductos.on("child_added", datos => {
                       
                        dataSet = [datos.key, datos.child("codigo").val(), datos.child("pep").val(), datos.child("cuenta").val(), datos.child("gasto").val(), datos.child("descripcion").val(), (new Intl.NumberFormat('ru-RU').format(datos.child("cantidad").val())), datos.child("proveedor").val(), datos.child("factura").val()];
                        table.rows.add([dataSet]).draw();

                        db.ref("proyectos").child(datos.child("codigo").val()).child(datos.child("pep").val()).child(datos.child("cuenta").val()).child("gasto").once("value", function (snap) {
                            sumita.length = 0;
                            snap.forEach(function (childSnap) {


                                sumita.push(childSnap.val().cantidad);
                                cuenta = childSnap.val().cuenta;
                                codigo = childSnap.val().codigo;
                                peps = childSnap.val().pep;

                                sumarArreglo(sumita);

                                suma = sumarArreglo(sumita);
                              
                                db.ref("proyectos").child(codigo).child(peps).child(cuenta).update({
                                    gastos: suma,

                                });
                            });
                        });

                    });

                    coleccionProductos.on('child_changed', datos => {

                        dataSet = [datos.key, datos.child("codigo").val(), datos.child("pep").val(), datos.child("cuenta").val(), datos.child("gasto").val(), datos.child("descripcion").val(), new Intl.NumberFormat('ru-RU').format(datos.child("cantidad").val()), datos.child("proveedor").val(), datos.child("factura").val()];
                        table.row(filaEditada).data(dataSet).draw();

                    });
                    coleccionProductos.on("child_removed", function () {
                        table.row(filaEliminada.parents('tr')).remove().draw();

                    });
                
            });
                
          

    var nombreproyecto = [];

    db.ref("proyectos").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            nombreproyecto.push(childSnap.val().descripcion);



        });
    });


    var cantidadAcumulada = 0;
    $('#Agregar').submit(function (e) {
        e.preventDefault();


        let id = $.trim($('#id').val());
        let codigo = $.trim($('#codigo').val());
        let pep = $.trim($('#pep').val());
        let cuenta = $.trim($('#cuenta').val());
        let gasto = $.trim($('#gasto').val());
        let descripcion = $.trim($('#descripcion').val());
        let cantidad = parseFloat($.trim($('#cantidad').val()));
        let proveedor = $.trim($('#proveedor').val());
        let factura = $.trim($('#factura').val());
        cantidadAcumulada = cantidadAcumulada + cantidad;
        db.ref("moneda").once("value", function (snap) {
            porcentajeDeDescuento = snap.val().descuentoActual / 100;
            decuentoMenos = cantidad * porcentajeDeDescuento;

            iva = snap.val().iva / 100;
            ivaPorcentaje = (cantidad - decuentoMenos) * iva;
            
            db.ref("moneda").update({
                gastoAcumulado: snap.val().gastoAcumulado + cantidad,

            });


            cantidad = (cantidad - decuentoMenos) + ivaPorcentaje;
            
        


        if (pep == "pep01") {
            pep = "Pep 21X-01-C";
        } else
            if (pep == "pep02") {
                pep = "Pep 21X-02-C";
            } else
                if (pep == "pep03") {
                    pep = "Pep 21X-03-C";
                } else
                    if (pep == "pep04") {
                        pep = "Pep 21X-04-C";
                    } else
                        if (pep == "pep05") {
                            pep = "Pep 21X-05-C";
                        } else
                            if (pep == "pep06") {
                                pep = "Pep 21X-06-C";
                            } else
                                if (pep == "pep07") {
                                    pep = "Pep 21X-07-C";
                                } else
                                    if (pep == "pep08") {
                                        pep = "Pep 21X-08-C";
                                    } else
                                        if (pep == "pep09") {
                                            pep = "Pep 21X-09-C";
                                        } else
                                            if (pep == "pep10") {
                                                pep = "Pep 21X-10-C";
                                            } else
                                                if (pep == "pep11") {
                                                    pep = "Pep 21X-11-C";
                                                } else
                                                    if (pep == "pep12") {
                                                        pep = "Pep 21X-12-C";
                                                    } else
                                                        if (pep == "pep13") {
                                                            pep = "Pep 21X-13-C";
                                                        } else
                                                            if (pep == "pep14") {
                                                                pep = "Pep 21X-14-C";
                                                            } else
                                                                if (pep == "pep15") {
                                                                    pep = "Pep 21X-15-C";
                                                                } else
                                                                    if (pep == "pep16") {
                                                                        pep = "Pep 21X-16-C";
                                                                    } else
                                                                        if (pep == "pep17") {
                                                                            pep = "Pep 21X-17-C";
                                                                        } else
                                                                            if (pep == "pep18") {
                                                                                pep = "Pep 21X-18-C";
                                                                            } else
                                                                                if (pep == "pep19") {
                                                                                    pep = "Pep 21X-19-C";
                                                                                } else
                                                                                    if (pep == "pep20") {
                                                                                        pep = "Pep 21X-20-C";
                                                                                    } else
                                                                                        if (pep == "pep21") {
                                                                                            pep = "Pep 21X-21-C";
                                                                                        } else
                                                                                            if (pep == "pep22") {
                                                                                                pep = "Pep 21X-2-C";
                                                                                            } else
                                                                                                if (pep == "pep23") {
                                                                                                    pep = "Pep 21X-23-C";
                                                                                                } else
                                                                                                    if (pep == "pep24") {
                                                                                                        pep = "Pep 21X-24-C";
                                                                                                    } else
                                                                                                        if (pep == "pep25") {
                                                                                                            pep = "Pep 21X-25-C";
                                                                                                        } else
                                                                                                            if (pep == "pep26") {
                                                                                                                pep = "Pep 21X-26-C";
                                                                                                            }
        cuenta = cuenta.slice(13, -1);


        console.log(pep, cuenta);
        let idFirebase = id;


        var coleccionProyectos = db.ref().child("proyectos").child(codigo).child(pep).child(cuenta).child("gasto");
        if (idFirebase == '') {
            idFirebase = coleccionProyectos.push().key;
        };
        let llave = idFirebase;

        db.ref("proyectos").child(codigo).child(pep).once("value", function (snap) {
            snap.forEach(function (childSnap) {
                nombreproyecto = childSnap.val().pep;
            });
        });
        data = { codigo: codigo, pep: pep, cuenta: cuenta, gasto: gasto, descripcion: descripcion, cantidad: cantidad, llave: llave, proveedor: proveedor, factura: factura };
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProyectos.update(actualizacionData);
        id = '';

        

        $("#Agregar").trigger("reset");

        var descripcionCambio = "Se creó/editó el gasto: " + gasto + " En el pep: " + pep + " En la cuenta: " + cuenta;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "Gasto " + gasto + " " + pep + " " + cuenta;
                    var email = user.email;

                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: gasto,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio


                    });
                }

            }
        });

    });
    });

    $('#Editar').submit(function (e) {
        e.preventDefault();
        
       
        let id = $.trim($('#idEdit').val());
        let codigo = $.trim($('#codigoEdit').val());
        console.log(id);
        let pep = $.trim($('#pepEdit').val());
        let cuenta = $.trim($('#cuentaEdit').val());
       
        let gasto = $.trim($('#gastoEdit').val());
        let descripcion = $.trim($('#descripcionEdit').val());
        let cantidad = parseFloat($.trim($('#cantidadEdit').val()));
        let proveedor = $.trim($('#proveedorEdit').val());
        let factura = $.trim($('#facturaEdit').val());
        cantidadAcumulada = cantidadAcumulada + cantidad;
        
        

        
  
        if (pep == "pep01") {
            pep = "Pep 21X-01-C";
        } else
            if (pep == "pep02") {
                pep = "Pep 21X-02-C";
            } else
                if (pep == "pep03") {
                    pep = "Pep 21X-03-C";
                } else
                    if (pep == "pep04") {
                        pep = "Pep 21X-04-C";
                    } else
                        if (pep == "pep05") {
                            pep = "Pep 21X-05-C";
                        } else
                            if (pep == "pep06") {
                                pep = "Pep 21X-06-C";
                            } else
                                if (pep == "pep07") {
                                    pep = "Pep 21X-07-C";
                                } else
                                    if (pep == "pep08") {
                                        pep = "Pep 21X-08-C";
                                    } else
                                        if (pep == "pep09") {
                                            pep = "Pep 21X-09-C";
                                        } else
                                            if (pep == "pep10") {
                                                pep = "Pep 21X-10-C";
                                            } else
                                                if (pep == "pep11") {
                                                    pep = "Pep 21X-11-C";
                                                } else
                                                    if (pep == "pep12") {
                                                        pep = "Pep 21X-12-C";
                                                    } else
                                                        if (pep == "pep13") {
                                                            pep = "Pep 21X-13-C";
                                                        } else
                                                            if (pep == "pep14") {
                                                                pep = "Pep 21X-14-C";
                                                            } else
                                                                if (pep == "pep15") {
                                                                    pep = "Pep 21X-15-C";
                                                                } else
                                                                    if (pep == "pep16") {
                                                                        pep = "Pep 21X-16-C";
                                                                    } else
                                                                        if (pep == "pep17") {
                                                                            pep = "Pep 21X-17-C";
                                                                        } else
                                                                            if (pep == "pep18") {
                                                                                pep = "Pep 21X-18-C";
                                                                            } else
                                                                                if (pep == "pep19") {
                                                                                    pep = "Pep 21X-19-C";
                                                                                } else
                                                                                    if (pep == "pep20") {
                                                                                        pep = "Pep 21X-20-C";
                                                                                    } else
                                                                                        if (pep == "pep21") {
                                                                                            pep = "Pep 21X-21-C";
                                                                                        } else
                                                                                            if (pep == "pep22") {
                                                                                                pep = "Pep 21X-2-C";
                                                                                            } else
                                                                                                if (pep == "pep23") {
                                                                                                    pep = "Pep 21X-23-C";
                                                                                                } else
                                                                                                    if (pep == "pep24") {
                                                                                                        pep = "Pep 21X-24-C";
                                                                                                    } else
                                                                                                        if (pep == "pep25") {
                                                                                                            pep = "Pep 21X-25-C";
                                                                                                        } else
                                                                                                            if (pep == "pep26") {
                                                                                                                pep = "Pep 21X-26-C";
                                                                                      }
        console.log(cuenta);
        
        
        console.log(pep, cuenta);
        let idFirebase = id;


        var coleccionProyectos = db.ref().child("proyectos").child(codigo).child(pep).child(cuenta).child("gasto");
        if (idFirebase == '') {
            idFirebase = coleccionProyectos.push().key;
        };
        let llave = idFirebase;

        db.ref("proyectos").child(codigo).child(pep).once("value", function (snap) {
            snap.forEach(function (childSnap) {
                nombreproyecto = childSnap.val().pep;



            });
        });
        data = { codigo: codigo, pep: pep, cuenta: cuenta, gasto: gasto, descripcion: descripcion, cantidad: cantidad, llave: llave, proveedor: proveedor, factura: factura };
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProyectos.update(actualizacionData);
        id = '';



        $("#Editar").trigger("reset");
        
       
        var descripcionCambio = "Se creó/editó el gasto: " + gasto + " En el pep: " + pep + " En la cuenta: " + cuenta;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "Gasto " + gasto + " " + pep + " " + cuenta;
                    var email = user.email;

                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: gasto,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio


                    });
                }

            }
        });
        $('#modalEditar').modal('hide');

    });

    $('#Intercambiar').submit(function (e) {
        e.preventDefault();
        
       
        let id = $.trim($('#idInter').val());
        let codigo = $.trim($('#codigoInter').val());
        console.log(id);
        let pep = $.trim($('#pepInter').val());
        let cuenta = $.trim($('#cuentaInter').val());
       
        let gasto = $.trim($('#gastoInter').val());
        let descripcion = $.trim($('#descripcionInter').val());
        let cantidad = parseFloat($.trim($('#cantidadInter').val()));
        let proveedor = $.trim($('#proveedorInter').val());
        let factura = $.trim($('#facturaInter').val());

        let codigoEnviar = $.trim($('#codigoEnviar').val());
        let pepEnviar = $.trim($('#pepEnviar').val());
        let cuentaEnviar = $.trim($('#cuentaEnviar').val());
        cantidadAcumulada = cantidadAcumulada + cantidad;
        
        

        
  
        if (pep == "pep01") {
            pep = "Pep 21X-01-C";
        } else
            if (pep == "pep02") {
                pep = "Pep 21X-02-C";
            } else
                if (pep == "pep03") {
                    pep = "Pep 21X-03-C";
                } else
                    if (pep == "pep04") {
                        pep = "Pep 21X-04-C";
                    } else
                        if (pep == "pep05") {
                            pep = "Pep 21X-05-C";
                        } else
                            if (pep == "pep06") {
                                pep = "Pep 21X-06-C";
                            } else
                                if (pep == "pep07") {
                                    pep = "Pep 21X-07-C";
                                } else
                                    if (pep == "pep08") {
                                        pep = "Pep 21X-08-C";
                                    } else
                                        if (pep == "pep09") {
                                            pep = "Pep 21X-09-C";
                                        } else
                                            if (pep == "pep10") {
                                                pep = "Pep 21X-10-C";
                                            } else
                                                if (pep == "pep11") {
                                                    pep = "Pep 21X-11-C";
                                                } else
                                                    if (pep == "pep12") {
                                                        pep = "Pep 21X-12-C";
                                                    } else
                                                        if (pep == "pep13") {
                                                            pep = "Pep 21X-13-C";
                                                        } else
                                                            if (pep == "pep14") {
                                                                pep = "Pep 21X-14-C";
                                                            } else
                                                                if (pep == "pep15") {
                                                                    pep = "Pep 21X-15-C";
                                                                } else
                                                                    if (pep == "pep16") {
                                                                        pep = "Pep 21X-16-C";
                                                                    } else
                                                                        if (pep == "pep17") {
                                                                            pep = "Pep 21X-17-C";
                                                                        } else
                                                                            if (pep == "pep18") {
                                                                                pep = "Pep 21X-18-C";
                                                                            } else
                                                                                if (pep == "pep19") {
                                                                                    pep = "Pep 21X-19-C";
                                                                                } else
                                                                                    if (pep == "pep20") {
                                                                                        pep = "Pep 21X-20-C";
                                                                                    } else
                                                                                        if (pep == "pep21") {
                                                                                            pep = "Pep 21X-21-C";
                                                                                        } else
                                                                                            if (pep == "pep22") {
                                                                                                pep = "Pep 21X-2-C";
                                                                                            } else
                                                                                                if (pep == "pep23") {
                                                                                                    pep = "Pep 21X-23-C";
                                                                                                } else
                                                                                                    if (pep == "pep24") {
                                                                                                        pep = "Pep 21X-24-C";
                                                                                                    } else
                                                                                                        if (pep == "pep25") {
                                                                                                            pep = "Pep 21X-25-C";
                                                                                                        } else
                                                                                                            if (pep == "pep26") {
                                                                                                                pep = "Pep 21X-26-C";
                                                                                      }
                
        if (pepEnviar == "pep01") {
            pepEnviar = "Pep 21X-01-C";
        } else
            if (pepEnviar == "pep02") {
                pepEnviar = "Pep 21X-02-C";
            } else
                if (pepEnviar == "pep03") {
                    pepEnviar = "Pep 21X-03-C";
                } else
                    if (pepEnviar == "pep04") {
                        pepEnviar = "Pep 21X-04-C";
                    } else
                        if (pepEnviar == "pep05") {
                            pepEnviar = "Pep 21X-05-C";
                        } else
                            if (pepEnviar == "pep06") {
                                pepEnviar = "Pep 21X-06-C";
                            } else
                                if (pepEnviar == "pep07") {
                                    pepEnviar = "Pep 21X-07-C";
                                } else
                                    if (pepEnviar == "pep08") {
                                        pepEnviar = "Pep 21X-08-C";
                                    } else
                                        if (pepEnviar == "pep09") {
                                            pepEnviar = "Pep 21X-09-C";
                                        } else
                                            if (pepEnviar == "pep10") {
                                                pepEnviar = "Pep 21X-10-C";
                                            } else
                                                if (pepEnviar == "pep11") {
                                                    pepEnviar = "Pep 21X-11-C";
                                                } else
                                                    if (pepEnviar == "pep12") {
                                                        pepEnviar = "Pep 21X-12-C";
                                                    } else
                                                        if (pepEnviar == "pep13") {
                                                            pepEnviar = "Pep 21X-13-C";
                                                        } else
                                                            if (pepEnviar == "pep14") {
                                                                pepEnviar = "Pep 21X-14-C";
                                                            } else
                                                                if (pepEnviar == "pep15") {
                                                                    pepEnviar = "Pep 21X-15-C";
                                                                } else
                                                                    if (pepEnviar == "pep16") {
                                                                        pepEnviar = "Pep 21X-16-C";
                                                                    } else
                                                                        if (pepEnviar == "pep17") {
                                                                            pepEnviar = "Pep 21X-17-C";
                                                                        } else
                                                                            if (pepEnviar == "pep18") {
                                                                                pepEnviar = "Pep 21X-18-C";
                                                                            } else
                                                                                if (pepEnviar == "pep19") {
                                                                                    pepEnviar = "Pep 21X-19-C";
                                                                                } else
                                                                                    if (pepEnviar == "pep20") {
                                                                                        pepEnviar = "Pep 21X-20-C";
                                                                                    } else
                                                                                        if (pepEnviar == "pep21") {
                                                                                            pepEnviar = "Pep 21X-21-C";
                                                                                        } else
                                                                                            if (pepEnviar == "pep22") {
                                                                                                pepEnviar = "Pep 21X-2-C";
                                                                                            } else
                                                                                                if (pepEnviar == "pep23") {
                                                                                                    pepEnviar = "Pep 21X-23-C";
                                                                                                } else
                                                                                                    if (pepEnviar == "pep24") {
                                                                                                        pepEnviar = "Pep 21X-24-C";
                                                                                                    } else
                                                                                                        if (pepEnviar == "pep25") {
                                                                                                            pepEnviar = "Pep 21X-25-C";
                                                                                                        } else
                                                                                                            if (pepEnviar == "pep26") {
                                                                                                                pepEnviar = "Pep 21X-26-C";
                                                                                                            }
        console.log(cuenta);
        cuentaEnviar = cuentaEnviar.slice(13, -1);

        
        console.log(pep, cuenta);
        let idFirebase = id;

        db.ref(`proyectos/${codigo}/${pep}/${cuenta}/gasto/${id}`).remove()
        console.log(codigo, pep, cuenta);
        db.ref("proyectos").child(codigo).child(pep).child(cuenta).update({
            gastos: 0,

        });

        console.log(codigoEnviar);
        console.log(pepEnviar);
        console.log(cuentaEnviar);
        
        var coleccionProyectos = db.ref().child("proyectos").child(codigoEnviar).child(pepEnviar).child(cuentaEnviar).child("gasto");
        if (idFirebase == '') {
            idFirebase = coleccionProyectos.push().key;
        };
        let llave = idFirebase;

        db.ref("proyectos").child(codigo).child(pep).once("value", function (snap) {
            snap.forEach(function (childSnap) {
                nombreproyecto = childSnap.val().pep;



            });
        });
        data = { codigo: codigoEnviar, pep: pepEnviar, cuenta: cuentaEnviar, gasto: gasto, descripcion: descripcion, cantidad: cantidad, llave: llave, proveedor: proveedor, factura: factura };
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProyectos.update(actualizacionData);
        id = '';



        $("#Intercambiar").trigger("reset");
        
       
        var descripcionCambio = "Se creó/editó el gasto: " + gasto + " En el pep: " + pep + " En la cuenta: " + cuenta;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "Gasto " + gasto + " " + pep + " " + cuenta;
                    var email = user.email;

                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: gasto,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio


                    });
                }

            }
        });
        $('#modalIntercambiar').modal('hide');

    });

    //Botones
    $('#btnDescuento').click(function () {
        $('#descuentoPorcentaje').val('');
        $("form").trigger("reset");
        $('#modalDescuento').modal('show');
        db.ref("moneda").update({
            gastoAcumulado: 0
        });
        var $select = " ";
        var proveedores = [];
        var $select = $('#proveedor');
        var $selectEdit = $('#proveedorEdit');
        db.ref("proveedores").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                proveedores.push(childSnapshot.val());
                $select.append('<option>' + childSnapshot.val().codigo + '</option>');
                $selectEdit.append('<option>' + childSnapshot.val().codigo + '</option>');
            });
        });
    });

    //Botones
    $('#btnNuevo').click(function () {
        
        $('#id').val('');
        $('#codigo').val('');
        $('#pep').val('');
        $('#cuenta').val('');
        $('#gasto').val('');
        $('#descripcion').val('');
        $('#cantidad').val('');
        $('#proveedor').val('');
        $('#factura').val('');
        let descuentoPorcentaje = parseFloat($.trim($('#descuentoPorcentaje').val()));
        let montoFactura = parseFloat($.trim($('#montoFactura').val()));
        let descuentoDinero = parseFloat($.trim($('#descuentoDinero').val()));

        if (isNaN(descuentoPorcentaje)) {
            descuentoPorcentaje = 0;
          }
          if (isNaN(montoFactura)) {
            montoFactura = 1;
          }
          if (montoFactura==0) {
            montoFactura = 1;
          }
          if (isNaN(descuentoDinero)) {
            descuentoDinero = 0;
          }
          if (descuentoDinero==0) {
            descuentoDinero = 0;
          }

        var descDineroPorcen = (descuentoDinero * 100) / montoFactura;

        

        descuentofinal = descuentoPorcentaje + descDineroPorcen;
    
        console.log(descuentoPorcentaje);
        console.log(montoFactura);
        console.log(descuentoDinero);
        console.log(descDineroPorcen);
        console.log(descuentofinal);


        db.ref("moneda").update({
            descuentoActual: descuentofinal
        });

        var $select = " ";
        var proveedores = [];
        var $select = $('#proveedor');
        var $selectEdit = $('#proveedorEdit');
        db.ref("proveedores").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                proveedores.push(childSnapshot.val());
                $select.append('<option>' + childSnapshot.val().codigo + '</option>');
                $selectEdit.append('<option>' + childSnapshot.val().codigo + '</option>');
            });
        });
        $("form").trigger("reset");
        $('#modalDescuento').modal('hide');
        $('#modalAltaEdicion').modal('show');
    });

    $('#btnTerminar').click(function () {

        let id = $.trim($('#id').val());
        let codigo = $.trim($('#codigo').val());
        let pep = $.trim($('#pep').val());
        let cuenta = $.trim($('#cuenta').val());
        let gasto = $.trim($('#gasto').val());
        let descripcion = $.trim($('#descripcion').val());
        let cantidad = parseFloat($.trim($('#cantidad').val()));
        let proveedor = $.trim($('#proveedor').val());
        let factura = $.trim($('#factura').val());
        db.ref("moneda").once("value", function (snap) {

            porcentajeDeDescuento = snap.val().descuentoActual / 100;
            decuentoMenos = cantidad * porcentajeDeDescuento;
            
            iva = snap.val().iva / 100;
            ivaPorcentaje = (cantidad - decuentoMenos) * iva;

            cambio = snap.val().gastoAcumulado;
            gastoAcumulado = cambio + cantidad;

            gastoAcumuladoDescuento = gastoAcumulado * porcentajeDeDescuento;
            gastoAcumuladoConDescuento = gastoAcumulado - gastoAcumuladoDescuento;

            

            gastoAcumuladoIva = (gastoAcumulado - gastoAcumuladoDescuento) * iva;
            gastoAcumuladoConIva = gastoAcumulado + gastoAcumuladoIva;

            gastoAcumuladoIvaDescuento = (gastoAcumulado - gastoAcumuladoDescuento) + gastoAcumuladoIva;


            document.getElementById('gastoAcumulado').value = "₡"+gastoAcumulado;
            document.getElementById('gastoAcumuladoDescuento').value = "₡" + gastoAcumuladoConDescuento;
            document.getElementById('gastoAcumuladoIva').value = "₡" + gastoAcumuladoConIva;
            document.getElementById('gastoAcumuladoIvaDescuento').value = "₡" + gastoAcumuladoIvaDescuento;
            
            
            
            cantidad = (cantidad - decuentoMenos) + ivaPorcentaje;

        
        if (pep == "pep01") {
            pep = "Pep 21X-01-C";
        } else
            if (pep == "pep02") {
                pep = "Pep 21X-02-C";
            } else
                if (pep == "pep03") {
                    pep = "Pep 21X-03-C";
                } else
                    if (pep == "pep04") {
                        pep = "Pep 21X-04-C";
                    } else
                        if (pep == "pep05") {
                            pep = "Pep 21X-05-C";
                        } else
                            if (pep == "pep06") {
                                pep = "Pep 21X-06-C";
                            } else
                                if (pep == "pep07") {
                                    pep = "Pep 21X-07-C";
                                } else
                                    if (pep == "pep08") {
                                        pep = "Pep 21X-08-C";
                                    } else
                                        if (pep == "pep09") {
                                            pep = "Pep 21X-09-C";
                                        } else
                                            if (pep == "pep10") {
                                                pep = "Pep 21X-10-C";
                                            } else
                                                if (pep == "pep11") {
                                                    pep = "Pep 21X-11-C";
                                                } else
                                                    if (pep == "pep12") {
                                                        pep = "Pep 21X-12-C";
                                                    } else
                                                        if (pep == "pep13") {
                                                            pep = "Pep 21X-13-C";
                                                        } else
                                                            if (pep == "pep14") {
                                                                pep = "Pep 21X-14-C";
                                                            } else
                                                                if (pep == "pep15") {
                                                                    pep = "Pep 21X-15-C";
                                                                } else
                                                                    if (pep == "pep16") {
                                                                        pep = "Pep 21X-16-C";
                                                                    } else
                                                                        if (pep == "pep17") {
                                                                            pep = "Pep 21X-17-C";
                                                                        } else
                                                                            if (pep == "pep18") {
                                                                                pep = "Pep 21X-18-C";
                                                                            } else
                                                                                if (pep == "pep19") {
                                                                                    pep = "Pep 21X-19-C";
                                                                                } else
                                                                                    if (pep == "pep20") {
                                                                                        pep = "Pep 21X-20-C";
                                                                                    } else
                                                                                        if (pep == "pep21") {
                                                                                            pep = "Pep 21X-21-C";
                                                                                        } else
                                                                                            if (pep == "pep22") {
                                                                                                pep = "Pep 21X-2-C";
                                                                                            } else
                                                                                                if (pep == "pep23") {
                                                                                                    pep = "Pep 21X-23-C";
                                                                                                } else
                                                                                                    if (pep == "pep24") {
                                                                                                        pep = "Pep 21X-24-C";
                                                                                                    } else
                                                                                                        if (pep == "pep25") {
                                                                                                            pep = "Pep 21X-25-C";
                                                                                                        } else
                                                                                                            if (pep == "pep26") {
                                                                                                                pep = "Pep 21X-26-C";
                                                                                                            }
        cuenta = cuenta.slice(13, -1);


        console.log(pep, cuenta);
        let idFirebase = id;


        var coleccionProyectos = db.ref().child("proyectos").child(codigo).child(pep).child(cuenta).child("gasto");
        if (idFirebase == '') {
            idFirebase = coleccionProyectos.push().key;
        };
        let llave = idFirebase;

        db.ref("proyectos").child(codigo).child(pep).once("value", function (snap) {
            snap.forEach(function (childSnap) {
                nombreproyecto = childSnap.val().pep;

            });
        });
        data = { codigo: codigo, pep: pep, cuenta: cuenta, gasto: gasto, descripcion: descripcion, cantidad: cantidad, llave: llave, proveedor: proveedor, factura: factura };
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProyectos.update(actualizacionData);
        id = '';



     

        var descripcionCambio = "Se creó/editó el gasto: " + gasto + " En el pep: " + pep + " En la cuenta: " + cuenta;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "Gasto " + gasto + " " + pep + " " + cuenta;
                    var email = user.email;

                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: gasto,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio

                    });
                }

            }
        });

        });

        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
        $('#modalTerminarFactura').modal('show');
    });


    $('#btnGuardar').click(function () {

        let id = $.trim($('#idEdit').val());
        let codigo = $.trim($('#codigoEdit').val());
        let pep = $.trim($('#pepEdit').val());
        let cuenta = $.trim($('#cuentaEdit').val());
        let gasto = $.trim($('#gastoEdit').val());
        let descripcion = $.trim($('#descripcionEdit').val());
        let cantidad = parseFloat($.trim($('#cantidadEdit').val()));
        let proveedor = $.trim($('#proveedorEdit').val());
        let factura = $.trim($('#facturaEdit').val());
        db.ref("moneda").once("value", function (snap) {


            cambio = snap.val().gastoAcumulado;
            gastoAcumulado = cambio + cantidad;

            document.getElementById('gastoAcumulado').value = "₡" + gastoAcumulado;


        });
        if (pep == "pep01") {
            pep = "Pep 21X-01-C";
        } else
            if (pep == "pep02") {
                pep = "Pep 21X-02-C";
            } else
                if (pep == "pep03") {
                    pep = "Pep 21X-03-C";
                } else
                    if (pep == "pep04") {
                        pep = "Pep 21X-04-C";
                    } else
                        if (pep == "pep05") {
                            pep = "Pep 21X-05-C";
                        } else
                            if (pep == "pep06") {
                                pep = "Pep 21X-06-C";
                            } else
                                if (pep == "pep07") {
                                    pep = "Pep 21X-07-C";
                                } else
                                    if (pep == "pep08") {
                                        pep = "Pep 21X-08-C";
                                    } else
                                        if (pep == "pep09") {
                                            pep = "Pep 21X-09-C";
                                        } else
                                            if (pep == "pep10") {
                                                pep = "Pep 21X-10-C";
                                            } else
                                                if (pep == "pep11") {
                                                    pep = "Pep 21X-11-C";
                                                } else
                                                    if (pep == "pep12") {
                                                        pep = "Pep 21X-12-C";
                                                    } else
                                                        if (pep == "pep13") {
                                                            pep = "Pep 21X-13-C";
                                                        } else
                                                            if (pep == "pep14") {
                                                                pep = "Pep 21X-14-C";
                                                            } else
                                                                if (pep == "pep15") {
                                                                    pep = "Pep 21X-15-C";
                                                                } else
                                                                    if (pep == "pep16") {
                                                                        pep = "Pep 21X-16-C";
                                                                    } else
                                                                        if (pep == "pep17") {
                                                                            pep = "Pep 21X-17-C";
                                                                        } else
                                                                            if (pep == "pep18") {
                                                                                pep = "Pep 21X-18-C";
                                                                            } else
                                                                                if (pep == "pep19") {
                                                                                    pep = "Pep 21X-19-C";
                                                                                } else
                                                                                    if (pep == "pep20") {
                                                                                        pep = "Pep 21X-20-C";
                                                                                    } else
                                                                                        if (pep == "pep21") {
                                                                                            pep = "Pep 21X-21-C";
                                                                                        } else
                                                                                            if (pep == "pep22") {
                                                                                                pep = "Pep 21X-2-C";
                                                                                            } else
                                                                                                if (pep == "pep23") {
                                                                                                    pep = "Pep 21X-23-C";
                                                                                                } else
                                                                                                    if (pep == "pep24") {
                                                                                                        pep = "Pep 21X-24-C";
                                                                                                    } else
                                                                                                        if (pep == "pep25") {
                                                                                                            pep = "Pep 21X-25-C";
                                                                                                        } else
                                                                                                            if (pep == "pep26") {
                                                                                                                pep = "Pep 21X-26-C";
                                                                                                            }
        cuenta = cuenta.slice(13, -1);


        console.log(pep, cuenta);
        let idFirebase = id;


        var coleccionProyectos = db.ref().child("proyectos").child(codigo).child(pep).child(cuenta).child("gasto");
        if (idFirebase == '') {
            idFirebase = coleccionProyectos.push().key;
        };
        let llave = idFirebase;

        db.ref("proyectos").child(codigo).child(pep).once("value", function (snap) {
            snap.forEach(function (childSnap) {
                nombreproyecto = childSnap.val().pep;

            });
        });
        data = { codigo: codigo, pep: pep, cuenta: cuenta, gasto: gasto, descripcion: descripcion, cantidad: cantidad, llave: llave, proveedor: proveedor, factura: factura };
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProyectos.update(actualizacionData);
        id = '';





        var descripcionCambio = "Se creó/editó el gasto: " + gasto + " En el pep: " + pep + " En la cuenta: " + cuenta;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "Gasto " + gasto + " " + pep + " " + cuenta;
                    var email = user.email;

                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: gasto,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio

                    });
                }

            }
        });

        $("form").trigger("reset");
        $('#modalEditar').modal('hide');
        $('#modalTerminarFactura').modal('show');
    });

  
    $("#tablaProductos").on("click", ".btnEditar", function () {
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];
        console.log(id);    
        let codigo = $(this).closest('tr').find('td:eq(0)').text();
        let pep = $(this).closest('tr').find('td:eq(1)').text();
        let cuenta = $(this).closest('tr').find('td:eq(2)').text();
        let gasto = $(this).closest('tr').find('td:eq(3)').text();
        let descripcion = $(this).closest('tr').find('td:eq(4)').text();
        let cantidad = parseInt($(this).closest('tr').find('td:eq(5)').text());
        let proveedor = $(this).closest('tr').find('td:eq(6)').text();
        let factura = $(this).closest('tr').find('td:eq(7)').text();
        $('#idEdit').val(id);
        $('#codigoEdit').val(codigo);
        $('#pepEdit').val(pep);
        $('#cuentaEdit').val(cuenta);
        $('#gastoEdit').val(gasto);
        $('#descripcionEdit').val(descripcion);
        $('#cantidadEdit').val(cantidad);
        $('#proveedorEdit').val(proveedor);
        $('#facturaEdit').val(factura);

        var $select = " ";
        var proveedores = [];
        var $select = $('#proveedor');
        var $selectEdit = $('#proveedorEdit');
        db.ref("proveedores").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                proveedores.push(childSnapshot.val());
                $select.append('<option>' + childSnapshot.val().codigo + '</option>');
                $selectEdit.append('<option>' + childSnapshot.val().codigo + '</option>');
            });
        });

        $('#modalEditar').modal('show');

    });

    $("#tablaProductos").on("click", ".btnIntercambiar", function () {
        filaEliminada = $(this);
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];
        console.log(id);    
        let codigo = $(this).closest('tr').find('td:eq(0)').text();
        let pep = $(this).closest('tr').find('td:eq(1)').text();
        let cuenta = $(this).closest('tr').find('td:eq(2)').text();
        let gasto = $(this).closest('tr').find('td:eq(3)').text();
        let descripcion = $(this).closest('tr').find('td:eq(4)').text();
        let cantidad = parseInt($(this).closest('tr').find('td:eq(5)').text());
        let proveedor = $(this).closest('tr').find('td:eq(6)').text();
        let factura = $(this).closest('tr').find('td:eq(7)').text();
        $('#idInter').val(id);
        $('#codigoInter').val(codigo);
        $('#pepInter').val(pep);
        $('#cuentaInter').val(cuenta);
        $('#gastoInter').val(gasto);
        $('#descripcionInter').val(descripcion);
        $('#cantidadInter').val(cantidad);
        $('#proveedorInter').val(proveedor);
        $('#facturaInter').val(factura);

        var $select = " ";
        var proveedores = [];
        var $select = $('#proveedor');
        var $selectEdit = $('#proveedorInter');
        db.ref("proveedores").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                proveedores.push(childSnapshot.val());
                $select.append('<option>' + childSnapshot.val().codigo + '</option>');
                $selectEdit.append('<option>' + childSnapshot.val().codigo + '</option>');
            });
        });

        $('#modalIntercambiar').modal('show');

    });

    $("#tablaProductos").on("click", ".btnBorrar", function () {
        filaEliminada = $(this);
        Swal.fire({
            title: '¿Está seguro de eliminar este gasto?',
            text: "¡Está operación no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if (result.value) {
                let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
                let id = fila[0];
                let proyecto = fila[1];
                let pep = fila[2];
                let cuenta = fila[3];
                let gasto = fila[4];

                var descripcionCambio = "Se eliminó el gasto: " + gasto + " En el pep: " + pep + " En la cuenta: " + cuenta;
                var fecha = hoy + "/" + mesActual + "/" + añoActual;
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // User is signed in.
                        var user = firebase.auth().currentUser;

                        if (user != null) {

                            var direccion = "EliminaGasto " + gasto + " " + pep + " " + cuenta;
                            var email = user.email;

                            db.ref().child("historial").child(direccion).set({
                                email: email,
                                nombre: gasto,
                                fecha: fecha,
                                descripcionCambio: descripcionCambio


                            });
                        }

                    }
                });

                db.ref(`proyectos/${proyecto}/${pep}/${cuenta}/gasto/${id}`).remove()
                console.log(proyecto, pep, cuenta);
                db.ref("proyectos").child(proyecto).child(pep).child(cuenta).update({
                    gastos: 0,

                });
                Swal.fire('¡Eliminado!', 'El gasto ha sido eliminado.', 'success')
            }
        })
    });



});


function cargarProvincias() {
    var array = ["pep01",
        "pep02",
        "pep03",
        "pep04",
        "pep05",
        "pep06",
        "pep07",
        "pep08",
        "pep09",
        "pep10",
        "pep11",
        "pep12",
        "pep13",
        "pep14",
        "pep15",
        "pep16",
        "pep17",
        "pep18",
        "pep19",
        "pep20",
        "pep21",
        "pep22",
        "pep23",
        "pep24",
        "pep25",
        "pep26"

    ];

    addOptions("pep", array);

}
var cuentapep = 0;

var pep = [
    "Pep 21X-01-C / Obras preliminares",
    "Pep 21X-02-C / Fundaciones",
    "Pep 21X-03-C / Estructura y escaleras",
    "Pep 21X-04-C / Entrepiso",
    "Pep 21X-05-C / Techos - Impermeabilizaciones",
    "Pep 21X-06-C / Revestimiento y Acabados",
    "Pep 21X-07-C / Herreria, vidrios y aluminio",
    "Pep 21X-08-C / Carpinteria, Puertas y Cerrajería",
    "Pep 21X-09-C / Instalaciones eléctricas",
    "Pep 21X-10-C / Instalaciones sanitarias",
    "Pep 21X-11-C / Equipamiento Interno",
    "Pep 21X-12-C / Equipamiento Externo",
    "Pep 21X-13-C / Obras Exteriores",
    "Pep 21X-14-C / Equipos Menores",
    "Pep 21X-15-C / Movimiento de Tierra",
    "Pep 21X-16-C / Cloacas",
    "Pep 21X-17-C / Acueducto",
    "Pep 21X-18-C / Drenajes",
    "Pep 21X-19-C / Electricidad Urbana",
    "Pep 21X-20-C / Aceras, Brocales",
    "Pep 21X-21-C / Vialidad y Estacionamiento",
    "Pep 21X-22-C / Incorporacion de servicios",
    "Pep 21X-23-C / Topografia",
    "Pep 21X-24-C / Indirectos",
    "Pep 21X-25-C / Imprevistos",
    "Pep 21X-26-C / Utilidad"

];


//Función para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementsByName(domElement)[0];
    for (provincia in array) {

        var opcion = document.createElement("option");
        opcion.text = pep[provincia];
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = array[provincia].toLowerCase()
        selector.add(opcion);
    }
}


var proyectoNombre = [];
var pep01 = [];
var pep02 = [];
var pep03 = [];
var pep04 = [];
var pep05 = [];
var pep06 = [];
var pep07 = [];
var pep08 = [];
var pep09 = [];
var pep10 = [];
var pep11 = [];
var pep12 = [];
var pep13 = [];
var pep14 = [];
var pep15 = [];
var pep16 = [];
var pep17 = [];
var pep18 = [];
var pep19 = [];
var pep20 = [];
var pep21 = [];
var pep22 = [];
var pep23 = [];
var pep24 = [];
var pep25 = [];
var pep26 = [];
db.ref("proyectos").once("value", function (snap) {

    snap.forEach(function (childSnap) {

        proyectoNombre.push(childSnap.val().nombre);
        
    });


   

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-01-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep01.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ".");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-02-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep02.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-03-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep03.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-04-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep04.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-05-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep05.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-06-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep06.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-07-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep07.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-08-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep08.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-09-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep09.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-10-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep10.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-11-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep11.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-12-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep12.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-13-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep13.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-14-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep14.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-15-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep15.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-16-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep16.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-17-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep17.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-18-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep18.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-19-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep19.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });
    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-20-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep20.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-21-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep21.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-22-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep22.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-23-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep23.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-24-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep24.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-25-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep25.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });
    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-26-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep26.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });


});




function cargarPueblos() {
    // Objeto de provincias con pueblos
    var listaPueblos = {

        pep01,
        pep02,
        pep03,
        pep04,
        pep05,
        pep06,
        pep07,
        pep08,
        pep09,
        pep10,
        pep11,
        pep12,
        pep13,
        pep14,
        pep15,
        pep16,
        pep17,
        pep18,
        pep19,
        pep20,
        pep21,
        pep22,
        pep23,
        pep24,
        pep25,
        pep26
    }

    var provincias = document.getElementById('pep')
    var pueblos = document.getElementById('cuenta')
    var provinciaSeleccionada = provincias.value


    // Se limpian los pueblos
    pueblos.innerHTML = '<option value="">Seleccione una Cuenta...</option>'

    if (provinciaSeleccionada !== '') {
        // Se seleccionan los pueblos y se ordenan
        provinciaSeleccionada = listaPueblos[provinciaSeleccionada]

        // Insertamos los pueblos
        provinciaSeleccionada.forEach(function (pueblo) {


            let opcion = document.createElement('option')
            opcion.value = pueblo
            opcion.text = pueblo
            
            
            pueblos.add(opcion)
        });
    }

}

// Iniciar la carga de provincias solo para comprobar que funciona
cargarProvincias();


function cargarPep() {
    var array = ["pep01",
        "pep02",
        "pep03",
        "pep04",
        "pep05",
        "pep06",
        "pep07",
        "pep08",
        "pep09",
        "pep10",
        "pep11",
        "pep12",
        "pep13",
        "pep14",
        "pep15",
        "pep16",
        "pep17",
        "pep18",
        "pep19",
        "pep20",
        "pep21",
        "pep22",
        "pep23",
        "pep24",
        "pep25",
        "pep26"

    ];

    addOptions("pepEnviar", array);

}
var cuentapep = 0;

var pep = [
    "Pep 21X-01-C / Obras preliminares",
    "Pep 21X-02-C / Fundaciones",
    "Pep 21X-03-C / Estructura y escaleras",
    "Pep 21X-04-C / Entrepiso",
    "Pep 21X-05-C / Techos - Impermeabilizaciones",
    "Pep 21X-06-C / Revestimiento y Acabados",
    "Pep 21X-07-C / Herreria, vidrios y aluminio",
    "Pep 21X-08-C / Carpinteria, Puertas y Cerrajería",
    "Pep 21X-09-C / Instalaciones eléctricas",
    "Pep 21X-10-C / Instalaciones sanitarias",
    "Pep 21X-11-C / Equipamiento Interno",
    "Pep 21X-12-C / Equipamiento Externo",
    "Pep 21X-13-C / Obras Exteriores",
    "Pep 21X-14-C / Equipos Menores",
    "Pep 21X-15-C / Movimiento de Tierra",
    "Pep 21X-16-C / Cloacas",
    "Pep 21X-17-C / Acueducto",
    "Pep 21X-18-C / Drenajes",
    "Pep 21X-19-C / Electricidad Urbana",
    "Pep 21X-20-C / Aceras, Brocales",
    "Pep 21X-21-C / Vialidad y Estacionamiento",
    "Pep 21X-22-C / Incorporacion de servicios",
    "Pep 21X-23-C / Topografia",
    "Pep 21X-24-C / Indirectos",
    "Pep 21X-25-C / Imprevistos",
    "Pep 21X-26-C / Utilidad"

];


//Función para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementsByName(domElement)[0];
    for (provincia in array) {

        var opcion = document.createElement("option");
        opcion.text = pep[provincia];
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = array[provincia].toLowerCase()
        selector.add(opcion);
    }
}


var proyectoNombre = [];
var pep01 = [];
var pep02 = [];
var pep03 = [];
var pep04 = [];
var pep05 = [];
var pep06 = [];
var pep07 = [];
var pep08 = [];
var pep09 = [];
var pep10 = [];
var pep11 = [];
var pep12 = [];
var pep13 = [];
var pep14 = [];
var pep15 = [];
var pep16 = [];
var pep17 = [];
var pep18 = [];
var pep19 = [];
var pep20 = [];
var pep21 = [];
var pep22 = [];
var pep23 = [];
var pep24 = [];
var pep25 = [];
var pep26 = [];
db.ref("proyectos").once("value", function (snap) {

    snap.forEach(function (childSnap) {

        proyectoNombre.push(childSnap.val().nombre);
        
    });


   

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-01-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep01.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ".");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-02-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep02.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-03-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep03.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-04-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep04.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-05-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep05.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-06-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep06.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-07-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep07.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-08-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep08.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-09-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep09.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-10-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep10.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-11-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep11.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-12-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep12.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-13-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep13.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-14-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep14.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-15-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep15.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-16-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep16.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-17-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep17.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-18-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep18.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-19-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep19.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });
    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-20-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep20.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-21-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep21.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-22-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep22.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-23-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep23.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-24-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep24.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-25-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep25.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });
    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-26-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep26.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });


});




function cargarCuentas() {
    // Objeto de provincias con pueblos
    var listaPueblos = {

        pep01,
        pep02,
        pep03,
        pep04,
        pep05,
        pep06,
        pep07,
        pep08,
        pep09,
        pep10,
        pep11,
        pep12,
        pep13,
        pep14,
        pep15,
        pep16,
        pep17,
        pep18,
        pep19,
        pep20,
        pep21,
        pep22,
        pep23,
        pep24,
        pep25,
        pep26
    }

    var provincias = document.getElementById('pepEnviar')
    var pueblos = document.getElementById('cuentaEnviar')
    var provinciaSeleccionada = provincias.value


    // Se limpian los pueblos
    pueblos.innerHTML = '<option value="">Seleccione una Cuenta...</option>'

    if (provinciaSeleccionada !== '') {
        // Se seleccionan los pueblos y se ordenan
        provinciaSeleccionada = listaPueblos[provinciaSeleccionada]

        // Insertamos los pueblos
        provinciaSeleccionada.forEach(function (pueblo) {


            let opcion = document.createElement('option')
            opcion.value = pueblo
            opcion.text = pueblo
            
            
            pueblos.add(opcion)
        });
    }

}

// Iniciar la carga de provincias solo para comprobar que funciona
cargarPep();


function cargarPep2() {
    var array = ["pep01",
        "pep02",
        "pep03",
        "pep04",
        "pep05",
        "pep06",
        "pep07",
        "pep08",
        "pep09",
        "pep10",
        "pep11",
        "pep12",
        "pep13",
        "pep14",
        "pep15",
        "pep16",
        "pep17",
        "pep18",
        "pep19",
        "pep20",
        "pep21",
        "pep22",
        "pep23",
        "pep24",
        "pep25",
        "pep26"

    ];

    addOptions("pepEnviar2", array);

}
var cuentapep = 0;

var pep = [
    "Pep 21X-01-C / Obras preliminares",
    "Pep 21X-02-C / Fundaciones",
    "Pep 21X-03-C / Estructura y escaleras",
    "Pep 21X-04-C / Entrepiso",
    "Pep 21X-05-C / Techos - Impermeabilizaciones",
    "Pep 21X-06-C / Revestimiento y Acabados",
    "Pep 21X-07-C / Herreria, vidrios y aluminio",
    "Pep 21X-08-C / Carpinteria, Puertas y Cerrajería",
    "Pep 21X-09-C / Instalaciones eléctricas",
    "Pep 21X-10-C / Instalaciones sanitarias",
    "Pep 21X-11-C / Equipamiento Interno",
    "Pep 21X-12-C / Equipamiento Externo",
    "Pep 21X-13-C / Obras Exteriores",
    "Pep 21X-14-C / Equipos Menores",
    "Pep 21X-15-C / Movimiento de Tierra",
    "Pep 21X-16-C / Cloacas",
    "Pep 21X-17-C / Acueducto",
    "Pep 21X-18-C / Drenajes",
    "Pep 21X-19-C / Electricidad Urbana",
    "Pep 21X-20-C / Aceras, Brocales",
    "Pep 21X-21-C / Vialidad y Estacionamiento",
    "Pep 21X-22-C / Incorporacion de servicios",
    "Pep 21X-23-C / Topografia",
    "Pep 21X-24-C / Indirectos",
    "Pep 21X-25-C / Imprevistos",
    "Pep 21X-26-C / Utilidad"

];


//Función para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementsByName(domElement)[0];
    for (provincia in array) {

        var opcion = document.createElement("option");
        opcion.text = pep[provincia];
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = array[provincia].toLowerCase()
        selector.add(opcion);
    }
}


var proyectoNombre = [];
var pep01 = [];
var pep02 = [];
var pep03 = [];
var pep04 = [];
var pep05 = [];
var pep06 = [];
var pep07 = [];
var pep08 = [];
var pep09 = [];
var pep10 = [];
var pep11 = [];
var pep12 = [];
var pep13 = [];
var pep14 = [];
var pep15 = [];
var pep16 = [];
var pep17 = [];
var pep18 = [];
var pep19 = [];
var pep20 = [];
var pep21 = [];
var pep22 = [];
var pep23 = [];
var pep24 = [];
var pep25 = [];
var pep26 = [];
db.ref("proyectos").once("value", function (snap) {

    snap.forEach(function (childSnap) {

        proyectoNombre.push(childSnap.val().nombre);
        
    });


   

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-01-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep01.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ".");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-02-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep02.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-03-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep03.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-04-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep04.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-05-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep05.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-06-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep06.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-07-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep07.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-08-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep08.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-09-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep09.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-10-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep10.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-11-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep11.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-12-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep12.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-13-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep13.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-14-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep14.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-15-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep15.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-16-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep16.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-17-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep17.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-18-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep18.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-19-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep19.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });
    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-20-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep20.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-21-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep21.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-22-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep22.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-23-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep23.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-24-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep24.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });

    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-25-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep25.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });
    db.ref("proyectos").child(proyectoNombre[0]).child("Pep 21X-26-C").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            pep26.push(childSnap.val().nombre + " / " + childSnap.val().codigo + ". ");

        });
    });


});




function cargarCuentas2() {
    // Objeto de provincias con pueblos
    var listaPueblos = {

        pep01,
        pep02,
        pep03,
        pep04,
        pep05,
        pep06,
        pep07,
        pep08,
        pep09,
        pep10,
        pep11,
        pep12,
        pep13,
        pep14,
        pep15,
        pep16,
        pep17,
        pep18,
        pep19,
        pep20,
        pep21,
        pep22,
        pep23,
        pep24,
        pep25,
        pep26
    }

    var provincias = document.getElementById('pepEnviar2')
    var pueblos = document.getElementById('cuentaEnviar2')
    var provinciaSeleccionada = provincias.value


    // Se limpian los pueblos
   
    pueblos.innerHTML = '<option value="">Seleccione una Cuenta...</option>'

    if (provinciaSeleccionada !== '') {
        // Se seleccionan los pueblos y se ordenan
        provinciaSeleccionada = listaPueblos[provinciaSeleccionada]

        // Insertamos los pueblos
       
        provinciaSeleccionada.forEach(function (pueblo) {


            let opcion = document.createElement('option')
            opcion.value = pueblo
            opcion.text = pueblo
            
            
            pueblos.add(opcion)
        });
    }

}

// Iniciar la carga de provincias solo para comprobar que funciona
cargarPep2();