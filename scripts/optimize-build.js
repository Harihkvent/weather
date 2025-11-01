const fs = require('fs');
const path = require('path');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

// Function to optimize images
async function optimizeImages() {
  const sharp = require('sharp');
  const imageDir = path.join(__dirname, 'public');
  const images = getAllFiles(imageDir, []).filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  for (const image of images) {
    try {
      await sharp(image)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(image.replace(/\.(jpg|jpeg|png)$/i, '.opt.$1'));

      fs.unlinkSync(image);
      fs.renameSync(image.replace(/\.(jpg|jpeg|png)$/i, '.opt.$1'), image);
      console.log(`Optimized: ${image}`);
    } catch (err) {
      console.error(`Error optimizing ${image}:`, err);
    }
  }
}

// Function to update meta tags
function updateMetaTags() {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  const metaTags = `
    <meta name="description" content="Modern weather dashboard with real-time updates and detailed forecasts">
    <meta name="keywords" content="weather, forecast, temperature, climate, weather dashboard">
    <meta name="author" content="Your Name">
    <meta property="og:title" content="Weather Dashboard">
    <meta property="og:description" content="Modern weather dashboard with real-time updates and detailed forecasts">
    <meta property="og:type" content="website">
    <meta name="theme-color" content="#4a90e2">
  `;

  indexContent = indexContent.replace('</head>', `${metaTags}\n</head>`);
  fs.writeFileSync(indexPath, indexContent);
}

// Main optimization function
async function optimize() {
  console.log('Starting build optimization...');

  try {
    console.log('Optimizing images...');
    await optimizeImages();

    console.log('Updating meta tags...');
    updateMetaTags();

    console.log('Build optimization completed successfully!');
  } catch (err) {
    console.error('Build optimization failed:', err);
    process.exit(1);
  }
}

optimize();