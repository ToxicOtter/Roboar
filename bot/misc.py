import discord


def genEmbed(title:str,body:str,descp="Boar",color=990033):
    """Generates a embed with the given Title and Content"""
    embed = discord.Embed(title=title,description=descp,color=color)
    embed.add_field(name="Content", value=body, inline=False)
    
    return embed


def genTableString(data:list,row_names:list,width=20):
    
    table = "```md\n"

    table += f"{row_names[0]} ".ljust(3+width-len(row_names[1])) + f"{row_names[1]}\n"
    
    for row in data:
        table+="<< "

        table += f"{row[0]}:".ljust(width-len(str(row[1])),'-') + f"{row[1]}\n"
    
    table+= "```"


    return table


