module.exports = {
  apps: [
    {
      name: "medidor-de-agua",
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
