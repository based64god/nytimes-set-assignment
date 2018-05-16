"use strict";

// Decoupling layer for the pages the tests need to interact with
// This does most of the heavy lifting

class Webpage {
    constructor(wdClient, url){
        this.wd = wdClient;
        this.url = url;
    }
    init() {
        return this.page = this.wd.init().url(this.url);
    }
    verify() {
        return this.page.getTitle().then(function(title){
                console.log("[CONFIRMED] Page loaded with title:", title);
        });
    }
    end() {
        this.page.end()
    }
}

class NewUserPage extends Webpage {
    constructor(wdClient, url, username, password) {
        super(wdClient,url);
        this.username = username;
        this.password = password;
    }
    signup(selectors) {
        return this.page.click(selectors.loginBtn).then(function(){
            console.log("[CONFIRMED] Login button clicked");
        })
        .click(selectors.signUpBtn).then(function(){
            console.log("[CONFIRMED] Signup button clicked");
        }).setValue(selectors.emailField,this.username)
        .setValue(selectors.pwField,this.password)
        .setValue(selectors.confirmPwField,this.password).then(function() {
            console.log("[CONFIRMED] Entered creds");
        }).click(selectors.actualLoginBtn).then(function(){
            console.log("[CONFIRMED] Logging in");
        }).click(selectors.popupAck,false).then(function(){
            console.log("[CONFIRMED] Finishing");
        }).getHTML(selectors.profileBtn).then(function(name){
            let striptags = require('striptags');
            console.log("[SUCCESS] Logged into",striptags(name))
        }).catch(function(err){
            console.log("[FAILURE] You're probably trying to log in with a bad email.",err)
        });
    }
}

class SavingRecipePage extends NewUserPage {
    constructor(wdClient, url, username, password, recipe) {
        super(wdClient,url,username,password)
        this.recipe = recipe
    }
    saveRecipe(selectors) {
        let recipeName = "";
        const striptags = require('striptags');
        return this.page
        .click(selectors.loginBtn).then(function(){
            console.log("[CONFIRMED] Login button clicked");
        })
        .setValue(selectors.emailField,this.username)
        .setValue(selectors.pwField,this.password)
        .then(function() {
            console.log("[CONFIRMED] Entered creds");
        })
        .click(selectors.actualLoginBtn).then(function(){
            console.log("[CONFIRMED] Logging in");
        })
        .getHTML(selectors.profileBtn).then(function(name){
            console.log("[SUCCESS] Logged into",striptags(name))
        })
        .catch(function(err){
            console.log("[FAILURE] You're probably trying to log in with a bad email.",err)
        })
        .getHTML(selectors.recipeTitle).then(function(html){
            const striptags=require('striptags');
            recipeName = striptags(html).trim();
            console.log("[CONFIRMED] Found recipe:",recipeName)
        })
        .click(selectors.saveBtn).then(function(){
            console.log("[CONFIRMED] Attempt to save recipe");
        })
        .click(selectors.recipesBtn)
        .getHTML(selectors.savedRecipe).then(function(html){
            let confirmedRecipe = striptags(html).trim()
            console.log("[CONFIRMED] Found saved recipe:",confirmedRecipe)
            const assert = require('assert')
            assert(confirmedRecipe==recipeName)
            console.log("[SUCCESS] Recipes match")
        })
        .catch(function(err){
            console.log("[FAILURE] You're probably trying to log in with a bad email.",err)
        });

    }
}

class UnsavingRecipePage extends NewUserPage {
    constructor(wdClient, url, username, password, recipe) {
        super(wdClient,url,username,password)
        this.recipe = recipe
    }
    unsaveRecipe() {
        
    }
}

module.exports = {
    addUser: NewUserPage,
    saveRecipe: SavingRecipePage,
    unsaveRecipe: UnsavingRecipePage
}