const sharp = require('sharp');

async function convertToWebP() {
    try {
        await sharp('src/assets/id0.png')
            .webp({ quality: 80 })
            .toFile('src/assets/id0.webp');
        
        await sharp('src/assets/id2.png')
            .webp({ quality: 80 })
            .toFile('src/assets/id2.webp');
        
        console.log('Conversão concluída com sucesso!');
    } catch (error) {
        console.error('Erro durante a conversão:', error);
    }
}

convertToWebP(); 