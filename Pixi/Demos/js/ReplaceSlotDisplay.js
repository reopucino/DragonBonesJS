var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var demosPixi;
(function (demosPixi) {
    var ReplaceSlotDisplay = (function (_super) {
        __extends(ReplaceSlotDisplay, _super);
        function ReplaceSlotDisplay() {
            _super.apply(this, arguments);
            this._displayIndex = 0;
            this._replaceDisplays = [
                // Replace normal display.
                "display0002", "display0003", "display0004", "display0005", "display0006", "display0007", "display0008", "display0009", "display0010",
                // Replace mesh display.
                "meshA", "meshB", "mesh",
            ];
            this._factory = dragonBones.PixiFactory.factory;
            this._armatureDisplay = null;
        }
        ReplaceSlotDisplay.prototype._onStart = function () {
            // Load data.
            PIXI.loader
                .add("dragonBonesData", "./resource/assets/ReplaceSlotDisplay/ReplaceSlotDisplay.json")
                .add("textureDataA", "./resource/assets/ReplaceSlotDisplay/texture.json")
                .add("textureA", "./resource/assets/ReplaceSlotDisplay/texture.png")
                .add("textureRP", "./resource/assets/ReplaceSlotDisplay/textureReplace.png");
            PIXI.loader.once("complete", this._loadComplateHandler, this);
            PIXI.loader.load();
        };
        ReplaceSlotDisplay.prototype._loadComplateHandler = function (loader, object) {
            var _this = this;
            this._factory.parseDragonBonesData(object["dragonBonesData"].data);
            this._factory.parseTextureAtlasData(object["textureDataA"].data, object["textureA"].texture);
            this._armatureDisplay = this._factory.buildArmatureDisplay("MyArmature");
            this._armatureDisplay.animation.timeScale = 0.1;
            this._armatureDisplay.animation.play();
            this._armatureDisplay.x = this._renderer.width * 0.5;
            this._armatureDisplay.y = this._renderer.height * 0.5;
            this._stage.addChild(this._armatureDisplay);
            var touchHandler = function (event) {
                _this._replaceDisplay();
            };
            this._stage.interactive = true;
            this._stage.on("touchstart", touchHandler, this);
            this._stage.on("mousedown", touchHandler, this);
            document.addEventListener("keydown", function (event) {
                if (_this._armatureDisplay.armature.replacedTexture) {
                    _this._armatureDisplay.armature.replacedTexture = null;
                }
                else {
                    _this._armatureDisplay.armature.replacedTexture = object["textureRP"].texture;
                }
            });
        };
        ReplaceSlotDisplay.prototype._replaceDisplay = function () {
            this._displayIndex++;
            this._displayIndex %= this._replaceDisplays.length;
            var replaceDisplayName = this._replaceDisplays[this._displayIndex];
            if (replaceDisplayName.indexOf("mesh") >= 0) {
                switch (replaceDisplayName) {
                    case "meshA":
                        // Normal to mesh.
                        this._factory.replaceSlotDisplay("ReplaceSlotDisplay", "MyMesh", "meshA", "weapon_1004_1", this._armatureDisplay.armature.getSlot("weapon"));
                        // Replace mesh texture. 
                        this._factory.replaceSlotDisplay("ReplaceSlotDisplay", "MyDisplay", "ball", "display0002", this._armatureDisplay.armature.getSlot("mesh"));
                        break;
                    case "meshB":
                        // Normal to mesh.
                        this._factory.replaceSlotDisplay("ReplaceSlotDisplay", "MyMesh", "meshB", "weapon_1004_1", this._armatureDisplay.armature.getSlot("weapon"));
                        // Replace mesh texture. 
                        this._factory.replaceSlotDisplay("ReplaceSlotDisplay", "MyDisplay", "ball", "display0003", this._armatureDisplay.armature.getSlot("mesh"));
                        break;
                    case "mesh":
                        // Back to normal.
                        this._factory.replaceSlotDisplay("ReplaceSlotDisplay", "MyMesh", "mesh", "weapon_1004_1", this._armatureDisplay.armature.getSlot("weapon"));
                        // Replace mesh texture. 
                        this._factory.replaceSlotDisplay("ReplaceSlotDisplay", "MyDisplay", "ball", "display0005", this._armatureDisplay.armature.getSlot("mesh"));
                        break;
                }
            }
            else {
                this._factory.replaceSlotDisplay("ReplaceSlotDisplay", "MyDisplay", "ball", replaceDisplayName, this._armatureDisplay.armature.getSlot("ball"));
            }
        };
        return ReplaceSlotDisplay;
    }(demosPixi.BaseTest));
    demosPixi.ReplaceSlotDisplay = ReplaceSlotDisplay;
})(demosPixi || (demosPixi = {}));
