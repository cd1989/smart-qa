*** Settings ***
Force Tags      ui
Resource        ../resource/ui.robot

*** Variables ***
${HOST}         localhost
${LOGIN URL}    https://${HOST}/harbor/sign-in

*** Test Cases ***
Login
    Open Login Page