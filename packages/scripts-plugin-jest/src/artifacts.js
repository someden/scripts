/* eslint-disable no-magic-numbers */
import fs from 'fs';
import nodemailer from 'nodemailer';
import archiver from 'archiver';

const [
	dir
] = process.argv.slice(2);

if (!fs.existsSync(dir)) {
	process.exit();
}

const archive = archiver('zip', {
	zlib: { level: 9 }
});

archive.directory(dir, false);
archive.finalize();

async function send() {

	const testAccount = await nodemailer.createTestAccount();
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass
		}
	});
	const info = await transporter.sendMail({
		to:          'unexisted@email.address',
		text:        `Artifacts: ${dir}`,
		attachments: [{
			filename: 'artifacts.zip',
			content:  archive
		}]
	});

	console.log('Artifacts: %s', nodemailer.getTestMessageUrl(info));
}

send().catch(console.error);
