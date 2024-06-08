const Asset = require('./Asset');
const Maintenance = require('./Maintenance');
const Feedback = require('./Feedback');
const PDFDocument = require('pdfkit');

const generateReport = async (req, res) => {
  try {
    // Fetch all assets, maintenance records, and feedback
    const assets = await Asset.find();
    const maintenanceRecords = await Maintenance.find().populate('asset');
    const feedbacks = await Feedback.find();

    // Create a new PDF document
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=report.pdf',
      }).end(pdfData);
    });

    // Add title and date
    doc.fontSize(20).text('Asset and Maintenance Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated on: ${new Date().toISOString().split('T')[0]}`);
    doc.moveDown();

    // Add asset details
    doc.fontSize(16).text('Assets', { underline: true });
    assets.forEach(asset => {
      doc.fontSize(12).text(`ID: ${asset._id}`);
      doc.text(`Genre: ${asset.genre.join(', ')}`);
      doc.text(`Date: ${asset.date}`);
      doc.text(`Description: ${asset.description}`);
      doc.moveDown();
    });

    // Add maintenance details
    doc.addPage();
    doc.fontSize(16).text('Maintenance Records', { underline: true });
    maintenanceRecords.forEach(record => {
      doc.fontSize(12).text(`ID: ${record._id}`);
      doc.text(`Asset ID: ${record.asset._id}`);
      doc.text(`Maintenance Date: ${record.maintenanceDate}`);
      doc.text(`Maintenance Details:`);
      doc.text(`  Genre: ${record.maintenanceDetails.genre.join(', ')}`);
      doc.text(`  Date: ${record.maintenanceDetails.date}`);
      doc.text(`  Description: ${record.maintenanceDetails.description}`);
      doc.moveDown();
    });

    // Add feedback details
    doc.addPage();
    doc.fontSize(16).text('Feedback', { underline: true });
    feedbacks.forEach(feedback => {
      doc.fontSize(12).text(`Username: ${feedback.username}`);
      doc.text(`Email: ${feedback.email}`);
      doc.text(`Message: ${feedback.message}`);
      doc.moveDown();
    });

    // Finalize the PDF and end the stream
    doc.end();

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  generateReport,
};
