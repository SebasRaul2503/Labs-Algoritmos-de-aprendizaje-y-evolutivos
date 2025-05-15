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
