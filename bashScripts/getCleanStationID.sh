#! /usr/bin/bash
# script will clean the data from the HTML file that was curld
sed -n  's/^.*id=\([0-9]\{7\}\)".*$/\1/p' preProcessedID | sort | uniq > cleanStationID
