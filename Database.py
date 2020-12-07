from os import path
ROOT = path.dirname(path.realpath(__file__))
import sqlite3

def get_connection():
    con = sqlite3.connect(ROOT+"/databases/"+f"data.bd")
    cursor = con.cursor()
    return con,cursor

#########################################################Tabelas############################################


def create_table(table:str, collums:list):
    con,cursor = get_connection()

    cols = ""
    for collum in collums:
        cols+= f"{collum[0]} {collum[1]},"
    
    cols = cols[:-1]
    query = f"""CREATE TABLE {table}({cols})"""

    cursor.execute(query)
    con.commit()


#########################################################Inserções#############################################
def insert_table(table:str,data:list):
    con,cursor = get_connection()

    values = "("
    for value in data:
        if(type(value) == str):
            values+=f"'{value}',"
        else:
            values+=f"{value},"
    values = values[:-1]+')'
    query = f"""INSERT INTO {table} VALUES{values}"""

    cursor.execute(query)
    con.commit()


#########################################################Requisições############################################

def get_table(table:str,rows:int=10,order:int=0):
    con,cursor = get_connection()
    
    query = f"""SELECT * FROM {table}"""

    if(order==1):
       query += f" ORDER BY Value ASC"
    elif(order==2):
       query += f" ORDER BY Value DESC"

    query += f" LIMIT {rows}"

    cursor.execute(query)

    data = cursor.fetchall()

    return data

def get_table_last_row(table:str):
    con,cursor = get_connection()
    
    query = f"""SELECT * FROM {table} """

    cursor.execute(query)

    data = cursor.fetchall()

    return data

def get_row(table:str,row:str):
    con,cursor = get_connection()
    
    query = f"""SELECT {row} FROM {table} """

    cursor.execute(query)

    data = cursor.fetchall()

    return data

def exists(table:str,row:str,value:str):
    con,cursor = get_connection()

    query = f"SELECT EXISTS(SELECT {row} FROM {table} WHERE {row}='{value}')"
    print(query)

    cursor.execute(query)

    data = cursor.fetchall()

    return data[0][0]

#########################################################Login#############################################

def get_pass(user:str):
    con,cursor = get_connection()
    
    query = f"""SELECT Password FROM User WHERE Name='{user}'"""



    cursor.execute(query)

    data = cursor.fetchall()

    return data[0][0]

########################################################################################################

#insert_temperature("01/07",24)
#print(get_last_temperature())
#print(get_temperature_all())
#app.run()

##create_table("Temperature",[["Date","TEXT"],["Value","INTEGER"]])
##create_table("User",[["Name","TEXT PRIMARY KEY"],["Password","TEXT"]])


