# 5. Recarga de datos moviles
import numpy as np
gb = np.array([1, 2, 5, 10])# Array de GB
precios_paquetes = np.array([5, 9, 20, 35]) # Array de precios
costo_por_gb = precios_paquetes / gb
mejor_paquete = np.argmin(costo_por_gb)

print("Costo por GB:", costo_por_gb)
print("Paquete mas economico por GB: Paquete", gb[mejor_paquete], "GB")