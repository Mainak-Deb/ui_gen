from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def read_text_file():
    try:
        # Read the text file
        with open('dummy_text_file.txt', 'r') as file:
            text_content = file.read()
        
        # Create a JSON response
        response = {
            'status': 'success',
            'message': 'Text file content retrieved successfully',
            'data': {
                'text_content': text_content
            }
        }
        return jsonify(response), 200
    except Exception as e:
        # If an error occurs, return an error message
        error_response = {
            'status': 'error',
            'message': str(e)
        }
        return jsonify(error_response), 500

if __name__ == '__main__':
    app.run(debug=True)
