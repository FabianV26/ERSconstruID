//Botón para subir la foto
const boton_foto = document.querySelector("#btn-foto");
const imagen = document.querySelector("#img-foto");

var widget_cloud = cloudinary.createUploadWidget({
    cloudName: 'jousk',
    uploadPreset: 'mtmubinq'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Imagen subida exitosamente', result.info);
        imagen.src = result.info.secure_url;
    }
});

boton_foto.addEventListener("click", function() {
    widget_cloud.open();
}, false);