# 4. Gastos de almuerzo semanal
import pandas as pd

gastos_semanales = [4.0, 3.5, 5.0, 4.2, 3.8] # Gastos
# Dataframe de gastos con dias
df_gastos = pd.DataFrame({'Gasto': gastos_semanales}, index=['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'])
# Suma de gastos para el total
gasto_total = df_gastos['Gasto'].sum()
# Gasto promedio
gasto_promedio = df_gastos['Gasto'].mean()
# Dias con gasto mayor al promedio
dias_altos = df_gastos[df_gastos['Gasto'] > gasto_promedio]

print("Gasto total:", gasto_total)
print("Gasto promedio:", gasto_promedio)
print("Dias con gasto mayor al promedio:\n", dias_altos)