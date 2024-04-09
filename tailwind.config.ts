import { bungee_shade, titillium_web } from "@/fonts/main.fonts";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				black_blue: "#010019",
			},
			fontFamily: {
				ojuju: ["var(--font-ojuju)"],
				titillium_web: ["var(--font-titillium-web)"],
				bungee_shade: ["var(--font-bungee-shade)"],
			},
		},
	},
	plugins: [],
	prefix: "tw-",
};
export default config;
