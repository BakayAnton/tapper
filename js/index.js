const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const total = 107 * 17;

// const tupperImg = '960939379918958884971672962127852754715004339660129306651505519271702802395266424689642842174350718121267153782770623355993237280874144307891325963941337723487857735749823926629715517173716995165232890538221612403238855866184013235585136048828693337902491454229288667081096184496091705183454067827731551705405381627380967602565625016981482083418783163849115590225610003652351370343874461848378737238198224849863465033159410054974700593138339226497249461751545728366702369745461014655997933798537483143786841806593422227898388722980000748404719';
// const tupperImg = '356190145855031919348890157738898011538149755602338030';
const tupperImg = '960939379918958884971672962127852754715004339660129306651505519271702802395266424689642842174350718121267153782770623355993237280874144307891325963941337723487857735749823926629715517173716995165232890538221612403238855866184013235585136048828693337902491454229288667081096184496091705183454067827731551705405381627380967602565625016981482083418783163849115590225610003652351370343874461848378737238198224849863465033159410054974700593138339226497249461751545728366702369745461014655997933798537483143786841806593422227898388722980000748404719';
const k = BigInt(tupperImg);

const WIDTH = 106;
const HEIGHT = 17;
const TOTAL_PIXELS = WIDTH * HEIGHT;

const PIXEL_SIZE = 12;
const X_FROM = 0;
const X_TO = 106;
const Y_FROM = 0;
const Y_TO = 17;

canvas.width = WIDTH * PIXEL_SIZE;
canvas.height = HEIGHT * PIXEL_SIZE;
class Tupper {
	static toBinary(number) {
		let binary = (BigInt(number) / BigInt(17)).toString(2);

		if (binary.length < TOTAL_PIXELS) {
			binary = '0'.repeat(TOTAL_PIXELS - binary.length) + binary;
		}
		return binary;
	}
	static binaryToK(binary) {
		return parseBigInt(binary, 2) * BigInt(17);
	}
	static imageDataToBinary(data) {
		let binaryString = '';
		for (let i = 0; i < WIDTH; i++) {
			for (let j = HEIGHT-1; j >=0; j--) {
				const index = (j * PIXEL_SIZE * WIDTH + i) * 4 * PIXEL_SIZE;
				const r = data[index];
				const g = data[index + 1];
				const b = data[index + 2];
				const a = data[index + 3] / 255;
				binaryString += (r === 255 && g === 255 && b === 255) ? '0' : '1';
			}
		}
		return binaryString;
	}
}

console.log(Tupper.toBinary(tupperImg));
const binary  = Tupper.toBinary(tupperImg);

for (let i = 0; i < binary.length; i++) {
	const value = binary[i];
	const color = parseInt(value) ? 'black' : 'white';
	drawPixel(~~(i / HEIGHT), HEIGHT - i % HEIGHT - 1, color);
}

const imageData = ctx.getImageData(0,0, WIDTH * PIXEL_SIZE, HEIGHT * PIXEL_SIZE);
console.log('imageDAta: ', imageData);
const data = imageData.data;

const binaryFromImageData = Tupper.imageDataToBinary(data);


console.log(binaryFromImageData);
console.log(Tupper.binaryToK(binaryFromImageData));
const textArea = document.getElementById('tupper-k').innerHTML = Tupper.binaryToK(binaryFromImageData);
// for (let j = 0; j < ~~(binaryString.length / WIDTH) ; j++) {
// 	console.log(binaryString.substring(WIDTH * j, WIDTH * j + WIDTH));
// }
function tupper(x, y) {
	// console.log('Tapper: ', x, y);
	const power = -17 * x - Number(~~(y % BigInt(17)));
	return 0.5 < ~~(( Number(~~(y/BigInt(17))) * Math.pow(2, power) ) % 2);
}
function drawPixel(x = 0, y = 0, color) {
	// console.log('Draw: ', x, y);
	ctx.fillStyle = color;

	ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
}
function parseBigInt(str, baseAtr=10) {
	const base = BigInt(baseAtr);
	let bigint = BigInt(0)
	for (let i = 0; i < str.length; i++) {
		let code = str[str.length-1-i].charCodeAt(0) - 48;
		if(code >= 10) {
			code -= 39;
		}
		bigint += base**BigInt(i) * BigInt(code)
	}
	return bigint
}