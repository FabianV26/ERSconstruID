var firebaseConfig = {
    apiKey: "AIzaSyByj43ga3fBT8k3yo5qJhuaLvsqKCos4Ys",
    authDomain: "presupuestosconstruid-37693.firebaseapp.com",
    databaseURL: "https://presupuestosconstruid-37693-default-rtdb.firebaseio.com",
    projectId: "presupuestosconstruid-37693",
    storageBucket: "presupuestosconstruid-37693.appspot.com",
    messagingSenderId: "922271215592",
    appId: "1:922271215592:web:5265b9883763d3a383fe5d",
    measurementId: "G-WJLQLPXBVP"
};
// Initialize Firebases
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

$(document).ready(function () {

    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    //creamos constantes para los iconos editar y borrar    
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const añoActual = fecha.getFullYear();
    var cuentapep = 0;

    var coleccionProductos = db.ref().child("proyectos");



    sumita = [];
var scores = [];
    var $select = $('#codigo');
    db.ref("proyectos").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            scores.push(childSnap.val());
            $select.append('<option>' + childSnap.val().nombre + '</option>');

        });
    });


    //creamos constantes para los iconos editar y borrar    
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

    
    //Rellenar el arreglo de los nombres de cuenta------------- -------------------------------
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
        'Enchapes',
        'Pared externa liviana',
        'Pared interna liviana',
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
        'Utilidad'
    ];
    //Función que rellena el arreglo con los nombres de los peps -------------------------------
    var pep = [];
    for (i = 0; i < 26; i++) {

        cuentapep = cuentapep + 1;

        if (cuentapep >= 10) {
            pep.push('Pep 21X-' + cuentapep + '-C');
        } else {
            pep.push('Pep 21X-0' + cuentapep + '-C');
        }

    }

    
    //Realizar las restas de los montos y ------------------------------------------------------
    db.ref("proyectos").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            nombre = childSnap.val().nombre;
            for (i = 0; i < pep.length; i++) {
                pepId = pep[i];

                db.ref("proyectos").child(nombre).child(pepId).once("value", function (snap) {
                    snap.forEach(function (childSnap) {

                        presupuesto = childSnap.val().presupuesto;
                        peps = childSnap.val().pep;
                        gastos = childSnap.val().gastos;
                        cuenta = childSnap.val().codigo;
                        proyecto = childSnap.val().proyecto;
                        resta = presupuesto - gastos;

                        db.ref("proyectos").child(proyecto).child(peps).child(cuenta).update({
                            disponible: resta

                        });
                    });
                });
            };
        });
    });

    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#tablaProductos').DataTable({
        
        "createdRow": function (row, data, index) {
            //pintar una celda

            if (data[8] <= -1) {
                /* $('td', row).eq(5).css({
                    'background-color':'#ff5252',
                    'color':'white', 
                }); */

                //pintar una fila
                $('td', row).css({
                    'background-color': '#a30606',
                    'color': 'white',
                    'border-style': 'solid',
                    'border-color': '#bdbdbd'
                });
            }
        },

        
        "drawCallback": function () {
            //alert("La tabla se está recargando"); 
            var api = this.api();
           
            $(api.column(6).footer()).html(
                'Total: ' + api.column(6, { page: 'current' }).data().sum()
            )

            this.api().columns([1]).every(function () {
                var column = this;
                $("#aqui").find('option').remove();
                var select = $('#aqui').on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );


                    column
                        .search(val ? '^' + val + '$' : '', true, false)
                        .draw();
                });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
           
        },
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
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button></div></div>"
                //<button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button>
            }

        ]
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
    //Funcion de sumas de arreglos apagada------------------------------------------------------
    function sumarArreglo(numeros) {


        if (numeros instanceof Array) {
            let suma = numeros.reduce((acumulador, numero) => acumulador + numero);

            return suma;
        } else {
            throw TypeError('El argumento debe ser un arreglo.');
        }
    }
    var cuentapep = 0;
    //Asignar tipo de moneda con la que se ven los montos-----------------------------------------
    

    db.ref("moneda").once("value", function (snap) {

        actual = snap.val().actual;
        

    

        db.ref("moneda").child(actual).once("value", function (snap) {

        
        cambio = snap.val().cambio;
        simbolo = snap.val().simbolo;
        

    });
    
    //Incluir los datos que se muestran en al dataset---------------------------------------------
        db.ref("moneda").on('value', (snapshot) => {
            nombre = snapshot.val().pActual;
            for (i = 0; i < pep.length; i++) {
                pepId = pep[i];

                var coleccionProductos = db.ref().child("proyectos").child(nombre).child(pepId);

                coleccionProductos.on("child_added", datos => {
                    dataSet = [datos.key, datos.child("proyecto").val(), datos.child("indentificador").val(), datos.child("codigo").val() + " / " + datos.child("nombre").val(), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("presupuesto").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("gastos").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("disponible").val() / cambio))];
                    table.rows.add([dataSet]).draw();
                });



            };
       
    });
    //Actualizar los datos que se muestran en al dataset cada vez que se cambien------------------
        db.ref("moneda").on('value', (snapshot) => {
            nombre = snapshot.val().pActual;

            for (i = 0; i < pep.length; i++) {
                pepId = pep[i];

                var coleccionProductos = db.ref().child("proyectos").child(nombre).child(pepId);

                coleccionProductos.on('child_changed', datos => {
                    dataSet = [datos.key, datos.child("proyecto").val(), datos.child("indentificador").val(), datos.child("codigo").val() + " / " + datos.child("nombre").val(), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("presupuesto").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("gastos").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("disponible").val() / cambio))];
                    table.row(filaEditada).data(dataSet).draw();

                    location.reload();
                 
                });

            };
        
    });
    });



    //Asignar un presupuesto----------------------------------------------------------------------
    $('form').submit(function (e) {
        e.preventDefault();
        let id = $.trim($('#id').val());
        let codigo = $.trim($('#codigo').val());
        let pep = $.trim($('#pep').val());
        let cuenta = $.trim($('#cuenta').val());
        let presupuesto = $.trim($('#presupuesto').val());



        if (pep == "Pep 21X-01-C") {

            let instalProvis = $.trim($('#instalProvis').val());
            console.log(instalProvis);

            if (instalProvis != 0) {
            coleccionProductos.child(codigo).child(pep).child("Instal provis").update({
                presupuesto: instalProvis
            });
        };
        }

        if (pep == "Pep 21X-02-C") {
            let acero = $.trim($('#acero2').val());
            let concreto = $.trim($('#concreto2').val());
            let mallaElectrosoldada = $.trim($('#mallaElectrosoldada2').val());
            let manoDeObra = $.trim($('#manoDeObra2').val());

            if (acero != 0) {
            coleccionProductos.child(codigo).child(pep).child("Acero").update({
                presupuesto: acero
            });
            };
            if (concreto != 0) {
            coleccionProductos.child(codigo).child(pep).child("Concreto").update({
                presupuesto: concreto
            });
            };
            if (mallaElectrosoldada != 0) {
            coleccionProductos.child(codigo).child(pep).child("Malla Electrosoldada").update({
                presupuesto: mallaElectrosoldada
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
        }

        if (pep == "Pep 21X-03-C") {
            let acero = $.trim($('#acero3').val());
            let concreto = $.trim($('#concreto3').val());
            let mallaElectrosoldada = $.trim($('#mallaElectrosoldada3').val());
            let manoDeObra = $.trim($('#manoDeObra3').val());
            let encofrados = $.trim($('#encofrados3').val());

            if (acero != 0) {
            coleccionProductos.child(codigo).child(pep).child("Acero").update({
                presupuesto: acero
            });
            };
            if (concreto != 0) {
            coleccionProductos.child(codigo).child(pep).child("Concreto").update({
                presupuesto: concreto
            });
            };
            if (mallaElectrosoldada != 0) {
            coleccionProductos.child(codigo).child(pep).child("Malla Electrosoldada").update({
                presupuesto: mallaElectrosoldada
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            if (encofrados != 0) {
            coleccionProductos.child(codigo).child(pep).child("Encofrados").update({
                presupuesto: encofrados
            });
            };
        }

        if (pep == "Pep 21X-04-C") {
            let acero = $.trim($('#acero4').val());
            let concreto = $.trim($('#concreto4').val());
            let mallaElectrosoldada = $.trim($('#mallaElectrosoldada4').val());
            let manoDeObra = $.trim($('#manoDeObra4').val());
            let entrepisoLiviano = $.trim($('#entrepisoLiviano').val());
            let encofrados = $.trim($('#encofrados4').val());

            if (acero != 0) {
            coleccionProductos.child(codigo).child(pep).child("Acero").update({
                presupuesto: acero
            });
            };
            if (concreto != 0) {
            coleccionProductos.child(codigo).child(pep).child("Concreto").update({
                presupuesto: concreto
            });
            };
            if (mallaElectrosoldada != 0) {
            coleccionProductos.child(codigo).child(pep).child("Malla Electrosoldada").update({
                presupuesto: mallaElectrosoldada
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };

            if (entrepisoLiviano != 0) {
            coleccionProductos.child(codigo).child(pep).child("Entrepiso Liviano").update({
                presupuesto: entrepisoLiviano
            });
            };

            if (encofrados != 0) {
            coleccionProductos.child(codigo).child(pep).child("Encofrados").update({
                presupuesto: encofrados
            });
            };

        }

        if (pep == "Pep 21X-05-C") {
            let acero = $.trim($('#acero5').val());
            let cupulasMantoOtros = $.trim($('#cupulasMantoOtros').val());
            let contrCubiertaHePolicarbonato = $.trim($('#contrCubiertaHePolicarbonato').val());
            let tejas = $.trim($('#tejas').val());
            let manoDeObra = $.trim($('#manoDeObra5').val());

            if (acero != 0) {
            coleccionProductos.child(codigo).child(pep).child("Acero").update({
                presupuesto: acero
            });
            };
            if (cupulasMantoOtros != 0) {
            coleccionProductos.child(codigo).child(pep).child("Cúpulas, manto y otros").update({
                presupuesto: cupulasMantoOtros
            });
            };
            if (contrCubiertaHePolicarbonato != 0) {
            coleccionProductos.child(codigo).child(pep).child("Contr Cubierta He y Policarbonato").update({
                presupuesto: contrCubiertaHePolicarbonato
            });
            };
            if (tejas != 0) {
            coleccionProductos.child(codigo).child(pep).child("Tejas").update({
                presupuesto: tejas
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            

        }

        if (pep == "Pep 21X-06-C") {
            let paredInternaLiviana = $.trim($('#paredInternaLiviana').val());
            let repellosPasta = $.trim($('#repellosPasta').val());
            let enchapes = $.trim($('#enchapes').val());
            let pinturaFachada = $.trim($('#pinturaFachada').val());
            let bocelesPulidos = $.trim($('#bocelesPulidos').val());
            let paredExternaLiviana = $.trim($('#paredExternaLiviana').val());
            let pinturaInterna = $.trim($('#pinturaInterna').val());
            let manoDeObra = $.trim($('#manoDeObra6').val());

            if (paredInternaLiviana != 0) {
            coleccionProductos.child(codigo).child(pep).child("Pared interna liviana").update({
                presupuesto: paredInternaLiviana
            });
            };
            if (repellosPasta != 0) {
            coleccionProductos.child(codigo).child(pep).child("Repellos y pasta").update({
                presupuesto: repellosPasta
            });
            };
            if (enchapes != 0) {
            coleccionProductos.child(codigo).child(pep).child("Enchapes").update({
                presupuesto: enchapes
            });
            };
            if (pinturaFachada != 0) {
            coleccionProductos.child(codigo).child(pep).child("Pintura Fachada").update({
                presupuesto: pinturaFachada
            });
            };
            if (bocelesPulidos != 0) {
            coleccionProductos.child(codigo).child(pep).child("Boceles y pulidos").update({
                presupuesto: bocelesPulidos
            });
            };
            if (paredExternaLiviana != 0) {
            coleccionProductos.child(codigo).child(pep).child("Pared externa liviana").update({
                presupuesto: paredExternaLiviana
            });
            };
            if (pinturaInterna != 0) {
            coleccionProductos.child(codigo).child(pep).child("Pintura Interna").update({
                presupuesto: pinturaInterna
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
        }

        if (pep == "Pep 21X-07-C") {
            let contrVidriAlumin = $.trim($('#contrVidriAlumin').val());
            let manoDeObra = $.trim($('#manoDeObra7').val());

            if (contrVidriAlumin != 0) {
            coleccionProductos.child(codigo).child(pep).child("Contr vidri y alumin").update({
                presupuesto: contrVidriAlumin
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
        }

        if (pep == "Pep 21X-08-C") {
            let marcosParaPuertas = $.trim($('#marcosParaPuertas').val());
            let puertasPortones = $.trim($('#puertasPortones').val());
            let llavines = $.trim($('#llavines').val());
            let rodapie = $.trim($('#rodapie').val());

            if (marcosParaPuertas != 0) {
            coleccionProductos.child(codigo).child(pep).child("Marcos para puertas").update({
                presupuesto: marcosParaPuertas
            });
            };
            if (puertasPortones != 0) {
            coleccionProductos.child(codigo).child(pep).child("Puertas y portones").update({
                presupuesto: puertasPortones
            });
            };
            if (llavines != 0) {
            coleccionProductos.child(codigo).child(pep).child("Llavines").update({
                presupuesto: llavines
            });
            };
            if (rodapie != 0) {
            coleccionProductos.child(codigo).child(pep).child("Rodapie").update({
                presupuesto: rodapie
            });
            };
        }

        if (pep == "Pep 21X-09-C") {
            let cablesConducAcc = $.trim($('#cablesConducAcc9').val());
            let piezasElecAcces = $.trim($('#piezasElecAcces').val());
            let manoDeObra = $.trim($('#manoDeObra9').val());

            if (cablesConducAcc != 0) {
            coleccionProductos.child(codigo).child(pep).child("Cables conduc y acc").update({
                presupuesto: cablesConducAcc
            });
            };
            if (piezasElecAcces != 0) {
            coleccionProductos.child(codigo).child(pep).child("Piezas eléc y acces").update({
                presupuesto: piezasElecAcces
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
        }

        if (pep == "Pep 21X-10-C") {
            let pzasSanitGrifAcc = $.trim($('#pzasSanitGrifAcc').val());
            let suminColocTuberi = $.trim($('#suminColocTuberi10').val());
            let manoDeObra = $.trim($('#manoDeObra10').val());

            if (pzasSanitGrifAcc != 0) {
            coleccionProductos.child(codigo).child(pep).child("Pzas sanit grif acc").update({
                presupuesto: pzasSanitGrifAcc
            });
            };
            if (suminColocTuberi != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sumin y coloc tuberi").update({
                presupuesto: suminColocTuberi
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
        }

        if (pep == "Pep 21X-11-C") {
            let closets = $.trim($('#closets').val());
            let mueblesDeCocinaBaño = $.trim($('#mueblesDeCocinaBaño').val());
            let sobresGranitoMarmol = $.trim($('#sobresGranitoMarmol').val());

            if (closets != 0) {
            coleccionProductos.child(codigo).child(pep).child("Closets").update({
                presupuesto: closets
            });
            };
            if (mueblesDeCocinaBaño != 0) {
            coleccionProductos.child(codigo).child(pep).child("Muebles de cocina y baño").update({
                presupuesto: mueblesDeCocinaBaño
            });
            };
            if (sobresGranitoMarmol != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sobres granito y marmol").update({
                presupuesto: sobresGranitoMarmol
            });
            };
        }

        if (pep == "Pep 21X-12-C") {
            let arborizOrnatJardin = $.trim($('#arborizOrnatJardin').val());
            let mueblesExternosConcreto = $.trim($('#mueblesExternosConcreto').val());

            if (arborizOrnatJardin != 0) {
            coleccionProductos.child(codigo).child(pep).child("Arboriz ornat jardin").update({
                presupuesto: arborizOrnatJardin
            });
            };
            if (mueblesExternosConcreto != 0) {
            coleccionProductos.child(codigo).child(pep).child("Muebles externos concreto").update({
                presupuesto: mueblesExternosConcreto
            });
            };
        }

        if (pep == "Pep 21X-13-C") {
            let canalAccVehicServ = $.trim($('#canalAccVehicServ').val());
            let cercaTapiaMuros = $.trim($('#cercaTapiaMuros').val());
            let cuartoDeBasura = $.trim($('#cuartoDeBasura').val());
            let piscina = $.trim($('#piscina').val());

            if (canalAccVehicServ != 0) {
            coleccionProductos.child(codigo).child(pep).child("Canal Acc Vehic Serv").update({
                presupuesto: canalAccVehicServ
            });
            };
            if (cercaTapiaMuros != 0) {
            coleccionProductos.child(codigo).child(pep).child("Cerca, Tapia y o Muros").update({
                presupuesto: cercaTapiaMuros
            });
            };
            if (cuartoDeBasura != 0) {
            coleccionProductos.child(codigo).child(pep).child("Cuarto de basura").update({
                presupuesto: cuartoDeBasura
            });
            };
            if (piscina != 0) {
            coleccionProductos.child(codigo).child(pep).child("Piscina").update({
                presupuesto: piscina
            });
            };
        }

        if (pep == "Pep 21X-14-C") {
            let herramEquipMenores = $.trim($('#herramEquipMenores').val());
            let limpiezaGeneral = $.trim($('#limpiezaGeneral').val());
            let alquilerMaqEquip = $.trim($('#alquilerMaqEquip').val());

            if (herramEquipMenores != 0) {
            coleccionProductos.child(codigo).child(pep).child("Herram-equip menores").update({
                presupuesto: herramEquipMenores
            });
            };
            if (limpiezaGeneral != 0) {
            coleccionProductos.child(codigo).child(pep).child("Limpieza general").update({
                presupuesto: limpiezaGeneral
            });
            };
            if (alquilerMaqEquip != 0) {
            coleccionProductos.child(codigo).child(pep).child("Alquiler Maq y Equip").update({
                presupuesto: alquilerMaqEquip
            });
            };
        }

        if (pep == "Pep 21X-15-C") {
            let confLastrPiedTier = $.trim($('#confLastrPiedTier').val());
            let corteAcarreo = $.trim($('#corteAcarreo').val());
            let rellenoCompactacion = $.trim($('#rellenoCompactacion15').val());
            let muroGavion = $.trim($('#muroGavion').val());

            if (confLastrPiedTier != 0) {
            coleccionProductos.child(codigo).child(pep).child("Conf lastr pied tier").update({
                presupuesto: confLastrPiedTier
            });
            };
            if (corteAcarreo != 0) {
            coleccionProductos.child(codigo).child(pep).child("Corte y acarreo").update({
                presupuesto: corteAcarreo
            });
            };
            if (rellenoCompactacion != 0) {
            coleccionProductos.child(codigo).child(pep).child("Relleno y compactación").update({
                presupuesto: rellenoCompactacion
            });
            };
            if (muroGavion != 0) {
            coleccionProductos.child(codigo).child(pep).child("Muro Gavion").update({
                presupuesto: muroGavion
            });
            };
        }

        if (pep == "Pep 21X-16-C") {
            let sumidBocasVisita = $.trim($('#sumidBocasVisita16').val());
            let suminColocTuberi = $.trim($('#suminColocTuberi16').val());
            let manoDeObra = $.trim($('#manoDeObra16').val());
            let rellenoCompactacion = $.trim($('#rellenoCompactacion16').val());

            if (sumidBocasVisita != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sumid bocas visita").update({
                presupuesto: sumidBocasVisita
            });
            };
            if (suminColocTuberi != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sumin y coloc tuberi").update({
                presupuesto: suminColocTuberi
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            if (rellenoCompactacion != 0) {
            coleccionProductos.child(codigo).child(pep).child("Relleno y compactación").update({
                presupuesto: rellenoCompactacion
            });
            };
        }

        if (pep == "Pep 21X-17-C") {
            let suminColocTuberi = $.trim($('#suminColocTuberi17').val());
            let manoDeObra = $.trim($('#manoDeObra17').val());
            let rellenoCompactacion = $.trim($('#rellenoCompactacion17').val());
            let hidrantesSiamesas = $.trim($('#hidrantesSiamesas').val());

            if (suminColocTuberi != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sumin y coloc tuberi").update({
                presupuesto: suminColocTuberi
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            if (rellenoCompactacion != 0) {
            coleccionProductos.child(codigo).child(pep).child("Relleno y compactación").update({
                presupuesto: rellenoCompactacion
            });
            };
            if (hidrantesSiamesas != 0) {
            coleccionProductos.child(codigo).child(pep).child("Hidrantes y siamesas").update({
                presupuesto: hidrantesSiamesas
            });
            };
        }

        if (pep == "Pep 21X-18-C") {
            let sumidBocasVisita = $.trim($('#sumidBocasVisita18').val());
            let suminColocTuberi = $.trim($('#suminColocTuberi18').val());
            let manoDeObra = $.trim($('#manoDeObra18').val());
            let rellenoCompactacion = $.trim($('#rellenoCompactacion18').val());

            if (sumidBocasVisita != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sumid bocas visita").update({
                presupuesto: sumidBocasVisita
            });
            };
            if (suminColocTuberi != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sumin y coloc tuberi").update({
                presupuesto: suminColocTuberi
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            if (rellenoCompactacion != 0) {
            coleccionProductos.child(codigo).child(pep).child("Relleno y compactación").update({
                presupuesto: rellenoCompactacion
            });
            };
        }

        if (pep == "Pep 21X-19-C") {
            let cablesConducAcc = $.trim($('#cablesConducAcc19').val());
            let posteEstrucLumin = $.trim($('#posteEstrucLumin').val());
            let suminColocTuberi = $.trim($('#suminColocTuberi19').val());
            let tanquillas = $.trim($('#tanquillas').val());
            let contratoElecUrbana = $.trim($('#contratoElecUrbana').val());
            let manoDeObra = $.trim($('#manoDeObra19').val());
            let rellenoCompactacion = $.trim($('#rellenoCompactacion19').val());

            if (cablesConducAcc != 0) {
            coleccionProductos.child(codigo).child(pep).child("Cables, conduc y acc").update({
                presupuesto: cablesConducAcc
            });
            };
            if (posteEstrucLumin != 0) {
            coleccionProductos.child(codigo).child(pep).child("Poste estruc y lumin").update({
                presupuesto: posteEstrucLumin
            });
            };
            if (suminColocTuberi != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sumin y coloc tuberi").update({
                presupuesto: suminColocTuberi
            });
            };
            if (tanquillas != 0) {
            coleccionProductos.child(codigo).child(pep).child("Tanquillas").update({
                presupuesto: tanquillas
            });
            };
            if (contratoElecUrbana != 0) {
            coleccionProductos.child(codigo).child(pep).child("Contrato elec urbana").update({
                presupuesto: contratoElecUrbana
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            if (rellenoCompactacion != 0) {
            coleccionProductos.child(codigo).child(pep).child("Relleno y compactación").update({
                presupuesto: rellenoCompactacion
            });
            };
        }

        if (pep == "Pep 21X-20-C") {
            let manoDeObra = $.trim($('#manoDeObra20').val());
            let acerasCaminerias = $.trim($('#acerasCaminerias').val());
            let brocales = $.trim($('#brocales').val());

            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            if (acerasCaminerias != 0) {
            coleccionProductos.child(codigo).child(pep).child("Aceras y caminerias").update({
                presupuesto: acerasCaminerias
            });
            };
            if (brocales != 0) {
            coleccionProductos.child(codigo).child(pep).child("Brocales").update({
                presupuesto: brocales
            });
            };
        }

        if (pep == "Pep 21X-21-C") {
            let asfalto = $.trim($('#asfalto').val());
            let adoquin = $.trim($('#adoquin').val());
            let concreto = $.trim($('#concreto21').val());
            let manoDeObra = $.trim($('#manoDeObra21').val());
            let lastre = $.trim($('#lastre').val());

            if (asfalto != 0) {
            coleccionProductos.child(codigo).child(pep).child("Asfalto").update({
                presupuesto: asfalto
            });
            };
            if (adoquin != 0) {
            coleccionProductos.child(codigo).child(pep).child("Adoquin").update({
                presupuesto: adoquin
            });
            };
            if (concreto != 0) {
            coleccionProductos.child(codigo).child(pep).child("Concreto").update({
                presupuesto: concreto
            });
            };
            if (manoDeObra != 0) {
            coleccionProductos.child(codigo).child(pep).child("Mano de obra").update({
                presupuesto: manoDeObra
            });
            };
            if (lastre != 0) {
            coleccionProductos.child(codigo).child(pep).child("Lastre").update({
                presupuesto: lastre
            });
            };
        }

        if (pep == "Pep 21X-22-C") {
            let plantaDeTratamiento = $.trim($('#plantaDeTratamiento').val());
            let pozo = $.trim($('#pozo').val());
            let sisBomHidroCaseta = $.trim($('#sisBomHidroCaseta').val());
            let tanqueDeAgua = $.trim($('#tanqueDeAgua').val());

            if (plantaDeTratamiento != 0) {
            coleccionProductos.child(codigo).child(pep).child("Planta de tratamiento").update({
                presupuesto: plantaDeTratamiento
            });
            };
            if (pozo != 0) {
            coleccionProductos.child(codigo).child(pep).child("Pozo").update({
                presupuesto: pozo
            });
            };
            if (sisBomHidroCaseta != 0) {
            coleccionProductos.child(codigo).child(pep).child("Sis bom hidro caseta").update({
                presupuesto: sisBomHidroCaseta
            });
            };
            if (tanqueDeAgua != 0) {
            coleccionProductos.child(codigo).child(pep).child("Tanque de agua").update({
                presupuesto: tanqueDeAgua
            });
            };
        }

        if (pep == "Pep 21X-23-C") {
            let contrReplanteo = $.trim($('#contrReplanteo').val());
            if (contrReplanteo != 0) {
            coleccionProductos.child(codigo).child(pep).child("Contr Replanteo").update({
                presupuesto: contrReplanteo
            });
            };
        }

        if (pep == "Pep 21X-24-C") {
            let alineamientoINVU = $.trim($('#alineamientoINVU').val());
            let andamiaje = $.trim($('#andamiaje').val());
            let bodeguero = $.trim($('#bodeguero').val());
            let cabañasSanitarias = $.trim($('#cabañasSanitarias').val());
            let direccionTecnica = $.trim($('#direccionTecnica').val());
            let electricidadAgua = $.trim($('#electricidadAgua').val());
            let equipoDeSeguridadOcupacional = $.trim($('#equipoDeSeguridadOcupacional').val());
            let estudioDeSuelos = $.trim($('#estudioDeSuelos').val());
            let gastosLegales = $.trim($('#gastosLegales').val());
            let ingenieroResidente = $.trim($('#ingenieroResidente').val());
            let maestroDeObras = $.trim($('#maestroDeObras').val());
            let multas = $.trim($('#multas').val());
            let oficinaTemporal = $.trim($('#oficinaTemporal').val());
            let permisosMunicipales = $.trim($('#permisosMunicipales').val());
            let planillero = $.trim($('#planillero').val());
            let planosArquitectonicosMecanicos = $.trim($('#planosArquitectonicosMecanicos').val());
            let planosElectricos = $.trim($('#planosElectricos').val());
            let planosEstructurales = $.trim($('#planosEstructurales').val());
            let planosMecanicos = $.trim($('#planosMecanicos').val());
            let polizaInsRiegosDeConstruccion = $.trim($('#polizaInsRiegosDeConstruccion').val());
            let pruebasDeLaboratorio = $.trim($('#pruebasDeLaboratorio').val());
            let tasadoCFIA = $.trim($('#tasadoCFIA').val());
            let vigilancia = $.trim($('#vigilancia').val());

            if (alineamientoINVU != 0) {
            coleccionProductos.child(codigo).child(pep).child("Alineamiento INVU").update({
                presupuesto: alineamientoINVU
            });
            };
            if (andamiaje != 0) {
            coleccionProductos.child(codigo).child(pep).child("Andamiaje").update({
                presupuesto: andamiaje
            });
            };
            if (bodeguero != 0) {
            coleccionProductos.child(codigo).child(pep).child("Bodeguero").update({
                presupuesto: bodeguero
            });
            };
            if (cabañasSanitarias != 0) {
            coleccionProductos.child(codigo).child(pep).child("Cabañas Sanitarias").update({
                presupuesto: cabañasSanitarias
            });
            };
            if (direccionTecnica != 0) {
            coleccionProductos.child(codigo).child(pep).child("Direccion Tecnica").update({
                presupuesto: direccionTecnica
            });
            };
            if (electricidadAgua != 0) {
            coleccionProductos.child(codigo).child(pep).child("Electricidad y agua (servicios temporales)").update({
                presupuesto: electricidadAgua
            });
            };
            if (equipoDeSeguridadOcupacional != 0) {
            coleccionProductos.child(codigo).child(pep).child("Equipo de seguridad ocupacional").update({
                presupuesto: equipoDeSeguridadOcupacional
            });
            };
            if (estudioDeSuelos != 0) {
            coleccionProductos.child(codigo).child(pep).child("Estudio de suelos").update({
                presupuesto: estudioDeSuelos
            });
            };
            if (gastosLegales != 0) {
            coleccionProductos.child(codigo).child(pep).child("Gastos legales").update({
                presupuesto: gastosLegales
            });
            };
            if (ingenieroResidente != 0) {
            coleccionProductos.child(codigo).child(pep).child("Ingeniero Residente").update({
                presupuesto: ingenieroResidente
            });
            };
            if (maestroDeObras != 0) {
            coleccionProductos.child(codigo).child(pep).child("Maestro de obras").update({
                presupuesto: maestroDeObras
            });
            };
            if (multas != 0) {
            coleccionProductos.child(codigo).child(pep).child("Multas").update({
                presupuesto: multas
            });
            };
            if (oficinaTemporal != 0) {
            coleccionProductos.child(codigo).child(pep).child("Oficina temporal").update({
                presupuesto: oficinaTemporal
            });
            };
            if (permisosMunicipales != 0) {
            coleccionProductos.child(codigo).child(pep).child("Permisos Municipales").update({
                presupuesto: permisosMunicipales
            });
            };
            if (planillero != 0) {
            coleccionProductos.child(codigo).child(pep).child("Planillero").update({
                presupuesto: planillero
            });
            };
            if (planosArquitectonicosMecanicos != 0) {
            coleccionProductos.child(codigo).child(pep).child("Planos arquitectonicos y mecanicos").update({
                presupuesto: planosArquitectonicosMecanicos
            });
            };
            if (planosElectricos != 0) {
            coleccionProductos.child(codigo).child(pep).child("Planos electricos").update({
                presupuesto: planosElectricos
            });
            };
            if (planosEstructurales != 0) {
            coleccionProductos.child(codigo).child(pep).child("Planos estructurales").update({
                presupuesto: planosEstructurales
            });
            };
            if (planosMecanicos != 0) {
            coleccionProductos.child(codigo).child(pep).child("Planos mecanicos").update({
                presupuesto: planosMecanicos
            });
            };
            if (polizaInsRiegosDeConstruccion != 0) {
            coleccionProductos.child(codigo).child(pep).child("Poliza Ins Riegos de construcción").update({
                presupuesto: polizaInsRiegosDeConstruccion
            });
            };
            if (pruebasDeLaboratorio != 0) {
            coleccionProductos.child(codigo).child(pep).child("Pruebas de laboratorio").update({
                presupuesto: pruebasDeLaboratorio
            });
            };
            if (tasadoCFIA != 0) {
            coleccionProductos.child(codigo).child(pep).child("Tasado CFIA").update({
                presupuesto: tasadoCFIA
            });
            };
            if (vigilancia != 0) {
            coleccionProductos.child(codigo).child(pep).child("Vigilancia").update({
                presupuesto: vigilancia
            });
            };


        }
        if (pep == "Pep 21X-25-C") {
            let imprevistos = $.trim($('#imprevistos').val());
            if (imprevistos != 0) {
            coleccionProductos.child(codigo).child(pep).child("Imprevistos").update({
                presupuesto: imprevistos
            });
        };
        }
        if (pep == "Pep 21X-26-C") {
            let utilidad = $.trim($('#utilidad').val());
            if (utilidad != 0) {
            coleccionProductos.child(codigo).child(pep).child("Utilidad").update({
                presupuesto: utilidad
            });
            };
        }


        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');

        var descripcionCambio = "Se asignaron los presupuestos en cuentas del " + pep + " del proyecto " + codigo;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "AsignaPresupuesto " + pep + " " + codigo;
                    var email = user.email;
                    console.log(email);
                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: pep,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio


                    });
                }

            }
        });



        location.reload();
    });
    //Botones
    $('#btnNuevo').click(function () {
        $('#id').val('');
        $('#codigo').val('');
        $('#pep').val('');
        $('#cuenta').val('');
        $('#presupuesto').val('');
        $('#instalProvis').val('');
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });

    $("#tablaProductos").on("click", ".btnEditar", function () {
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];
        console.log(id);
        let codigo = $(this).closest('tr').find('td:eq(0)').text();
        let pep = $(this).closest('tr').find('td:eq(1)').text();
        let cuenta = $(this).closest('tr').find('td:eq(2)').text();
        let presupuesto = $(this).closest('tr').find('td:eq(3)').text();
        let descripcion = $(this).closest('tr').find('td:eq(4)').text();
        let cantidad = parseInt($(this).closest('tr').find('td:eq(5)').text());
        let proveedor = $(this).closest('tr').find('td:eq(6)').text();
        let factura = $(this).closest('tr').find('td:eq(7)').text();
        $('#idEdit').val(id);
        $('#codigoEdit').val(codigo);
        $('#pepEdit').val(pep);
        $('#cuentaEdit').val(cuenta);
        $('#presupuestoEdit').val(presupuesto);

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

        $('#modalBalance').modal('show');

    });
    
    $('#nuevaMoneda').click(function () {
        $('#moneda').val('');
        $('#modalMoneda').modal('show');
    });
    
    $('#btnBalance').click(function () {
      
        let codigoEdit = $.trim($('#codigoEdit').val()); 
        let pepEdit = $.trim($('#pepEdit').val());
        let cuentaEdit = $.trim($('#cuentaEdit').val()); 
        let presupuestoEdit =$.trim($('#presupuestoEdit').val());
        presupuestoEdit = parseFloat( presupuestoEdit.slice(1));
        let pepBalance = $.trim($('#pepBalance').val());
        let cuentaBalance = $.trim($('#cuentaBalance').val());
        let presupuestoEnviado = parseFloat($.trim($('#presupuestoEnviado').val()));
        presupuestoRestante = presupuestoEdit - presupuestoEnviado;
       

        if (pepBalance == "pep01") {
            pepBalance = "Pep 21X-01-C";
        } else
            if (pepBalance == "pep02") {
                pepBalance = "Pep 21X-02-C";
            } else
                if (pepBalance == "pep03") {
                    pepBalance = "Pep 21X-03-C";
                } else
                    if (pepBalance == "pep04") {
                        pepBalance = "Pep 21X-04-C";
                    } else
                        if (pepBalance == "pep05") {
                            pepBalance = "Pep 21X-05-C";
                        } else
                            if (pepBalance == "pep06") {
                                pepBalance = "Pep 21X-06-C";
                            } else
                                if (pepBalance == "pep07") {
                                    pepBalance = "Pep 21X-07-C";
                                } else
                                    if (pepBalance == "pep08") {
                                        pepBalance = "Pep 21X-08-C";
                                    } else
                                        if (pepBalance == "pep09") {
                                            pepBalance = "Pep 21X-09-C";
                                        } else
                                            if (pepBalance == "pep10") {
                                                pepBalance = "Pep 21X-10-C";
                                            } else
                                                if (pepBalance == "pep11") {
                                                    pepBalance = "Pep 21X-11-C";
                                                } else
                                                    if (pepBalance == "pep12") {
                                                        pepBalance = "Pep 21X-12-C";
                                                    } else
                                                        if (pepBalance == "pep13") {
                                                            pepBalance = "Pep 21X-13-C";
                                                        } else
                                                            if (pepBalance == "pep14") {
                                                                pepBalance = "Pep 21X-14-C";
                                                            } else
                                                                if (pepBalance == "pep15") {
                                                                    pepBalance = "Pep 21X-15-C";
                                                                } else
                                                                    if (pepBalance == "pep16") {
                                                                        pepBalance = "Pep 21X-16-C";
                                                                    } else
                                                                        if (pepBalance == "pep17") {
                                                                            pepBalance = "Pep 21X-17-C";
                                                                        } else
                                                                            if (pepBalance == "pep18") {
                                                                                pepBalance = "Pep 21X-18-C";
                                                                            } else
                                                                                if (pepBalance == "pep19") {
                                                                                    pepBalance = "Pep 21X-19-C";
                                                                                } else
                                                                                    if (pepBalance == "pep20") {
                                                                                        pepBalance = "Pep 21X-20-C";
                                                                                    } else
                                                                                        if (pepBalance == "pep21") {
                                                                                            pepBalance = "Pep 21X-21-C";
                                                                                        } else
                                                                                            if (pepBalance == "pep22") {
                                                                                                pepBalance = "Pep 21X-2-C";
                                                                                            } else
                                                                                                if (pepBalance == "pep23") {
                                                                                                    pepBalance = "Pep 21X-23-C";
                                                                                                } else
                                                                                                    if (pepBalance == "pep24") {
                                                                                                        pepBalance = "Pep 21X-24-C";
                                                                                                    } else
                                                                                                        if (pepBalance == "pep25") {
                                                                                                            pepBalance = "Pep 21X-25-C";
                                                                                                        } else
                                                                                                            if (pepBalance == "pep26") {
                                                                                                                pepBalance = "Pep 21X-26-C";
         console.log(pepEdit);
        console.log(cuentaEdit);                                                                                                   }
        cuentaBalance = cuentaBalance.slice(13, -1);

        
        // Adaptar direccion de PEP'
        var adaptarDireccionPep = pepEdit.slice(0, 15);     
        var direcExtracto1 = adaptarDireccionPep.slice(0, 6);
        var direcExtracto2 = adaptarDireccionPep.slice(-5);

        var direccionPep = direcExtracto1 + "X" + direcExtracto2;

         // Adaptar direccion de Cuenta'
        var direccionCuenta = cuentaEdit.slice(0, -13);

      
        console.log(direccionPep);
        console.log(direccionCuenta);
        coleccionProductos.child(codigoEdit).child(direccionPep).child(direccionCuenta).update({
            presupuesto: presupuestoRestante
        });


        coleccionProductos.child(codigoEdit).child(pepBalance).child(cuentaBalance).once("value", function (snap) {

            presupuestoAnterior = snap.val().presupuesto;

            presupuestoNuevo = presupuestoAnterior + presupuestoEnviado;

        coleccionProductos.child(codigoEdit).child(pepBalance).child(cuentaBalance).update({
            presupuesto: presupuestoNuevo
        });

        });
        $('#modalBalance').modal('hide');
     
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

    addOptions("pepBalance", array);

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

    var provincias = document.getElementById('pepBalance');
    var pueblos = document.getElementById('cuentaBalance');
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