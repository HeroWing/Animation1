"use strict";
cc._RFpush(module, 'd4afeKjLF1LN7MWDhy1EGs5', 'MenuControl');
// script\MenuControl.js

cc.Class({
    'extends': cc.Component,

    properties: {
        buttonFight: {
            'default': null,
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onBtnFightClicked: function onBtnFightClicked() {
        cc.audioEngine.stopAllEffects();
        cc.director.loadScene('GameScene');
    }
});

cc._RFpop();