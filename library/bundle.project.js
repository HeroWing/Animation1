require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Castle":[function(require,module,exports){
"use strict";
cc._RFpush(module, '98612dmdE9MzabkN/wdPlzk', 'Castle');
// script\Castle.js

cc.Class({
    "extends": cc.Component,

    properties: {
        lifeBar: {
            type: cc.ProgressBar,
            "default": null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {

        //got shot...
        if (other.tag == 33 && this.lifeBar.progress >= 0) {
            this.lifeBar.progress -= 0.18;

            if (this.lifeBar.progress <= 0) {
                this.node.destroy();
            }
        }

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
},{}],"ColliderListener":[function(require,module,exports){
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

    //自带碰到敌方建筑，销毁并开火（待改进）
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
    //子弹发射（待改进）
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

        //鼠标点击移动，同时改变人物朝向（待改进）
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

    //没有碰撞，可以移动
    if (!this.collision) this.node.runAction(cc.moveTo(1, cc.p(x, y)));

    //this.fire(this.loc);
  },

  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
  },

  //开火，动态生成子弹
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

    //tag 11表示人物本身，33为子弹，除了碰到自己的子弹外，碰撞变量置为true，停止运动
    if (self.tag == 11 && other.tag != 33) {
      this.collision = true;
      this.node.stopAllActions();
    }

    //tag 22为攻击范围检测，1,2,3代表敌方建筑,满足开火条件
    if (self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3)) {
      this.reachedTarget = true;
      var stopLoc = cc.v2(this.node.x, this.node.y);
      this.fire(stopLoc);
    }
  },

  onCollisionStay: function onCollisionStay(other, self) {

    //人物碰到除自己子弹外的物体，往相应反方向退一格，以避免碰撞后慢慢穿越物体。
    if (self.tag == 11 && other.tag != 33) {
      this.collision = true;

      var otherAabb = other.world.aabb;
      var selfAabb = self.world.aabb.clone();
      var preAabb = self.world.preAabb;

      //selfAabb.x = preAabb.x;
      //selfAabb.y = preAabb.y;

      //selfAabb.x = self.world.aabb.x;
      if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
        //左右碰撞，往x方向退格
        if (selfAabb.xMax > otherAabb.xMax) {
          this.node.x += 1;
        } else if (selfAabb.xMin < otherAabb.xMin) {
          this.node.x -= 1;
        }
      }

      //上下碰撞，y方向退格
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
    }

    //碰到敌方建筑，开火条件依然满足
    if (self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3)) {
      this.reachedTarget = true;
    }
  },

  onCollisionExit: function onCollisionExit(other, self) {
    //碰撞结束，变量置为false，人物可以继续移动
    if (self.tag == 11 && other.tag != 33) {
      this.collision = false;
    }

    //离开攻击范围,变量置为false,结束攻击
    if (self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3)) {
      this.reachedTarget = false;
    }
  },

  //动画完成后的回调
  OnAnimitionEnd: function OnAnimitionEnd() {

    console.log('OnAnimitionEnd');
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
},{}]},{},["ColliderListener","myHero","Castle","myApp","bullet"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvQ29jb3NDcmVhdG9yL2FwcC0xLjEuMS9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHQvQ2FzdGxlLmpzIiwiYXNzZXRzL3NjcmlwdC9Db2xsaWRlckxpc3RlbmVyLmpzIiwiYXNzZXRzL3NjcmlwdC9idWxsZXQuanMiLCJhc3NldHMvc2NyaXB0L215QXBwLmpzIiwiYXNzZXRzL3NjcmlwdC9teUhlcm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTg2MTJkbWRFOU16YWJrTi93ZFBsemsnLCAnQ2FzdGxlJyk7XG4vLyBzY3JpcHRcXENhc3RsZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGlmZUJhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcblxuICAgICAgICAvL2dvdCBzaG90Li4uXG4gICAgICAgIGlmIChvdGhlci50YWcgPT0gMzMgJiYgdGhpcy5saWZlQmFyLnByb2dyZXNzID49IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlmZUJhci5wcm9ncmVzcyAtPSAwLjE4O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5saWZlQmFyLnByb2dyZXNzIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25Db2xsaXNpb25FbnRlcicpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlciwgc2VsZikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRXhpdChvdGhlciwgc2VsZikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkV4aXQnKTtcbiAgICB9XG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmIwMzZmYmxKbE9QN2R1S21zTkJNdmknLCAnQ29sbGlkZXJMaXN0ZW5lcicpO1xuLy8gc2NyaXB0XFxDb2xsaWRlckxpc3RlbmVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICAvL+atpOiEmuacrOWKoOi9veWcqOWkp+WcsOWbvuS4iizmo4DmtYvnorDmkp4s5pqC5pe25pyq5L2c5Lu75L2V5pON5L2cXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbiBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XG5cbiAgICAgICAgLy9nb3Qgc2hvdC4uLlxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRW50ZXInKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb24gY29sbGlzaW9uIHN0YXknKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbiBvbkNvbGxpc2lvbkV4aXQob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25Db2xsaXNpb25FeGl0Jyk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmZjYjJsc3ZPWkN5NTF1ODFGeXZQR20nLCAnYnVsbGV0Jyk7XG4vLyBzY3JpcHRcXGJ1bGxldC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwZWVkOiAxMDAsXG5cbiAgICAgICAgaGVybzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvL+iHquW4pueisOWIsOaVjOaWueW7uuetke+8jOmUgOavgeW5tuW8gOeBq++8iOW+heaUuei/m++8iVxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgaWYgKG90aGVyLnRhZyA9PSAxIHx8IG90aGVyLnRhZyA9PSAyIHx8IG90aGVyLnRhZyA9PSAzIHx8IG90aGVyLnRhZyA9PSA0KSB7XG4gICAgICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5yZWZpcmUoKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiBvbkNvbGxpc2lvblN0YXkob3RoZXIpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb24gY29sbGlzaW9uIHN0YXknKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbiBvbkNvbGxpc2lvbkV4aXQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRXhpdCcpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8v5a2Q5by55Y+R5bCE77yI5b6F5pS56L+b77yJXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIGR0O1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYjYxNTRoaWthdExDTGo2UkdRL3RxT3YnLCAnbXlBcHAnKTtcbi8vIHNjcmlwdFxcbXlBcHAuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBoZXJvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlyOiAwXG4gICAgfSxcblxuICAgIGF1dG9DaGFuZ2VEaXI6IGZ1bmN0aW9uIGF1dG9DaGFuZ2VEaXIoKSB7XG4gICAgICAgIHRoaXMuZGlyKys7XG4gICAgICAgIGlmICh0aGlzLmRpciA+IDcpIHRoaXMuZGlyID0gMDtcbiAgICAgICAgdGhpcy5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY2hhbmdlRGlyZWN0aW9uKHRoaXMuZGlyKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvL+m8oOagh+eCueWHu+enu+WKqO+8jOWQjOaXtuaUueWPmOS6uueJqeacneWQke+8iOW+heaUuei/m++8iVxuICAgICAgICBzZWxmLm5vZGUub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5tb3ZlVG9Qb2ludChldmVudC5nZXRMb2NhdGlvblgoKSwgZXZlbnQuZ2V0TG9jYXRpb25ZKCkpO1xuXG4gICAgICAgICAgICAvL3NlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLm5vZGUueT0gZXZlbnQuZ2V0TG9jYXRpb25ZKCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50LmdldExvY2F0aW9uWCgpICsgJyAnICsgZXZlbnQuZ2V0TG9jYXRpb25ZKCkpO1xuXG4gICAgICAgICAgICB2YXIgdmlzaWJsZVNpemUgPSBjYy5kaXJlY3Rvci5nZXRWaXNpYmxlU2l6ZSgpO1xuXG4gICAgICAgICAgICB2YXIgWGluZGV4ID0gTWF0aC5mbG9vcihldmVudC5nZXRMb2NhdGlvblgoKSAqIDMgLyB2aXNpYmxlU2l6ZS53aWR0aCk7XG4gICAgICAgICAgICB2YXIgWWluZGV4ID0gMiAtIE1hdGguZmxvb3IoZXZlbnQuZ2V0TG9jYXRpb25ZKCkgKiAzIC8gdmlzaWJsZVNpemUuaGVpZ2h0KTtcblxuICAgICAgICAgICAgdmFyIGRpciA9IFhpbmRleCArIFlpbmRleDtcblxuICAgICAgICAgICAgaWYgKFhpbmRleCA9PSAxICYmIFlpbmRleCA9PSAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmIChYaW5kZXggPCBZaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBkaXIgPSA4IC0gZGlyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24oZGlyKTtcblxuICAgICAgICAgICAgdmFyIGN1c3RvbUV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gaW4gY3VzdG9tRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtICsgJyAnICsgY3VzdG9tRXZlbnRbaXRlbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9jYy5yZXBlYXRGb3JldmVyKHRoaXMuYXV0b0NoYW5nZURpcigpKTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuY3Rpb24oKXsgICAgICAgIHRoaXMuZGlyKys7XG4gICAgICAgIC8vICAgICAgICBpZih0aGlzLmRpciA+IDcpIHRoaXMuZGlyPTA7XG4gICAgICAgIC8vICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgICAgICAvLyAgICAgICB9LDEpO1xuICAgICAgICAvL3RoaXMuc2NoZWR1bGUodGhpcy5hdXRvQ2hhbmdlRGlyKCksMSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2R0IGlzJyArIGR0KTtcblxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuZGlyKys7XHJcbiAgICAgICAgaWYodGhpcy5kaXIgPiA3KSB0aGlzLmRpcj0wO1xyXG4gICAgICAgICAgdGhpcy5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY2hhbmdlRGlyZWN0aW9uKHRoaXMuZGlyKTtcclxuICAgICAgICAgICovXG5cbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnN2NhMjd2UWNkdE1jNEh0STF3eVFlRkknLCAnbXlIZXJvJyk7XG4vLyBzY3JpcHRcXG15SGVyby5qc1xuXG5jYy5DbGFzcyh7XG4gICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gIHByb3BlcnRpZXM6IHtcblxuICAgIEFuaW1OYW1lOiAnJyxcblxuICAgIGxvYzogY2MudjIoMCwgMCksXG5cbiAgICBjb2xsaXNpb246IGZhbHNlLFxuXG4gICAgcmVhY2hlZFRhcmdldDogZmFsc2UsXG5cbiAgICBidWxsZXQ6IHtcbiAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9XG5cbiAgfSxcblxuICBjaGFuZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIGNoYW5nZURpcmVjdGlvbihkaXIpIHtcbiAgICB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkodGhpcy5BbmltTmFtZSArIGRpcik7XG4gIH0sXG5cbiAgbW92ZVRvUG9pbnQ6IGZ1bmN0aW9uIG1vdmVUb1BvaW50KHgsIHkpIHtcbiAgICB0aGlzLmxvYy54ID0geDtcbiAgICB0aGlzLmxvYy55ID0geTtcblxuICAgIC8vY2MubW92ZVRvKDEsY2MucCh4LCB5KSk7XG5cbiAgICAvL+ayoeacieeisOaSnu+8jOWPr+S7peenu+WKqFxuICAgIGlmICghdGhpcy5jb2xsaXNpb24pIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDEsIGNjLnAoeCwgeSkpKTtcblxuICAgIC8vdGhpcy5maXJlKHRoaXMubG9jKTtcbiAgfSxcblxuICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gIH0sXG5cbiAgLy/lvIDngavvvIzliqjmgIHnlJ/miJDlrZDlvLlcbiAgZmlyZTogZnVuY3Rpb24gZmlyZShsb2MpIHtcbiAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgIHZhciB0b3VjaExvYyA9IGxvYztcbiAgICB2YXIgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXQpO1xuICAgIC8vYnVsbGV0Lmhlcm8gPSB0aGlzO1xuICAgIGJ1bGxldC5wb3NpdGlvbiA9IHRvdWNoTG9jO1xuICAgIGJ1bGxldC5hY3RpdmUgPSB0cnVlO1xuICAgIHNjZW5lLmFkZENoaWxkKGJ1bGxldCk7XG4gIH0sXG5cbiAgcmVmaXJlOiBmdW5jdGlvbiByZWZpcmUoKSB7XG4gICAgaWYgKHRoaXMucmVhY2hlZFRhcmdldCkge1xuICAgICAgdmFyIHN0b3BMb2MgPSBjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xuICAgICAgdGhpcy5maXJlKHN0b3BMb2MpO1xuICAgIH1cbiAgfSxcblxuICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbiBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XG4gICAgLy9jb25zb2xlLmxvZygnb25Db2xsaXNpb25FbnRlciAnICsgc2VsZi50YWcpO1xuXG4gICAgLy90YWcgMTHooajnpLrkurrnianmnKzouqvvvIwzM+S4uuWtkOW8ue+8jOmZpOS6hueisOWIsOiHquW3seeahOWtkOW8ueWklu+8jOeisOaSnuWPmOmHj+e9ruS4unRydWXvvIzlgZzmraLov5DliqhcbiAgICBpZiAoc2VsZi50YWcgPT0gMTEgJiYgb3RoZXIudGFnICE9IDMzKSB7XG4gICAgICB0aGlzLmNvbGxpc2lvbiA9IHRydWU7XG4gICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvL3RhZyAyMuS4uuaUu+WHu+iMg+WbtOajgOa1i++8jDEsMiwz5Luj6KGo5pWM5pa55bu6562RLOa7oei2s+W8gOeBq+adoeS7tlxuICAgIGlmIChzZWxmLnRhZyA9PSAyMiAmJiAob3RoZXIudGFnID09IDEgfHwgb3RoZXIudGFnID09IDIgfHwgb3RoZXIudGFnID09IDMpKSB7XG4gICAgICB0aGlzLnJlYWNoZWRUYXJnZXQgPSB0cnVlO1xuICAgICAgdmFyIHN0b3BMb2MgPSBjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xuICAgICAgdGhpcy5maXJlKHN0b3BMb2MpO1xuICAgIH1cbiAgfSxcblxuICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlciwgc2VsZikge1xuXG4gICAgLy/kurrniannorDliLDpmaToh6rlt7HlrZDlvLnlpJbnmoTniankvZPvvIzlvoDnm7jlupTlj43mlrnlkJHpgIDkuIDmoLzvvIzku6Xpgb/lhY3norDmkp7lkI7mhaLmhaLnqb/otorniankvZPjgIJcbiAgICBpZiAoc2VsZi50YWcgPT0gMTEgJiYgb3RoZXIudGFnICE9IDMzKSB7XG4gICAgICB0aGlzLmNvbGxpc2lvbiA9IHRydWU7XG5cbiAgICAgIHZhciBvdGhlckFhYmIgPSBvdGhlci53b3JsZC5hYWJiO1xuICAgICAgdmFyIHNlbGZBYWJiID0gc2VsZi53b3JsZC5hYWJiLmNsb25lKCk7XG4gICAgICB2YXIgcHJlQWFiYiA9IHNlbGYud29ybGQucHJlQWFiYjtcblxuICAgICAgLy9zZWxmQWFiYi54ID0gcHJlQWFiYi54O1xuICAgICAgLy9zZWxmQWFiYi55ID0gcHJlQWFiYi55O1xuXG4gICAgICAvL3NlbGZBYWJiLnggPSBzZWxmLndvcmxkLmFhYmIueDtcbiAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3Qoc2VsZkFhYmIsIG90aGVyQWFiYikpIHtcbiAgICAgICAgLy/lt6blj7PnorDmkp7vvIzlvoB45pa55ZCR6YCA5qC8XG4gICAgICAgIGlmIChzZWxmQWFiYi54TWF4ID4gb3RoZXJBYWJiLnhNYXgpIHtcbiAgICAgICAgICB0aGlzLm5vZGUueCArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGZBYWJiLnhNaW4gPCBvdGhlckFhYmIueE1pbikge1xuICAgICAgICAgIHRoaXMubm9kZS54IC09IDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy/kuIrkuIvnorDmkp7vvIx55pa55ZCR6YCA5qC8XG4gICAgICBzZWxmQWFiYi55ID0gc2VsZi53b3JsZC5hYWJiLnk7XG4gICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHNlbGZBYWJiLCBvdGhlckFhYmIpKSB7XG4gICAgICAgIGlmIChzZWxmQWFiYi55TWF4ID4gb3RoZXJBYWJiLnlNYXgpIHtcbiAgICAgICAgICB0aGlzLm5vZGUueSArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGZBYWJiLnlNaW4gPCBvdGhlckFhYmIueU1pbikge1xuICAgICAgICAgIHRoaXMubm9kZS55IC09IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vdGhpcy5ub2RlLnkgLT0gMTtcbiAgICAgIC8vdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgfVxuXG4gICAgLy/norDliLDmlYzmlrnlu7rnrZHvvIzlvIDngavmnaHku7bkvp3nhLbmu6HotrNcbiAgICBpZiAoc2VsZi50YWcgPT0gMjIgJiYgKG90aGVyLnRhZyA9PSAxIHx8IG90aGVyLnRhZyA9PSAyIHx8IG90aGVyLnRhZyA9PSAzKSkge1xuICAgICAgdGhpcy5yZWFjaGVkVGFyZ2V0ID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbiBvbkNvbGxpc2lvbkV4aXQob3RoZXIsIHNlbGYpIHtcbiAgICAvL+eisOaSnue7k+adn++8jOWPmOmHj+e9ruS4umZhbHNl77yM5Lq654mp5Y+v5Lul57un57ut56e75YqoXG4gICAgaWYgKHNlbGYudGFnID09IDExICYmIG90aGVyLnRhZyAhPSAzMykge1xuICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+emu+W8gOaUu+WHu+iMg+WbtCzlj5jph4/nva7kuLpmYWxzZSznu5PmnZ/mlLvlh7tcbiAgICBpZiAoc2VsZi50YWcgPT0gMjIgJiYgKG90aGVyLnRhZyA9PSAxIHx8IG90aGVyLnRhZyA9PSAyIHx8IG90aGVyLnRhZyA9PSAzKSkge1xuICAgICAgdGhpcy5yZWFjaGVkVGFyZ2V0ID0gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIC8v5Yqo55S75a6M5oiQ5ZCO55qE5Zue6LCDXG4gIE9uQW5pbWl0aW9uRW5kOiBmdW5jdGlvbiBPbkFuaW1pdGlvbkVuZCgpIHtcblxuICAgIGNvbnNvbGUubG9nKCdPbkFuaW1pdGlvbkVuZCcpO1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgLyogICAgICAgXHJcbiAgICAgICAgICAgaWYgKCF0aGlzLmNvbGxpc2lvbil7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMubm9kZS54KSAhPSBNYXRoLmZsb29yKHRoaXMubG9jLngpKXtcclxuICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jLnggLSB0aGlzLm5vZGUueCA8IDApXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLngtLTtcclxuICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCsrO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd4PScgKyB0aGlzLm5vZGUueCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMubm9kZS55KSAhPSBNYXRoLmZsb29yKHRoaXMubG9jLnkpKXtcclxuICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jLnkgLSB0aGlzLm5vZGUueSA8IDApXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnktLTtcclxuICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSsrO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd5PScgKyB0aGlzLm5vZGUueSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgICovXG4gIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
