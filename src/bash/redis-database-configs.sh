#!/bin/bash

redis-cli

# não é possível executar os comandos abaixo de forma automática com bash script
# é necessário executá-los manualmente

# essa configuração não deverá extir em ambiente de produção
CONFIG SET protected-mode no

ACL SETUSER development on allkeys +select +info +@string +@set +@sortedset +@list +@hash +@bitmap +@pubsub +@read +@write  >j23h5b4obp253b4
