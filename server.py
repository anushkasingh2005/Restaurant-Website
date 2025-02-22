from flask import Flask, request, jsonify

app = Flask(__name__)

# List of menu items with their prices
menu_items = [
    {"name": "Pizza", "price": 200},
    {"name": "Butter Chicken", "price": 450},
    {"name": "Paneer Tikka", "price": 350},
    # ... other menu items
]

@app.route('/calculate_total', methods=['POST'])
def calculate_total():
    data = request.get_json()
    selected_items = data.get('selected_items', [])

    total_amount = 0
    for item in selected_items:
        menu_item = next((item for item in menu_items if item['name'] == item['name']), None)
        if menu_item:
            total_amount += menu_item['price']

    return jsonify({'total_amount': total_amount})

if __name__ == '__main__':
    app.run(debug=True)