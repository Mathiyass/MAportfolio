Write-Host "Executing Version 2 Commit Strategy..."

git add assets/css/index.css
git commit -m "feat(styles): implement V2 design tokens and global neon aesthetic"

git add assets/js/core.js
git commit -m "feat(core): initialize Lenis smooth scroll and custom magnetic cursor"

git add assets/js/main.js
git commit -m "feat(animation): configure GSAP timelines and page transition wrappers"

git add index.html
git commit -m "feat(home): build ultimate 3D hero page and MATHIYA signature preloader"

git add projects.html
git add games.html
git commit -m "feat(portfolio): integrate premium projects and games showcases"

git add blog.html
git add blog-post.html
git commit -m "feat(blog): implement immersive blog reader experience"

git add about.html
git add resume.html
git add skills.html
git commit -m "feat(about): add futuristic skills matrix and resume layout"

git add contact.html
git add socials.html
git commit -m "feat(contact): construct secure quantum comms hub and socials"

git add gallery.html
git commit -m "feat(gallery): add immersive media gallery"

git add 404.html
git commit -m "feat(system): implement 404 error page"

git add ar.html
git commit -m "feat(ar): prepare augmented reality gateway"

git add admin.html
git add admin/index.html
git commit -m "feat(admin): build secure dashboard layout"

git add admin/login.html
git add assets/js/admin-auth.js
git commit -m "feat(security): implement SHA-256 session auth for admin interface"

git add assets/js/admin-data.js
git add assets/js/admin-ui.js
git commit -m "feat(data): build local storage mock DB and bind admin UI"

git add admin/projects.html
git add admin/blog-editor.html
git add admin/inbox.html
git add admin/settings.html
git commit -m "feat(admin): integrate content management and settings views"

git add assets/js/gesture.js
git commit -m "feat(ai): integrate MediaPipe hand gesture navigation system"

git add assets/js/particles.js
git commit -m "feat(webgl): deploy tsParticles background logic"

git add assets/js/api.js
git commit -m "feat(api): stub OpenAPI endpoints for future backend"

git add inject_globals.js
git add inject_admin_auth.js
git add inject_admin_data.js
git add inject_gesture.js
git add inject_particles.js
git add fetch_screens.js
git add repos.json
git commit -m "chore(scripts): finalize build and injection utilities"

git add -A
git commit -m "chore(release): lock V2 ultimate advanced version"

Write-Host "21 Sequential Commits Completed."
