import QRCode from "qrcode";

export const generateQrSvg = async (
  text: string,
  darkColor: string = "#FFFFFF",
  lightColor: string = "#00000000"
): Promise<string> => {
  if (!text || !text.trim()) return "";
  try {
    const svgString = await QRCode.toString(text.trim(), {
      type: "svg",
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor,
      },
      errorCorrectionLevel: "M",
    });
    return svgString;
  } catch (err) {
    console.error("QR Code Error:", err);
    return "";
  }
};
