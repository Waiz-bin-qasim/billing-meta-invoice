import PyPDF2
import tabula
import csv 
import os


def readPdf (pdf_file):

    try:

        pdf_reader = PyPDF2.PdfReader(pdf_file)
        num_pages = len(pdf_reader.pages)

        for num in range(1,num_pages + 1):
            
            dataframe = tabula.read_pdf(pdf_file, pages=num, area=[268.898,16.371,576.428,609.246])
            
            if len(dataframe) > 0:
                first_table = dataframe[0]
                first_table.to_csv("temp.csv", index=False)

                temp_file = "temp.csv"
                source_file = "output.csv"
                
                with open(temp_file, 'r') as f1:
                    csv_reader = csv.reader(f1)
                    source_data = list(csv_reader)
                
                if num == 1:
                    with open(source_file, 'w', newline='') as f2:
                        csv_writer = csv.writer(f2)
                        csv_writer.writerows(source_data)
                else:
                    with open(source_file, 'a', newline='') as f2:
                        csv_writer = csv.writer(f2)
                        csv_writer.writerows(source_data)

        if os.path.exists("temp.csv"):
            os.remove("temp.csv") 
        print("Table extracted and saved")
    except FileNotFoundError as e:
        print(f"Error while reading PDF: {e}")
        raise Exception(e)
    except Exception as ex:
        print(f"An unexpected error occurred: {ex}")
        raise Exception(ex)


def getVariables(pdf_file):

    try: 

        with open(pdf_file, "rb") as file:
            
            pdf_reader = PyPDF2.PdfReader(file)
            page = pdf_reader.pages[0]
        
            invoice_number = ""
            invoice_month = ""
            invoice_year = ""
                
            for line in page.extract_text().splitlines():
                if "Invoice #:" in line:
                    invoice_number = line.split(":")[1].strip()
                elif "Delivery Period:" in line:
                    invoice_month = line.split(":")[1].strip().split("-")[0]
                    invoice_year = line.split('-')[1]
                

        file.close()

        if (len(invoice_year) != 0):
            if(len(invoice_year) == 2):
                invoice_year = "20" + invoice_year
        else:
            raise Exception("Data Variable fail to Extract")


        if(len(invoice_month) !=0):
            invoice_month = invoice_month[0].upper() + invoice_month[1:3]
        else:
            raise Exception("Data Variable fail to Extract")
        
    except FileNotFoundError as e:
        print(f"Error while reading PDF: {e}")
        raise Exception(e)
    except Exception as ex:
        print(f"An unexpected error occurred: {ex}")
        raise Exception(ex)

    return invoice_number, invoice_month, invoice_year



# file = "new-1.pdf"
# number, month, year = getVariables(file)
# print(number,month,year)

