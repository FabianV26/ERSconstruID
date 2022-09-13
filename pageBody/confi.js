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
    var coleccionProductos = db.ref().child("moneda");

    db.ref("moneda").child("dolares").once("value", function (snap) {
      
            cambio = snap.val().cambio;
        console.log(cambio);

        document.getElementById('dolar').value = cambio;


    });

    db.ref("moneda").child("euros").once("value", function (snap) {

        cambio = snap.val().cambio;
        console.log(cambio);

        document.getElementById('euro').value = cambio;


    });
    
    db.ref("moneda").once("value", function (snap) {

        cambio = snap.val().iva;
        console.log(cambio);

        document.getElementById('iva').value = cambio;


    });

    db.ref("moneda").once("value", function (snap) {

        actual = snap.val().actual;
       

        document.getElementById('moneda').value = actual;


    });

    $('#monedaForm').submit(function (e) {
        e.preventDefault();
        
        let moneda = $.trim($('#moneda').val());
        console.log($.trim($('#moneda').val()));
        db.ref("moneda").update({
            actual: moneda,

        });
        
        location.reload();

       
    });

    $('#dolarForm').submit(function (e) {
        e.preventDefault();

        let dolar = parseFloat($.trim($('#dolar').val()));
        
        db.ref("moneda").child("dolares").update({
            cambio: dolar,

        });

        location.reload();

    });

    $('#euroForm').submit(function (e) {
        e.preventDefault();

        let euro = parseFloat($.trim($('#euro').val()));

        db.ref("moneda").child("euros").update({
            cambio: euro,

        });

        location.reload();

    });

    $('#ivaForm').submit(function (e) {
        e.preventDefault();

        let iva = parseFloat($.trim($('#iva').val()));
        
        db.ref("moneda").update({
            iva: iva,

        });

        location.reload();


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

 

  

});