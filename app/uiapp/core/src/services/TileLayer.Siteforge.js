/*
 * L.TileLayer.Foresight is a regular tilelayer with custom makeover.
 */

L.TileLayer.Siteforge = L.TileLayer.extend({
    options: {
        greyscale: false,
        greyscaleMatrix : {
            quotaRed: 21,
            quotaGreen: 71,
            quotaBlue: 8,
            quotaDividerTune: 0,
            quotaDivider: function() {
                return this.quotaRed + this.quotaGreen + this.quotaBlue + this.quotaDividerTune;
            }
        }
    },

    initialize: function(url, options) {
        options.crossOrigin = true;
        L.TileLayer.prototype.initialize.call(this, url, options);

        this.on('tileload', function(e) {
            this._processTile(e.tile);
        });
    },

    _createTile: function() {
        var tile = L.TileLayer.prototype._createTile.call(this);
        tile.crossOrigin = "Anonymous";
        return tile;
    },

    _processTile: function(img) {
        if (img.getAttribute('data-edited')) return;

        img.crossOrigin = '';
        var canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (this.options.greyscale) {
            var pix = imgd.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i] = pix[i + 1] = pix[i + 2] = (this.options.greyscaleMatrix.quotaRed * pix[i] + this.options.greyscaleMatrix.quotaGreen * pix[i + 1] + this.options.greyscaleMatrix.quotaBlue * pix[i + 2]) / this.options.greyscaleMatrix.quotaDivider();
            }
        }
        ctx.putImageData(imgd, 0, 0);

        img.setAttribute('data-edited', true);
        img.removeAttribute('crossOrigin');
        img.src = canvas.toDataURL();
    }
});

L.tileLayer.siteforge = function(url, options) {
    return new L.TileLayer.Siteforge(url, options);
};
