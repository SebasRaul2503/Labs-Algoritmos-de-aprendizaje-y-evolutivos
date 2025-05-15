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
