# 1. Fotocopias para apuntes
import numpy as np

presupuesto = 8 # Presupuesto
precios = np.array([0.10, 0.12, 0.08]) # Array de precios
paginas = np.floor(presupuesto / precios) # Redondeo hacia abajo
mejor_opcion = np.argmax(paginas)

print("Paginas posibles por copisteria:", paginas)
print("Copisteria con mas paginas: Copisteria", mejor_opcion + 1)









