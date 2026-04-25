#!/bin/bash
# Image Optimization Script for VIOMES Homepage
# Run this to compress all images and convert to WebP

echo "============================================"
echo "VIOMES Image Optimization Script"
echo "============================================"

# Navigate to images directory
cd public/images

# Install ImageMagick if not already installed (macOS)
if ! command -v convert &> /dev/null; then
  echo "Installing ImageMagick..."
  brew install imagemagick
fi

echo ""
echo "Step 1: Backing up original images..."
mkdir -p _originals
cp *.JPG _originals/ 2>/dev/null
cp *.png _originals/ 2>/dev/null
echo "✓ Originals backed up to _originals/"

echo ""
echo "Step 2: Compressing large JPEGs (Hero Images)..."
echo "Target: 12MB → 300KB per image"

# CATEGORY HERO IMAGES - Reduce dramatically
convert "ΚΑΔΟΙ.JPG" -quality 60 -resize 2000x1200 "ΚΑΔΟΙ-optimized.JPG"
convert "ΓΛΑΣΤΡΕΣ.JPG" -quality 60 -resize 2000x1200 "ΓΛΑΣΤΡΕΣ-optimized.JPG"
convert "ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG" -quality 60 -resize 2000x1200 "ΕΙΔΗ ΣΠΙΤΙΟΥ-optimized.JPG"

# PRODUCT PACKSHOTS - Medium compression
convert "AND_6099.JPG" -quality 70 -resize 1200x1200 "AND_6099-optimized.JPG"
convert "AND_6053.JPG" -quality 70 -resize 1200x1200 "AND_6053-optimized.JPG"
convert "V-517.JPG" -quality 70 -resize 1200x1200 "V-517-optimized.JPG"

# OTHER IMAGES - Light compression
convert "circular-economy.jpg" -quality 75 -resize 1500x1000 "circular-economy-optimized.jpg"
convert "DSC_3421.JPG" -quality 75 "DSC_3421-optimized.JPG"

echo "✓ JPEGs compressed"

echo ""
echo "Step 3: Converting to WebP (even smaller)..."

# Convert large images to WebP
cwebp "ΚΑΔΟΙ-optimized.JPG" -o "ΚΑΔΟΙ.webp" -q 60
cwebp "ΓΛΑΣΤΡΕΣ-optimized.JPG" -o "ΓΛΑΣΤΡΕΣ.webp" -q 60
cwebp "ΕΙΔΗ ΣΠΙΤΙΟΥ-optimized.JPG" -o "ΕΙΔΗ ΣΠΙΤΙΟΥ.webp" -q 60
cwebp "AND_6099-optimized.JPG" -o "AND_6099.webp" -q 70
cwebp "AND_6053-optimized.JPG" -o "AND_6053.webp" -q 70
cwebp "V-517-optimized.JPG" -o "V-517.webp" -q 70

echo "✓ WebP versions created"

echo ""
echo "Step 4: Creating responsive image variants..."

# Small variants for mobile (max 400KB)
convert "ΚΑΔΟΙ-optimized.JPG" -resize 800x500 -quality 60 "ΚΑΔΟΙ-sm.JPG"
convert "ΓΛΑΣΤΡΕΣ-optimized.JPG" -resize 800x500 -quality 60 "ΓΛΑΣΤΡΕΣ-sm.JPG"
convert "ΕΙΔΗ ΣΠΙΤΙΟΥ-optimized.JPG" -resize 800x500 -quality 60 "ΕΙΔΗ ΣΠΙΤΙΟΥ-sm.JPG"

# Medium variants for tablet
convert "ΚΑΔΟΙ-optimized.JPG" -resize 1200x800 -quality 65 "ΚΑΔΟΙ-md.JPG"
convert "ΓΛΑΣΤΡΕΣ-optimized.JPG" -resize 1200x800 -quality 65 "ΓΛΑΣΤΡΕΣ-md.JPG"
convert "ΕΙΔΗ ΣΠΙΤΙΟΥ-optimized.JPG" -resize 1200x800 -quality 65 "ΕΙΔΗ ΣΠΙΤΙΟΥ-md.JPG"

echo "✓ Responsive variants created"

echo ""
echo "============================================"
echo "✓ Optimization Complete!"
echo "============================================"
echo ""
echo "Size Comparison:"
du -h ΚΑΔΟΙ.JPG ΚΑΔΟΙ-optimized.JPG ΚΑΔΟΙ.webp ΚΑΔΟΙ-sm.JPG
echo ""
echo "Next Steps:"
echo "1. Update React components to use <picture> tags with WebP + fallbacks"
echo "2. Run: npm run build"
echo "3. Test: npm run preview"
echo "4. Audit: https://pagespeed.web.dev"
