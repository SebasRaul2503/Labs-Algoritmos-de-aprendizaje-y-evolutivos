import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hill-climbing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hill-climbing.component.html',
  styleUrl: './hill-climbing.component.css',
})
export class HillClimbingComponent {

    enunciado02: string = `
    import pandas as pd
    import numpy as np

    # Generar datos simulados de las franjas horarias
    np.random.seed(42)
    num_franjas = 10
    franjas = pd.DataFrame({
        'duracion': np.random.randint(1, 5, size=num_franjas),  # duración entre 1 y 4 horas
        'productividad': np.random.randint(1, 11, size=num_franjas)  # productividad entre 1 y 10
    })

    # Función para evaluar una solución
    def evaluar_solucion(solucion, franjas, max_horas=15):
        duracion_total = np.sum(franjas['duracion'][solucion == 1])
        if duracion_total > max_horas:
            return -1  # solución inválida
        productividad_total = np.sum(franjas['productividad'][solucion == 1])
        return productividad_total

    # Función para generar una solución inicial aleatoria válida
    def generar_solucion_inicial(franjas, max_horas=15):
        while True:
            solucion = np.random.randint(0, 2, size=len(franjas))
            if np.sum(franjas['duracion'][solucion == 1]) <= max_horas:
                return solucion

    # Función de mutación: cambia el estado de una franja aleatoria
    def mutar_solucion(solucion, franjas, max_horas=15):
        nueva_solucion = solucion.copy()
        idx = np.random.randint(0, len(solucion))
        nueva_solucion[idx] = 1 - nueva_solucion[idx]  # flip 0 <-> 1
        
        # Validar si la nueva solución respeta el límite de horas
        if np.sum(franjas['duracion'][nueva_solucion == 1]) <= max_horas:
            return nueva_solucion
        else:
            return solucion  # no se acepta mutación inválida

    # Algoritmo de Hill Climbing
    def hill_climbing(franjas, iteraciones=1000, max_horas=15):
        solucion_actual = generar_solucion_inicial(franjas, max_horas)
        valor_actual = evaluar_solucion(solucion_actual, franjas, max_horas)
        
        for _ in range(iteraciones):
            nueva_solucion = mutar_solucion(solucion_actual, franjas, max_horas)
            nuevo_valor = evaluar_solucion(nueva_solucion, franjas, max_horas)
            
            if nuevo_valor > valor_actual:
                solucion_actual = nueva_solucion
                valor_actual = nuevo_valor
                
        return solucion_actual, valor_actual

    # Ejecutar el algoritmo
    solucion, productividad_total = hill_climbing(franjas)
    print("Franjas horarias disponibles:")
    print(franjas)
    print("Franja horaria seleccionada (1=incluida):", solucion)
    print("Productividad total:", productividad_total)
    print("Horas totales:", np.sum(franjas['duracion'][solucion == 1]))
    print("Franjas seleccionadas:", franjas[solucion == 1])

    `


  enunciado03: string = `
    import pandas as pd
    import numpy as np
    from itertools import combinations

    # Simulación del menú: 8 platos con precio, calorías y satisfacción
    np.random.seed(42)
    menu = pd.DataFrame({
        'plato': [f'Plato {i+1}' for i in range(8)],
        'precio': np.random.uniform(4, 10, size=8),        # precios entre 4 y 10 soles
        'calorias': np.random.randint(200, 600, size=8),   # calorías entre 200 y 600
        'satisfaccion': np.random.randint(1, 11, size=8)   # satisfacción entre 1 y 10
    })

    # Evaluar combinación
    def evaluar_combinacion(indices, menu, max_precio=20, max_calorias=1000):
        subset = menu.iloc[indices]
        total_precio = subset['precio'].sum()
        total_calorias = subset['calorias'].sum()
        
        if total_precio > max_precio or total_calorias > max_calorias:
            return -1  # combinación inválida
        return subset['satisfaccion'].sum()

    # Generar solución inicial válida: combinación de 3 platos
    def generar_solucion_inicial(menu):
        platos_indices = list(range(len(menu)))
        while True:
            seleccion = np.random.choice(platos_indices, size=3, replace=False)
            if evaluar_combinacion(seleccion, menu) != -1:
                return seleccion

    # Mutar: cambiar un plato por otro que no esté en la solución
    def mutar_solucion(solucion, menu):
        nueva_solucion = solucion.copy()
        fuera_solucion = list(set(range(len(menu))) - set(solucion))
        
        idx_a_cambiar = np.random.randint(0, 3)
        nuevo_plato = np.random.choice(fuera_solucion)
        
        nueva_solucion[idx_a_cambiar] = nuevo_plato
        
        if evaluar_combinacion(nueva_solucion, menu) != -1:
            return nueva_solucion
        return solucion  # mantener solución actual si mutación no es válida

    # Algoritmo Hill Climbing
    def hill_climbing(menu, iteraciones=1000):
        mejor_solucion = generar_solucion_inicial(menu)
        mejor_valor = evaluar_combinacion(mejor_solucion, menu)

        for _ in range(iteraciones):
            nueva_solucion = mutar_solucion(mejor_solucion, menu)
            nuevo_valor = evaluar_combinacion(nueva_solucion, menu)
            
            if nuevo_valor > mejor_valor:
                mejor_solucion = nueva_solucion
                mejor_valor = nuevo_valor
                
        return mejor_solucion, mejor_valor

    # Ejecutar
    solucion_indices, satisfaccion_total = hill_climbing(menu)
    solucion_final = menu.iloc[solucion_indices]

    # Resultados
    print("Platos disponibles:")
    print(menu)
    print("Platos seleccionados:")
    print(solucion_final)
    print(f"Satisfacción total: {satisfaccion_total:.2f}")
    print(f"Precio total: {solucion_final['precio'].sum():.2f} soles")
    print(f"Calorías totales: {solucion_final['calorias'].sum()} kcal")
    `;


    enunciado0102: string = `
    import numpy as np
    import pandas as pd

    def funcion_objetivo(x):
        return -x**2 + 5

    def hill_climbing(iteraciones=50, paso=0.1):
        historial = []

        estado_actual = np.random.uniform(-10, 10)
        valor_actual = funcion_objetivo(estado_actual)

        for i in range(iteraciones):
            vecino = estado_actual + np.random.uniform(-paso, paso)
            valor_vecino = funcion_objetivo(vecino)

            if valor_vecino > valor_actual:
                estado_actual = vecino
                valor_actual = valor_vecino

            historial.append({'Iteración': i+1, 'x': estado_actual, 'f(x)': valor_actual})

        return pd.DataFrame(historial)

    # Ejecutar y mostrar resultados
    resultados = hill_climbing()
    print(resultados.tail())
    `;
    enunciado0104: string = `
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

        print(f"Mejor individuo encontrado: {mejor_individuo}")
        print(f"Valor de la función objetivo: {mejor_valor}")

    `;

    
}
