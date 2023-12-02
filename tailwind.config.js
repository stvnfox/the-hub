/** @type {import('tailwindcss').Config} */
export default {
    content: ["./formkit.config.ts"],
    theme: {
        extend: {
            container: {
                center: true,
            },
            colors: {
                secondary: {
                    100: "#b3aOca",
                    300: "#997fb8",
                    500: "#7f5ea6",
                    700: "#664a87",
                },
            },
        },
    },
    plugins: [],
}
