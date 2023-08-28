
def remove_comma(new_line):

    comma_count = 0
    check = 0
    final_line = ""

    for char in new_line:

        if check == 1 and char == '"':
            check = 2
        elif check == 2 and char == ",":
            check = 0
            continue

        if char == ',':
            comma_count = comma_count + 1

            if (comma_count == 3 or comma_count == 4):
                check = 1

        
        final_line = final_line + char

    return final_line


def fix_cell (new_line,line):
    
    # second column with double cell
    if line[-2] == ',':
        new_line = ',' + new_line + line[0:-2] + '\n'

    # first column with double cell
    else:
        new_line = new_line + line[0:-1] + '\n'
    
    return new_line
        

def dataCleaning (pdf_file):
  
  try:
    new_file = "new_file.csv"
    with open(pdf_file, "r") as f1, open(new_file, "w") as f2:
   

        heading = False
        double_cell = False
        new_line = ""
        
        
        for line in f1:

            if line.find("Send Month") != -1:
                if heading == False:
                    heading = True
                else:
                    continue

            if line.find("Subtotal") != -1:
                continue

            if ((line[0] == '"') or (line[0] == ',' and line[1] == '"')) and double_cell == False:
                new_line = line[0:-1]
                double_cell = True
                continue

            elif double_cell == True:
                new_line = fix_cell(new_line,line)
                double_cell = False

            # first column cell is empty
            elif line[-2] == ',':
                new_line = ',' + line[0:-2] + '\n'

            else:
                new_line = line

            # removing empty rows
            if new_line.find(',,') != -1:
                continue

            # removing commas b/w numbers
            if new_line.find('"') != -1:

                final_line = remove_comma(new_line)
                f2.writelines(final_line.translate({ord('"'): None}))
                
            else:
                f2.writelines(new_line.translate({ord('"'): None}))
               
                
    
    
    
  
  except IOError as e:
    print(f"Error while processing the file: {e}")
  except Exception as ex:
    print(f"An unexpected error occurred: {ex}")