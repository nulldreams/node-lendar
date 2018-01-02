const calendar = require('./controllers/reunioes')

module.exports = (fastify) => {
  fastify.get('/reunioes', calendar.list)
}
