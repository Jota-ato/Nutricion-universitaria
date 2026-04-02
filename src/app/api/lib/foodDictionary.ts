import { normalizeQuery } from "@/app/helpers"

export const FOOD_DICTIONARY: Record<string, string> = {
    // Tortillas y masa
    "tortilla": "corn tortilla",
    "tortilla de maiz": "corn tortilla",
    "tortilla de harina": "flour tortilla",
    "tostada": "tostada",
    "gordita": "gordita",
    "sope": "sope",
    "tamal": "tamale",

    // Proteínas
    "pollo": "chicken",
    "pechuga de pollo": "chicken breast",
    "muslo de pollo": "chicken thigh",
    "pierna de pollo": "chicken leg",
    "carne de res": "beef",
    "bistec": "beef steak",
    "carne molida": "ground beef",
    "cerdo": "pork",
    "chuleta de cerdo": "pork chop",
    "chorizo": "chorizo",
    "jamon": "ham",
    "huevo": "egg",
    "huevos": "eggs",
    "atun": "tuna",
    "sardina": "sardine",
    "camaron": "shrimp",

    // Leguminosas
    "frijoles": "black beans",
    "frijoles negros": "black beans",
    "frijoles pintos": "pinto beans",
    "frijoles refritos": "refried beans",
    "lentejas": "lentils",
    "habas": "fava beans",
    "garbanzos": "chickpeas",

    // Verduras
    "jitomate": "tomato",
    "tomate": "tomato",
    "cebolla": "onion",
    "chile": "chili pepper",
    "chile jalapeno": "jalapeno pepper",
    "chile serrano": "serrano pepper",
    "aguacate": "avocado",
    "nopal": "nopales cactus",
    "nopales": "nopales cactus",
    "calabaza": "squash",
    "zanahoria": "carrot",
    "papa": "potato",
    "papas": "potato",
    "chayote": "chayote",
    "espinaca": "spinach",
    "brocoli": "broccoli",
    "lechuga": "lettuce",
    "pepino": "cucumber",
    "elote": "corn",
    "maiz": "corn",
    "champiñon": "mushroom",
    "champiñones": "mushrooms",

    // Frutas
    "platano": "banana",
    "mango": "mango",
    "papaya": "papaya",
    "sandia": "watermelon",
    "melon": "cantaloupe",
    "naranja": "orange",
    "limon": "lime",
    "guayaba": "guava",
    "tuna": "prickly pear",
    "manzana": "apple",
    "uva": "grape",
    "uvas": "grapes",
    "fresa": "strawberry",
    "fresas": "strawberries",
    "pina": "pineapple",

    // Lácteos
    "leche": "whole milk",
    "leche entera": "whole milk",
    "leche descremada": "skim milk",
    "leche light": "skim milk",
    "queso": "cheese",
    "queso fresco": "fresh cheese",
    "queso oaxaca": "oaxaca cheese",
    "crema": "sour cream",
    "yogur": "yogurt",
    "yogurt": "yogurt",

    // Cereales y granos
    "arroz": "white rice",
    "arroz blanco": "white rice",
    "arroz integral": "brown rice",
    "avena": "oatmeal",
    "pan blanco": "white bread",
    "pan integral": "whole wheat bread",
    "pan dulce": "sweet bread",
    "granola": "granola",

    // Grasas y aceites
    "aceite vegetal": "vegetable oil",
    "aceite de oliva": "olive oil",
    "mantequilla": "butter",
    "manteca": "lard",

    // Bebidas
    "jugo de naranja": "orange juice",
    "jugo de manzana": "apple juice",
    "leche de soya": "soy milk",
    "leche de almendra": "almond milk",

    // Snacks y otros
    "tortilla chips": "tortilla chips",
    "totopos": "tortilla chips",
    "cacahuates": "peanuts",
    "nueces": "walnuts",
    "almendras": "almonds",
    "mayonesa": "mayonnaise",
    "salsa": "salsa",
    "guacamole": "guacamole",
}

export function translateFoodQuery(query: string): string {
    const normalized = normalizeQuery(query.toLowerCase().trim())
    return FOOD_DICTIONARY[normalized] ?? query
}