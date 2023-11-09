import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(`This app is running in ${env.APP_ENV} environment!`);

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
    },
    define: {
      "process.env": env,
    },
  });
};