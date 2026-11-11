# Deployment when the connected app cannot write

The project has no build step. Upload the contents of this directory to your **new empty** `tiktok-live-battle` repository (preserve `assets/gifts/`). Do not upload the enclosing directory as an extra folder. Do not overwrite another project.

With Git installed and GitHub authentication configured on your own computer, from this project directory:

```sh
git init -b main
git add .
git commit -m "Add static LIVE battle game"
git remote add origin https://github.com/maxM808s/tiktok-live-battle.git
git push -u origin main
```

If the repository already has commits, stop and review them first rather than force pushing.

Then Settings → Pages → Deploy from a branch → main → / (root) → Save. Wait for the Pages deployment to finish and test both index.html and admin.html. Pages hosting is free for public repositories; this does not remove any S2E plan limitations.
