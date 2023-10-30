import dataHandler

def upload():

    try:
        data = request.form
        parserChoice = data.get('parserChoice')
        
        file = request.files['file']
        if file.filename == '':
            return 'No file selected'
        file.save('transaction.pdf')
        sql_values = []
        response = dataHandler.run(sql_values,parserChoice)
        return jsonify(response)
    
    except Exception as ex:
        print(f'Error during file upload: {ex}')
        return jsonify({'message': 'An error occurred during file upload.'}), 500
