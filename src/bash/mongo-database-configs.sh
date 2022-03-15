#!/bin/bash

mongosh

# não é possível executar os comandos abaixo de forma automática com bash script
# é necessário executá-los manualmente

use vistraining

use admin

db.createUser({
    user: "admin",
    pwd: "vbnibv87afa876",
    roles: [
        "clusterAdmin",
        "readWriteAnyDatabase",
        "dbAdminAnyDatabase",
        "userAdminAnyDatabase"
    ]
})

db.createUser({ 
    user: "development",
    pwd: "ihasd76acsvjhv7sac",
    roles: [
        {
            role: "readWrite",
            db: "vistraining"
        }
    ]
})

rs.initiate(
  {
    _id : "vis",
    members: [
      { _id : 0, host : "localhost:27017" },
      { _id : 1, host : "localhost:27020" },
      { _id : 2, host : "localhost:27021" }
    ]
  }
)

db.getSiblingDB("admin").createUser({ user: "admin", pwd: "vbnibv87afa876", roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})

# após as configurações adicione o bloco "security" às configurações da réplica


# configurações sem replica set
mongosh --port 27017  --authenticationDatabase "admin" -u "admin" -p "vbnibv87afa876"
mongosh --port 27017  --authenticationDatabase "vistraining" -u "development" -p "ihasd76acsvjhv7sac"
