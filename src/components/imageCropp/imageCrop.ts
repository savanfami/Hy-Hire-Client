export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.crossOrigin = "anonymous";
      image.src = url;
    });
  
  
  export function getRadialAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
  }
  
  interface PixelCrop {
    width: number;
    height: number;
    x: number;
    y: number;
  }
  
  interface PixelCrop {
    width: number;
    height: number;
    x: number;
    y: number;
  }
  
  export async function croppedImage(src: string, pixelCrop: PixelCrop): Promise<string> {
    const image = await createImage(src);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
  
    // Set canvas width and height to the cropped area size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    // Return as a base64-encoded data URL
    return canvas.toDataURL("image/jpeg");
  }