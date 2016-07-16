require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ColliderListener":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2b036fblJlOP7duKmsNBMvi', 'ColliderListener');
// script\ColliderListener.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other) {
        console.log('onCollisionEnter');
    },

    onCollisionStay: function onCollisionStay(other) {
        console.log('on collision stay');
    },

    onCollisionExit: function onCollisionExit() {
        console.log('onCollisionExit');
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"bullet":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bfcb2lsvOZCy51u81FyvPGm', 'bullet');
// script\bullet.js

cc.Class({
    "extends": cc.Component,

    properties: {
        speed: 100
    },

    // use this for initialization
    onLoad: function onLoad() {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.destroy();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.node.y += this.speed * dt;
    }
});

cc._RFpop();
},{}],"myApp":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b6154hikatLCLj6RGQ/tqOv', 'myApp');
// script\myApp.js

cc.Class({
    'extends': cc.Component,

    properties: {
        hero: {
            'default': null,
            type: cc.Node
        },

        dir: 0
    },

    autoChangeDir: function autoChangeDir() {
        this.dir++;
        if (this.dir > 7) this.dir = 0;
        this.hero.getComponent('myHero').changeDirection(this.dir);
    },

    onLoad: function onLoad() {
        var self = this;

        self.node.on('mouseup', function (event) {

            self.hero.getComponent('myHero').collision = false;
            self.hero.getComponent('myHero').moveToPoint(event.getLocationX(), event.getLocationY());

            //self.hero.getComponent('myHero').node.y= event.getLocationY();

            // console.log(event.getLocationX() + ' ' + event.getLocationY());

            var visibleSize = cc.director.getVisibleSize();

            var Xindex = Math.floor(event.getLocationX() * 3 / visibleSize.width);
            var Yindex = 2 - Math.floor(event.getLocationY() * 3 / visibleSize.height);

            var dir = Xindex + Yindex;

            if (Xindex == 1 && Yindex == 1) return;

            if (Xindex < Yindex) {
                dir = 8 - dir;
            }

            self.hero.getComponent('myHero').changeDirection(dir);

            var customEvent = new cc.Event.EventCustom();

            for (var item in customEvent) {
                console.log(item + ' ' + customEvent[item]);
            }
        });
        //cc.repeatForever(this.autoChangeDir());
        //        this.schedule(function(){        this.dir++;
        //        if(this.dir > 7) this.dir=0;
        //        this.hero.getComponent('myHero').changeDirection(this.dir);
        //       },1);
        //this.schedule(this.autoChangeDir(),1);
    },

    update: function update(dt) {
        //console.log('dt is' + dt);

        /*
        this.dir++;
        if(this.dir > 7) this.dir=0;
          this.hero.getComponent('myHero').changeDirection(this.dir);
          */

    }

});

cc._RFpop();
},{}],"myHero":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7ca27vQcdtMc4HtI1wyQeFI', 'myHero');
// script\myHero.js

cc.Class({
    'extends': cc.Component,

    properties: {

        AnimName: '',

        loc: cc.v2(0, 0),

        collision: false,

        bullet: {
            'default': null,
            type: cc.Node
        }

    },

    changeDirection: function changeDirection(dir) {
        this.getComponent(cc.Animation).play(this.AnimName + dir);
    },

    moveToPoint: function moveToPoint(x, y) {
        this.loc.x = x;
        this.loc.y = y;

        //cc.moveTo(1,cc.p(x, y));
        if (!this.collision) this.node.runAction(cc.moveTo(1, cc.p(x, y)));

        var scene = cc.director.getScene();
        var touchLoc = this.loc;
        var bullet = cc.instantiate(this.bullet);
        bullet.position = touchLoc;
        bullet.active = true;
        scene.addChild(bullet);
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
},{}]},{},["ColliderListener","myHero","myApp","bullet"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvQ29jb3NDcmVhdG9yL2FwcC0xLjEuMS9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHQvQ29sbGlkZXJMaXN0ZW5lci5qcyIsImFzc2V0cy9zY3JpcHQvYnVsbGV0LmpzIiwiYXNzZXRzL3NjcmlwdC9teUFwcC5qcyIsImFzc2V0cy9zY3JpcHQvbXlIZXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmIwMzZmYmxKbE9QN2R1S21zTkJNdmknLCAnQ29sbGlkZXJMaXN0ZW5lcicpO1xuLy8gc2NyaXB0XFxDb2xsaWRlckxpc3RlbmVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRW50ZXInKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiBvbkNvbGxpc2lvblN0YXkob3RoZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBzdGF5Jyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Db2xsaXNpb25FeGl0Jyk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmZjYjJsc3ZPWkN5NTF1ODFGeXZQR20nLCAnYnVsbGV0Jyk7XG4vLyBzY3JpcHRcXGJ1bGxldC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BlZWQ6IDEwMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQgKiBkdDtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2I2MTU0aGlrYXRMQ0xqNlJHUS90cU92JywgJ215QXBwJyk7XG4vLyBzY3JpcHRcXG15QXBwLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaGVybzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIGRpcjogMFxuICAgIH0sXG5cbiAgICBhdXRvQ2hhbmdlRGlyOiBmdW5jdGlvbiBhdXRvQ2hhbmdlRGlyKCkge1xuICAgICAgICB0aGlzLmRpcisrO1xuICAgICAgICBpZiAodGhpcy5kaXIgPiA3KSB0aGlzLmRpciA9IDA7XG4gICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5ub2RlLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIHNlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNvbGxpc2lvbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykubW92ZVRvUG9pbnQoZXZlbnQuZ2V0TG9jYXRpb25YKCksIGV2ZW50LmdldExvY2F0aW9uWSgpKTtcblxuICAgICAgICAgICAgLy9zZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5ub2RlLnk9IGV2ZW50LmdldExvY2F0aW9uWSgpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC5nZXRMb2NhdGlvblgoKSArICcgJyArIGV2ZW50LmdldExvY2F0aW9uWSgpKTtcblxuICAgICAgICAgICAgdmFyIHZpc2libGVTaXplID0gY2MuZGlyZWN0b3IuZ2V0VmlzaWJsZVNpemUoKTtcblxuICAgICAgICAgICAgdmFyIFhpbmRleCA9IE1hdGguZmxvb3IoZXZlbnQuZ2V0TG9jYXRpb25YKCkgKiAzIC8gdmlzaWJsZVNpemUud2lkdGgpO1xuICAgICAgICAgICAgdmFyIFlpbmRleCA9IDIgLSBNYXRoLmZsb29yKGV2ZW50LmdldExvY2F0aW9uWSgpICogMyAvIHZpc2libGVTaXplLmhlaWdodCk7XG5cbiAgICAgICAgICAgIHZhciBkaXIgPSBYaW5kZXggKyBZaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChYaW5kZXggPT0gMSAmJiBZaW5kZXggPT0gMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoWGluZGV4IDwgWWluZGV4KSB7XG4gICAgICAgICAgICAgICAgZGlyID0gOCAtIGRpcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY2hhbmdlRGlyZWN0aW9uKGRpcik7XG5cbiAgICAgICAgICAgIHZhciBjdXN0b21FdmVudCA9IG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbSgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtIGluIGN1c3RvbUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSArICcgJyArIGN1c3RvbUV2ZW50W2l0ZW1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vY2MucmVwZWF0Rm9yZXZlcih0aGlzLmF1dG9DaGFuZ2VEaXIoKSk7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uKCl7ICAgICAgICB0aGlzLmRpcisrO1xuICAgICAgICAvLyAgICAgICAgaWYodGhpcy5kaXIgPiA3KSB0aGlzLmRpcj0wO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY2hhbmdlRGlyZWN0aW9uKHRoaXMuZGlyKTtcbiAgICAgICAgLy8gICAgICAgfSwxKTtcbiAgICAgICAgLy90aGlzLnNjaGVkdWxlKHRoaXMuYXV0b0NoYW5nZURpcigpLDEpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkdCBpcycgKyBkdCk7XG5cbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmRpcisrO1xyXG4gICAgICAgIGlmKHRoaXMuZGlyID4gNykgdGhpcy5kaXI9MDtcclxuICAgICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcik7XHJcbiAgICAgICAgICAqL1xuXG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzdjYTI3dlFjZHRNYzRIdEkxd3lRZUZJJywgJ215SGVybycpO1xuLy8gc2NyaXB0XFxteUhlcm8uanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIEFuaW1OYW1lOiAnJyxcblxuICAgICAgICBsb2M6IGNjLnYyKDAsIDApLFxuXG4gICAgICAgIGNvbGxpc2lvbjogZmFsc2UsXG5cbiAgICAgICAgYnVsbGV0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjaGFuZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIGNoYW5nZURpcmVjdGlvbihkaXIpIHtcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KHRoaXMuQW5pbU5hbWUgKyBkaXIpO1xuICAgIH0sXG5cbiAgICBtb3ZlVG9Qb2ludDogZnVuY3Rpb24gbW92ZVRvUG9pbnQoeCwgeSkge1xuICAgICAgICB0aGlzLmxvYy54ID0geDtcbiAgICAgICAgdGhpcy5sb2MueSA9IHk7XG5cbiAgICAgICAgLy9jYy5tb3ZlVG8oMSxjYy5wKHgsIHkpKTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxpc2lvbikgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMSwgY2MucCh4LCB5KSkpO1xuXG4gICAgICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgICAgIHZhciB0b3VjaExvYyA9IHRoaXMubG9jO1xuICAgICAgICB2YXIgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXQpO1xuICAgICAgICBidWxsZXQucG9zaXRpb24gPSB0b3VjaExvYztcbiAgICAgICAgYnVsbGV0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNjZW5lLmFkZENoaWxkKGJ1bGxldCk7XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSB0cnVlO1xuXG4gICAgICAgIHZhciBvdGhlckFhYmIgPSBvdGhlci53b3JsZC5hYWJiO1xuICAgICAgICB2YXIgc2VsZkFhYmIgPSBzZWxmLndvcmxkLmFhYmIuY2xvbmUoKTtcbiAgICAgICAgdmFyIHByZUFhYmIgPSBzZWxmLndvcmxkLnByZUFhYmI7XG5cbiAgICAgICAgLy9zZWxmQWFiYi54ID0gcHJlQWFiYi54O1xuICAgICAgICAvL3NlbGZBYWJiLnkgPSBwcmVBYWJiLnk7XG5cbiAgICAgICAgLy9zZWxmQWFiYi54ID0gc2VsZi53b3JsZC5hYWJiLng7XG4gICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3Qoc2VsZkFhYmIsIG90aGVyQWFiYikpIHtcbiAgICAgICAgICAgIGlmIChzZWxmQWFiYi54TWF4ID4gb3RoZXJBYWJiLnhNYXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmQWFiYi54TWluIDwgb3RoZXJBYWJiLnhNaW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZkFhYmIueSA9IHNlbGYud29ybGQuYWFiYi55O1xuICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHNlbGZBYWJiLCBvdGhlckFhYmIpKSB7XG4gICAgICAgICAgICBpZiAoc2VsZkFhYmIueU1heCA+IG90aGVyQWFiYi55TWF4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZkFhYmIueU1pbiA8IG90aGVyQWFiYi55TWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMubm9kZS55IC09IDE7XG4gICAgICAgIC8vdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KCkge1xuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICAvKiAgICAgICBcclxuICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbGxpc2lvbil7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLm5vZGUueCkgIT0gTWF0aC5mbG9vcih0aGlzLmxvYy54KSl7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2MueCAtIHRoaXMubm9kZS54IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLngtLTtcclxuICAgICAgICAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygneD0nICsgdGhpcy5ub2RlLngpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLm5vZGUueSkgIT0gTWF0aC5mbG9vcih0aGlzLmxvYy55KSl7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2MueSAtIHRoaXMubm9kZS55IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnktLTtcclxuICAgICAgICAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygneT0nICsgdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAqL1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
