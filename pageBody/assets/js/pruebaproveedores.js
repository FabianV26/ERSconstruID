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
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const añoActual = fecha.getFullYear();
    var db = firebase.database();
    var coleccionProductos = db.ref().child("proveedores");

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
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" + iconoBorrar + "</button></div></div>"
            }
        ]
    });

    coleccionProductos.on("child_added", datos => {
        dataSet = [datos.key, datos.child("codigo").val(), datos.child("correo").val(), datos.child("telefono").val(), datos.child("identificacion").val(), datos.child("direccion").val()];
        table.rows.add([dataSet]).draw();
    });
    coleccionProductos.on('child_changed', datos => {
        dataSet = [datos.key, datos.child("codigo").val(), datos.child("correo").val(), datos.child("telefono").val(), datos.child("identificacion").val(), datos.child("direccion").val()];
        table.row(filaEditada).data(dataSet).draw();
    });
    coleccionProductos.on("child_removed", function () {
        table.row(filaEliminada.parents('tr')).remove().draw();
    });

    $('form').submit(function (e) {
        e.preventDefault();
        let id = $.trim($('#id').val());
        let codigo = $.trim($('#codigo').val());
        let correo = $.trim($('#correo').val());
        let telefono = $.trim($('#telefono').val());
        let identificacion = $.trim($('#identificacion').val());
        let direccion = $.trim($('#direccion').val());
        let idFirebase = id;
        if (idFirebase == '') {
            idFirebase = coleccionProductos.push().key;
        };
        data = { codigo: codigo, id: idFirebase, correo: correo, telefono: telefono, identificacion: identificacion, direccion: direccion };
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProductos.update(actualizacionData);
        id = '';
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');

        var descripcionCambio = "Se creó el proveedor: " + codigo;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "CreaProveedor " + codigo;
                    var email = user.email;
                    console.log(email);
                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: codigo,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio


                    });
                }

            }
        });
    });

    //Botones
    $('#btnNuevo').click(function () {
        $('#id').val('');
        $('#codigo').val('');
        $('#correo').val('');
        $('#telefono').val('');
        $('#identificacion').val('');
        $('#direccion').val('');
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });

    $("#tablaProductos").on("click", ".btnEditar", function () {
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];
        console.log(id);
        let codigo = $(this).closest('tr').find('td:eq(0)').text();
        let correo = $(this).closest('tr').find('td:eq(1)').text();
        let telefono = $(this).closest('tr').find('td:eq(2)').text();
        let identificacion = $(this).closest('tr').find('td:eq(3)').text();
        let direccion = $(this).closest('tr').find('td:eq(4)').text();
        $('#id').val(id);
        $('#codigo').val(codigo);
        $('#correo').val(correo);
        $('#telefono').val(telefono);
        $('#identificacion').val(identificacion);
        $('#direccion').val(direccion);
        $('#modalAltaEdicion').modal('show');

        var descripcionCambio = "Se editó el proveedor: " + codigo;
        var fecha = hoy + "/" + mesActual + "/" + añoActual;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var user = firebase.auth().currentUser;

                if (user != null) {

                    var direccion = "EditaProveedor " + codigo;
                    var email = user.email;
                    console.log(email);
                    db.ref().child("historial").child(direccion).set({
                        email: email,
                        nombre: codigo,
                        fecha: fecha,
                        descripcionCambio: descripcionCambio


                    });
                }

            }
        });
    });

    $("#tablaProductos").on("click", ".btnBorrar", function () {
        filaEliminada = $(this);
        Swal.fire({
            title: '¿Está seguro de eliminar este proveedor?',
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
                let nombre = fila[1];

                var descripcionCambio = "Se eliminó el proveedor: " + nombre;
                var fecha = hoy + "/" + mesActual + "/" + añoActual;
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // User is signed in.
                        var user = firebase.auth().currentUser;

                        if (user != null) {

                            var dirección = "Eliminaproveedor " + nombre;
                            var email = user.email;
                            console.log(email);
                            db.ref().child("historial").child(dirección).set({
                                email: email,
                                nombre: nombre,
                                fecha: fecha,
                                descripcionCambio: descripcionCambio


                            });
                        }

                    }
                });
                db.ref(`proveedores/${id}`).remove()
                Swal.fire('¡Eliminado!', 'El proveedor ha sido eliminado.', 'success')
            }
        })
    });

});