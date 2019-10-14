import graphene
from teams.schema import Query as Teams_Query

class Query(Teams_Query):
    pass

schema = graphene.Schema(query=Query)
