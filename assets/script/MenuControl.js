cc.Class({
    extends: cc.Component,

    properties: {
        buttonFight: {
            default: null,
            type: cc.Button
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    onBtnFightClicked: function() {
        cc.audioEngine.stopAllEffects();
        cc.director.loadScene('GameScene');
    },
});
