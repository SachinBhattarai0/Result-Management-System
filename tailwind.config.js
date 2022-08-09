module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        muli: "'Mulish', sans-serif",
        openSans: "'Open Sans', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
      colors: {
        bluish: "#1A73E8",
        "dark-blue": "#0A2558",
      },
      spacing: {
        "9/10": "90%",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
      },
      minHeight: {
        "3/5": "60%",
      },
    },
  },
  plugins: [],
};
