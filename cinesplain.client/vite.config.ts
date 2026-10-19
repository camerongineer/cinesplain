import { fileURLToPath, URL } from "node:url";
import plugin from "@vitejs/plugin-react";
import child_process from "child_process";
import fs from "fs";
import path from "path";
import { env } from "process";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ""
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "cinesplain.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (
        0 !==
        child_process.spawnSync(
            "dotnet",
            [
                "dev-certs",
                "https",
                "--export-path",
                certFilePath,
                "--format",
                "Pem",
                "--no-password"
            ],
            { stdio: "inherit" }
        ).status
    ) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
      ? env.ASPNETCORE_URLS.split(";")[0]
      : "https://localhost:7232";

// https://vitejs.dev/config/
export default defineConfig({
    // react's vite plugin must come after start's vite plugin
    plugins: [tanstackStart(), plugin(), svgr()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url))
        }
    },
    server: {
        proxy: {
            "/api": {
                target,
                secure: false,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "/api")
            },
            "/.auth": {
                target,
                secure: false,
                changeOrigin: true
            }
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath)
        }
    }
});
