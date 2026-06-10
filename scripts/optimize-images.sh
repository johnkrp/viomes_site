#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TMP_DIR}"' EXIT

QUALITY="${QUALITY:-72}"
BACKUP_DIR="${REPO_ROOT}/public/images/_originals"

TARGETS=(
  "public/images/AND_6099.JPG"
  "public/images/AND_6053.JPG"
  "public/images/V-517.JPG"
  "public/images/йадои.JPG"
  "public/images/цкастяес.JPG"
  "public/images/еидг спитиоу.JPG"
  "public/images/home-bins.jpg"
  "public/images/home-hero-1.jpg"
  "public/images/home-planters.jpg"
  "public/images/home-hero-4.jpg"
  "public/images/home-items.jpg"
  "public/images/DSC_3421.JPG"
  "public/images/circular-economy.jpg"
)

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required. Install Node.js and npm first."
  exit 1
fi

mkdir -p "${BACKUP_DIR}"

bytes() {
  wc -c <"$1" | tr -d ' '
}

echo "============================================"
echo "VIOMES Image Optimization (JPEG/MozJPEG)"
echo "============================================"
echo "Quality: ${QUALITY}"
echo "Backup: ${BACKUP_DIR}"
echo ""

total_before=0
total_after=0
optimized_count=0

for rel_path in "${TARGETS[@]}"; do
  src="${REPO_ROOT}/${rel_path}"

  if [[ ! -f "${src}" ]]; then
    echo "SKIP (missing): ${rel_path}"
    continue
  fi

  file_name="$(basename "${src}")"
  stem="${file_name%.*}"
  lower_out="${TMP_DIR}/${stem}.jpg"
  before_size="$(bytes "${src}")"

  cp -f "${src}" "${BACKUP_DIR}/${file_name}"

  npx -y sharp-cli \
    -i "${src}" \
    -o "${TMP_DIR}" \
    --format jpg \
    --quality "${QUALITY}" \
    --progressive \
    --mozjpeg >/dev/null

  if [[ ! -f "${lower_out}" ]]; then
    echo "SKIP (no output): ${rel_path}"
    continue
  fi

  mv -f "${lower_out}" "${src}"
  after_size="$(bytes "${src}")"

  total_before=$((total_before + before_size))
  total_after=$((total_after + after_size))
  optimized_count=$((optimized_count + 1))

  saved=$((before_size - after_size))
  echo "OK  ${rel_path} | ${before_size} -> ${after_size} (saved ${saved} bytes)"
done

echo ""
echo "============================================"
echo "Optimization Complete"
echo "============================================"
echo "Files optimized: ${optimized_count}"
echo "Total before: ${total_before} bytes"
echo "Total after:  ${total_after} bytes"
echo "Total saved:  $((total_before - total_after)) bytes"
