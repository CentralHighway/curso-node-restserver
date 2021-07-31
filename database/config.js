const mongoose = require("mongoose");

const dbConnection = async () => {

    try { // Siempre es bueno hacer un try y un catch porque puede fallar porque es un conexión a una DB donde no tenemos el control absoluto.
        await mongoose.connect(process.env.MONGODB_CNN, { // Nos conectamos a la base de datos
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("Base de datos online");

    } catch (error) {
        console.log(error); // Se ve el error propiamente.
        throw new Error("Error a la hora de inicializar la base de datos."); // Esto envia un error a la consola.
    }
}

module.exports = {
    dbConnection,
}