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

    //此脚本加载在大地图上,检测碰撞,暂时未作任何操作

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvQ29jb3NDcmVhdG9yL2FwcC0xLjEuMS9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHQvQ29sbGlkZXJMaXN0ZW5lci5qcyIsImFzc2V0cy9zY3JpcHQvYnVsbGV0LmpzIiwiYXNzZXRzL3NjcmlwdC9teUFwcC5qcyIsImFzc2V0cy9zY3JpcHQvbXlIZXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmIwMzZmYmxKbE9QN2R1S21zTkJNdmknLCAnQ29sbGlkZXJMaXN0ZW5lcicpO1xuLy8gc2NyaXB0XFxDb2xsaWRlckxpc3RlbmVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy/mraTohJrmnKzliqDovb3lnKjlpKflnLDlm77kuIos5qOA5rWL56Kw5pKeLOaaguaXtuacquS9nOS7u+S9leaTjeS9nFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlcikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkVudGVyJyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gb25Db2xsaXNpb25TdGF5KG90aGVyKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBzdGF5Jyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkV4aXQnKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdiZmNiMmxzdk9aQ3k1MXU4MUZ5dlBHbScsICdidWxsZXQnKTtcbi8vIHNjcmlwdFxcYnVsbGV0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BlZWQ6IDEwMCxcblxuICAgICAgICBoZXJvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIC8v6Ieq5bim56Kw5Yiw5pWM5pa55bu6562R77yM6ZSA5q+B5bm25byA54Gr77yI5b6F5pS56L+b77yJXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgICAgICBpZiAob3RoZXIudGFnID09IDEgfHwgb3RoZXIudGFnID09IDIgfHwgb3RoZXIudGFnID09IDMgfHwgb3RoZXIudGFnID09IDQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLnJlZmlyZSgpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlcikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRXhpdCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25Db2xsaXNpb25FeGl0Jyk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy/lrZDlvLnlj5HlsITvvIjlvoXmlLnov5vvvIlcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdiNjE1NGhpa2F0TENMajZSR1EvdHFPdicsICdteUFwcCcpO1xuLy8gc2NyaXB0XFxteUFwcC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGhlcm86IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBkaXI6IDBcbiAgICB9LFxuXG4gICAgYXV0b0NoYW5nZURpcjogZnVuY3Rpb24gYXV0b0NoYW5nZURpcigpIHtcbiAgICAgICAgdGhpcy5kaXIrKztcbiAgICAgICAgaWYgKHRoaXMuZGlyID4gNykgdGhpcy5kaXIgPSAwO1xuICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8v6byg5qCH54K55Ye756e75Yqo77yM5ZCM5pe25pS55Y+Y5Lq654mp5pyd5ZCR77yI5b6F5pS56L+b77yJXG4gICAgICAgIHNlbGYubm9kZS5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICBzZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLm1vdmVUb1BvaW50KGV2ZW50LmdldExvY2F0aW9uWCgpLCBldmVudC5nZXRMb2NhdGlvblkoKSk7XG5cbiAgICAgICAgICAgIC8vc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykubm9kZS55PSBldmVudC5nZXRMb2NhdGlvblkoKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuZ2V0TG9jYXRpb25YKCkgKyAnICcgKyBldmVudC5nZXRMb2NhdGlvblkoKSk7XG5cbiAgICAgICAgICAgIHZhciB2aXNpYmxlU2l6ZSA9IGNjLmRpcmVjdG9yLmdldFZpc2libGVTaXplKCk7XG5cbiAgICAgICAgICAgIHZhciBYaW5kZXggPSBNYXRoLmZsb29yKGV2ZW50LmdldExvY2F0aW9uWCgpICogMyAvIHZpc2libGVTaXplLndpZHRoKTtcbiAgICAgICAgICAgIHZhciBZaW5kZXggPSAyIC0gTWF0aC5mbG9vcihldmVudC5nZXRMb2NhdGlvblkoKSAqIDMgLyB2aXNpYmxlU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgICAgICB2YXIgZGlyID0gWGluZGV4ICsgWWluZGV4O1xuXG4gICAgICAgICAgICBpZiAoWGluZGV4ID09IDEgJiYgWWluZGV4ID09IDEpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKFhpbmRleCA8IFlpbmRleCkge1xuICAgICAgICAgICAgICAgIGRpciA9IDggLSBkaXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbihkaXIpO1xuXG4gICAgICAgICAgICB2YXIgY3VzdG9tRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBjdXN0b21FdmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0gKyAnICcgKyBjdXN0b21FdmVudFtpdGVtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL2NjLnJlcGVhdEZvcmV2ZXIodGhpcy5hdXRvQ2hhbmdlRGlyKCkpO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpeyAgICAgICAgdGhpcy5kaXIrKztcbiAgICAgICAgLy8gICAgICAgIGlmKHRoaXMuZGlyID4gNykgdGhpcy5kaXI9MDtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgICAgIC8vICAgICAgIH0sMSk7XG4gICAgICAgIC8vdGhpcy5zY2hlZHVsZSh0aGlzLmF1dG9DaGFuZ2VEaXIoKSwxKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZHQgaXMnICsgZHQpO1xuXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5kaXIrKztcclxuICAgICAgICBpZih0aGlzLmRpciA+IDcpIHRoaXMuZGlyPTA7XHJcbiAgICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xyXG4gICAgICAgICAgKi9cblxuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3Y2EyN3ZRY2R0TWM0SHRJMXd5UWVGSScsICdteUhlcm8nKTtcbi8vIHNjcmlwdFxcbXlIZXJvLmpzXG5cbmNjLkNsYXNzKHtcbiAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuXG4gICAgQW5pbU5hbWU6ICcnLFxuXG4gICAgbG9jOiBjYy52MigwLCAwKSxcblxuICAgIGNvbGxpc2lvbjogZmFsc2UsXG5cbiAgICByZWFjaGVkVGFyZ2V0OiBmYWxzZSxcblxuICAgIGJ1bGxldDoge1xuICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH1cblxuICB9LFxuXG4gIGNoYW5nZURpcmVjdGlvbjogZnVuY3Rpb24gY2hhbmdlRGlyZWN0aW9uKGRpcikge1xuICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSh0aGlzLkFuaW1OYW1lICsgZGlyKTtcbiAgfSxcblxuICBtb3ZlVG9Qb2ludDogZnVuY3Rpb24gbW92ZVRvUG9pbnQoeCwgeSkge1xuICAgIHRoaXMubG9jLnggPSB4O1xuICAgIHRoaXMubG9jLnkgPSB5O1xuXG4gICAgLy9jYy5tb3ZlVG8oMSxjYy5wKHgsIHkpKTtcblxuICAgIC8v5rKh5pyJ56Kw5pKe77yM5Y+v5Lul56e75YqoXG4gICAgaWYgKCF0aGlzLmNvbGxpc2lvbikgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMSwgY2MucCh4LCB5KSkpO1xuXG4gICAgLy90aGlzLmZpcmUodGhpcy5sb2MpO1xuICB9LFxuXG4gIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcbiAgfSxcblxuICAvL+W8gOeBq++8jOWKqOaAgeeUn+aIkOWtkOW8uVxuICBmaXJlOiBmdW5jdGlvbiBmaXJlKGxvYykge1xuICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgdmFyIHRvdWNoTG9jID0gbG9jO1xuICAgIHZhciBidWxsZXQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldCk7XG4gICAgLy9idWxsZXQuaGVybyA9IHRoaXM7XG4gICAgYnVsbGV0LnBvc2l0aW9uID0gdG91Y2hMb2M7XG4gICAgYnVsbGV0LmFjdGl2ZSA9IHRydWU7XG4gICAgc2NlbmUuYWRkQ2hpbGQoYnVsbGV0KTtcbiAgfSxcblxuICByZWZpcmU6IGZ1bmN0aW9uIHJlZmlyZSgpIHtcbiAgICBpZiAodGhpcy5yZWFjaGVkVGFyZ2V0KSB7XG4gICAgICB2YXIgc3RvcExvYyA9IGNjLnYyKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSk7XG4gICAgICB0aGlzLmZpcmUoc3RvcExvYyk7XG4gICAgfVxuICB9LFxuXG4gIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkVudGVyICcgKyBzZWxmLnRhZyk7XG5cbiAgICAvL3RhZyAxMeihqOekuuS6uueJqeacrOi6q++8jDMz5Li65a2Q5by577yM6Zmk5LqG56Kw5Yiw6Ieq5bex55qE5a2Q5by55aSW77yM56Kw5pKe5Y+Y6YeP572u5Li6dHJ1Ze+8jOWBnOatoui/kOWKqFxuICAgIGlmIChzZWxmLnRhZyA9PSAxMSAmJiBvdGhlci50YWcgIT0gMzMpIHtcbiAgICAgIHRoaXMuY29sbGlzaW9uID0gdHJ1ZTtcbiAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgIH1cblxuICAgIC8vdGFnIDIy5Li65pS75Ye76IyD5Zu05qOA5rWL77yMMSwyLDPku6PooajmlYzmlrnlu7rnrZEs5ruh6Laz5byA54Gr5p2h5Lu2XG4gICAgaWYgKHNlbGYudGFnID09IDIyICYmIChvdGhlci50YWcgPT0gMSB8fCBvdGhlci50YWcgPT0gMiB8fCBvdGhlci50YWcgPT0gMykpIHtcbiAgICAgIHRoaXMucmVhY2hlZFRhcmdldCA9IHRydWU7XG4gICAgICB2YXIgc3RvcExvYyA9IGNjLnYyKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSk7XG4gICAgICB0aGlzLmZpcmUoc3RvcExvYyk7XG4gICAgfVxuICB9LFxuXG4gIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gb25Db2xsaXNpb25TdGF5KG90aGVyLCBzZWxmKSB7XG5cbiAgICAvL+S6uueJqeeisOWIsOmZpOiHquW3seWtkOW8ueWklueahOeJqeS9k++8jOW+gOebuOW6lOWPjeaWueWQkemAgOS4gOagvO+8jOS7pemBv+WFjeeisOaSnuWQjuaFouaFouepv+i2iueJqeS9k+OAglxuICAgIGlmIChzZWxmLnRhZyA9PSAxMSAmJiBvdGhlci50YWcgIT0gMzMpIHtcbiAgICAgIHRoaXMuY29sbGlzaW9uID0gdHJ1ZTtcblxuICAgICAgdmFyIG90aGVyQWFiYiA9IG90aGVyLndvcmxkLmFhYmI7XG4gICAgICB2YXIgc2VsZkFhYmIgPSBzZWxmLndvcmxkLmFhYmIuY2xvbmUoKTtcbiAgICAgIHZhciBwcmVBYWJiID0gc2VsZi53b3JsZC5wcmVBYWJiO1xuXG4gICAgICAvL3NlbGZBYWJiLnggPSBwcmVBYWJiLng7XG4gICAgICAvL3NlbGZBYWJiLnkgPSBwcmVBYWJiLnk7XG5cbiAgICAgIC8vc2VsZkFhYmIueCA9IHNlbGYud29ybGQuYWFiYi54O1xuICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChzZWxmQWFiYiwgb3RoZXJBYWJiKSkge1xuICAgICAgICAvL+W3puWPs+eisOaSnu+8jOW+gHjmlrnlkJHpgIDmoLxcbiAgICAgICAgaWYgKHNlbGZBYWJiLnhNYXggPiBvdGhlckFhYmIueE1heCkge1xuICAgICAgICAgIHRoaXMubm9kZS54ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZkFhYmIueE1pbiA8IG90aGVyQWFiYi54TWluKSB7XG4gICAgICAgICAgdGhpcy5ub2RlLnggLT0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL+S4iuS4i+eisOaSnu+8jHnmlrnlkJHpgIDmoLxcbiAgICAgIHNlbGZBYWJiLnkgPSBzZWxmLndvcmxkLmFhYmIueTtcbiAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3Qoc2VsZkFhYmIsIG90aGVyQWFiYikpIHtcbiAgICAgICAgaWYgKHNlbGZBYWJiLnlNYXggPiBvdGhlckFhYmIueU1heCkge1xuICAgICAgICAgIHRoaXMubm9kZS55ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZkFhYmIueU1pbiA8IG90aGVyQWFiYi55TWluKSB7XG4gICAgICAgICAgdGhpcy5ub2RlLnkgLT0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy90aGlzLm5vZGUueSAtPSAxO1xuICAgICAgLy90aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvL+eisOWIsOaVjOaWueW7uuetke+8jOW8gOeBq+adoeS7tuS+neeEtua7oei2s1xuICAgIGlmIChzZWxmLnRhZyA9PSAyMiAmJiAob3RoZXIudGFnID09IDEgfHwgb3RoZXIudGFnID09IDIgfHwgb3RoZXIudGFnID09IDMpKSB7XG4gICAgICB0aGlzLnJlYWNoZWRUYXJnZXQgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRXhpdChvdGhlciwgc2VsZikge1xuICAgIC8v56Kw5pKe57uT5p2f77yM5Y+Y6YeP572u5Li6ZmFsc2XvvIzkurrnianlj6/ku6Xnu6fnu63np7vliqhcbiAgICBpZiAoc2VsZi50YWcgPT0gMTEgJiYgb3RoZXIudGFnICE9IDMzKSB7XG4gICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8v56a75byA5pS75Ye76IyD5Zu0LOWPmOmHj+e9ruS4umZhbHNlLOe7k+adn+aUu+WHu1xuICAgIGlmIChzZWxmLnRhZyA9PSAyMiAmJiAob3RoZXIudGFnID09IDEgfHwgb3RoZXIudGFnID09IDIgfHwgb3RoZXIudGFnID09IDMpKSB7XG4gICAgICB0aGlzLnJlYWNoZWRUYXJnZXQgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAvKiAgICAgICBcclxuICAgICAgICAgICBpZiAoIXRoaXMuY29sbGlzaW9uKXtcclxuICAgICAgICAgICAgaWYgKE1hdGguZmxvb3IodGhpcy5ub2RlLngpICE9IE1hdGguZmxvb3IodGhpcy5sb2MueCkpe1xyXG4gICAgICAgICAgICAgICBpZiAodGhpcy5sb2MueCAtIHRoaXMubm9kZS54IDwgMClcclxuICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueC0tO1xyXG4gICAgICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgIHRoaXMubm9kZS54Kys7XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3g9JyArIHRoaXMubm9kZS54KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgaWYgKE1hdGguZmxvb3IodGhpcy5ub2RlLnkpICE9IE1hdGguZmxvb3IodGhpcy5sb2MueSkpe1xyXG4gICAgICAgICAgICAgICBpZiAodGhpcy5sb2MueSAtIHRoaXMubm9kZS55IDwgMClcclxuICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueS0tO1xyXG4gICAgICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgIHRoaXMubm9kZS55Kys7XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3k9JyArIHRoaXMubm9kZS55KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgKi9cbiAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7Il19
