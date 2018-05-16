"use strict";

//Spec definitions. The layer for interacting with the page objects.

const baseURL = "https://cooking.nytimes.com/"

const pages = require("./pages")

const selectors = {
    loginBtn: "#siteNavMount > div > div.nytc---sitenav---siteNav > div > div.nytc---sitenav---siteNavBtns > div.nytc---loginbtn---loginBtn > span",
    signUpBtn: "#appContainer > div > div.nytc---modal-window---windowContainer.nytc---modal-window---isShown.nytc---shared---blackBG > div > div > div > div.nytc---largepicturemodal---sideContainer > div > div > div.nytc---regimodal---modalHeader > p > span",
    emailField: "#appContainer > div > div.nytc---modal-window---windowContainer.nytc---modal-window---isShown.nytc---shared---blackBG > div > div > div > div.nytc---largepicturemodal---sideContainer > div > div > div:nth-child(3) > div.nytc---regimodal---formBodyContainer > form > div:nth-child(1) > div:nth-child(1) > input.nytc---regimodal---regiInput",
    pwField: "#appContainer > div > div.nytc---modal-window---windowContainer.nytc---modal-window---isShown.nytc---shared---blackBG > div > div > div > div.nytc---largepicturemodal---sideContainer > div > div > div:nth-child(3) > div.nytc---regimodal---formBodyContainer > form > div:nth-child(1) > div:nth-child(2) > input",
    confirmPwField: "#appContainer > div > div.nytc---modal-window---windowContainer.nytc---modal-window---isShown.nytc---shared---blackBG > div > div > div > div.nytc---largepicturemodal---sideContainer > div > div > div:nth-child(3) > div.nytc---regimodal---formBodyContainer > form > div:nth-child(1) > div:nth-child(3) > input",
    actualLoginBtn: "#appContainer > div > div.nytc---modal-window---windowContainer.nytc---modal-window---isShown.nytc---shared---blackBG > div > div > div > div.nytc---largepicturemodal---sideContainer > div > div > div:nth-child(3) > div.nytc---regimodal---formBodyContainer > form > div.nytc---regimodal---buttonContainer > span",
    pwID: "#password",
    something: "#myAccountAuth > div > div.Form__formWrapper___A3bV0 > form > div.Form__buttonsHolder___21uj2 > div > button",
    popupAck: "#appContainer > div > div.nytc---modal-window---windowContainer.nytc---modal-window---isShown.nytc---shared---blackBG > div > div > div > div.nytc---largepicturemodal---sideContainer > div > div.nytc---newfreetrialer---buttonContainer > span",
    profileBtn: "#siteNavMount > div > div.nytc---sitenav---siteNav > div > div.nytc---sitenav---siteNavBtns > div.nytc---loginbtn---loginBtn.nytc---loginbtn---registered > span",
    saveBtn: "#content > div.rotd.bottom-right > article > div.controls.rotd-controls > div.save-group > div.save.btn",
    recipeTitle: "#content > div.rotd.bottom-right > article > a > div.label-details > div.top-label > h3",
    recipesBtn: "#siteNavMount > div > div.nytc---sitenav---siteNav > div > div.nytc---sitenav---siteNavBtns > div.nytc---loginbtn---loginBtn.nytc---loginbtn---registered > a",
    savedRecipe: "#recipeBoxMount > div > div:nth-child(2) > div > div > div.nytc---draganddrop---dropWrapper > div > div > article > a > h3"
} 

const tests = {
    addUser: function (wdio, loginInfo) { 
        let page = new pages.addUser(wdio, baseURL, loginInfo.username, loginInfo.password)
        page.init();
        page.verify()
        .then(page.signup(selectors));
    },
    saveRecipe: function (wdio, loginInfo) {
        let page = new pages.saveRecipe(wdio, baseURL, loginInfo.username, loginInfo.password)
        page.init();
        page.verify()
        .then(page.saveRecipe(selectors));
    },
    unsaveRecipe: function (wdio, loginInfo) {
        
    }
}

module.exports = {
    run: function (wdio,testsToRun,loginInfo) {
        // only run the tests provided in the specs
        let i = 0;
        for (let name of testsToRun) {
            console.log(name)
            tests[name](wdio,loginInfo[i])
            i++;
        }
    }
};


