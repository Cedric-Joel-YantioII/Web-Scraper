from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests for local development

# Function to scrape a webpage and store all links, images, and text items
def scrape_website(url):
    try:
        # Send a GET request to the website
        print(f"\n[+] Fetching the webpage content from: {url}")
        response = requests.get(url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the HTML content of the page using BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')

            # Collect all links
            links = [link['href'] for link in soup.find_all('a', href=True)]

            # Collect all image sources 
            images = [img['src'] for img in soup.find_all('img', src=True)]

            # Collect all paragraph and header (h1, h2, h3) texts
            paragraphs = [p.get_text() for p in soup.find_all('p')]
            headers = [header.get_text() for header in soup.find_all(['h1', 'h2', 'h3'])]

            return links, images, paragraphs + headers

        else:
            return [], [], []

    except Exception as e:
        return [], [], []

# API route to scrape and search the website
@app.route('/api/scrape', methods=['POST'])
def scrape_and_search():
    data = request.json
    url = data.get('url')
    search_term = data.get('search_term')
    search_type = data.get('search_type')

    if not url or not search_term or not search_type:
        return jsonify({"error": "Invalid input"}), 400

    links, images, text_items = scrape_website(url)

    # Search content
    found_items = []
    search_term = search_term.lower()

    if search_type == 'link':
        found_items = [link for link in links if search_term in link.lower()]
    elif search_type == 'image':
        found_items = [image for image in images if search_term in image.lower()]
    elif search_type == 'item':
        found_items = [item for item in text_items if search_term in item.lower()]

    if found_items:
        return jsonify(found_items), 200
    else:
        return jsonify({"message": f"No {search_type} found containing '{search_term}'."}), 200

if __name__ == '__main__':
    app.run(debug=True)

