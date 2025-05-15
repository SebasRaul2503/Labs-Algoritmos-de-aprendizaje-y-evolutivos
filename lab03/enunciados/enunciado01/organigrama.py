from graphviz import Digraph

# Codigo para crear el organigrama
def crear_organigrama_hill_climbing():
    dot = Digraph()

    dot.node('A', 'Inicio')
    dot.node('B', 'Estado Actual')
    dot.node('C', 'Generar Vecinos')
    dot.node('D', 'Seleccionar Mejor Vecino')
    dot.node('E', '¿Mejor Vecino > Estado Actual?')
    dot.node('F', 'Actualizar Estado Actual')
    dot.node('G', 'Fin (Óptimo Local)')

    dot.edges(['AB', 'BC', 'CD'])
    dot.edge('D', 'E')
    dot.edge('E', 'F', label='Sí')
    dot.edge('F', 'B')  # Loop de vuelta al estado actual
    dot.edge('E', 'G', label='No')

    dot.render('organigrama_hill_climbing', format='png', cleanup=True)
    print("Organigrama generado como 'organigrama_hill_climbing.png'.")

crear_organigrama_hill_climbing()
