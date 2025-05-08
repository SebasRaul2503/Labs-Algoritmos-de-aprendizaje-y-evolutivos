# 2. Viajes al campus
import numpy as np

presupuesto = 15
precio_transporte = np.array([2.50, 3.00, 1.80])  # bus, combi, tren
viajes = np.floor(presupuesto / precio_transporte)
mejor_medio = np.argmax(viajes)

print("Viajes posibles por medio:\n",["Bus", "Combi", "Tren"],"\n",  viajes)
print("Medio con mas viajes:", ["Bus", "Combi", "Tren"][mejor_medio])