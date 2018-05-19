var Sprite = (function () {
    function Sprite(url, nof, sw, size) {
		this.spriteUrl = url;
        this.numberOfFrames = nof;
		this.spriteSize = size;
		this.spriteSheetWidth = sw;
		this.frameIndex = 0;
		//this.fullSpriteSheet.visible = false;
		this.fullSpriteSheet = null;
		this.currentSprite = null;
        this.spriteLoaded = false;
        
		this.fullSpriteSheet = new Raster(this.spriteUrl);
        this.fullSpriteSheet.attach('load', (function() {
            this.spriteLoaded = true;
        }).bind(this));
    }
    
    Sprite.prototype.run = function(pos, rot) {
        if (this.spriteLoaded) {
            this.clearSprite();
            
            this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
            var point = new Point(this.frameIndex * this.spriteSheetWidth / this.numberOfFrames, 0);
            this.currentSprite = this.fullSpriteSheet.getSubRaster(new Rectangle(point, this.spriteSize));
            this.currentSprite.position = pos;
            this.currentSprite.rotate(rot);
            this.fullSpriteSheet.remove();
        }
	};
	
	Sprite.prototype.clearSprite = function() {
		if (this.currentSprite) {
			this.currentSprite.remove();
		}
	};
	
	Sprite.prototype.remove = function() {
		this.clearSprite();
		
		if (this.fullSpriteSheet) {
			this.fullSpriteSheet.remove();
		}
	};
    
    return Sprite;
})();