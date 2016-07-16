"use strict";
cc._RFpush(module, 'bfcb2lsvOZCy51u81FyvPGm', 'bullet');
// script\bullet.js

cc.Class({
    'extends': cc.Component,

    properties: {
        speed: 100,

        hero: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.tag == 1 || other.tag == 2 || other.tag == 3 || other.tag == 4) {
            this.hero.getComponent('myHero').refire();
            this.node.destroy();
        }
    },

    onCollisionStay: function onCollisionStay(other) {
        //console.log('on collision stay');
    },

    onCollisionExit: function onCollisionExit() {
        //console.log('onCollisionExit');
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.node.y += this.speed * dt;
    }
});

cc._RFpop();