
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {  
    table.increments(); //cria o ID numérico
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //relacionamento com 'ongs' db
    table.foreign('ong_id').references('id').inTable('ongs'); //chave estrangeira (liga a tabela increments com a ongs)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
