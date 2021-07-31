const { Schema, model } = require("mongoose"); // Extramos el Schema y el modeo del paquete mongoose.

const UsuarioSchema = Schema({ // Es un objeto literal
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true // Mongo se va a encargar de no permitirnos insertar correos electronicos duplicados.
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ["ADMIN_ROL", "USER_ROL"] // Nos valida que el rol tiene que ser uno u otro.
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function () { // Cuando se convierta en JSON se ejecuta lo siguiente:
    const { __v, password, ...user } = this.toObject(); // Separamos los argumentos con una desestructuración, los demás argumentos los almacenamos en user
    return user; // Nos retorna solo los datos almacenados en user; __v y password se borran.
}

module.exports = model("Usuario", UsuarioSchema); // Exportamos UsuarioSchema usando la función model (previamente requerida en una desestructuración)