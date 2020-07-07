const Usuario = require('../models/Usuario'); //Este va a tener todos los metodos de mongoose para hacer el registro
const bcryptjs = require('bcryptjs');

//Resover
const resolvers = {
    Query: {
        obtenerCurso: () => "Algo xd"
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) => {

            const { email, password } = input;

            //Revisa si el user ya esta registrado
            const existeUsuario = await Usuario.findOne({ email });
            console.log(existeUsuario);

            if (existeUsuario) {
                throw new Error('El Usuario ya está registrado');
            }
            
            // Hashear su psswrd
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);
            //ERROR "message": "Illegal arguments: number",

            //Guardarlo en la DB
            try {
                const usuario = new Usuario(input);
                usuario.save();
                return usuario
            } catch (error) {
                console.log(error);
                
            }
        },
        autenticarUsuario: async (_, { input }) => {

            const { email, password } = input;

            // si el user existe
            const existeUsuario = await Usuario.findOne({ email });

            if (!existeUsuario) {
                throw new Error('El Usuario No existe');
            }

            // si el password es correcto
            // const passwordCorrecto = 


            //crear un token

        }
    }
}

module.exports = resolvers; 