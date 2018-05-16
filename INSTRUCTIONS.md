# Build requirements

Hello!

- docker (didn't have time to fully dockerize the build, sorry)
- make
- npm
- wget, tar, unzip
- the browser you want to test against (known to work with chrome 66 and firefox 60)
- patience

Add `./node_modules/.bin` to your path and run `make` from the directory this file is in.

If you have already built a distribution, you can simple `make run` to skip to ugly parts and stand up the selenium hub and run our javascript. This will killing any running java and webdriver executables. 

To run the code manually, first start your selenium-standalone.
Assuming you made a dist, `selenium-standalone start` should work. Otherwise, you'll need to follow the instructions to set it up by yourself.
Next, `node index.js specs.json` from another terminal.
The `specs.json` file contains the spec for the tests you want to run. This includes the `browser` you wish to use, the `login_info` for each of the `specs`. Valid specs are `addUser`,`saveRecipe`, and `unsaveRecipe` (though not yet implemented). The dispatch table for adding specs is in `src/pages.js` near the bottom.

PLEASE NOTE: 
Running multiple specs concurrently appears to be broken on a single machine, though you can still serialize tests externally using a bash script. I included dockerfiles and a docker-compose in an attempt to get this up and running "in the cloud", but ran out of time.

## Description

Did my best to make this into an actual project that I'd want to work on.

Includes a makefile to bootstrap the build, as well as docker containers.

I didn't have the time or money to hook this up to a CI pipeline. :(

I went super hard on this, considering I'm relatively inexperienced with node. There's almost definitely better ways of doing a bunch of the code I wrote.

That said... I'd really appreciate a code review, if that's possible.

Thanks,
Emmett