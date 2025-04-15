// Function to extract dominant colors from an image
export async function getAverageColor(imageUrl: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = (): void => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(["#3b82f6", "#8b5cf6", "#ec4899"]); // Fallback colors
          return;
        }

        // Set canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image to canvas
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        ).data;

        // Sample points from different areas of the image
        const samplePoints = [
          {
            x: Math.floor(canvas.width * 0.25),
            y: Math.floor(canvas.height * 0.25),
          },
          {
            x: Math.floor(canvas.width * 0.75),
            y: Math.floor(canvas.height * 0.25),
          },
          {
            x: Math.floor(canvas.width * 0.5),
            y: Math.floor(canvas.height * 0.5),
          },
          {
            x: Math.floor(canvas.width * 0.25),
            y: Math.floor(canvas.height * 0.75),
          },
          {
            x: Math.floor(canvas.width * 0.75),
            y: Math.floor(canvas.height * 0.75),
          },
        ];

        // Extract colors from sample points
        const colors = samplePoints.map((point) => {
          const index = (point.y * canvas.width + point.x) * 4;
          const r = imageData[index];
          const g = imageData[index + 1];
          const b = imageData[index + 2];
          return `rgb(${r}, ${g}, ${b})`;
        });

        // Return unique colors (up to 3)
        const uniqueColors = [...new Set(colors)].slice(0, 3);

        // If we don't have enough unique colors, add some defaults
        if (uniqueColors.length < 3) {
          const defaults = ["#3b82f6", "#8b5cf6", "#ec4899"];
          resolve([...uniqueColors, ...defaults].slice(0, 3));
        } else {
          resolve(uniqueColors);
        }
      } catch (error) {
        console.error("Error extracting colors:", error);
        resolve(["#3b82f6", "#8b5cf6", "#ec4899"]); // Fallback colors
      }
    };

    img.onerror = (): void => {
      reject(new Error("Failed to load image"));
    };
  });
}
