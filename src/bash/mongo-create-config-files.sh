#!/bin/bash

PRIMARY="
systemLog:
\n   destination: file
\n   path: "/var/log/mongodb/p/mongod.log"
\n   logAppend: true
\nstorage:
\n   dbPath: "/etc/mongo/p"
\n   journal:
\n      enabled: true
\nprocessManagement:
\n   fork: true
\nnet:
\n   bindIpAll: true
\n   port: 27017
\n   maxIncomingConnections: 5
\nreplication:
\n   replSetName: vis
\nsecurity:
\n   authorization: enabled
\n   keyFile: /srv/mongodb/p/keyfile
"

SECONDARY1="
systemLog:
\n   destination: file
\n   path: "/var/log/mongodb/s1/mongod.log"
\n   logAppend: true
\nstorage:
\n   dbPath: "/etc/mongo/s1"
\n   journal:
\n      enabled: true
\nprocessManagement:
\n   fork: true
\nnet:
\n   bindIpAll: true
\n   port: 27020
\n   maxIncomingConnections: 5
\nreplication:
\n   replSetName: vis
\nsecurity:
\n   authorization: enabled
\n   keyFile: /srv/mongodb/s2/keyfile
"

SECONDARY2="
systemLog:
\n   destination: file
\n   path: "/var/log/mongodb/s2/mongod.log"
\n   logAppend: true
\nstorage:
\n   dbPath: "/etc/mongo/s2"
\n   journal:
\n      enabled: true
\nprocessManagement:
\n   fork: true
\nnet:
\n   bindIpAll: true
\n   port: 27021
\n   maxIncomingConnections: 5
\nreplication:
\n   replSetName: vis
\nsecurity:
\n   authorization: enabled
\n   keyFile: /srv/mongodb/s1/keyfile
"

SECRET="7/eeIF5w9b9wkbiPJubTGifGet7HPJO6aPmrRP0wKI/sHkpSWv5+dojVToHuT1MNhEwC+36taiklGG02Sfq814KP7PAqewBw10c51NIwBdQoxMH2ZmtH7aOw6RIS2WIutkiKpbyEnfEZUSS7O8WoxIfL6h/yQlVMzt48bsEi2gCKOLgLK8XbQP3vT6E+HAgfcjgwUkXAQimRCKDAsZtDaG/6DnGRALBCHlPA90NQ/T/lLsgH+/pMSBIbWph8bv+1tb+8SMsZvZ+qFd3OQx9V3V6p4ajBJF0J0ZnnUNJdNy7zf/QCEel6sES9eJgp5jTx+juFVfuNJZPDtwnolqOd+QILb+jMzcn2GQ0MvHwZGOwEBEuPD9EXJJMRLDqNnv33CWAW+8vpMK/GRZLWuZa/p3nT+CvfEMUtPdzK/wAVgmM06B9VEZ04BhsY8Sg2aDLi09mn/DKp05whfiDFfs92NY5H02UrAwGxxvPoT92g3HH8FB2tGjmrG07CRI6ntd7T90hwuYUUxtHG06qTARvKPbN17ExvN4rJWonrkIHGs/S9nbyccv2td0lzqpYfp+AeZNKhGosiHc6sYdV3zfNqRp0iXskgiFJC+TC+wN9a56lHSRxmaVQXvrXVdidzJm1ytmITPqHVsZ0eylG5meP78NO49O/8y+jsI8Hy5vAJvN7L6QYtzcUh4KRxvKKV1Fl62EloeEfeOhc0gJlcdTm/yaMjxE4O/7dWmH3u39eXQCDqaRYMMIkPEUyk7kj2EpnqqgD4Kr8emRVmXHGqRO0oPMdcSMtLY7fxV/IYSkYEsgIrxDdppWy9EZcfiryodfZufVjTEDuxzJ9IuweXN3b0avGjkty25d7RLnOLda0k9zDA2LTgnXq+YoVm1i5pcFYVI6MpqcfgVWfr4Smw0gLQASGyLAKGkvfasn+42Go38zLPIe1Lvb054JGvL3ZbYI+fi5O6G3KcuG+AVJ3h8aQ356NaEQTwP3/M6DzC2SYm67RcYtHP"

createMondodConfigFiles() {
    echo -e $PRIMARY > /etc/mongod-p.conf
    echo -e $SECONDARY1 > /etc/mongod-s1.conf
    echo -e  $SECONDARY2 > /etc/mongod-s2.conf
}

createSecuryFile() {
    echo -e $SECRET > /srv/mongodb/keyfile
}

createMondodConfigFiles
createSecuryFile
