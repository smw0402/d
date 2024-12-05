from flask import Flask, request, jsonify
from pykrx import stock
import pandas as pd
from datetime import datetime
import requests
from utils import fetch_stock_data, filter_stocks

app = Flask(__name__)

@app.route('/fetch_stocks', methods=['POST'])
def fetch_stocks():
    data = request.json
    date = data['date']
    market = data['market']
    criteria = data.get('criteria', 'Undervalued')

    try:
        df = fetch_stock_data(date, market)
        recommendations = filter_stocks(df, criteria)

        if not recommendations.empty:
            recommendations = recommendations.to_dict(orient='records')
        else:
            recommendations = []
        return jsonify({'success': True, 'data': recommendations})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/fetch_news', methods=['GET'])
def fetch_news():
    date = request.args.get('date')
    try:
        news = fetch_economic_issues(date)
        return jsonify({'success': True, 'news': news})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

def fetch_economic_issues(date):
    formatted_date = datetime.strptime(date, '%Y%m%d').strftime('%Y-%m-%d')
    api_url = f"https://newsapi.org/v2/everything?q=economy&from={formatted_date}&to={formatted_date}&apiKey=YOUR_API_KEY"
    response = requests.get(api_url)
    return response.json().get('articles', [])

if __name__ == '__main__':
    app.run(debug=True)
