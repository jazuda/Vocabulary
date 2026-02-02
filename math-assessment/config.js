const MATH_CONFIG = {
    title: "Evaluación de Matemáticas: Topic 16",
    sheetName: "Topic 16 - Test",
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
                { text: "2 + 2 + 2 + 2 =", answer: "8" },
                { text: "14 + 15 + 14 + 15 =", answer: "58" },
                { text: "9 + 8 + 9 + 8 =", answer: "34" },
                { text: "7 + 13 + 14 + 21 =", answer: "55" }
            ],
            image: null
        },
        {
            level: 2,
            id: 3,
            type: "shapes-fill",
            question: "Escribe la longitud de los lados que faltan.",
            shapes: [
                { type: "square", side: 4, label: "4 in", answers: ["4", "4"] }, // bottom, right
                { type: "rectangle", w: 8, h: 2, labelW: "8 in", labelH: "2 in", answers: ["8", "2"] } // bottom, right
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
            sides: [7, 9, 8, 8, 16],
            answer: "48",
            unit: "ft",
            image: null
        },
        {
            level: 3,
            id: 7,
            type: "drawing-grid",
            question: "En la cuadrícula, dibuja una figura con un perímetro de 20 unidades.",
            instructions: "Haz clic en los cuadros para sombrear el área de tu figura.",
            targetPerimeter: 20
        },
        {
            level: 3,
            id: 8,
            type: "perimeter-calc",
            question: "Calcula el perímetro de un triángulo equilátero que mide 6 yd de lado.",
            answer: "18",
            unit: "yds"
        },
        {
            level: 3,
            id: 9,
            type: "perimeter-calc",
            question: "Calcula el perímetro del rectángulo:",
            sides: { w: 4, h: 8 },
            answer: "24",
            unit: "m"
        },
        {
            level: 3,
            id: 10,
            type: "missing-side",
            question: "Encuentra la longitud del lado que falta (X). El perímetro total es 37 yd.",
            sides: { a: 9, b: 10, c: 9, x: "X" },
            answer: "9",
            unit: "yds"
        },
        {
            level: 3,
            id: 11,
            type: "missing-side",
            question: "Encuentra la longitud del lado X. El perímetro total es 18 ft.",
            sides: { a: 7, b: 7, x: "X" },
            answer: "4",
            unit: "ft"
        },
        {
            level: 3,
            id: 12,
            type: "multiple-choice-multi",
            question: "Tony dibujó dos figuras (un cuadrado de 5x5 y un rectángulo de 2x8). Selecciona TODAS las afirmaciones verdaderas:",
            options: [
                { text: "Las figuras tienen perímetros diferentes.", correct: false },
                { text: "Las figuras tienen áreas diferentes.", correct: true },
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
            question: "Dibuja un rectángulo con un perímetro de 10 pulgadas.",
            targetPerimeter: 10
        },
        {
            level: 3,
            id: 15,
            type: "multiple-choice",
            question: "¿Qué afirmación es verdadera sobre un cuadrado de 4x4 y un rectángulo de 8x2?",
            options: [
                { text: "Tienen las mismas dimensiones.", answer: false },
                { text: "Tienen la misma forma.", answer: false },
                { text: "Tienen el mismo perímetro.", answer: false }, // Sq P=16, Rect P=20
                { text: "Tienen la misma área.", answer: true } // Sq A=16, Rect A=16
            ]
        },
        {
            level: 4,
            id: 16,
            type: "multipart",
            question: "La alfombra del cuarto de Mary mide 4 pies por 9 pies.",
            parts: [
                { text: "A) Encuentra el perímetro y el área de la alfombra.", type: "text-fill", items: [{ text: "P:", answer: "26" }, { text: "A:", answer: "36" }] },
                { text: "B) ¿Podría un cuadrado con lados de números enteros tener el mismo perímetro? ¿Y el mismo área? Explica.", type: "text-area" }
            ]
        }
    ]
};
