const connection = require('../database/connection');

module.exports = {
    // Login
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        // Se essa ONG não existir...
        if (!ong) {
            return response.status(400).json({ error: 'Perfil não encontrado'});
        }

        // Se deu tudo certo, retorna os dados da ONG (nome)
        return response.json(ong);
    }
}