import json

def change_param(species, conditions, new_optimal_conditions):
    # Replace 'optimal.json' with the actual path to your JSON file
    file_path = 'optimal.json'

    # Load the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)

    # Find the species in the data
    for entry in data[species]:
        print('========')
        match = all(entry.get(key) == value for key, value in conditions[0].items())
        if match:
            optimal_conditions = entry.get('optimal_conditions', {})
            for key, value in optimal_conditions.items():
                print(f'{key}: {value}')

# Example usage
change_param("pike", [{"weather": "Cloudy"}], [{"colors": ["grey", "black"]}])
