import localFont from "next/font/local";

export const ojuju = localFont({
	src: "Ojuju/Ojuju-VariableFont_wght.ttf",
	display: "swap",
	subsets: ["latin"],
	variable: "--font-ojuju",
});

export const titillium_web = localFont({
	src: [
		{ path: "Titillium_Web/TitilliumWeb-Regular.ttf", style: "normal" },
		{ path: "Titillium_Web/TitilliumWeb-SemiBold.ttf", style: "bold" },
	],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-titillium-web",
});

export const bungee_shade = localFont({
	src: [{ path: "Bungee_Shade/BungeeShade-Regular.ttf", style: "normal" }],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-bungee-shade",
});
