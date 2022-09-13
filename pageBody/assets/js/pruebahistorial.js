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

    var db = firebase.database();
    var coleccionProductos = db.ref().child("proyectos");

    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#tablaProductos').DataTable({
        pageLength: 10,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: dataSet,
        columnDefs: [
            {
                targets: [0],
                visible: false, //ocultamos la columna de ID que es la [0]                        
            },

        ]
    });














    var coleccionProductos = db.ref().child("historial");

    coleccionProductos.on("child_added", datos => {
        dataSet = [datos.key, datos.child("fecha").val(), datos.child("email").val(), datos.child("descripcionCambio").val()];
        table.rows.add([dataSet]).draw();
    });





});