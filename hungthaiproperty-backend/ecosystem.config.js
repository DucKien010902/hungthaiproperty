module.exports = {
  apps: [
    {
      name: "namsonland-backend",
      script: "src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 5002,
      },
    },
  ],
};
