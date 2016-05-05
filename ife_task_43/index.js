function Gallery (gallery, containers) {
	this.gallery = gallery;
	this.containers = containers;
}
Gallery.prototype = {
	constructor: Gallery,
	getImgSize: function (url) {
		var newImg = new Image();
		newImg.src = url;
		var width = newImg.width;
		var height = newImg.height;
		return {img: newImg, newIwidth: width, height: height};	
	},
	onePic: function (url) {
		var container = this.containers[0];
		var image = this.getImgSize(url);
		container.appendChild(image.img);
		console.log(this.gallery);
	}

}
window.onload = function () {
	var gallery = document.querySelector(".gallery");
	var containers = document.querySelectorAll(".container");
	var gallery = new Gallery(gallery, containers);
	gallery.onePic("http://placehold.it/800x500");
}