import PdfParse from 'pdf-parse';
import { PDFName, PDFString, PDFDocument, AttachmentOptions } from 'pdf-lib';
import fs from 'fs';

// Service to parse pdf
export class PDFService {
  // Example to read a PDF an add metadata
  public static async editPDFFromFile(filePath: string) {
    const pdf = await PDFService.readFile(filePath);
    await PDFService.editPDF(pdf);
  }

  // Save PDF to file
  public static async savePDF(pdf: Uint8Array, fileName: string) {
    fs.writeFile(fileName, pdf, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  // Add attachments to PDF
  public static async addAttachments(
    pdfDoc: PDFDocument,
    attachment: ArrayBuffer | string,
    name: string,
    attachmentOptions: AttachmentOptions
  ) {
    await pdfDoc.attach(attachment, name, attachmentOptions);

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

  // Add metadata to PDF
  public static async addMetadata(pdfDoc: PDFDocument, metadataName: string, metadataValue: string) {
    const key = PDFName.of(metadataName);

    // @ts-ignore that getInfoDict is private
    pdfDoc.getInfoDict().set(key, PDFString.of('' + metadataValue));

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

  // Read metadata from PDF
  public static async readMetadata(pdfDoc: PDFDocument, name: string) {
    const key = PDFName.of(name);

    // @ts-ignore that getInfoDict is private
    const metadata = pdfDoc.getInfoDict().lookup(key);

    return metadata;
  }

  // Example function to test metadata in pdf and attachments
  public static async editPDF(pdf: Buffer) {
    const pdfResult = await PDFDocument.load(pdf);

    // Add metadata
    const resultPDF = await PDFService.addMetadata(pdfResult, 'custom_token', 'Hola Mundo');

    // Save PDF
    await PDFService.savePDF(resultPDF, 'prueba1.pdf');

    // Read new PDF
    const pdf3_path = await PDFService.readFile('prueba1.pdf');
    const pdf3 = await PDFDocument.load(pdf3_path);

    const metadata = PDFService.readMetadata(pdf3, 'custom_token');
    console.log(metadata);

    // Example to add an attachment

    // const resultPDF = await PDFService.addAttachments(pdfResult, pdf, 'test.pdf', {
    //   mimeType: 'application/pdf',
    //   description: 'Test PDF FILE',
    //   creationDate: new Date('1787/09/17'),
    //   modificationDate: new Date('1992/05/07'),
    // });

    // Default Metadata

    // console.log(pdfResult.catalog);
    // console.log(pdfResult.context);
    // console.log(pdfResult.getAuthor());
    // console.log(pdfResult.getCreationDate());
    // console.log(pdfResult.getCreator());
    // console.log(pdfResult.getKeywords());
    // console.log(pdfResult.getForm());
    // console.log(pdfResult.getModificationDate());
    // console.log(pdfResult.getPageCount());
    // console.log(pdfResult.getPageIndices());
    // console.log(pdfResult.getProducer());
    // console.log(pdfResult.getSubject());
    // console.log(pdfResult.getTitle());
  }

  // Parse PDF
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

  // Parse PDF from File
  public static async parsePDFFromFile(filePath: string): Promise<string> {
    const pdf = await PDFService.readFile(filePath);
    const result = await PDFService.parsePDF(pdf);
    return result.text;
  }

  // Read file
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
