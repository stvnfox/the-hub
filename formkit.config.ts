import { DefaultConfigOptions } from "@formkit/vue"

const config: DefaultConfigOptions = {
    config: {
        rootClasses(sectionKey, node) {
            const type = node.props.type
            const classConfig = {
                outer: "mb-4",
                legend: "block mb-1 font-bold",
                label() {
                    if (type === "text" || type === "email" || type === "password") {
                        return "block text-xs font-bold mb-1"
                    }
                    if (type === "radio") {
                        return "text-sm text-gray-600 mt-0.5"
                    }
                },
                options() {
                    if (type === "radio") {
                        return "flex flex-col flex-grow mt-2"
                    }
                },
                input() {
                    if (type === "text" || type === "email" || type === "password") {
                        return "border border-secondary-400 text-xs p-2 rounded-md focus-visible:outline-secondary-700 w-full"
                    }
                    if (type === "radio") {
                        return "mr-2"
                    }
                },
                wrapper() {
                    if (type === "radio") {
                        return "flex flex-row flex-grow"
                    }
                },
                message: "text-red-500 text-xs",
                help: "text-xs text-gray-500",
            }

            function createClassObject(classesArray) {
                if (!classesArray) return ""
                const classList = {}
                classesArray.split(" ").forEach((className) => {
                    classList[className] = true
                })
                return classList
            }

            const target = classConfig[sectionKey]
            if (typeof target === "string") {
                return createClassObject(target)
            } else if (typeof target === "function") {
                return createClassObject(classConfig[sectionKey]())
            }
        },
    },
}

export default config
