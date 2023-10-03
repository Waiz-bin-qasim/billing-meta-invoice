import PyPDF2
import tabula
import csv 
import os

def readPdf(pdfFile):

    try:

        pageReader = PyPDF2.PdfReader(pdfFile)
        numPages = len(pageReader.pages)

        tempFile = "temp.csv"
        sourceFile = "output.csv"

        for num in range(2,numPages + 1):
        
            dataframe = tabula.read_pdf(pdfFile, pages=num, area=[56.993,15.606,751.613,610.011])
            table = dataframe[0]
            table.to_csv(tempFile, index=False)

            with open(tempFile, 'r') as f1:
                reader = csv.reader(f1)
                sourceData = list(reader)

            if num == 2:
                with open(sourceFile, 'w', newline='') as f2:
                    csv_writer = csv.writer(f2)
                    csv_writer.writerows(sourceData)
            else:
                with open(sourceFile, 'a', newline='') as f2:
                    writer = csv.writer(f2)
                    writer.writerows(sourceData)


        if os.path.exists("temp.csv"):
            os.remove("temp.csv")
    
    except FileNotFoundError as e:
        print(f"Error while reading PDF: {e}")
        raise Exception(e)
    except Exception as ex:
        print(f"An unexpected error occurred: {ex}")
        raise Exception(ex)


def getVariables(pdfFile):

    try: 

        with open(pdfFile, "rb") as file:
            
            pdf_reader = PyPDF2.PdfReader(file)
            page = pdf_reader.pages[0]
        
            invoiceNumber = ""
            invoiceCheck = False

            deliveryMonth = ""
            dateCheck = False

            deliveryYear = ""
                
            for line in page.extract_text().splitlines():

                if ("Delivery period" in line) and (dateCheck == False):
                    dateCheck = True
                    continue
                elif dateCheck == True:
                    deliveryMonth = line.replace("Payment due date","")
                    deliveryMonth, deliveryYear = deliveryMonth.split("-")
                    dateCheck = False

                if ("Invoice number" in line) and (invoiceCheck == False):
                    invoiceCheck = True
                    continue
                elif invoiceCheck == True:
                    invoiceNumber = line.replace("Invoice date","")
                    break
        

        if (len(deliveryYear) != 0):
            if(len(deliveryYear) == 2):
                deliveryYear = "20" + deliveryYear
        else:
            raise Exception("Data Variable fail to Extract")


        if(len(deliveryMonth) !=0):
            deliveryMonth = deliveryMonth[0].upper() + deliveryMonth[1:3]
        else:
            raise Exception("Data Variable fail to Extract")

        
    except FileNotFoundError as e:
        print(f"Error while reading PDF: {e}")
        raise Exception(e)
    except Exception as ex:
        print(f"An unexpected error occurred: {ex}")
        raise Exception(ex)

    return invoiceNumber, deliveryMonth, deliveryYear


# file = "new-1.pdf"
# number, month, year = getVariables(file)
# print(number,month,year)

