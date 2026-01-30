const MATH_CONFIG = {
    title: "Evaluación de Práctica de Matemáticas: Topic 16",
    activities: [
        {
            level: 2,
            id: 1,
            type: "text-fill",
            question: "Completa las oraciones usando: Perímetro o Área.",
            items: [
                { text: "La distancia alrededor de una figura se llama __________.", answer: "perímetro" },
                { text: "El __________ es el número de unidades cuadradas necesarias para cubrir una región.", answer: "área" }
            ],
            image: null
        },
        {
            level: 2,
            id: 2,
            type: "math-grid",
            question: "Calcula las siguientes sumas:",
            items: [
                { text: "4 + 4 + 4 + 4 =", answer: "16" },
                { text: "12 + 18 + 12 + 18 =", answer: "60" },
                { text: "6 + 5 + 6 + 5 =", answer: "22" },
                { text: "10 + 15 + 12 + 18 =", answer: "55" }
            ],
            image: null
        },
        {
            level: 2,
            id: 3,
            type: "shapes-fill",
            question: "Escribe la longitud de los lados que faltan.",
            shapes: [
                { type: "square", side: 5, label: "5 in" },
                { type: "rectangle", w: 10, h: 4, labelW: "10 in", labelH: "4 in" }
            ],
            image: null
        },
        {
            level: 2,
            id: 4,
            type: "text-fill",
            question: "Utiliza las palabras Área y Perímetro para completar las oraciones.",
            items: [
                { text: "La valla representa el __________.", answer: "perímetro" },
                { text: "El césped y la casa representan el __________.", answer: "área" }
            ],
            image: "images/activity_4.png"
        },
        {
            level: 3,
            id: 5,
            type: "perimeter-calc",
            question: "¿Cuál es el perímetro del jardín en la cuadrícula? (Escala: — = 1 pie)",
            answer: "22",
            unit: "ft",
            image: null
        },
        {
            level: 3,
            id: 6,
            type: "perimeter-calc",
            question: "¿Cuál es el perímetro del polígono mostrado?",
            sides: [5, 8, 6, 6, 12],
            answer: "37",
            unit: "ft",
            image: null
        },
        {
            level: 3,
            id: 7,
            type: "drawing-grid",
            question: "En la cuadrícula, dibuja una figura con un perímetro de 16 unidades.",
            instructions: "Haz clic en los cuadros para sombrear el área de tu figura.",
            targetPerimeter: 16
        },
        {
            level: 3,
            id: 8,
            type: "perimeter-calc",
            question: "Calcula el perímetro de un triángulo equilátero que mide 8 yd de lado.",
            sideLength: 8,
            answer: "24",
            unit: "yds"
        },
        {
            level: 3,
            id: 9,
            type: "perimeter-calc",
            question: "Calcula el perímetro del rectángulo:",
            sides: { w: 3, h: 7 },
            answer: "20",
            unit: "m"
        },
        {
            level: 3,
            id: 10,
            type: "missing-side",
            question: "Encuentra la longitud del lado que falta (X). El perímetro total es 40 yd.",
            sides: { a: 12, b: 10, c: 10, x: "X" },
            answer: "8",
            unit: "yds"
        },
        {
            level: 3,
            id: 11,
            type: "missing-side",
            question: "Encuentra la longitud del lado X. El perímetro total es 30 ft.",
            sides: { a: 12, b: 12, x: "X" },
            answer: "6",
            unit: "ft"
        },
        {
            level: 3,
            id: 12,
            type: "multiple-choice-multi",
            question: "Tony dibujó dos figuras (un cuadrado de 6x6 y un rectángulo de 4x8). Selecciona TODAS las afirmaciones verdaderas:",
            shape1: { w: 6, h: 6, unit: 'ft' },
            shape2: { w: 4, h: 8, unit: 'ft' },
            options: [
                { text: "Las figuras tienen perímetros diferentes.", correct: false }, // Sq P=24, Rect P=24 -> Wait, 6x6 P=24, 4x8 P=24. Same.
                { text: "Las figuras tienen áreas diferentes.", correct: true }, // Sq A=36, Rect A=32
                { text: "Las figuras tienen el mismo perímetro.", correct: true },
                { text: "Las figuras tienen la misma área.", correct: false },
                { text: "El cuadrado tiene mayor área que el rectángulo.", correct: true }
            ]
        },
        {
            level: 3,
            id: 13,
            type: "multiple-choice",
            question: "¿Qué rectángulo tiene el perímetro más grande?",
            rects: [
                { w: 15, h: 1, unit: 'units' }, // P=32
                { w: 5, h: 4, unit: 'units' },  // P=18
                { w: 8, h: 2, unit: 'units' }   // P=20
            ],
            options: [
                { text: "Rectángulo A", answer: true },
                { text: "Rectángulo B", answer: false },
                { text: "Rectángulo C", answer: false },
                { text: "Son todos iguales", answer: false }
            ]
        },
        {
            level: 3,
            id: 14,
            type: "drawing-grid",
            question: "Dibuja un rectángulo con un perímetro de 12 pulgadas.",
            targetPerimeter: 12
        },
        {
            level: 3,
            id: 15,
            type: "multiple-choice",
            question: "¿Qué afirmación es verdadera sobre un cuadrado de 6x6 y un rectángulo de 9x4?",
            shape1: { w: 6, h: 6, unit: 'in' },
            shape2: { w: 9, h: 4, unit: 'in' },
            options: [
                { text: "Tienen las mismas dimensiones.", answer: false },
                { text: "Tienen la misma forma.", answer: false },
                { text: "Tienen el mismo perímetro.", answer: false }, // Sq P=24, Rect P=26
                { text: "Tienen la misma área.", answer: true } // Sq A=36, Rect A=36
            ]
        },
        {
            level: 4,
            id: 16,
            type: "multipart",
            question: "La alfombra del cuarto de Mary mide 5 pies por 8 pies.",
            rugDimensions: [5, 8],
            unit: "pies",
            parts: [
                { text: "A) Encuentra el perímetro y el área de la alfombra.", type: "text-fill", items: [{ text: "P:", answer: "26" }, { text: "A:", answer: "40" }] },
                { text: "B) ¿Podría un cuadrado con lados de números enteros tener el mismo perímetro? ¿Y el mismo área? Explica.", type: "text-area" }
            ]
        }
    ]
};
