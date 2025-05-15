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
print(f"\nSatisfacción total: {satisfaccion_total:.2f}")
print(f"Precio total: {solucion_final['precio'].sum():.2f} soles")
print(f"Calorías totales: {solucion_final['calorias'].sum()} kcal")
