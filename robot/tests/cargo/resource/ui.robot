*** Settings ***
Documentation     Keywords Defined For Cargo Test
Library           SeleniumLibrary

*** Variables ***
${HOST}           localhost
${LOGIN URL}      http://${HOST}/signin
${BROWSER}        Chrome

*** Keywords ***
Open Login Page
    [Documentation]     Opens browser to login page
    Open Browser        ${LOGIN URL}    ${BROWSER}
    Title Should Be     Login Page

Input Name
    [Arguments]         ${name}
    Input Text          username_field    ${name}

Input Password
    [Arguments]         ${password}
    Input Text          password_field    ${password}