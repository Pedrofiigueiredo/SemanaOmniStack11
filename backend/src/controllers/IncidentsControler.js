// conexão com o DB
const connection = require('../database/connection');

module.exports = {

    // Listar os incidentes do banco de dados
    async index(request, response) {
        const { page = 1 } = request.query;

        // Contagem do número total de casos
        const [count] = await connection('incidents').count();

        console.log(count);

        const incidents = await connection('incidents')
            // Esquema de paginação (5 casos por página)
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.cidade', 
                'ongs.uf']);

        // Retorna o número de registros para o fornt-end
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    // Criar um novo incidente no banco de dados
    async create(request, response) {
        const { title, description, value} = request.body;
        const  ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert ({
            title,
            description,
            value,
            ong_id,
        });
    
        return response.json({ id });

    },

    // Deletar um incidente no banco de dados
    async delete(request, response) {
        // Qual ID do incident vai ser deletado, conforme o recurso
        const { id } = request.params;
        // Puxa o ID da ONG, para verificação
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id') //seleciona o ID da ong na tabela
            .first();

        // Verificação de ID (só a ONG pode excluir seu próprio incident)
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Não autorizado'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
};