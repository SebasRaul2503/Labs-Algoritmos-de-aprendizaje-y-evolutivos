# Ejercicio 1: 
# Jorge es un estudiante universitario que cuenta con 10 soles de presupuesto para comprar cafe antes de sus clases.
# Ha visto los precios en cuatro cafeterias cercanas:
# Cafeteria    | precio por cafe
# A(0)         | 2.50
# B(1)         | 3.00
# C(2)         | 1.75
# D(3)         | 2.20
# Usando NumPy determinar:
# 1. Cuantos cafes puede comprar en cada una de las cuatro cafeterias con sus 10 soles.
# 2. En cual cafeteria obtiene la mayor cantidad de cafes sin pasarse del presupusto.
# 3. El precio minimo entre las cuatro cafeterias y el indice o nombre de esa cafeteria.

# Ejercicio 1: ¿Dónde compro mi café?
# ----------------------------------

import numpy as np
presupuesto = 10.0 # definicion del presupuesto

#lista de precios (indice correspondiente a su cafeteria)
precios = np.array([2.50, 3.00, 1.75, 2.20])

#maximo de cafes que se puede comprar en cada cafeteria

max_cafes = np.floor(presupuesto / precios) #.floor redondea hacia abajo

#
cantidad_max = int(max_cafes.max())
indice_max = int(max_cafes.argmax())

precio_min = precios.min()
indice_precio_min = int(precios.argmin())

nombres = ['A', 'B', 'C', 'D']

for i, nombre in enumerate(nombres):
    print(f"Cafeteria {nombre}: precio S/ {precios[i]:.2f} → puede comprar {int(max_cafes[i])} cafes")

print(f"\nCon S/ {presupuesto:.2f} obtienes la mayor cantidad de cafes ({cantidad_max}) en la cafeteria {nombres[indice_max]}.")
print(f"El precio mas bajo es S/ {precio_min:.2f} en la cafeteria {nombres[indice_precio_min]}.")
