#!/bin/zsh
# Makes one page per project so addresses read floracao.work/cuedkit instead of project.html?p=cuedkit.
# Each <slug>.html is a copy of project.html. Re-run after adding/renaming a project or editing project.html:
#   zsh scripts/project-pages.sh

cd "${0:A:h}/.." || exit 1
slugs=($(node -e "global.window={};require('./js/content.js');console.log(window.PROJECTS.map(p=>p.slug).join(' '))"))
for s in $slugs; do
  case $s in index|about|project) echo "skipping reserved name: $s"; continue;; esac
  cp project.html "$s.html"
done
echo "made ${#slugs} project pages"
