#!/bin/bash

cd $(dirname "${BASH_SOURCE}")

docker run -it --rm \
    -v ${PWD}/robot/tests:/opt/robotframework/tests:Z \
    -v ${PWD}/robot/reports:/opt/robotframework/reports:Z \
    ppodgorsek/robot-framework:3.2.2