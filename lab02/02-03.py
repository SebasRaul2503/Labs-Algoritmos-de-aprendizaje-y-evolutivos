# 3. Prestamo de libros en biblioteca
import pandas as pd

datos_prestamos = {#dataframe
    'Estudiante': ['Rosa', 'David', 'Elena', 'Mario', 'Paula'],
    'Dias_prestamo': [7, 10, 5, 12, 3]
}
df_prestamos = pd.DataFrame(datos_prestamos)

# Estadisticas generales
estadisticas = df_prestamos['Dias_prestamo'].describe()
# Mas de 8 dias de prestamo
mayores_8_dias = df_prestamos[df_prestamos['Dias_prestamo'] > 8]

print("Estadisticas de prestamo:\n", estadisticas)
print("Estudiantes con mas de 8 dias de prestamo:\n", mayores_8_dias)