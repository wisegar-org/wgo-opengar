import PdfParse from 'pdf-parse';
import fs from 'fs';

// Service to parse pdf
export class PDFService {
  public static async parsePDF(pdf: Buffer): Promise<PdfParse.Result> {
    const resultPDF = await PdfParse(pdf);

    // number of pages
    console.log(resultPDF.numpages);
    // number of rendered pages
    console.log(resultPDF.numrender);
    // PDF info
    console.log(resultPDF.info);
    // PDF metadata
    console.log(resultPDF.metadata);
    // PDF.js version
    console.log(resultPDF.version);
    // PDF text
    // console.log(resultPDF.text);

    return resultPDF;
  }

  public static async parsePDFFromFile(filePath: string): Promise<string> {
    const pdf = await PDFService.readFile(filePath);
    const result = await PDFService.parsePDF(pdf);
    return result.text;
  }

  public static async readFile(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
export default PDFService;