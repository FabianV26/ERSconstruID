$(document).ready(function () {
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

    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    //creamos constantes para los iconos editar y borrar    
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

    var db = firebase.database();
    var coleccionProductos = db.ref().child("proyectos"); 
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const añoActual = fecha.getFullYear();


  
    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $("#tablaProductos").DataTable({
        "createdRow": function (row, data, index) {
            //pintar una celda
            
            if (data[8] <= -1) {
               

                //pintar una fila
                $('td', row).css({
                    'background-color': '#000000',
                    'color': '#000000',
                    'border-style': 'solid',
                    'border-color': '#000000'
                });
            }
        },
        "drawCallback": function () {
  
            var api = this.api();
            $(api.column(4).footer()).html(
                'Total: ' + api.column(4, { page: 'current' }).data().sum()
            )
            $(api.column(5).footer()).html(
                'Total: ' + api.column(5, { page: 'current' }).data().sum()
            )
            $(api.column(6).footer()).html(
                'Total: ' + api.column(6, { page: 'current' }).data().sum()
            )
            $(api.column(7).footer()).html(
                'Total: ' + api.column(7, { page: 'current' }).data().sum()
            )
            $(api.column(8).footer()).html(
                'Total: ' + api.column(8, { page: 'current' }).data().sum()
            )
        },
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: dataSet,
        
        columnDefs: [
            {
                targets: [0],
                visible: false, //ocultamos la columna de ID que es la [0]                        
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" + iconoBorrar + "</button></div></div>"
               
            }
        ]
    });

    
    var scores = [];
    var $select = $('#codigo');
    db.ref("proyectos").once("value", function (snap) {
        snap.forEach(function (childSnap) {
            scores.push(childSnap.val());
            $select.append('<option>' + childSnap.val().nombre + '</option>');

        });
    });

   
    db.ref("moneda").once("value", function (snap) {

        actual = snap.val().actual;


        db.ref("moneda").child(actual).once("value", function (snap) {


            cambio = snap.val().cambio;
            simbolo = snap.val().simbolo;


        });

        
    coleccionProductos.on("child_added", datos => {
        dataSet = [datos.key, datos.child("codigo").val(), datos.child("descripcion").val(), datos.child("nombre").val(), simbolo + (new Intl.NumberFormat('ru-RU',).format(datos.child("presupuestos").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("gastos").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("disponible").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("pagado").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("deuda").val() / cambio))];
        table.rows.add([dataSet]).draw();
        

    });
    coleccionProductos.on('child_changed', datos => {
        dataSet = [datos.key, datos.child("codigo").val(), datos.child("descripcion").val(), datos.child("nombre").val(), simbolo + (new Intl.NumberFormat('ru-RU',).format(datos.child("presupuestos").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("gastos").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("disponible").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("pagado").val() / cambio)), simbolo + (new Intl.NumberFormat('ru-RU').format(datos.child("deuda").val() / cambio))];
        table.row(filaEditada).data(dataSet).draw();
        
    });
    coleccionProductos.on("child_removed", function () {
        table.row(filaEliminada.parents('tr')).remove().draw();
    });

    });



    $('#crear').submit(function (e) {
        e.preventDefault();
        var contaCodigo = 1;
        db.ref("proyectos").once("value", function (snap) {
            snap.forEach(function (childSnap) {
                console.log("hola");
                contaCodigo = (contaCodigo + 1);

                console.log(contaCodigo);

            });
        });

        let id = $.trim($('#nombre').val());
        let codigo = $.trim($('#codigo').val());
        let descripcion = $.trim($('#descripcion').val());
        let nombre = $.trim($('#nombre').val());
        let idFirebase = id;

        if (idFirebase == '') {
            idFirebase = coleccionProductos.push().key;
        };

        data = { codigo: codigo, descripcion: descripcion, nombre: nombre, presupuestos: 0, gastos: 0, disponible: 0, deuda: 0, pagado: 0 };

        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProductos.update(actualizacionData);
        id = '';

        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');

        var identificador = "";
        if (codigo >= 10) {
            identificador = codigo;
        } else {
            identificador = "0" + codigo;
        }
        //PEP 01----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-01-C").child("Instal provis").set({
            codigo: "Instal provis",
            nombre: "5063009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-01-C",
            indentificador: ("Pep 21" + identificador + "-01-C / Obras Preliminares"),
            gastos: 0,
            disponible: 0,

        });


        //PEP 02----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-02-C").child("Acero").set({
            codigo: "Acero",
            nombre: "5061002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-02-C",
            indentificador: "Pep 21" + identificador + "-02-C / Fundaciones",
            gastos: 0,
            disponible: 0,
        });

        coleccionProductos.child(nombre).child("Pep 21X-02-C").child("Concreto").set({
            codigo: "Concreto",
            nombre: "5062004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-02-C",
            indentificador: ("Pep 21" + identificador + "-02-C / Fundaciones"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-02-C").child("Malla Electrosoldada").set({
            codigo: "Malla Electrosoldada",
            nombre: "5064004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-02-C",
            indentificador: ("Pep 21" + identificador + "-02-C / Fundaciones"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-02-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-02-C",
            indentificador: ("Pep 21" + identificador + "-02-C / Fundaciones"),
            gastos: 0,
            disponible: 0,
        });


        //PEP 03----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-03-C").child("Acero").set({
            codigo: "Acero",
            nombre: "5061002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-03-C",
            indentificador: ("Pep 21" + identificador + "-03-C / Estructura y escaleras"),
            gastos: 0,
            disponible: 0,
        });

        coleccionProductos.child(nombre).child("Pep 21X-03-C").child("Concreto").set({
            codigo: "Concreto",
            nombre: "5062004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-03-C",
            indentificador: ("Pep 21" + identificador + "-03-C / Estructura y escalera"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-03-C").child("Malla Electrosoldada").set({
            codigo: "Malla Electrosoldada",
            nombre: "5064004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-03-C",
            indentificador: ("Pep 21" + identificador + "-03-C / Estructura y escalera"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-03-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-03-C",
            indentificador: ("Pep 21" + identificador + "-03-C / Estructura y escalera"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-03-C").child("Encofrados").set({
            codigo: "Encofrados",
            nombre: "5063005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-03-C",
            indentificador: ("Pep 21" + identificador + "-03-C / Estructura y escalera"),
            gastos: 0,
            disponible: 0,
        });



        //PEP 04----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-04-C").child("Acero").set({
            codigo: "Acero",
            nombre: "5061002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-04-C",
            indentificador: ("Pep 21" + identificador + "-04-C / Entrepiso"),
            gastos: 0,
            disponible: 0,
        });

        coleccionProductos.child(nombre).child("Pep 21X-04-C").child("Concreto").set({
            codigo: "Concreto",
            nombre: "5062004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-04-C",
            indentificador: ("Pep 21" + identificador + "-04-C / Entrepiso"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-04-C").child("Malla Electrosoldada").set({
            codigo: "Malla Electrosoldada",
            nombre: "5064004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-04-C",
            indentificador: ("Pep 21" + identificador + "-04-C / Entrepiso"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-04-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-04-C",
            indentificador: ("Pep 21" + identificador + "-04-C / Entrepiso"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-04-C").child("Entrepiso Liviano").set({
            codigo: "Entrepiso Liviano",
            nombre: "5063006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-04-C",
            indentificador: ("Pep 21" + identificador + "-04-C / Entrepiso"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-04-C").child("Encofrados").set({
            codigo: "Encofrados",
            nombre: "5063005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-04-C",
            indentificador: ("Pep 21" + identificador + "-04-C / Entrepiso"),
            gastos: 0,
            disponible: 0,
        });

        //PEP 05----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-05-C").child("Acero").set({
            codigo: "Acero",
            nombre: "5061002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-05-C",
            indentificador: ("Pep 21" + identificador + "-05-C / Techos - Impermeabilizaciones"),
            gastos: 0,
            disponible: 0,
        });

        coleccionProductos.child(nombre).child("Pep 21X-05-C").child("Cúpulas, manto y otros").set({
            codigo: "Cúpulas, manto y otros",
            nombre: "5063003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-05-C",
            indentificador: ("Pep 21" + identificador + "-05-C / Techos - Impermeabilizaciones"),
            gastos: 0,
            disponible: 0,
        });

        coleccionProductos.child(nombre).child("Pep 21X-05-C").child("Contr Cubierta He y Policarbonato").set({
            codigo: "Contr Cubierta He y Policarbonato",
            nombre: "5062006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-05-C",
            indentificador: ("Pep 21" + identificador + "-05-C / Techos - Impermeabilizaciones"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-05-C").child("Tejas").set({
            codigo: "Tejas",
            nombre: "5067004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-05-C",
            indentificador: ("Pep 21" + identificador + "-05-C / Techos - Impermeabilizaciones"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-05-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-05-C",
            indentificador: ("Pep 21" + identificador + "-05-C / Techos - Impermeabilizaciones"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 06----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Pared interna liviana").set({
            codigo: "Pared interna liviana",
            nombre: "5065003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Repellos y pasta").set({
            codigo: "Repellos y pasta",
            nombre: "5066005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Enchapes").set({
            codigo: "Enchapes",
            nombre: "5063004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Pintura Fachada").set({
            codigo: "Pintura Fachada",
            nombre: "5065005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Boceles y pulidos").set({
            codigo: "Boceles y pulidos",
            nombre: "5061007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Pared externa liviana").set({
            codigo: "Pared externa liviana",
            nombre: "5065002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Pintura Interna").set({
            codigo: "Pintura Interna",
            nombre: "5065006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-06-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-06-C",
            indentificador: ("Pep 21" + identificador + "-06-C / Revestimiento y Acabados"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 07----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-07-C").child("Contr vidri y alumin").set({
            codigo: "Contr vidri y alumin",
            nombre: "5062007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-07-C",
            indentificador: ("Pep 21" + identificador + "-07-C / Herreria, vidrios y aluminio"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-07-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-07-C",
            indentificador: ("Pep 21" + identificador + "-07-C / Herreria, vidrios y aluminio"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 08----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-08-C").child("Marcos para puertas").set({
            codigo: "Marcos para puertas",
            nombre: "5064007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-08-C",
            indentificador: ("Pep 21" + identificador + "-08-C / Carpinteria, Puertas y Cerrajería"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-08-C").child("Puertas y portones").set({
            codigo: "Puertas y portones",
            nombre: "5064007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-08-C",
            indentificador: ("Pep 21" + identificador + "-08-C / Carpinteria, Puertas y Cerrajería"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-08-C").child("Llavines").set({
            codigo: "Llavines",
            nombre: "5064003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-08-C",
            indentificador: ("Pep 21" + identificador + "-08-C / Carpinteria, Puertas y Cerrajería"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-08-C").child("Rodapie").set({
            codigo: "Rodapie",
            nombre: "5066006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-08-C",
            indentificador: ("Pep 21" + identificador + "-08-C / Carpinteria, Puertas y Cerrajería"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 09----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-09-C").child("Cables conduc y acc").set({
            codigo: "Cables conduc y acc",
            nombre: "5061009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-09-C",
            indentificador: ("Pep 21" + identificador + "-09-C / Instalaciones eléctricas"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-09-C").child("Piezas eléc y acces").set({
            codigo: "Piezas eléc y acces",
            nombre: "5065004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-09-C",
            indentificador: ("Pep 21" + identificador + "-09-C / Instalaciones eléctricas"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-09-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-09-C",
            indentificador: ("Pep 21" + identificador + "-09-C / Instalaciones eléctricas"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 10----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-10-C").child("Pzas sanit grif acc").set({
            codigo: "Pzas sanit grif acc",
            nombre: "5066003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-10-C",
            indentificador: ("Pep 21" + identificador + "-10-C / Instalaciones sanitarias"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-10-C").child("Sumin y coloc tuberi").set({
            codigo: "Sumin y coloc tuberi",
            nombre: "5067001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-10-C",
            indentificador: ("Pep 21" + identificador + "-10-C / Instalaciones sanitarias"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-10-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-10-C",
            indentificador: ("Pep 21" + identificador + "-10-C / Instalaciones sanitarias"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 11----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-11-C").child("Closets").set({
            codigo: "Closets",
            nombre: "5062003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-11-C",
            indentificador: ("Pep 21" + identificador + "-11-C / Equipamiento Interno"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-11-C").child("Muebles de cocina y baño").set({
            codigo: "Muebles de cocina y baño",
            nombre: "5064008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-11-C",
            indentificador: ("Pep 21" + identificador + "-11-C / Equipamiento Interno"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-11-C").child("Sobres granito y marmol").set({
            codigo: "Sobres granito y marmol",
            nombre: "5066008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-11-C",
            indentificador: ("Pep 21" + identificador + "-11-C / Equipamiento Interno"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 12----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-12-C").child("Arboriz ornat jardin").set({
            codigo: "Arboriz ornat jardin",
            nombre: "5061005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-12-C",
            indentificador: ("Pep 21" + identificador + "-12-C / Equipamiento Externo"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-12-C").child("Muebles externos concreto").set({
            codigo: "Muebles externos concreto",
            nombre: "5064009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-12-C",
            indentificador: ("Pep 21" + identificador + "-12-C / Equipamiento Externo"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 13----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-13-C").child("Canal Acc Vehic Serv").set({
            codigo: "Canal Acc Vehic Serv",
            nombre: "5062001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-13-C",
            indentificador: ("Pep 21" + identificador + "-13-C / Obras Exteriores"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-13-C").child("Cerca, Tapia y o Muros").set({
            codigo: "Cerca, Tapia y o Muros",
            nombre: "5062002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-13-C",
            indentificador: ("Pep 21" + identificador + "-13-C / Obras Exteriores"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-13-C").child("Cuarto de basura").set({
            codigo: "Cuarto de basura",
            nombre: "5063002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-13-C",
            indentificador: ("Pep 21" + identificador + "-13-C / Obras Exteriores"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-13-C").child("Piscina").set({
            codigo: "Piscina",
            nombre: "5065007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-13-C",
            indentificador: ("Pep 21" + identificador + "-13-C / Obras Exteriores"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 14----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-14-C").child("Herram-equip menores").set({
            codigo: "Herram-equip menores",
            nombre: "5063007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-14-C",
            indentificador: ("Pep 21" + identificador + "-14-C / Equipos Menores"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-14-C").child("Limpieza general").set({
            codigo: "Limpieza general",
            nombre: "5064002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-14-C",
            indentificador: ("Pep 21" + identificador + "-14-C / Equipos Menores"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-14-C").child("Alquiler Maq y Equip").set({
            codigo: "Alquiler Maq y Equip",
            nombre: "5061004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-14-C",
            indentificador: ("Pep 21" + identificador + "-14-C / Equipos Menores"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 15----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-15-C").child("Conf lastr pied tier").set({
            codigo: "Conf lastr pied tier",
            nombre: "5062005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-15-C",
            indentificador: ("Pep 21" + identificador + "-15-C / Movimiento de Tierra"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-15-C").child("Corte y acarreo").set({
            codigo: "Corte y acarreo",
            nombre: "5063001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-15-C",
            indentificador: ("Pep 21" + identificador + "-15-C / Movimiento de Tierra"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-15-C").child("Relleno y compactación").set({
            codigo: "Relleno y compactación",
            nombre: "5066004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-15-C",
            indentificador: ("Pep 21" + identificador + "-15-C / Movimiento de Tierra"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-15-C").child("Muro Gavion").set({
            codigo: "Muro Gavion",
            nombre: "5065001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-15-C",
            indentificador: ("Pep 21" + identificador + "-15-C / Movimiento de Tierra"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 16----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-16-C").child("Sumid bocas visita").set({
            codigo: "Sumid bocas visita",
            nombre: "5066009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-16-C",
            indentificador: ("Pep 21" + identificador + "-16-C / Cloacas"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-16-C").child("Sumin y coloc tuberi").set({
            codigo: "Sumin y coloc tuberi",
            nombre: "5067001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-16-C",
            indentificador: ("Pep 21" + identificador + "-16-C / Cloacas"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-16-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-16-C",
            indentificador: ("Pep 21" + identificador + "-16-C / Cloacas"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-16-C").child("Relleno y compactación").set({
            codigo: "Relleno y compactación",
            nombre: "5066004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-16-C",
            indentificador: ("Pep 21" + identificador + "-16-C / Cloacas"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 17----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-17-C").child("Sumin y coloc tuberi").set({
            codigo: "Sumin y coloc tuberi",
            nombre: "5067001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-17-C",
            indentificador: ("Pep 21" + identificador + "-17-C / Acueducto"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-17-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-17-C",
            indentificador: ("Pep 21" + identificador + "-17-C / Acueducto"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-17-C").child("Relleno y compactación").set({
            codigo: "Relleno y compactación",
            nombre: "5066004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-17-C",
            indentificador: ("Pep 21" + identificador + "-17-C / Acueducto"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-17-C").child("Hidrantes y siamesas").set({
            codigo: "Hidrantes y siamesas",
            nombre: "5063008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-17-C",
            indentificador: ("Pep 21" + identificador + "-17-C / Acueducto"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 18----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-18-C").child("Sumid bocas visita").set({
            codigo: "Sumid bocas visita",
            nombre: "5066009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-18-C",
            indentificador: ("Pep 21" + identificador + "-18-C / Drenajes"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-18-C").child("Sumin y coloc tuberi").set({
            codigo: "Sumin y coloc tuberi",
            nombre: "5067001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-18-C",
            indentificador: ("Pep 21" + identificador + "-18-C / Drenajes"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-18-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-18-C",
            indentificador: ("Pep 21" + identificador + "-18-C / Drenajes"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-18-C").child("Relleno y compactación").set({
            codigo: "Relleno y compactación",
            nombre: "5066004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-18-C",
            indentificador: ("Pep 21" + identificador + "-18-C / Drenajes"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 19----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-19-C").child("Cables, conduc y acc").set({
            codigo: "Cables, conduc y acc",
            nombre: "5061009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-19-C",
            indentificador: ("Pep 21" + identificador + "-19-C / Electricidad Urbana"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-19-C").child("Poste estruc y lumin").set({
            codigo: "Poste estruc y lumin",
            nombre: "5065009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-19-C",
            indentificador: ("Pep 21" + identificador + "-19-C / Electricidad Urbana"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-19-C").child("Sumin y coloc tuberi").set({
            codigo: "Sumin y coloc tuberi",
            nombre: "5067001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-19-C",
            indentificador: ("Pep 21" + identificador + "-19-C / Electricidad Urbana"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-19-C").child("Tanquillas").set({
            codigo: "Tanquillas",
            nombre: "5067003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-19-C",
            indentificador: ("Pep 21" + identificador + "-19-C / Electricidad Urbana"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-19-C").child("Contrato elec urbana").set({
            codigo: "Contrato elec urbana",
            nombre: "5062009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-19-C",
            indentificador: ("Pep 21" + identificador + "-19-C / Electricidad Urbana"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-19-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-19-C",
            indentificador: ("Pep 21" + identificador + "-19-C / Electricidad Urbana"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-19-C").child("Relleno y compactación").set({
            codigo: "Relleno y compactación",
            nombre: "5066004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-19-C",
            indentificador: ("Pep 21" + identificador + "-19-C / Electricidad Urbana"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 20----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-20-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-20-C",
            indentificador: ("Pep 21" + identificador + "-20-C / Aceras, Brocales"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-20-C").child("Aceras y caminerias").set({
            codigo: "Aceras y caminerias",
            nombre: "5061001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-20-C",
            indentificador: ("Pep 21" + identificador + "-20-C / Aceras, Brocales"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-20-C").child("Brocales").set({
            codigo: "Brocales",
            nombre: "5061008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-20-C",
            indentificador: ("Pep 21" + identificador + "-20-C / Aceras, Brocales"),
            gastos: 0,
            disponible: 0,
        });

        //PEP 21----------------------------------------------------------------------------

        coleccionProductos.child(nombre).child("Pep 21X-21-C").child("Asfalto").set({
            codigo: "Asfalto",
            nombre: "5061006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-21-C",
            indentificador: ("Pep 21" + identificador + "-21-C / Vialidad y Estacionamiento"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-21-C").child("Adoquin").set({
            codigo: "Adoquin",
            nombre: "5061003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-21-C",
            indentificador: ("Pep 21" + identificador + "-21-C / Vialidad y Estacionamiento"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-21-C").child("Concreto").set({
            codigo: "Concreto",
            nombre: "5062004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-21-C",
            indentificador: ("Pep 21" + identificador + "-21-C / Vialidad y Estacionamiento"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-21-C").child("Mano de obra").set({
            codigo: "Mano de obra",
            nombre: "5064006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-21-C",
            indentificador: ("Pep 21" + identificador + "-21-C / Vialidad y Estacionamiento"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-21-C").child("Lastre").set({
            codigo: "Lastre",
            nombre: "5064001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-21-C",
            indentificador: ("Pep 21" + identificador + "-21-C / Vialidad y Estacionamiento"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 22----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-22-C").child("Planta de tratamiento").set({
            codigo: "Planta de tratamiento",
            nombre: "5065008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-22-C",
            indentificador: ("Pep 21" + identificador + "-22-C / Incorporacion de servicios"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-22-C").child("Pozo").set({
            codigo: "Pozo",
            nombre: "5066001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-22-C",
            indentificador: ("Pep 21" + identificador + "-22-C / Incorporacion de servicios"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-22-C").child("Sis bom hidro caseta").set({
            codigo: "Sis bom hidro caseta",
            nombre: "5067002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-22-C",
            indentificador: ("Pep 21" + identificador + "-22-C / Incorporacion de servicios"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-22-C").child("Tanque de agua").set({
            codigo: "Tanque de agua",
            nombre: "5067002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-22-C",
            indentificador: ("Pep 21" + identificador + "-22-C / Incorporacion de servicios"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 23----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-23-C").child("Contr Replanteo").set({
            codigo: "Contr Replanteo",
            nombre: "5062008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-23-C",
            indentificador: ("Pep 21" + identificador + "-23-C / Topografia"),
            gastos: 0,
            disponible: 0,
        });
        //PEP 24----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Alineamiento INVU").set({
            codigo: "Alineamiento INVU",
            nombre: "5067005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Andamiaje").set({
            codigo: "Andamiaje",
            nombre: "5067006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Bodeguero").set({
            codigo: "Bodeguero",
            nombre: "5067007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });

        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Cabañas Sanitarias").set({
            codigo: "Cabañas Sanitarias",
            nombre: "5067008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Direccion Tecnica").set({
            codigo: "Direccion Tecnica",
            nombre: "5067009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Electricidad y agua (servicios temporales)").set({
            codigo: "Electricidad y agua (servicios temporales)",
            nombre: "5068001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Equipo de seguridad ocupacional").set({
            codigo: "Equipo de seguridad ocupacional",
            nombre: "5068002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Estudio de suelos").set({
            codigo: "Estudio de suelos",
            nombre: "5068003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Gastos legales").set({
            codigo: "Gastos legales",
            nombre: "5068004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Ingeniero Residente").set({
            codigo: "Ingeniero Residente",
            nombre: "5068005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Maestro de obras").set({
            codigo: "Maestro de obras",
            nombre: "5068006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Multas").set({
            codigo: "Multas",
            nombre: "5068007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Oficina temporal").set({
            codigo: "Oficina temporal",
            nombre: "5068008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Permisos Municipales").set({
            codigo: "Permisos Municipales",
            nombre: "5068009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Planillero").set({
            codigo: "Planillero",
            nombre: "5069001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Planos arquitectonicos y mecanicos").set({
            codigo: "Planos arquitectonicos y mecanicos",
            nombre: "5069002000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Planos electricos").set({
            codigo: "Planos electricos",
            nombre: "5069003000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Planos estructurales").set({
            codigo: "Planos estructurales",
            nombre: "5069004000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Planos mecanicos").set({
            codigo: "Planos mecanicos",
            nombre: "5069005000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Poliza Ins Riegos de construcción").set({
            codigo: "Poliza Ins Riegos de construcción",
            nombre: "5069006000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Pruebas de laboratorio").set({
            codigo: "Pruebas de laboratorio",
            nombre: "5069007000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Tasado CFIA").set({
            codigo: "Tasado CFIA",
            nombre: "5069008000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });
        coleccionProductos.child(nombre).child("Pep 21X-24-C").child("Vigilancia").set({
            codigo: "Vigilancia",
            nombre: "5069009000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-24-C",
            indentificador: ("Pep 21" + identificador + "-24-C / Indirectos"),
            gastos: 0,
            disponible: 0,
        });

        //PEP 25----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-25-C").child("Imprevistos").set({
            codigo: "Imprevistos",
            nombre: "5070000000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-25-C",
            indentificador: ("Pep 21" + identificador + "-25-C / Imprevistos"),
            gastos: 0,
            disponible: 0,
        });

        //PEP 26----------------------------------------------------------------------------
        coleccionProductos.child(nombre).child("Pep 21X-26-C").child("Utilidad").set({
            codigo: "Utilidad",
            nombre: "5070001000",
            presupuesto: 0,
            proyecto: nombre,
            pep: "Pep 21X-26-C",
            indentificador: ("Pep 21" + identificador + "-26-C / Utilidad"),
            gastos: 0,
            disponible: 0,
        });


        var descripcionCambio = "Se creó el proyecto: " + nombre;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "CreaProyecto " + nombre;
                    var email = user.email;
                    console.log(email);
                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: nombre,
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
        $('#descripcion').val('');
        $('#nombre').val('');
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });



    $("#tablaProductos").on("click", ".btnEditar", function () {
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];
        console.log(id);
        let codigo = $(this).closest('tr').find('td:eq(0)').text();
        let descripcion = $(this).closest('tr').find('td:eq(1)').text();
        let nombre = $(this).closest('tr').find('td:eq(2)').text();
        $('#id').val();
        $('#codigo').val(codigo);
        $('#descripcion').val(descripcion);
        $('#nombre').val(nombre);
        $('#modalAltaEdicion').modal('show');
    });

    $("#tablaProductos").on("click", ".btnBorrar", function () {
        filaEliminada = $(this);
        Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
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
                db.ref(`productos/${id}`).remove()
                Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success')
            }
        })
    });


  

});

function asignarProyecto() {

    var codigo = document.getElementById('codigo');
    var opcion = codigo.value;
    console.log(opcion);

    return (opcion);

    
}