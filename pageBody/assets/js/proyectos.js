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
                /* $('td', row).eq(5).css({
                    'background-color':'#ff5252',
                    'color':'white', 
                }); */

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
            //alert("La tabla se está recargando"); 
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
                //<button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button>
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



});