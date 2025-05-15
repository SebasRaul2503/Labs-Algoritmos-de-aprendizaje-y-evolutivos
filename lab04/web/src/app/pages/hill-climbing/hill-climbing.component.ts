import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-hill-climbing',
    standalone: true,
    imports: [
        CommonModule,

    ],
    templateUrl: './hill-climbing.component.html',
    styleUrl: './hill-climbing.component.css'
})
export class HillClimbingComponent {
    codeSnippet: string = `
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from typing import Callable, List, Tuple

def funcion_objetivo(x: np.ndarray) -> float:
    \"\"\"
    Función objetivo de ejemplo para maximizar.
    Esta es una función simple en 2D con múltiples máximos locales.
    \"\"\"
    return np.sin(x[0]) * np.cos(x[1]) * np.exp(-0.1 * (x[0]**2 + x[1]**2))

def generar_vecinos(punto: np.ndarray, tamaño_paso: float = 0.1) -> List[np.ndarray]:
    \"\"\"
    Genera puntos vecinos moviéndose en cada dimensión.
    \"\"\"
    vecinos = []
    for i in range(len(punto)):
        vecino_pos = punto.copy()
        vecino_pos[i] += tamaño_paso
        vecinos.append(vecino_pos)

        vecino_neg = punto.copy()
        vecino_neg[i] -= tamaño_paso
        vecinos.append(vecino_neg)

    return vecinos

def ascenso_de_colina(
    funcion_objetivo: Callable,
    punto_inicio: np.ndarray,
    max_iteraciones: int = 100,
    tamaño_paso: float = 0.1
) -> Tuple[np.ndarray, float, pd.DataFrame]:
    \"\"\"
    Realiza una optimización de ascenso de colina.
    \"\"\"
    punto_actual = punto_inicio.copy()
    valor_actual = funcion_objetivo(punto_actual)

    historial = [{
        'iteración': 0,
        'x': punto_actual[0],
        'y': punto_actual[1],
        'valor': valor_actual
    }]

    for i in range(max_iteraciones):
        vecinos = generar_vecinos(punto_actual, tamaño_paso)
        mejor_vecino = None
        mejor_valor_vecino = valor_actual

        for vecino in vecinos:
            valor_vecino = funcion_objetivo(vecino)
            if valor_vecino > mejor_valor_vecino:
                mejor_vecino = vecino
                mejor_valor_vecino = valor_vecino

        if mejor_vecino is None:
            break

        punto_actual = mejor_vecino
        valor_actual = mejor_valor_vecino

        historial.append({
            'iteración': i + 1,
            'x': punto_actual[0],
            'y': punto_actual[1],
            'valor': valor_actual
        })

    historial_df = pd.DataFrame(historial)
    return punto_actual, valor_actual, historial_df

if __name__ == "__main__":
    np.random.seed(42)
    inicio = np.array([-1.0, 1.0])
    mejor_punto, mejor_valor, historial = ascenso_de_colina(funcion_objetivo, inicio, max_iteraciones=50)

    print(f"Punto mejor encontrado: {mejor_punto}")
    print(f"Mejor valor: {mejor_valor}")
    print("\\nRuta de optimización:")
    print(historial)

`;

    codeSnippet2: string = `
        import random
import numpy as np
from deap import base, creator, tools, algorithms

# Definir la función objetivo
def funcion_objetivo(individuo):
    x, y = individuo
    return np.sin(x) * np.cos(y) * np.exp(-0.1 * (x**2 + y**2)),

# Configuración del algoritmo genético
def configurar_algoritmo_genetico():
    # Maximizar la función objetivo
    creator.create("FitnessMax", base.Fitness, weights=(1.0,))
    creator.create("Individual", list, fitness=creator.FitnessMax)

    toolbox = base.Toolbox()

    # Espacio de búsqueda entre -5 y 5
    toolbox.register("attr_float", random.uniform, -5, 5)
    toolbox.register("individual", tools.initCycle, creator.Individual,
                     (toolbox.attr_float, toolbox.attr_float), n=1)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)

    # Operadores genéticos
    toolbox.register("evaluate", funcion_objetivo)
    toolbox.register("mate", tools.cxBlend, alpha=0.5)
    toolbox.register("mutate", tools.mutGaussian, mu=0, sigma=0.5, indpb=0.2)
    toolbox.register("select", tools.selTournament, tournsize=3)

    return toolbox

def ejecutar_algoritmo(toolbox, n_generaciones=40, tam_poblacion=50):
    poblacion = toolbox.population(n=tam_poblacion)
    hof = tools.HallOfFame(1)
    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("avg", np.mean)
    stats.register("std", np.std)
    stats.register("min", np.min)
    stats.register("max", np.max)

    poblacion, logbook = algorithms.eaSimple(poblacion, toolbox,
                                              cxpb=0.5, mutpb=0.2,
                                              ngen=n_generaciones,
                                              stats=stats, halloffame=hof,
                                              verbose=True)

    return hof[0], hof[0].fitness.values[0], logbook

if __name__ == "__main__":
    random.seed(42)
    toolbox = configurar_algoritmo_genetico()
    mejor_individuo, mejor_valor, historial = ejecutar_algoritmo(toolbox)

    print(f"\nMejor individuo encontrado: {mejor_individuo}")
    print(f"Valor de la función objetivo: {mejor_valor}")

    `

}
