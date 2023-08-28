import pandas as pd
def parseMAU(data):
    df = pd.read_excel("MAU.xlsx")
    data = pd.read_excel('yourfilename.xlsx',sheet_name='yoursheetname')