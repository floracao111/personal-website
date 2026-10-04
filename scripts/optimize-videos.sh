#!/bin/zsh
# Makes web-ready copies of project videos in each project's web/ folder.
# Originals are never modified. Re-run any time you add videos:  zsh scripts/optimize-videos.sh
#
#   every video        → web/<name>.mp4     original shape, max 1600px
#   cover… (or vid1 / video1 if there is no cover…)  → also web/cover.mp4 cropped to 3:2 (homepage cover)
#
# Every video also gets a still frame (<name>-poster.jpg) and has its audio removed,
# since videos autoplay muted on the site. HDR iPhone footage is converted to normal (SDR)
# brightness so it doesn't glow. Requires ffmpeg (brew install ffmpeg).

cd "${0:A:h}/.." || exit 1
setopt extended_glob null_glob

encode() { # <src> <out> <filter>
  local src=$1 out=$2 vf=$3 hw=()
  [[ -e $out && $out -nt $src ]] && return
  mkdir -p "${out:h}"
  # iPhone HDR video (HLG / PQ) glows brighter than the rest of the page on bright screens:
  # tone-map it to normal (SDR) video with Apple's VideoToolbox first.
  case $(ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer -of csv=p=0 "$src") in
    *arib-std-b67*|*smpte2084*)
      hw=(-hwaccel videotoolbox -hwaccel_output_format videotoolbox_vld)
      vf="scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,hwdownload,format=p010le,$vf" ;;
  esac
  ffmpeg -v error -y $hw -i "$src" -an -map_metadata -1 \
    -vf "$vf,fps=30,format=yuv420p" \
    -c:v libx264 -preset slow -crf 26 -profile:v high \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart "$out" &&
  ffmpeg -v error -y -i "$out" -frames:v 1 -q:v 3 "${out:r}-poster.jpg" &&
  echo "→ $out  ($(du -h "$out" | cut -f1))"
}

full="scale='min(1600,iw)':'min(1600,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2:flags=lanczos"
cover="crop='min(iw,ih*3/2)':'min(ih,iw*2/3)',scale=1200:800:flags=lanczos"

for src in assets/projects/*/*.(#i)(mp4|mov|m4v|webm); do
  dir="${src:h}/web"
  base="${src:t:r:l}"
  base="${base//[^a-z0-9._-]/-}"
  encode "$src" "$dir/$base.mp4" "$full"
  # cover: a file named cover… wins; otherwise vid1 / video1
  covers=(${src:h}/(#i)cover*.(mp4|mov|m4v|webm))
  if [[ $base == (cover|cover-*) ]] || { [[ $base == (vid|video)1 ]] && (( ${#covers} == 0 )); }; then
    encode "$src" "$dir/cover.mp4" "$cover"
  fi
done
