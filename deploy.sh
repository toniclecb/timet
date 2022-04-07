# https://cli.vuejs.org/guide/deployment.html#github-pages
# OK Set correct publicPath in vue.config.js.
# OK Inside your project, create deploy.sh with the following content (with highlighted lines uncommented appropriately) and run it to deploy:
# OK Set correct publicPath in vue.config.js as explained above.
# -- Install the Travis CLI client: gem install travis && travis --login
# -- Generate a GitHub access token with repo permissions.
# -- Grant the Travis job access to your repository: travis env set GITHUB_TOKEN xxx (xxx is the personal access token from step 3.)
# -- Create a .travis.yml file in the root of your project.
# -- Push the .travis.yml file to your repository to trigger the first build.

#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://toniclecb.github.io
# git push -f git@github.com:toniclecb/toniclecb.github.io.git main

# if you are deploying to https://toniclecb.github.io/<REPO>
# git push -f git@github.com:toniclecb/timet.git main:gh-pages

cd -
