// Controla o perfil de UMA entidade
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = require.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }
}