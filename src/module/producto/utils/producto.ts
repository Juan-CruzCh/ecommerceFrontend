export const convertirAWebP = (archivo: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);

                // Convertimos a blob con formato webp y calidad 0.8 (80%)
                canvas.toBlob((blob) => {
                    if (blob) {
                        const nuevoArchivo = new File([blob], archivo.name.replace(/\.[^/.]+$/, "") + ".webp", {
                            type: 'image/webp'
                        });
                        resolve(nuevoArchivo);
                    } else {
                        reject(new Error("Error al convertir a WebP"));
                    }
                }, 'image/webp', 0.8);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};