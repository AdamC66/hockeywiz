import graphene
from teams.schema import Query as Teams_Query
from schedule.schema import Query as Schedule_Query
from players.schema import Query as Player_Query
class Query(Teams_Query, Schedule_Query, Player_Query):
    pass

schema = graphene.Schema(query=Query)
