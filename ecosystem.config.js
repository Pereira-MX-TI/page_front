module.exports = {
  apps: [
    {
      name: "page-server",
      script: "dist/page-front/server/server.mjs",
      interpreter: "node",
      exec_mode: "fork",
      instances: 1,
      watch: true,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
