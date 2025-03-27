/**
 * ImgApp - Metadaten auslesen
 * @param {Blob} blob - Bild als Blob
 * @return {Object} - Metadaten des Bildes
 */
function getSize(blob) {
	return new ImgApp().GetSize(blob);
}

class ImgApp {
	GetSize(blob) {
		this.bytear = blob.getBytes();
		this.getFormat();
		switch (this.format) {
			case "bmp":
				return this.getInfBMP();
			case "gif":
				return this.getInfGIF();
			case "png":
				return this.getInfPNG();
			case "jpg":
				return this.getInfJPG();
			default:
				return { Error: this.format };
		}
	}

	getFormat() {
		let f = this.byte2hex(this.bytear.slice(0, 8)).join("");
		this.format = f.startsWith("89504e470d0a1a0a")
			? "png"
			: f.startsWith("ffd8")
			? "jpg"
			: f.startsWith("474946")
			? "gif"
			: f.startsWith("424d")
			? "bmp"
			: "Unknown format";
	}

	getInfBMP() {
		return {
			identification: "BMP",
			width: this.byte2num(this.bytear.slice(18, 22), true),
			height: this.byte2num(this.bytear.slice(22, 26), true),
			filesize: this.bytear.length,
		};
	}

	getInfGIF() {
		return {
			identification: "GIF",
			width: this.byte2num(this.bytear.slice(6, 8), true),
			height: this.byte2num(this.bytear.slice(8, 10), true),
			filesize: this.bytear.length,
		};
	}

	getInfPNG() {
		return {
			identification: "PNG",
			width: this.byte2num(this.bytear.slice(16, 20), false),
			height: this.byte2num(this.bytear.slice(20, 24), false),
			filesize: this.bytear.length,
		};
	}

	getInfJPG() {
		let i = 0;
		while (i < this.bytear.length) {
			i++;
			if (this.byte2hexNum(this.bytear[i]) === "ff") {
				i++;
				let ma = this.byte2hexNum(this.bytear[i]);
				if (["c0", "c1", "c2"].includes(ma)) break;
				i += this.hex2num(
					this.byte2hex(this.bytear.slice(i + 1, i + 3))
				);
			}
		}
		return {
			identification: "JPG",
			width: this.hex2num(this.byte2hex(this.bytear.slice(i + 6, i + 8))),
			height: this.hex2num(
				this.byte2hex(this.bytear.slice(i + 4, i + 6))
			),
			filesize: this.bytear.length,
		};
	}

	byte2hexNum(data) {
		let conv = (data < 0 ? data + 256 : data).toString(16);
		return conv.length === 1 ? "0" + conv : conv;
	}

	byte2hex(data) {
		return data.map((e) =>
			(e < 0 ? e + 256 : e).toString(16).padStart(2, "0")
		);
	}

	byte2num(data, byteorder) {
		let conv = byteorder
			? data.reverse().map((e) => e.toString(16).padStart(2, "0"))
			: this.byte2hex(data);
		return this.hex2num(conv);
	}

	hex2num(data) {
		return parseInt(data.join(""), 16);
	}
}
