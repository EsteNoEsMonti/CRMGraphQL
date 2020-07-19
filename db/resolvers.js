const Usuario = require('../models/Usuario'); //Este va a tener todos los metodos de mongoose para hacer el registro
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });

const crearToken = ( usuario, secreta, expiresIn ) => {
  // console.log(usuario);

  const { id, email, nombre, apellido } = usuario;
  
  return jwt.sign( { id, email, nombre, apellido }, secreta, { expiresIn } )

}

//Resolver
const resolvers = {
  Query: {
    obtenerUsuario: async (_, { token }) => {
      const usuarioId = await jwt.verify(token, process.env.SECRETA); //Toma el token y la palabra secreta

      return usuarioId
    }
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
      const passwordCorrecto =  await bcryptjs.compare( password, existeUsuario.password ); //1ero el que le pasamos 2do el que ya está en la db
      if (!passwordCorrecto) {
        throw new Error('El Password no es correcto');
      }

      //crear un token
      return {
        // se requiere: 1, que info guardamos, 2° palabra secreta, 3° tiempo activo
        token: crearToken(existeUsuario, process.env.SECRETA, '24h')
      }

    }
  }
}

module.exports = resolvers; 