
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'abc', password: '123', email: 'abc@abc.net', age: 20},
        {username: 'def', password: '456', email: 'def@def.net', age: 21},
        {username: 'ghi', password: '789', email: 'ghi@ghi.net', age: 22}
      ]);
    });
};
