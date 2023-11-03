module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				rubik: ['Inter', 'sans-serif'],
			},
			backgroundImage: {
				Error: "url('/src/assets/Error.jpg')",
			},
		},
	},
	plugins: [],
};
