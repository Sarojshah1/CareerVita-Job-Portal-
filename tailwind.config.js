/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
    
      colors:{
        "primary":"#335E85",
        "forgrount":"#ffff",
        "bannercolor":"#E6F8DE"
        
      },
      container:{
        center:true,
        padding:{
          default:'1rem',
          sm:'2rem',
          lg:'4rem',
          xl:'5rem'
        }
      }

    },
  },
  plugins: [],
}

