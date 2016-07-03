"use strict";
cc._RFpush(module, '7ca27vQcdtMc4HtI1wyQeFI', 'myHero');
// script\myHero.js

cc.Class({
    'extends': cc.Component,

    properties: {

        AnimName: '',

        loc: cc.v2(0, 0),

        collision: false

    },

    changeDirection: function changeDirection(dir) {
        this.getComponent(cc.Animation).play(this.AnimName + dir);
    },

    moveToPoint: function moveToPoint(x, y) {
        this.loc.x = x;
        this.loc.y = y;

        //cc.moveTo(1,cc.p(x, y));
        if (!this.collision) this.node.runAction(cc.moveTo(1, cc.p(x, y)));
    },

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.collision = true;
        this.node.stopAllActions();
    },

    onCollisionStay: function onCollisionStay(other, self) {
        this.collision = true;

        var otherAabb = other.world.aabb;
        var selfAabb = self.world.aabb.clone();
        var preAabb = self.world.preAabb;

        //selfAabb.x = preAabb.x;
        //selfAabb.y = preAabb.y;

        //selfAabb.x = self.world.aabb.x;
        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (selfAabb.xMax > otherAabb.xMax) {
                this.node.x += 1;
            } else if (selfAabb.xMin < otherAabb.xMin) {
                this.node.x -= 1;
            }
        }

        selfAabb.y = self.world.aabb.y;
        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (selfAabb.yMax > otherAabb.yMax) {
                this.node.y += 1;
            } else if (selfAabb.yMin < otherAabb.yMin) {
                this.node.y -= 1;
            }
        }
        //this.node.y -= 1;
        //this.node.stopAllActions();
    },

    onCollisionExit: function onCollisionExit() {
        this.collision = false;
    },

    update: function update(dt) {
        /*       
               if (!this.collision){
                if (Math.floor(this.node.x) != Math.floor(this.loc.x)){
                   if (this.loc.x - this.node.x < 0)
                     this.node.x--;
                   else 
                     this.node.x++;
                     
                  // console.log('x=' + this.node.x);
                }
               
                 if (Math.floor(this.node.y) != Math.floor(this.loc.y)){
                   if (this.loc.y - this.node.y < 0)
                     this.node.y--;
                   else 
                     this.node.y++;
                     
                  // console.log('y=' + this.node.y);
                 }
               }
               */
    }

});

cc._RFpop();