/*
Used the following commands:
git checkout --orphan gh-pages
npm run build
git --work-tree dist add --all
git --work-tree dist commit -m 'Deploy'
git push origin HEAD:gh-pages --force
rm -r dist
git checkout -f master
git branch -D gh-pages
fonte: https://dev.to/the_one/deploy-to-github-pages-like-a-pro-with-github-actions-4hdg

The script below didn't work.
github pages publish tutorial by https://blog.logrocket.com/automatically-build-deploy-vuejs-app-github-pages/
For our deployment, we’ll use a Node.js script written by Roland Doda, which enables automatic deployment and is based on the execa package.
https://dev.to/rolanddoda/deploy-to-github-pages-like-a-pro-with-github-actions-4hdg
https://github.com/sindresorhus/execa
*/

/* eslint-disable no-console */
const execa = require("execa");
const fs = require("fs");
(async () => {
  try {
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    // eslint-disable-next-line no-console
    console.log("Building started...");
    await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed, check your settings");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();