const path = require('path')

module.exports = {
  apps: [{
    name: "github-actions-node",
    script: "server.js",
    watch: true,
    ignore_watch: [
      "node_modules",
      "public",
      'logs'
    ],
    // err_file: '/pm2/logs/', 
    // out_file: "./logs/access.log" 
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    exec_mode: 'cluster',
    instances: 0,
    env: {
      NODE_ENV: "production",
      PORT: 3003
    }
  }]
}
