import pandas as pd
import numpy as np

# Simular los 10 cursos con datos aleatorios
np.random.seed(42)
cursos = pd.DataFrame({
    'curso': [f'Curso {i+1}' for i in range(10)],
    'carga_horaria': np.random.randint(2, 5, size=10),          # entre 2 y 4 horas semanales
    'interes': np.random.randint(1, 11, size=10),               # interés personal entre 1 y 10
    'facilidad': np.round(np.random.uniform(2.5, 5.0, size=10), 2)  # promedio histórico (2.5 a 5.0)
})

# Evaluar una combinación de cursos
def evaluar_combinacion(indices, cursos, max_horas=12):
    subset = cursos.iloc[indices]
    total_horas = subset['carga_horaria'].sum()
    if total_horas > max_horas:
        return -1  # inválida
    return subset['interes'].sum()

# Generar combinación inicial válida de 4 cursos
def generar_solucion_inicial(cursos, n=4, max_horas=12):
    indices = list(range(len(cursos)))
    while True:
        seleccion = np.random.choice(indices, size=n, replace=False)
        if evaluar_combinacion(seleccion, cursos, max_horas) != -1:
            return seleccion

# Mutar solución: cambiar un curso por otro no incluido
def mutar_solucion(solucion, cursos, max_horas=12):
    nueva_solucion = solucion.copy()
    fuera = list(set(range(len(cursos))) - set(solucion))
    
    idx_a_cambiar = np.random.randint(0, len(solucion))
    nuevo_curso = np.random.choice(fuera)
    
    nueva_solucion[idx_a_cambiar] = nuevo_curso
    
    if evaluar_combinacion(nueva_solucion, cursos, max_horas) != -1:
        return nueva_solucion
    return solucion  # mantener si mutación no válida

# Hill Climbing
def hill_climbing(cursos, iteraciones=1000, n=4, max_horas=12):
    mejor_sol = generar_solucion_inicial(cursos, n, max_horas)
    mejor_valor = evaluar_combinacion(mejor_sol, cursos, max_horas)

    for _ in range(iteraciones):
        nueva_sol = mutar_solucion(mejor_sol, cursos, max_horas)
        nuevo_valor = evaluar_combinacion(nueva_sol, cursos, max_horas)

        if nuevo_valor > mejor_valor:
            mejor_sol = nueva_sol
            mejor_valor = nuevo_valor

    return mejor_sol, mejor_valor

# Ejecutar el algoritmo
solucion_indices, interes_total = hill_climbing(cursos)
seleccion = cursos.iloc[solucion_indices]

# Resultados
print("Cursos disponibles:")
print(cursos)
print("Cursos seleccionados:")
print(seleccion)
print(f"Interés total: {interes_total}")
print(f"Carga horaria total: {seleccion['carga_horaria'].sum()} horas/semana")
