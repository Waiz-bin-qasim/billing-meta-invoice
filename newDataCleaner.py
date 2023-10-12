import os


def remove_comma(new_line):

    comma_count = 0
    check = 0
    finalLine = ""

    for char in new_line:

        if check == 1 and char == '"':
            check = 2
        elif check == 2 and char == ",":
            check = 0
            continue

        if char == ',':
            comma_count = comma_count + 1

            if (comma_count == 3 or comma_count == 5):
                check = 1


        finalLine = finalLine + char

    return finalLine
        

def removeColumns(new_line):

    comma_count = 0
    finalLine =""

    for char in new_line:

        if char == ",": 
            comma_count = comma_count + 1
        
        if comma_count == 2: 
            continue

        if comma_count == 4:
            continue

        finalLine = finalLine + char
    
    return finalLine


def dataCleaning (outputFile):
  
  try:
        newFile = "newFile.csv"
        with open(outputFile, "r") as f1, open(newFile, "w") as f2:
    
            heading = False
            conCatLine = False
            newLine = ""

            for line in f1:

                # removing subtotals 
                if (line[:4] == ",,,,"):
                    continue


                # heading stored once only
                if line.find("Conversations") != -1:
                    if heading == False:
                        heading = True
                        newLine = "WABA Name," + line
                        newLine = removeColumns(newLine)
                        f2.writelines(newLine.translate({ord('"'): None}))
                        newLine = ""
                        continue
                    # title at the end of page 
                    elif conCatLine == True: 
                        continue
                    else:
                        newLine = ""
                        continue


                # WABA Name ConCat Lines
                if (line[-5:-1] == ",,,,"):
                    newLine = newLine + " " + line[0:-5]
                    conCatLine = True
                    continue
                elif (conCatLine == True):
                    conCatLine = False
                    newLine = newLine + "," + line
                else:
                    newLine = "," + line


                # exceptions when tabula py fails to recognize columns
                newLine = newLine.replace(' List', ',List')
                newLine = newLine.replace(',,', ',')


                # removing commas b/w numbers and columns (discount and price type)
                if newLine.find('"') != -1:
                    final_line = remove_comma(newLine)
                    final_line = removeColumns(final_line)
                    f2.writelines(final_line.translate({ord('"'): None, ord('$'): None}))
                    newLine = ""
                else:
                    newLine = removeColumns(newLine)
                    f2.writelines(newLine.translate({ord('"'): None, ord('$'): None}))
                    newLine = ""
 

        if os.path.exists(outputFile):
            os.remove(outputFile)

  except IOError as e:
    print(f"Error while processing the file: {e}")
    raise Exception(e)
  except Exception as ex:
    print(f"An unexpected error occurred: {ex}")
    raise Exception(ex)


