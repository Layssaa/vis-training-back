#!/bin/bash

createDirectories() {
    mkdir /etc/mongo
    mkdir /etc/mongo/p
    mkdir /etc/mongo/s1
    mkdir /etc/mongo/s2
    mkdir /srv/mongodb/
    mkdir /srv/mongodb/p
    mkdir /srv/mongodb/s1
    mkdir /srv/mongodb/s2
    mkdir /var/log/mongodb
    mkdir /var/log/mongodb/p
    mkdir /var/log/mongodb/s1
    mkdir /var/log/mongodb/s2
}

createDirectories
