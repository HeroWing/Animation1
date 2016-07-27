"use strict";
cc._RFpush(module, '2b036fblJlOP7duKmsNBMvi', 'ColliderListener');
// script\ColliderListener.js

cc.Class({
    "extends": cc.Component,

    properties: {},

    //此脚本加载在大地图上,检测碰撞,暂时未作任何操作

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {

        //got shot...

        //console.log('onCollisionEnter');
    },

    onCollisionStay: function onCollisionStay(other, self) {
        //console.log('on collision stay');
    },

    onCollisionExit: function onCollisionExit(other, self) {
        //console.log('onCollisionExit');
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();