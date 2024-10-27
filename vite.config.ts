/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

export type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
    ? `${T}${U extends Capitalize<U> ? "" : Capitalize<U>}`
    : S;

export function toCamelCase<S extends string = string>(str: S): KebabToCamel<S> {
    return str.replace(/-([a-z])/g, s => s[1].toUpperCase()) as KebabToCamel<S>;
}

function getPackageName(casing?: "any" | "camel") {
    if (casing === "camel") {
        return toCamelCase(packageJson.name);
    }
    return packageJson.name;
}

const fileName = {
    es: `${packageJson.name}.esm.js`,
    cjs: `${packageJson.name}.cjs`,
    iife: `${packageJson.name}.iife.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

export default defineConfig({
    base: "./",
    build: {
        outDir: "./dist",
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: getPackageName(),
            fileName: format => fileName[format],
            formats,
        },
        minify: "terser",
        terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
});
