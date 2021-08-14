exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("username", 255).notNullable().unique();
      table.string("password", 255).notNullable();
      table.string("telephone").notNullable();
    })
    .createTable("plants", (table) => {
      table.increments();
      table
        .integer("userID")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("nickname").notNullable();
      table.string("species").notNullable();
      table.string("h2oFrequency").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("plants").dropTableIfExists("users");
};
