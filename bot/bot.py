import discord
from requests import get
from json import loads


intents = discord.Intents.all()
client = discord.Client(intents=intents)

server = "http://roboaranalytics.pythonanywhere.com/"



########################################Bot Events################################################

@client.event
async def on_ready():
    print("Started")

@client.event
async def on_message(message):

    
    if message.content.startswith("b!"):
        command = message.content.split()
        try:
            if command[1] == "get":
                url = f"{server}/data/{command[2]}"

                #Adds optional arguments to the url
                for i in range(1,len(command)-2):
                    url+=f";{command[len(command)-i]}"
                    
                response = get(url)
                
                data = loads(response.text)
                for value in data:
                    await message.channel.send(f"Data: {value[0]} Valor: {value[1]}" )
                print(f"data from table {command[2]}")
            
        except:
           await message.channel.send("Comando inválido")











token = open("token.txt", 'r',encoding="utf-8").read()

client.run(token)

