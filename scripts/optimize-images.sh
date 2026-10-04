#!/bin/zsh
# Makes web-sized copies of project images (max 2400px, ~80% JPEG) in a web/ subfolder.
# Originals are never modified. Re-run any time you add photos:  zsh scripts/optimize-images.sh
# Files in web/ get lowercase names with spaces replaced by dashes.

cd "${0:A:h}/.." || exit 1
setopt extended_glob null_glob

for src in assets/projects/*/*.(#i)(jpg|jpeg|png|heic); do
  dir="${src:h}/web"
  base="${src:t:r:l}"
  base="${base//[^a-z0-9._-]/-}"
  ext="${src:e:l}"
  if [[ $ext == png ]]; then out="$dir/$base.png"; fmt=png; else out="$dir/$base.jpg"; fmt=jpeg; fi
  [[ -e $out ]] && continue
  mkdir -p "$dir"
  # only shrink, never enlarge (small logos stay small)
  size=($(sips -g pixelWidth -g pixelHeight "$src" | awk '/pixel/ {print $2}'))
  resize=(); (( ${size[1]} > 2400 || ${size[2]} > 2400 )) && resize=(-Z 2400)
  sips -s format $fmt -s formatOptions 80 $resize "$src" --out "$out" >/dev/null || continue
  # drop any embedded extra images (iPhone HDR gain maps) so photos never glow brighter than the page
  if [[ $fmt == jpeg ]] && LC_ALL=C grep -aqE "MPF|HDRGainMap|hdrgm" "$out"; then
    ffmpeg -v error -y -i "$out" -q:v 3 "$out.tmp.jpg" && mv "$out.tmp.jpg" "$out"
  fi
  echo "→ $out"
done
