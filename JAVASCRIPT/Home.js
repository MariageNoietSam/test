// Événement pour ouvrir la caméra
document.getElementById('btn-ouvrir-camera').addEventListener('click', () => {
    document.getElementById('input-camera').click(); // Ouvre la caméra
});

// Événement pour ouvrir la galerie
document.getElementById('btn-ouvrir-gallerie').addEventListener('click', () => {
    document.getElementById('input-gallery').click(); // Ouvre la galerie
});

// Gestion des fichiers sélectionnés (caméra ou galerie)
document.getElementById('input-camera').addEventListener('change', handleFileUpload);
document.getElementById('input-gallery').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadToGoogleDrive(file);
    }
}

// Fonction pour uploader un fichier sur Google Drive
async function uploadToGoogleDrive(file) {
    const accessToken = 'YOUR_ACCESS_TOKEN'; // Remplacez par un token OAuth valide
    const metadata = {
        name: file.name,
        mimeType: file.type,
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    try {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Fichier uploadé avec succès ! ID : ${data.id}`);
        } else {
            const error = await response.json();
            console.error('Erreur lors de l\'upload:', error);
            alert('Erreur lors de l\'upload du fichier.');
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur réseau lors de l\'upload du fichier.');
    }
}
