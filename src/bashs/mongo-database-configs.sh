#!/bin/bash

mongosh

# não é possível executar os comandos abaixo de forma automática com bash script
# é necessário executá-los manualmente

# antes de criar os usuários é necessário remover o bloco "security" dos
# arquivos de configurações das réplicas

use vistraining

use admin

db.createUser({ user: "admin", pwd: "vbnibv87afa876", roles: ["clusterAdmin","readWriteAnyDatabase","dbAdminAnyDatabase","userAdminAnyDatabase"] })
db.createUser({ user: "development", pwd: "ihasd76acsvjhv7sac", roles: [{ role: "readWrite", db: "vistraining" }]})

# após as configurações adicione o bloco "security" às configurações da réplica
