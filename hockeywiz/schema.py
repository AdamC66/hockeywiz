import graphene
from teams.schema import Query as Teams_Query
from schedule.schema import Query as Schedule_Query
class Query(Teams_Query, Schedule_Query):
    pass

schema = graphene.Schema(query=Query)
