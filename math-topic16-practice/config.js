const MATH_CONFIG = {
    title: "Práctica de Matemáticas: Tema 16",
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
            question: "Calcula las siguientes sumas (Perímetros):",
            items: [
                { text: "3 + 3 + 3 + 3 =", answer: "12" },
                { text: "12 + 18 + 12 + 18 =", answer: "60" },
                { text: "11 + 7 + 11 + 7 =", answer: "36" },
                { text: "8 + 12 + 15 + 25 =", answer: "60" }
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
                { type: "rectangle", w: 7, h: 3, labelW: "7 in", labelH: "3 in" }
            ],
            image: null
        },
        {
            level: 2,
            id: 4,
            type: "text-fill",
            question: "Utiliza las palabras Área y Perímetro para completar las oraciones.",
            items: [
                { text: "El borde de un cuadro representa el __________.", answer: "perímetro" },
                { text: "La pintura dentro del cuadro representa el __________.", answer: "área" }
            ],
            image: "images/activity_4.png"
        },
        {
            level: 3,
            id: 5,
            type: "perimeter-calc",
            question: "¿Cuál es el perímetro del jardín en la cuadrícula? (Escala: — = 1 pie)",
            answer: "20",
            unit: "ft",
            image: null
        },
        {
            level: 3,
            id: 6,
            type: "perimeter-calc",
            question: "¿Cuál es el perímetro del polígono mostrado?",
            sides: [6, 10, 7, 7, 15],
            answer: "45",
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
            question: "Calcula el perímetro de un triángulo equilátero que mide 5 yd de lado.",
            answer: "15",
            unit: "yds"
        },
        {
            level: 3,
            id: 9,
            type: "perimeter-calc",
            question: "Calcula el perímetro del rectángulo:",
            sides: { w: 7, h: 5 },
            answer: "24",
            unit: "m"
        },
        {
            level: 3,
            id: 10,
            type: "missing-side",
            question: "Encuentra la longitud del lado que falta (X). El perímetro total es 40 yd.",
            sides: { a: 10, b: 12, c: 10, x: "X" },
            answer: "8",
            unit: "yds"
        },
        {
            level: 3,
            id: 11,
            type: "missing-side",
            question: "Encuentra la longitud del lado X. El perímetro total es 20 ft.",
            sides: { a: 8, b: 8, x: "X" },
            answer: "4",
            unit: "ft"
        },
        {
            level: 3,
            id: 12,
            type: "multiple-choice-multi",
            question: "Tony dibujó dos figuras (un cuadrado de 6x6 y un rectángulo de 4x8). Selecciona TODAS las afirmaciones verdaderas:",
            options: [
                { text: "Las figuras tienen perímetros diferentes.", correct: false },
                { text: "Las figuras tienen áreas diferentes.", correct: true }, // Sq: 36, Rect: 32
                { text: "Las figuras tienen el mismo perímetro.", correct: true }, // Sq: 24, Rect: 24
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
                { text: "Rectángulo A (10x2)", answer: true }, // P=24
                { text: "Rectángulo B (5x3)", answer: false }, // P=16
                { text: "Rectángulo C (6x2)", answer: false }, // P=16
                { text: "Son todos iguales", answer: false }
            ]
        },
        {
            level: 3,
            id: 14,
            type: "drawing-grid",
            question: "Dibuja un rectángulo con un perímetro de 14 pulgadas.",
            targetPerimeter: 14
        },
        {
            level: 3,
            id: 15,
            type: "multiple-choice",
            question: "¿Qué afirmación es verdadera sobre un cuadrado de 10x10 y un rectángulo de 20x5?",
            options: [
                { text: "Tienen el mismo perímetro.", answer: false }, // Sq: 40, Rect: 50
                { text: "Tienen la misma área.", answer: true }, // Both 100
                { text: "Tienen la misma forma.", answer: false },
                { text: "El rectángulo tiene mayor área.", answer: false }
            ]
        },
        {
            level: 4,
            id: 16,
            type: "multipart",
            question: "La alfombra del cuarto de Mary mide 6 pies por 4 pies.",
            parts: [
                { text: "A) Encuentra el perímetro y el área de la alfombra.", type: "text-fill", items: [{ text: "P:", answer: "20" }, { text: "A:", answer: "24" }] },
                { text: "B) ¿Podría un cuadrado con lados de números enteros tener el mismo perímetro? ¿Y el mismo área? Explica.", type: "text-area" }
            ]
        }
    ]
};
