/**
 * Bild-Urls erarbeiten: Bild herunterladen,
 * im Drive ablegen und Link,
 * Metadaten in EXPORT-Tabellenblatt speichern
 * @param {string} imageUrl Die URL des Bildes
 * @param {Sheet} sheet Das Tabellenblatt
 * @param {number} i Die Zeile, in der das Bild gefunden wurde
 * @param {Folder} subFolder Der Unterordner, in dem das Bild abgelegt wird
 * @param {Sheet} exportSheet Das EXPORT-Tabellenblatt
 * @returns {Blob} Das Bild als Blob
 */
function handleUrl(
	anzahlUrls,
	imageUrl,
	imgIndex,
	sheet,
	i,
	subFolder,
	exportSheet
) {
	try {
		var response = UrlFetchApp.fetch(imageUrl);
		var blob = response.getBlob();
		var contentType = blob.getContentType();
		var extension = contentType.split("/")[1];

		if (extension === "jpeg") {
			extension = "jpg";
		}

		var nrValue = sheet.getRange(i + 5, 1).getValue(); // 1 entspricht der ersten Spalte, die IMMER die Nr-Spalte ist
		if (!nrValue) {
			nrValue = "Unbekannt";
		}

		// prettier-ignore
		if (anzahlUrls > 1) { 
            var fileName = sheet.getName() + "_frage" + nrValue + "_" + (imgIndex + 1) + "." + extension; // Index des Bildes anhängen, damit Dateinamen sich nicht doppeln
        } else {
            var fileName = sheet.getName() + "_frage" + nrValue + "." + extension; // Dateiname ohne Index, wenn es das erste (oder einzige) Bild ist
        }

		var file = subFolder.createFile(blob.setName(fileName));

		// Metadaten des Bilds über ImgApp holen
		var imgMeta = getSize(blob);
		var width = imgMeta.width;
		var height = imgMeta.height;
		var filesize = Math.round(imgMeta.filesize / 1000); // in KB
		// KB : MB Anzeige bei entsprechender Dateigröße
		var filesizeText =
			filesize >= 1000
				? (filesize / 1000).toFixed(2) + " MB"
				: filesize + " KB";

		// Metadaten und generierten Drive-Link in EXPORT-Tabellenblatt speichern
		writeDataToExport(
			exportSheet,
			sheet.getName(),
			nrValue,
			extension,
			width,
			height,
			filesizeText,
			file.getUrl()
		);
	} catch (e) {
		SpreadsheetApp.getUi().alert(
			"⚠️ Fehler bei Bild: " + imageUrl + " - " + e.toString()
		);
	}
	return blob;
}
