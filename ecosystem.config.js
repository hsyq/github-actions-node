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
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    exec_mode: 'cluster',
    instances: 2,
    env: {
      NODE_ENV: "production",
      PORT: 3003
    }
  }]
}
