#!/bin/zsh
# Makes a folder of page images (PNG/JPG screenshots, exports…) all exactly the same size,
# for the page reader on a project page.
#
#   zsh scripts/normalize-pages.sh <input folder> <output folder> [width]
#
# e.g. zsh scripts/normalize-pages.sh assets/projects/cueddata/cueddata-portfolio-pages assets/projects/cueddata/web/pages
#
# Pages are taken in natural order (1, 2, … 10) and written as page-01.jpg, page-02.jpg, …
# The shared shape is the median of the inputs; each page is scaled to cover it and centre-cropped,
# so small differences only trim a few pixels at the edges. Requires ffmpeg.

setopt extended_glob null_glob
in=${1:?input folder}; out=${2:?output folder}; width=${3:-2000}

files=(${in}/*.(#i)(png|jpg|jpeg)(n))   # (n) = natural sort: 2 before 10
(( ${#files} )) || { echo "no images in $in"; exit 1; }

# median aspect ratio → shared page size
ratios=()
for f in $files; do
  wh=($(sips -g pixelWidth -g pixelHeight "$f" | awk '/pixel/ {print $2}'))
  ratios+=($(( ${wh[1]}.0 / ${wh[2]} )))
done
ratio=${${(on)ratios}[$(( (${#ratios} + 1) / 2 ))]}
zmodload zsh/mathfunc
height=$(( int(width / ratio) )); (( height % 2 )) && (( height++ ))

mkdir -p "$out"
i=0
for f in $files; do
  (( i++ ))
  dst="$out/page-$(printf %02d $i).jpg"
  ffmpeg -v error -y -i "$f" \
    -vf "scale=${width}:${height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${width}:${height}" \
    -q:v 3 "$dst" && echo "→ $dst  (${f:t})"
done
echo "$i pages at ${width}×${height} — reader ratio: '${width} / ${height}'"
