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
},{}]},{},["ColliderListener","myHero","myApp"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvQ29jb3NDcmVhdG9yL2FwcC0xLjEuMS9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHQvQ29sbGlkZXJMaXN0ZW5lci5qcyIsImFzc2V0cy9zY3JpcHQvbXlBcHAuanMiLCJhc3NldHMvc2NyaXB0L215SGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmIwMzZmYmxKbE9QN2R1S21zTkJNdmknLCAnQ29sbGlkZXJMaXN0ZW5lcicpO1xuLy8gc2NyaXB0XFxDb2xsaWRlckxpc3RlbmVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRW50ZXInKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiBvbkNvbGxpc2lvblN0YXkob3RoZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBzdGF5Jyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Db2xsaXNpb25FeGl0Jyk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYjYxNTRoaWthdExDTGo2UkdRL3RxT3YnLCAnbXlBcHAnKTtcbi8vIHNjcmlwdFxcbXlBcHAuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBoZXJvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlyOiAwXG4gICAgfSxcblxuICAgIGF1dG9DaGFuZ2VEaXI6IGZ1bmN0aW9uIGF1dG9DaGFuZ2VEaXIoKSB7XG4gICAgICAgIHRoaXMuZGlyKys7XG4gICAgICAgIGlmICh0aGlzLmRpciA+IDcpIHRoaXMuZGlyID0gMDtcbiAgICAgICAgdGhpcy5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY2hhbmdlRGlyZWN0aW9uKHRoaXMuZGlyKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLm5vZGUub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5tb3ZlVG9Qb2ludChldmVudC5nZXRMb2NhdGlvblgoKSwgZXZlbnQuZ2V0TG9jYXRpb25ZKCkpO1xuXG4gICAgICAgICAgICAvL3NlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLm5vZGUueT0gZXZlbnQuZ2V0TG9jYXRpb25ZKCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50LmdldExvY2F0aW9uWCgpICsgJyAnICsgZXZlbnQuZ2V0TG9jYXRpb25ZKCkpO1xuXG4gICAgICAgICAgICB2YXIgdmlzaWJsZVNpemUgPSBjYy5kaXJlY3Rvci5nZXRWaXNpYmxlU2l6ZSgpO1xuXG4gICAgICAgICAgICB2YXIgWGluZGV4ID0gTWF0aC5mbG9vcihldmVudC5nZXRMb2NhdGlvblgoKSAqIDMgLyB2aXNpYmxlU2l6ZS53aWR0aCk7XG4gICAgICAgICAgICB2YXIgWWluZGV4ID0gMiAtIE1hdGguZmxvb3IoZXZlbnQuZ2V0TG9jYXRpb25ZKCkgKiAzIC8gdmlzaWJsZVNpemUuaGVpZ2h0KTtcblxuICAgICAgICAgICAgdmFyIGRpciA9IFhpbmRleCArIFlpbmRleDtcblxuICAgICAgICAgICAgaWYgKFhpbmRleCA9PSAxICYmIFlpbmRleCA9PSAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmIChYaW5kZXggPCBZaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBkaXIgPSA4IC0gZGlyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24oZGlyKTtcblxuICAgICAgICAgICAgdmFyIGN1c3RvbUV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gaW4gY3VzdG9tRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtICsgJyAnICsgY3VzdG9tRXZlbnRbaXRlbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9jYy5yZXBlYXRGb3JldmVyKHRoaXMuYXV0b0NoYW5nZURpcigpKTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuY3Rpb24oKXsgICAgICAgIHRoaXMuZGlyKys7XG4gICAgICAgIC8vICAgICAgICBpZih0aGlzLmRpciA+IDcpIHRoaXMuZGlyPTA7XG4gICAgICAgIC8vICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgICAgICAvLyAgICAgICB9LDEpO1xuICAgICAgICAvL3RoaXMuc2NoZWR1bGUodGhpcy5hdXRvQ2hhbmdlRGlyKCksMSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2R0IGlzJyArIGR0KTtcblxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuZGlyKys7XHJcbiAgICAgICAgaWYodGhpcy5kaXIgPiA3KSB0aGlzLmRpcj0wO1xyXG4gICAgICAgICAgdGhpcy5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY2hhbmdlRGlyZWN0aW9uKHRoaXMuZGlyKTtcclxuICAgICAgICAgICovXG5cbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnN2NhMjd2UWNkdE1jNEh0STF3eVFlRkknLCAnbXlIZXJvJyk7XG4vLyBzY3JpcHRcXG15SGVyby5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgQW5pbU5hbWU6ICcnLFxuXG4gICAgICAgIGxvYzogY2MudjIoMCwgMCksXG5cbiAgICAgICAgY29sbGlzaW9uOiBmYWxzZVxuXG4gICAgfSxcblxuICAgIGNoYW5nZURpcmVjdGlvbjogZnVuY3Rpb24gY2hhbmdlRGlyZWN0aW9uKGRpcikge1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkodGhpcy5BbmltTmFtZSArIGRpcik7XG4gICAgfSxcblxuICAgIG1vdmVUb1BvaW50OiBmdW5jdGlvbiBtb3ZlVG9Qb2ludCh4LCB5KSB7XG4gICAgICAgIHRoaXMubG9jLnggPSB4O1xuICAgICAgICB0aGlzLmxvYy55ID0geTtcblxuICAgICAgICAvL2NjLm1vdmVUbygxLGNjLnAoeCwgeSkpO1xuICAgICAgICBpZiAoIXRoaXMuY29sbGlzaW9uKSB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLm1vdmVUbygxLCBjYy5wKHgsIHkpKSk7XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSB0cnVlO1xuXG4gICAgICAgIHZhciBvdGhlckFhYmIgPSBvdGhlci53b3JsZC5hYWJiO1xuICAgICAgICB2YXIgc2VsZkFhYmIgPSBzZWxmLndvcmxkLmFhYmIuY2xvbmUoKTtcbiAgICAgICAgdmFyIHByZUFhYmIgPSBzZWxmLndvcmxkLnByZUFhYmI7XG5cbiAgICAgICAgLy9zZWxmQWFiYi54ID0gcHJlQWFiYi54O1xuICAgICAgICAvL3NlbGZBYWJiLnkgPSBwcmVBYWJiLnk7XG5cbiAgICAgICAgLy9zZWxmQWFiYi54ID0gc2VsZi53b3JsZC5hYWJiLng7XG4gICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3Qoc2VsZkFhYmIsIG90aGVyQWFiYikpIHtcbiAgICAgICAgICAgIGlmIChzZWxmQWFiYi54TWF4ID4gb3RoZXJBYWJiLnhNYXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmQWFiYi54TWluIDwgb3RoZXJBYWJiLnhNaW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZkFhYmIueSA9IHNlbGYud29ybGQuYWFiYi55O1xuICAgICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHNlbGZBYWJiLCBvdGhlckFhYmIpKSB7XG4gICAgICAgICAgICBpZiAoc2VsZkFhYmIueU1heCA+IG90aGVyQWFiYi55TWF4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZkFhYmIueU1pbiA8IG90aGVyQWFiYi55TWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMubm9kZS55IC09IDE7XG4gICAgICAgIC8vdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KCkge1xuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICAvKiAgICAgICBcclxuICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbGxpc2lvbil7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLm5vZGUueCkgIT0gTWF0aC5mbG9vcih0aGlzLmxvYy54KSl7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2MueCAtIHRoaXMubm9kZS54IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLngtLTtcclxuICAgICAgICAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygneD0nICsgdGhpcy5ub2RlLngpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLm5vZGUueSkgIT0gTWF0aC5mbG9vcih0aGlzLmxvYy55KSl7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2MueSAtIHRoaXMubm9kZS55IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnktLTtcclxuICAgICAgICAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygneT0nICsgdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAqL1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
