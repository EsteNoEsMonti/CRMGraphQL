
//Resover
const resolvers = {
    Query: {
        obtenerCurso: () => "Algo xd"
    },
    Mutation: {
        nuevoUsuario: (_, { input }, ctx ) => {
            
            const { nombre, apellido } = input;

            console.log(nombre, apellido);

            return (nombre, apellido);
        }   
    }
}

module.exports = resolvers; 