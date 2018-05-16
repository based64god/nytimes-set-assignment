Please see the following challenge which is designed to assess a candidate on various skills such as development skills, test framework design principles, documentation, code quality, etc. 

## Project Description

You have to automate following given user scenarios using any selenium language binding of your choice. You will get bonus points if you use http://webdriver.io/ (Nodejs selenium bindings). Please do not use any BDD framework such as cucumber. 

### User scenarios

Base URL: https://cooking.nytimes.com/

**1) Verify Creating New User**
  * Navigate to base URL & click 'Login' button located on top left navigation bar
  * In login modal, click 'Sign up'
  * Fill in all the details and hit 'Create Account'
  * Verify your username appears on top right
  * Verify home page is loaded (please verify bare minimum DOM elements)

**2) Verify Saving Recipe**
  * Login and save any recipe from homepage
  * Click on 'Your Recipe Box' on top right navigation bar
  * Click on 'Saved Recipes' located on left vertical navigation bar
  * Verify the recipe saved from homepage appears here

**3) Verify Unsaving Recipe (Optional: Bonus point if you do it)**
* Save recipe by following (Verify Saving Recipe) user scenario mentioned above
* Call API to unsave recipe which was recently saved by following above point
* Verify recipe is unsaved and no longer appears in recipe box

Hint:
* API to unsave can be traced by networking tool
* API will require passing cookie while making request, cookie name is `NYT-S`
* API will require passing user id in api call for e.g cooking.nytimes.com/api/v2/users/$user_id/
* User id can be obtained by passing `window.initState.user.id` in browser console, it will be six digit number such as `82301438`

## Submission instructions

* Please include README.md with all the instructions regarding executing, setup, test organization etc 
* You can submit either through git, gitbucket, zip file via email, etc

## Evaluation

Following criteria will be used to grade your submission. 

1. Working solution is submitted by following given guidelines.
2. Along with working code, we care about the quality of the code which will be heavily assessed i.e comments, structure, clear variables names, avoiding magic numbers, etc. 
3. The solution is implemented using Page object pattern and use optimized CSS selector strategy. 
4. More bonus points if you use http://webdriver.io/ 
