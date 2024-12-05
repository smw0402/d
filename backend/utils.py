from pykrx import stock
import pandas as pd

def fetch_stock_data(date, market="KOSPI"):
    tickers = stock.get_market_ticker_list(market=market)
    ohlcv_data = stock.get_market_ohlcv_by_ticker(date, market=market)
    fundamental_data = stock.get_market_fundamental_by_ticker(date, market=market)

    df = pd.concat([ohlcv_data, fundamental_data], axis=1)
    df['Ticker'] = df.index
    df['Name'] = df['Ticker'].apply(stock.get_market_ticker_name)

    df.rename(columns={
        '종가': 'Close', 'PER': 'PER', 'PBR': 'PBR', 'EPS': 'EPS', 'ROE': 'ROE', '배당수익률': 'DIV'
    }, inplace=True, errors='ignore')

    for column in ['PER', 'PBR', 'EPS', 'ROE', 'DIV']:
        if column not in df.columns:
            df[column] = 0

    if 'PER' in df.columns:
        df['Debt Ratio'] = 50 - df['PER']

    return df

def filter_stocks(df, criteria, top_n=10):
    if criteria == 'Undervalued':
        filtered = df[(df['PER'] < 10) & (df['PBR'] < 1)]
    elif criteria == 'Growth':
        filtered = df[(df['EPS'] > df['EPS'].mean()) & (df['ROE'] > df['ROE'].mean())]
    elif criteria == 'Stable Dividend':
        filtered = df[(df['DIV'] > df['DIV'].mean()) & (df['Debt Ratio'] < 50)]
    elif criteria == 'Risk-Minimized':
        filtered = df[df['Debt Ratio'] < 30]
    elif criteria == 'Long-Term':
        filtered = df[(df['DIV'] > df['DIV'].mean()) & (df['ROE'] > df['ROE'].mean())]
    else:
        return pd.DataFrame()

    if not filtered.empty:
        filtered = filtered.sort_values(by='Close', ascending=False).head(top_n)
    return filtered
