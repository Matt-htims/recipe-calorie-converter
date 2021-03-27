const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			darkBlue: '#05386B',
			green: {
				light: '#8EE4AF',
				DEFAULT: '#5CDB95',
				dark: '#379683',
			},
			backgroundWhite: '#FDFDFD',
			yellowishWhite: '#EDF5E1',
			gray: {
				100: '#F8F9FA',
				200: '#F1F3F5',
				300: '#E9ECEF',
				400: '#DEE2E6',
				500: '#CED4DA',
				600: '#ADB5BD',
				700: '#868E96',
				800: '#495057',
				900: '#343A40',
				1000: '#21252A',
			},
			red: '#FF7067',
			amber: '#F5BF6E',
		},
		fontFamily: {
			accent: ['Rubik', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			fontFamily: {
				sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
