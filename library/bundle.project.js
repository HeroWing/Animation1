require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ColliderListener":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2b036fblJlOP7duKmsNBMvi', 'ColliderListener');
// script\ColliderListener.js

cc.Class({
    "extends": cc.Component,

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
        //console.log('onCollisionEnter');
    },

    onCollisionStay: function onCollisionStay(other) {
        //console.log('on collision stay');
    },

    onCollisionExit: function onCollisionExit() {
        //console.log('onCollisionExit');
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

    reachedTarget: false,

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

    //this.fire(this.loc);
  },

  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
  },

  fire: function fire(loc) {
    var scene = cc.director.getScene();
    var touchLoc = loc;
    var bullet = cc.instantiate(this.bullet);
    //bullet.hero = this;
    bullet.position = touchLoc;
    bullet.active = true;
    scene.addChild(bullet);
  },

  refire: function refire() {
    if (this.reachedTarget) {
      var stopLoc = cc.v2(this.node.x, this.node.y);
      this.fire(stopLoc);
    }
  },

  onCollisionEnter: function onCollisionEnter(other, self) {
    //console.log('onCollisionEnter ' + self.tag);

    if (self.tag == 11) {
      this.collision = true;
      this.node.stopAllActions();
    } else if (self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3)) {
      this.reachedTarget = true;
      var stopLoc = cc.v2(this.node.x, this.node.y);
      this.fire(stopLoc);
    }
  },

  onCollisionStay: function onCollisionStay(other, self) {

    if (self.tag == 1) {
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
    } else if (self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3)) {
        this.reachedTarget = true;
      }
  },

  onCollisionExit: function onCollisionExit(other, self) {
    if (self.tag == 1) {
      this.collision = false;
    } else if (self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3)) {
      this.reachedTarget = false;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvQ29jb3NDcmVhdG9yL2FwcC0xLjEuMS9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHQvQ29sbGlkZXJMaXN0ZW5lci5qcyIsImFzc2V0cy9zY3JpcHQvYnVsbGV0LmpzIiwiYXNzZXRzL3NjcmlwdC9teUFwcC5qcyIsImFzc2V0cy9zY3JpcHQvbXlIZXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzJiMDM2ZmJsSmxPUDdkdUttc05CTXZpJywgJ0NvbGxpZGVyTGlzdGVuZXInKTtcbi8vIHNjcmlwdFxcQ29sbGlkZXJMaXN0ZW5lci5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25Db2xsaXNpb25FbnRlcicpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlcikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRXhpdCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25Db2xsaXNpb25FeGl0Jyk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmZjYjJsc3ZPWkN5NTF1ODFGeXZQR20nLCAnYnVsbGV0Jyk7XG4vLyBzY3JpcHRcXGJ1bGxldC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwZWVkOiAxMDAsXG5cbiAgICAgICAgaGVybzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbiBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIGlmIChvdGhlci50YWcgPT0gMSB8fCBvdGhlci50YWcgPT0gMiB8fCBvdGhlci50YWcgPT0gMyB8fCBvdGhlci50YWcgPT0gNCkge1xuICAgICAgICAgICAgdGhpcy5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykucmVmaXJlKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gb25Db2xsaXNpb25TdGF5KG90aGVyKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBzdGF5Jyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkV4aXQnKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdiNjE1NGhpa2F0TENMajZSR1EvdHFPdicsICdteUFwcCcpO1xuLy8gc2NyaXB0XFxteUFwcC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGhlcm86IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBkaXI6IDBcbiAgICB9LFxuXG4gICAgYXV0b0NoYW5nZURpcjogZnVuY3Rpb24gYXV0b0NoYW5nZURpcigpIHtcbiAgICAgICAgdGhpcy5kaXIrKztcbiAgICAgICAgaWYgKHRoaXMuZGlyID4gNykgdGhpcy5kaXIgPSAwO1xuICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYubm9kZS5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICBzZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLm1vdmVUb1BvaW50KGV2ZW50LmdldExvY2F0aW9uWCgpLCBldmVudC5nZXRMb2NhdGlvblkoKSk7XG5cbiAgICAgICAgICAgIC8vc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykubm9kZS55PSBldmVudC5nZXRMb2NhdGlvblkoKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuZ2V0TG9jYXRpb25YKCkgKyAnICcgKyBldmVudC5nZXRMb2NhdGlvblkoKSk7XG5cbiAgICAgICAgICAgIHZhciB2aXNpYmxlU2l6ZSA9IGNjLmRpcmVjdG9yLmdldFZpc2libGVTaXplKCk7XG5cbiAgICAgICAgICAgIHZhciBYaW5kZXggPSBNYXRoLmZsb29yKGV2ZW50LmdldExvY2F0aW9uWCgpICogMyAvIHZpc2libGVTaXplLndpZHRoKTtcbiAgICAgICAgICAgIHZhciBZaW5kZXggPSAyIC0gTWF0aC5mbG9vcihldmVudC5nZXRMb2NhdGlvblkoKSAqIDMgLyB2aXNpYmxlU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgICAgICB2YXIgZGlyID0gWGluZGV4ICsgWWluZGV4O1xuXG4gICAgICAgICAgICBpZiAoWGluZGV4ID09IDEgJiYgWWluZGV4ID09IDEpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKFhpbmRleCA8IFlpbmRleCkge1xuICAgICAgICAgICAgICAgIGRpciA9IDggLSBkaXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbihkaXIpO1xuXG4gICAgICAgICAgICB2YXIgY3VzdG9tRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBjdXN0b21FdmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0gKyAnICcgKyBjdXN0b21FdmVudFtpdGVtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL2NjLnJlcGVhdEZvcmV2ZXIodGhpcy5hdXRvQ2hhbmdlRGlyKCkpO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpeyAgICAgICAgdGhpcy5kaXIrKztcbiAgICAgICAgLy8gICAgICAgIGlmKHRoaXMuZGlyID4gNykgdGhpcy5kaXI9MDtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgICAgIC8vICAgICAgIH0sMSk7XG4gICAgICAgIC8vdGhpcy5zY2hlZHVsZSh0aGlzLmF1dG9DaGFuZ2VEaXIoKSwxKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZHQgaXMnICsgZHQpO1xuXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5kaXIrKztcclxuICAgICAgICBpZih0aGlzLmRpciA+IDcpIHRoaXMuZGlyPTA7XHJcbiAgICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xyXG4gICAgICAgICAgKi9cblxuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3Y2EyN3ZRY2R0TWM0SHRJMXd5UWVGSScsICdteUhlcm8nKTtcbi8vIHNjcmlwdFxcbXlIZXJvLmpzXG5cbmNjLkNsYXNzKHtcbiAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuXG4gICAgQW5pbU5hbWU6ICcnLFxuXG4gICAgbG9jOiBjYy52MigwLCAwKSxcblxuICAgIGNvbGxpc2lvbjogZmFsc2UsXG5cbiAgICByZWFjaGVkVGFyZ2V0OiBmYWxzZSxcblxuICAgIGJ1bGxldDoge1xuICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH1cblxuICB9LFxuXG4gIGNoYW5nZURpcmVjdGlvbjogZnVuY3Rpb24gY2hhbmdlRGlyZWN0aW9uKGRpcikge1xuICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSh0aGlzLkFuaW1OYW1lICsgZGlyKTtcbiAgfSxcblxuICBtb3ZlVG9Qb2ludDogZnVuY3Rpb24gbW92ZVRvUG9pbnQoeCwgeSkge1xuICAgIHRoaXMubG9jLnggPSB4O1xuICAgIHRoaXMubG9jLnkgPSB5O1xuXG4gICAgLy9jYy5tb3ZlVG8oMSxjYy5wKHgsIHkpKTtcbiAgICBpZiAoIXRoaXMuY29sbGlzaW9uKSB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLm1vdmVUbygxLCBjYy5wKHgsIHkpKSk7XG5cbiAgICAvL3RoaXMuZmlyZSh0aGlzLmxvYyk7XG4gIH0sXG5cbiAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICB9LFxuXG4gIGZpcmU6IGZ1bmN0aW9uIGZpcmUobG9jKSB7XG4gICAgdmFyIHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcbiAgICB2YXIgdG91Y2hMb2MgPSBsb2M7XG4gICAgdmFyIGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0KTtcbiAgICAvL2J1bGxldC5oZXJvID0gdGhpcztcbiAgICBidWxsZXQucG9zaXRpb24gPSB0b3VjaExvYztcbiAgICBidWxsZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICBzY2VuZS5hZGRDaGlsZChidWxsZXQpO1xuICB9LFxuXG4gIHJlZmlyZTogZnVuY3Rpb24gcmVmaXJlKCkge1xuICAgIGlmICh0aGlzLnJlYWNoZWRUYXJnZXQpIHtcbiAgICAgIHZhciBzdG9wTG9jID0gY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55KTtcbiAgICAgIHRoaXMuZmlyZShzdG9wTG9jKTtcbiAgICB9XG4gIH0sXG5cbiAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgIC8vY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRW50ZXIgJyArIHNlbGYudGFnKTtcblxuICAgIGlmIChzZWxmLnRhZyA9PSAxMSkge1xuICAgICAgdGhpcy5jb2xsaXNpb24gPSB0cnVlO1xuICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgfSBlbHNlIGlmIChzZWxmLnRhZyA9PSAyMiAmJiAob3RoZXIudGFnID09IDEgfHwgb3RoZXIudGFnID09IDIgfHwgb3RoZXIudGFnID09IDMpKSB7XG4gICAgICB0aGlzLnJlYWNoZWRUYXJnZXQgPSB0cnVlO1xuICAgICAgdmFyIHN0b3BMb2MgPSBjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xuICAgICAgdGhpcy5maXJlKHN0b3BMb2MpO1xuICAgIH1cbiAgfSxcblxuICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlciwgc2VsZikge1xuXG4gICAgaWYgKHNlbGYudGFnID09IDEpIHtcbiAgICAgIHRoaXMuY29sbGlzaW9uID0gdHJ1ZTtcblxuICAgICAgdmFyIG90aGVyQWFiYiA9IG90aGVyLndvcmxkLmFhYmI7XG4gICAgICB2YXIgc2VsZkFhYmIgPSBzZWxmLndvcmxkLmFhYmIuY2xvbmUoKTtcbiAgICAgIHZhciBwcmVBYWJiID0gc2VsZi53b3JsZC5wcmVBYWJiO1xuXG4gICAgICAvL3NlbGZBYWJiLnggPSBwcmVBYWJiLng7XG4gICAgICAvL3NlbGZBYWJiLnkgPSBwcmVBYWJiLnk7XG5cbiAgICAgIC8vc2VsZkFhYmIueCA9IHNlbGYud29ybGQuYWFiYi54O1xuICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChzZWxmQWFiYiwgb3RoZXJBYWJiKSkge1xuICAgICAgICBpZiAoc2VsZkFhYmIueE1heCA+IG90aGVyQWFiYi54TWF4KSB7XG4gICAgICAgICAgdGhpcy5ub2RlLnggKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmQWFiYi54TWluIDwgb3RoZXJBYWJiLnhNaW4pIHtcbiAgICAgICAgICB0aGlzLm5vZGUueCAtPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGZBYWJiLnkgPSBzZWxmLndvcmxkLmFhYmIueTtcbiAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3Qoc2VsZkFhYmIsIG90aGVyQWFiYikpIHtcbiAgICAgICAgaWYgKHNlbGZBYWJiLnlNYXggPiBvdGhlckFhYmIueU1heCkge1xuICAgICAgICAgIHRoaXMubm9kZS55ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZkFhYmIueU1pbiA8IG90aGVyQWFiYi55TWluKSB7XG4gICAgICAgICAgdGhpcy5ub2RlLnkgLT0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy90aGlzLm5vZGUueSAtPSAxO1xuICAgICAgLy90aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9IGVsc2UgaWYgKHNlbGYudGFnID09IDIyICYmIChvdGhlci50YWcgPT0gMSB8fCBvdGhlci50YWcgPT0gMiB8fCBvdGhlci50YWcgPT0gMykpIHtcbiAgICAgICAgdGhpcy5yZWFjaGVkVGFyZ2V0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgfSxcblxuICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRXhpdChvdGhlciwgc2VsZikge1xuICAgIGlmIChzZWxmLnRhZyA9PSAxKSB7XG4gICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc2VsZi50YWcgPT0gMjIgJiYgKG90aGVyLnRhZyA9PSAxIHx8IG90aGVyLnRhZyA9PSAyIHx8IG90aGVyLnRhZyA9PSAzKSkge1xuICAgICAgdGhpcy5yZWFjaGVkVGFyZ2V0ID0gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgLyogICAgICAgXHJcbiAgICAgICAgICAgaWYgKCF0aGlzLmNvbGxpc2lvbil7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMubm9kZS54KSAhPSBNYXRoLmZsb29yKHRoaXMubG9jLngpKXtcclxuICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jLnggLSB0aGlzLm5vZGUueCA8IDApXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLngtLTtcclxuICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCsrO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd4PScgKyB0aGlzLm5vZGUueCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMubm9kZS55KSAhPSBNYXRoLmZsb29yKHRoaXMubG9jLnkpKXtcclxuICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jLnkgLSB0aGlzLm5vZGUueSA8IDApXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnktLTtcclxuICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSsrO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd5PScgKyB0aGlzLm5vZGUueSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgICovXG4gIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
