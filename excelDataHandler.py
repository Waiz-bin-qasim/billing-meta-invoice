import openpyxl 
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment
from openpyxl.styles import PatternFill, Border, Side



def create_excel (filename):
    excel_file = Workbook()
    excel_file.save(filename)



def set_template(sheet,date):

    # fills in blue colour, merges and fills the text
    blue_fill = PatternFill(start_color='305496', end_color='305496', fill_type='solid')
    font_style = Font(size=14, bold=True, color='FFFFFF', name='Arial')
    align_center = Alignment(horizontal='center', vertical='center')
    align_right = Alignment(horizontal='right', vertical='center')

    for row in sheet.iter_rows(min_row=1, max_row=3, max_col=6):
        for cell in row:
            cell.fill = blue_fill

    for row_number in range(1,4):
        sheet.merge_cells(start_row=row_number, start_column=1, end_row=row_number, end_column=6)

    cell = sheet.cell(row=2, column=1, value="Client Wise Billing Report - Digital Connect/WhatsApp API Plan Subscription")
    cell.font = font_style
    cell.alignment = align_center

    font_style = Font(size=12, bold=True, color='FFFFFF', name='Arial')
    cell = sheet.cell(row=3, column=1, value=date)
    cell.font = font_style
    cell.alignment = align_right


    # fills in black colour and text headings
    black_fill = PatternFill(start_color='000000', end_color='000000', fill_type='solid')
    font_style = Font(size=10, bold=True, color='FFFFFF', name='Arial')

    for col_num in range(1,7):
        cell = sheet.cell(row=4, column=col_num)
        cell.fill = black_fill

    cell = sheet.cell(row=4, column=2)
    cell.value = "CUSTOMER NAME"
    cell.font = font_style

    cell = sheet.cell(row=4, column=3)
    cell.value = "ITEM"
    cell.font = font_style

    cell = sheet.cell(row=4, column=4)
    cell.value = "BILLLING PERIOD"
    cell.font = font_style

    cell = sheet.cell(row=4, column=5)
    cell.value = "QTY"
    cell.font = font_style
    cell.alignment = align_right

    cell = sheet.cell(row=4, column=6)
    cell.value = "AMOUNT"
    cell.font = font_style
    cell.alignment = align_right


    # sets width of each column
    sheet.column_dimensions['A'].width = 4.22
    sheet.column_dimensions['B'].width = 60.00
    sheet.column_dimensions['C'].width = 50.78
    sheet.column_dimensions['D'].width = 26.89
    sheet.column_dimensions['E'].width = 16.78
    sheet.column_dimensions['F'].width = 38.22



def set_subtotal(sheet,subtotal):

    rowNum = sheet.max_row + 1

    fill_color = PatternFill(start_color='D9E1F2', end_color='D9E1F2', fill_type='solid')
    align_right = Alignment(horizontal='right', vertical='center')

    for col in range(1,7):
        cell = sheet.cell(row=rowNum, column=col)
        cell.fill = fill_color

    border_style = Side(border_style='thin', color='000000')
    border = Border(top=border_style, bottom=border_style)

    for col in range(1,7):
        cell = sheet.cell(row=rowNum, column=col)
        cell.border = border
    

    font_style = Font(bold=True, name='Arial', size=10)
    cell = sheet.cell(row=rowNum, column=5, value="Subtotal")
    cell.font = font_style
    cell.alignment = align_right

    font_style = Font(bold=True, name='Arial', size=11)
    cell = sheet.cell(row=rowNum, column=6, value=float(subtotal)) 
    cell.font = font_style
    cell.alignment = align_right
    cell.number_format = '$#,##0.00'



def set_subscription(sheet,date,userAllowed,activeUsers,extraUser,price,additionalCharge):

    font_style = Font(bold=True, name='Arial', size=9)
    rowMax = sheet.max_row

    # subscription data
    cell = sheet.cell(row=rowMax, column=3, value="SUBSCRIPTION PLAN")
    cell.font = font_style
    set_color(sheet)

    cell = sheet.cell(row=rowMax+1, column=3)
    cell.value = f"{userAllowed}     Monthly Active Users @{price}/month"

    cell = sheet.cell(row=rowMax+1, column=4)
    cell.value = date

    cell = sheet.cell(row=rowMax+1, column=5)
    cell.value = int(activeUsers)

    cell = sheet.cell(row=rowMax+1, column=6)
    cell.value = float(price)
    cell.number_format = '$#,##0.00'
    set_color(sheet)


    # additional charges
    cell = sheet.cell(row=rowMax+2,column=3)
    cell.value = f"Additonal Users Outside Tier @${additionalCharge}/per user"

    cell = sheet.cell(row=rowMax+2,column=5)
    cell.value = int(extraUser)

    cell = sheet.cell(row=rowMax+2, column=6)
    cell.value = float(additionalCharge) * int(extraUser)
    cell.number_format = '$#,##0.00'
    set_color(sheet)


    # sub heading
    cell = sheet.cell(row=rowMax+3, column=3, value="WHATSAPP CONVERSATIONS")
    cell.font = font_style
    set_color(sheet)



def set_heading (sheet,dataNumber,customerName):

    rowMax = sheet.max_row
     
    font_style = Font(bold=True, name='Arial', size=10)
    align_center = Alignment(horizontal='center', vertical='center')

    cell = sheet.cell(row=rowMax+1, column=1, value=dataNumber)
    cell.font = font_style
    cell.alignment = align_center

    cell = sheet.cell(row=rowMax+1, column=2, value=customerName)
    cell.font = font_style

    set_color(sheet)
    
  


def set_footer(sheet):

    rowMax = sheet.max_row
    fill_color = PatternFill(start_color='D9E1F2', end_color='D9E1F2', fill_type='solid')
    font_style = Font(size=10, bold=True, color='000000', name='Arial')
    align_center = Alignment(horizontal='center', vertical='center')

    for row in range(1,7):
        sheet.merge_cells(start_row=rowMax+row, start_column=1, end_row=rowMax+row, end_column=6)
        cell = sheet.cell(row=rowMax+row, column=1)
        cell.fill = fill_color

    cell = sheet.cell(row=rowMax+2, column=1)
    cell.value = "Subtotal for clients does not include any line items  billed in PKR. Hence carefully invoice line items in such cases."
    cell.alignment = align_center
    cell.font = font_style

    cell = sheet.cell(row=rowMax+3, column=1)
    cell.value = "Estimated totals are provided in USD and PKR seperately where applicable."
    cell.alignment = align_center
    cell.font = font_style

    cell = sheet.cell(row=rowMax+4, column=1)
    cell.value = "Estimated totals are only provided for billing items chargeable by Eocean hence WhatsApp conversations fee is not included in Estimated totals."
    cell.alignment = align_center
    cell.font = font_style

    cell = sheet.cell(row=rowMax+5, column=1)
    cell.value = "Verify WhatsApp conversation fee totals from Meta Invoice."
    cell.alignment = align_center
    cell.font = font_style



def set_color(sheet):

    rowMax = sheet.max_row

    fill_color = PatternFill(start_color='F2F2F2', end_color='F2F2F2', fill_type='solid')

    for col in range(1,7):
        cell = sheet.cell(row=rowMax, column=col)
        cell.border = None
    
    for col in range(1,7):
        cell = sheet.cell(row=rowMax, column=col)
        cell.fill = fill_color



def insert_data(sheet,company_data):

    # empty array
    if company_data is None or len(company_data) == 0:
        print("EMPTY DATA ARRAY")
        return

    num_rows = len(company_data)
    align_right = Alignment(horizontal='right', vertical='center')
    

    for row in range(num_rows):

        # empty data
        if company_data[row][0] == 0:
            continue
    
        
        set_heading(sheet,row+1,company_data[row][0])
        set_subscription(sheet,company_data[row][13],company_data[row][2],company_data[row][1],company_data[row][15],company_data[row][3],company_data[row][4])


        # inserting conversation fee
        rowMax = sheet.max_row
        sheet.cell(row=rowMax+1, column=3, value="Fee Conversation/Month")
        sheet.cell(row=rowMax+1, column=4, value=company_data[row][13])

        cell = sheet.cell(row=rowMax+1, column=5, value=1000) #Default Value
        cell.alignment = align_right

        cell = sheet.cell(row=rowMax+1, column=6, value=0.00) #Default Value
        cell.alignment = align_right
        cell.number_format = '$#,##0.00'

        set_color(sheet)


        # inserting Service
        rowMax = sheet.max_row
        sheet.cell(row=rowMax+1, column=3, value="Service Conversation")
        sheet.cell(row=rowMax+1, column=4, value=company_data[row][13])

        cell = sheet.cell(row=rowMax+1, column=5, value=int(company_data[row][5]))
        cell.alignment = align_right

        cell = sheet.cell(row=rowMax+1, column=6, value=float(company_data[row][6]))
        cell.alignment = align_right
        cell.number_format = '$#,##0.00'

        set_color(sheet)

            
        #inserting Marketing
        rowMax = sheet.max_row
        sheet.cell(row=rowMax+1, column=3, value="Marketing Conversation")
        sheet.cell(row=rowMax+1, column=4, value=company_data[row][13])

        cell = sheet.cell(row=rowMax+1, column=5, value=int(company_data[row][7]))
        cell.alignment = align_right

        cell = sheet.cell(row=rowMax+1, column=6, value=float(company_data[row][8]))
        cell.alignment = align_right
        cell.number_format = '$#,##0.00'
      
        set_color(sheet)


        #inserting Utility
        rowMax = sheet.max_row
        sheet.cell(row=rowMax+1, column=3, value="Utility Conversation")
        sheet.cell(row=rowMax+1, column=4, value=company_data[row][13])

        cell = sheet.cell(row=rowMax+1, column=5, value=int(company_data[row][11]))
        cell.alignment = align_right

        cell = sheet.cell(row=rowMax+1, column=6, value=float(company_data[row][12]))
        cell.alignment = align_right
        cell.number_format = '$#,##0.00'

        set_color(sheet)


        #inserting Authentication
        rowMax = sheet.max_row
        sheet.cell(row=rowMax+1, column=3, value="Authentication Conversation")
        sheet.cell(row=rowMax+1, column=4, value=company_data[row][13])

        cell = sheet.cell(row=rowMax+1, column=5, value=int(company_data[row][9]))
        cell.alignment = align_right

        cell = sheet.cell(row=rowMax+1, column=6, value=float(company_data[row][10]))
        cell.alignment = align_right
        cell.number_format = '$#,##0.00'

        set_color(sheet)


        set_subtotal(sheet,company_data[row][14])
        
    

def set_totals(sheet,total_dollars,total_pkr):

    rowMax = sheet.max_row
    align_right = Alignment(horizontal='right', vertical='center')
    font_style = Font(bold=True, name='Arial', size=11)
    border_style = Side(border_style='thin', color='000000')
    border = Border(top=border_style, bottom=border_style)

    for col in range(1,7):
        cell = sheet.cell(row=rowMax+1, column=col)
        cell.border = border
    
    for col in range(1,7):
        cell = sheet.cell(row=rowMax+2, column=col)
        cell.border = border

    # dollars estimate
    sheet.merge_cells(start_row=rowMax+1, start_column=1, end_row=rowMax+1, end_column=5)

    cell = sheet.cell(row=rowMax+1, column=1, value="ESTIMATED TOTAL")
    cell.font = font_style
    cell.alignment = align_right

    cell = sheet.cell(row=rowMax+1, column=6, value=float(total_dollars))
    cell.alignment = align_right
    cell.font = font_style
    cell.number_format = '$#,##0.00'

    # pkr estimate
    sheet.merge_cells(start_row=rowMax+2, start_column=1, end_row=rowMax+2, end_column=5)

    cell = sheet.cell(row=rowMax+2, column=1, value="ESTIMATED TOTAL")
    cell.font = font_style
    cell.alignment = align_right

    cell = sheet.cell(row=rowMax+2, column=6, value=float(total_pkr))
    cell.alignment = align_right
    cell.font = font_style
    cell.number_format = 'PKR #,##0.00'

    

def data_handler(filename,company_data,total_dollars,total_pkr):

   try:

        create_excel(filename)

        excel_file = openpyxl.load_workbook(filename)
        sheet = excel_file.active

        set_template(sheet,company_data[0][13])

        insert_data(sheet,company_data)

        set_totals(sheet,total_dollars,total_pkr)

        set_footer(sheet)

        excel_file.save(filename)
        print("DATA SAVED")

   except PermissionError:
        print(f"PermissionError: The file '{excel_file}' is in use. Please close it and try again.")
   except Exception as e:
        print(f"Error occurred: {e}")






