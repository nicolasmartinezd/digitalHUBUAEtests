
const fs = require('fs');
const data = fs.readFileSync('./data.json');
const dataObject = JSON.parse(data);
module.exports = {
    'log in and create card'(browser) {
        browser
            .url('https://trello.com/login')
            .waitForElementVisible('#login')
            //.setValue('#user', 'testTrello2019DigitalHub@gmail.com')
            .setValue('#user', dataObject.user.email)
            .click('#login')
            .waitForElementVisible('#login-submit')
            .click('#login-submit')
            .waitForElementVisible('#password')
            .setValue('#password', dataObject.user.password)
            .click('#login-submit')
            //ORIGINAL IDEA, BUT APPARENTLY NIGHTWATCH HAS ISSUES WITH XPATH FOR CERTAIN ASSERTIONS
            //PLEASE CHECK: https://github.com/nightwatchjs/nightwatch/issues/1605
            //.waitForElementPresent('//button[contains(@title, "Nicolas Martinez")]', 30000)
            //.assert.attributeContains('//button[contains(@title, "Nicolas Martinez")]', 'title', 'Nicolas Martinez');
            .waitForElementPresent('#trello-root', 30000)
            .assert.titleContains('Trello', 'Log in succesfull')
            .click('.mod-add')
            .waitForElementPresent('.button')
            .setValue('.subtle-input', dataObject.board.title)
            .waitForElementPresent('.button')
            .click('.button')
            .waitForElementPresent('.primary')
            .waitForElementPresent('.list-name-input')
            .setValue('.list-name-input', dataObject.card.title)
            .waitForElementPresent('.primary')
            .click('.primary')
            .waitForElementPresent('.open-card-composer')
            .click('.open-card-composer')
            .setValue('.list-card-composer-textarea', dataObject.card.content)
            .waitForElementPresent('.js-add-card')
            .click('.js-add-card')
            .waitForElementPresent('.js-card-name')
            .assert.containsText('.js-card-name', dataObject.card.content, 'Card created succesfully');
    }
}