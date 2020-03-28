const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs);
    },

    async create(request, response) {
        //acessa dados do corpo da requisição
        // cada dado em uma variável única (name, email, whatsapp...)
        const { name, email, whatsapp, cidade, uf} = request.body; 

        // Gera um ID aleatório para as ONGs usando a biblioteca crypto
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            cidade,
            uf,
        });

        // retorno só depois que o insert for finalizado
        return response.json({ id }); 
        //o ID vai ser o que a ONG vai usar para se conectar na aplicação
        },

    // Deletar o própria cadastro
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const ong = await connection('ongs')
            .where('id', id)
            .select('id')
            .first();

        // Verificação da ONG (só a própria ONG pode se excluir)
        if (ong.id != ong_id) {
            return response.status(401).json({ error: 'Não autorizado'});
        }

        await connection('ongs').where('id', id).delete();

        return response.send('deleted');
    }
};