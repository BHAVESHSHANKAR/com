// This is a script you can run to optimize the hero image
// Install required packages with:
// npm install sharp

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeHeroImage() {
  const inputPath = path.join(__dirname, 'src/assets/heroimg.png');
  const outputPath = path.join(__dirname, 'src/assets/heroimg.optimized.png');
  const webpOutputPath = path.join(__dirname, 'src/assets/heroimg.webp');

  try {
    console.log('Optimizing hero image...');
    
    // Create PNG with reduced size
    await sharp(inputPath)
      .resize(900, 900, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(outputPath);
      
    // Create WebP version (modern browsers)
    await sharp(inputPath)
      .resize(900, 900, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpOutputPath);
      
    // Get file sizes
    const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(2);
    const optimizedSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
    const webpSize = (fs.statSync(webpOutputPath).size / 1024).toFixed(2);
    
    console.log(`
    Image optimization complete!
    Original: ${originalSize} KB
    Optimized PNG: ${optimizedSize} KB (${Math.round((1 - optimizedSize/originalSize) * 100)}% reduction)
    WebP: ${webpSize} KB (${Math.round((1 - webpSize/originalSize) * 100)}% reduction)
    
    To use the optimized images:
    1. Replace imports in your code with the optimized version
    2. Or use a picture element with both formats:
    
    <picture>
      <source srcset="/src/assets/heroimg.webp" type="image/webp">
      <source srcset="/src/assets/heroimg.optimized.png" type="image/png">
      <img src="/src/assets/heroimg.png" alt="Hero image">
    </picture>
    `);
    
  } catch (err) {
    console.error('Error optimizing image:', err);
  }
}

optimizeHeroImage(); 