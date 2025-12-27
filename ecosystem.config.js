module.exports = {
  apps: [
    {
      name: "api",
      cwd: "./apps/api",
      script: "dist/main.js",
      instances: 2,
      exec_mode: "cluster",
      env_file: "./apps/api/.env.production"
    },
    {
      name: "web",
      cwd: "./apps/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env_file: "./apps/web/.env.production"
    }
  ]
}
