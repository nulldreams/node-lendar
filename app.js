const fastify = require('fastify')()
const port = process.env.PORT || 8000

fastify.listen(port, (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})

require('./api/routes')(fastify)
