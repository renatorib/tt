const routes = require('next-routes')

module.exports = routes()
  .add({ name: 'messages', pattern: '/messages/:channel', page: 'channel' })
