import pandas as pd

# Datos de los estudiantes
datos = {
    'Estudiante': ['Ana', 'Luis', 'Maria', 'Juan', 'Carla'],
    'Horas_usadas': [3, 5, 2, 4, 1]
}

# cracion del dataframe
df = pd.DataFrame(datos)

# costo toal
df['Costo_total'] = df['Horas_usadas'] * 2.0

# dataframe de uso de lab
print("=== Dataframe de uso de laboratorio ===")
print(df)

# estadisticas generales del costo total
stats = df['Costo_total'].describe()
print("\n=== Estadisticas de Costo_total ===")
print(stats)

# estudiantes con gasto mayor a 6 soles
df_mayor_6 = df[df['Costo_total'] > 6.0]

# gasto promedio y lista de estudiantes
gasto_promedio = stats['mean']
lista_altos = df_mayor_6['Estudiante'].tolist()

print(f"\nEl gasto promedio por estudiante fue de {gasto_promedio:.2f} soles.")
print("Estudiantes que gastaron mas de 6 soles:")
for alumno in lista_altos:
    print(f" - {alumno}")
