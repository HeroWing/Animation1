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
        },

        explosion: {
            "default": null,
            url: cc.AudioClip
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
                cc.audioEngine.playEffect(this.explosion, false);
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
},{}],"MenuControl":[function(require,module,exports){
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
},{}],"PvJs":[function(require,module,exports){
"use strict";
cc._RFpush(module, '850922KmudC1Zf+MYUS60pf', 'PvJs');
// script\PvJs.js

cc.Class({
    "extends": cc.Component,

    properties: {
        Item_Count: {
            "default": 0,
            tooltip: "Item 数量"
        },
        Item_Width: {
            "default": 0,
            tooltip: "每个 Item 的宽度"
        },
        Item_Height: {
            "default": 0,
            tooltip: "每个 Item 的高度"
        },
        Item_MoveDis: {
            "default": 5,
            tooltip: "设定触发翻页的距离(像素)"
        },

        menuMusic: {
            "default": null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        cc.audioEngine.playEffect(this.menuMusic, true, true);

        this.pLayoutNode = this.node.getChildByName("pLayout");
        this.pLayout = this.pLayoutNode.getComponent(cc.Layout);

        this.pageIndex = 0;
        this.startVecPos = new cc.Vec2(0, 0), this.node.getComponent(cc.Mask).enabled = true;

        var p1 = 0;
        var p2 = 0;
        switch (this.pLayout.layoutType) {
            case cc.Layout.Type.NONE:
                console.error("不支持无方向的Layout");
                break;
            case cc.Layout.Type.HORIZONTAL:
                p1 = this.Item_Count * 0.5 * (this.Item_Width + this.pLayout.spacingX) - (this.Item_Width + this.pLayout.spacingX) * 0.5;
                p2 = 0;
                break;
            case cc.Layout.Type.VERTICAL:
                p1 = 0;
                p2 = this.Item_Count * 0.5 * (this.Item_Height + this.pLayout.spacingY) - (this.Item_Height + this.pLayout.spacingY) * 0.5;
                break;
        }
        this.pLayoutNode.setPosition(p1, p2);

        var touchStart = function touchStart(event) {
            this.startVecPos = event.touch.getLocation();
        };
        this.node.on(cc.Node.EventType.TOUCH_START, touchStart, this);

        var touchEnd = function touchEnd(event) {
            var eP = 0;
            var sP = 0;
            switch (this.pLayout.layoutType) {
                case cc.Layout.Type.NONE:
                    console.error("不支持无方向的Layout");
                    break;
                case cc.Layout.Type.HORIZONTAL:
                    eP = event.touch.getLocation().x;
                    sP = this.startVecPos.x;
                    break;
                case cc.Layout.Type.VERTICAL:
                    eP = event.touch.getLocation().y;
                    sP = this.startVecPos.y;
                    break;
            }
            if (Math.abs(eP - sP) >= this.Item_MoveDis) {
                if (eP > sP) {
                    if (this.pageIndex >= 1) {
                        this.pageIndex -= 1;
                        this.doAction(0);
                    }
                } else {
                    if (this.pageIndex < this.Item_Count - 1) {
                        this.pageIndex += 1;
                        this.doAction(1);
                    }
                }
            }
        };
        this.node.on(cc.Node.EventType.TOUCH_END, touchEnd, this);
    },

    doAction: function doAction(dir) {
        var p1 = 0;
        var p2 = 0;
        switch (this.pLayout.layoutType) {
            case cc.Layout.Type.NONE:
                console.error("不支持无方向的Layout");
                break;
            case cc.Layout.Type.HORIZONTAL:
                if (dir == 1) {
                    p1 = -this.Item_Width - this.pLayout.spacingX;
                } else {
                    p1 = this.Item_Width + this.pLayout.spacingX;
                }
                p2 = 0;
                break;
            case cc.Layout.Type.VERTICAL:
                p1 = 0;
                if (dir == 1) {
                    p2 = -this.Item_Height - this.pLayout.spacingY;
                } else {
                    p2 = this.Item_Height + this.pLayout.spacingY;
                }
                break;
        }
        this.pLayoutNode.runAction(cc.moveBy(0.3, p1, p2));
    }

});

cc._RFpop();
},{}],"bullet":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bfcb2lsvOZCy51u81FyvPGm', 'bullet');
// script\bullet.js

cc.Class({
    'extends': cc.Component,

    properties: {
        speed: 300,

        dest: cc.v2(0, 0),

        hero: {
            'default': null,
            type: cc.Node
        },

        arrow_hit: {
            'default': null,
            url: cc.AudioClip
        }

    },

    fireToDest: function fireToDest(d) {
        this.dest = d;

        var destance = Math.sqrt((d.x - this.node.position.x) * (d.x - this.node.position.x) + (d.y - this.node.position.y) * (d.y - this.node.position.y));
        this.node.runAction(cc.moveTo(destance / this.speed, d));
    },

    // use this for initialization
    onLoad: function onLoad() {},

    //子弹碰到敌方建筑，销毁并开火（待改进）
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.tag == 1 || other.tag == 2 || other.tag == 3 || other.tag == 4) {
            cc.audioEngine.playEffect(this.arrow_hit, false);
            this.node.destroy();

            //不是打到墙。。。
            if (other.tag != 4) {
                this.hero.getComponent('myHero').refire();
            }
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

        //this.node.y += this.speed * dt * this.k;
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

        music: {
            'default': null,
            url: cc.AudioClip
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

        cc.audioEngine.playEffect(this.music, true, true);

        //        space.sleepTimeThreshold = 0.5;
        // space.damping = 1;
        // Gravity:
        // space.gravity = cp.v(0,-1200);//重力

        //鼠标点击移动，同时改变人物朝向（待改进）
        self.node.on('mouseup', function (event) {

            //self.hero.getComponent('myHero').collision = false;
            //self.hero.getComponent('myHero').moveToPoint(event.getLocationX(), event.getLocationY());

            //self.hero.getComponent('myHero').node.y= event.getLocationY();

            console.log(event.getLocationX() + ' ' + event.getLocationY());

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

        //this.node.x = 0;
        //this.node.y = 0;
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
    startLoc: cc.v2(0, 0),
    destLoc: cc.v2(0, 0),

    collision: false,

    reachedTarget: false,

    bullet: {
      'default': null,
      type: cc.Node
    },

    firedBullet: {
      'default': null,
      type: cc.Node
    }

  },

  //斜率
  //k: 0,

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
  fire: function fire() {
    var scene = cc.director.getScene();
    //var touchLoc = loc;
    this.firedBullet = cc.instantiate(this.bullet);
    //bullet.hero = this;
    this.firedBullet.position = this.startLoc;
    this.firedBullet.active = true;
    scene.addChild(this.firedBullet);

    this.firedBullet.getComponent('bullet').fireToDest(this.destLoc);
  },

  refire: function refire() {
    if (this.reachedTarget) {
      //var stopLoc = cc.v2(this.node.x, this.node.y);
      this.fire();
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
      this.startLoc = cc.v2(this.node.x, this.node.y);
      this.destLoc = cc.v2(other.world.aabb.x + other.world.aabb.width / 2, cc.director.getWinSizeInPixels().height);
      //console.log(other.world.aabb.x + ' ' + other.world.aabb.y);
      //console.log(self.world.aabb.x + ' ' + self.world.aabb.y);

      //计算两点的斜率
      //if(other.world.aabb.x != self.world.aabb.x){
      //   this.k = (other.world.aabb.y - self.world.aabb.y)/(other.world.aabb.x - self.world.aabb.x);
      //}  

      this.fire();
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

    // console.log('OnAnimitionEnd');
  },

  update: function update(dt) {
    this.checkarea();
    this.move();
  },

  checkarea: function checkarea() {
    var TL2x = 264; //Left up tower
    var TL2y = 880;
    var TKx = 418; //King tower
    var TKy = 884;
    var TR2x = 564; //Right up tower
    var TR2y = 880;
    var RLx = 264; //Left River Bridge
    var RLy = 580;
    var RRx = 564; //Right River Bridge
    var RRy = 580;
    var TL1x = 264; //Left down tower
    var TL1y = 368;
    var TR1x = 564; //Right down tower
    var TR1y = 368;
    var area = 0;

    if (this.node.y < 0.22 * 170 + 310) {
      if (this.node.x < TKx) {
        area = 1;
      } else {
        area = 7;
      }
    } else if (this.node.y < 0.22 * TKx + 310) {
      if (this.node.x < TKx) {
        if (this.node.y < 0.22 * this.node.x + 310) {
          area = 1;
        } else {
          area = 2;
        }
      } else {
        if (this.node.y < -0.22 * this.node.x + 492) {
          area = 7;
        } else {
          area = 6;
        }
      }
    } else if (this.node.y < RLy) {
      if (this.node.x < TKx) {
        area = 2;
      } else {
        area = 6;
      }
    } else if (this.node.y < TKx + 316) {
      if (this.node.x < TKx) {
        area = 3;
      } else {
        area = 5;
      }
    } else if (this.node.y < TKy) {
      if (this.node.x < TKx) {
        if (this.node.y > -1 * this.node.x + 1144) {
          area = 4;
        } else {
          area = 3;
        }
      } else {
        if (this.node.y > this.node.x + 316) {
          area = 4;
        } else {
          area = 5;
        }
      }
    } else {
      area = 0;
    }

    //console.log('area=' + this.area);
    if (area == 1) {
      this.loc.x = TL1x;
      this.loc.y = TL1y;
    } else if (area == 2) {
      this.loc.x = RLx;
      this.loc.y = RLy;
    } else if (area == 3) {
      this.loc.x = TL2x;
      this.loc.y = TL2y;
    } else if (area == 4) {
      this.loc.x = TKx;
      this.loc.y = TKy;
    } else if (area == 5) {
      this.loc.x = TR2x;
      this.loc.y = TR2y;
    } else if (area == 6) {
      this.loc.x = RRx;
      this.loc.y = RRy;
    } else if (area == 7) {
      this.loc.x = TR1x;
      this.loc.y = TR1y;
    }
  },

  move: function move() {
    if (!this.reachedTarget) {

      if (Math.floor(this.node.x) != Math.floor(this.loc.x)) {
        if (this.loc.x - this.node.x < 0) {
          this.node.x--;
        } else {
          this.node.x++;
        }
        // console.log('x=' + this.node.x);
      }

      if (Math.floor(this.node.y) != Math.floor(this.loc.y)) {
        if (this.loc.y - this.node.y < 0) {
          this.node.y--;
        } else {
          this.node.y++;
        }
        // console.log('y=' + this.node.y);
      }
    }
  }

});

cc._RFpop();
},{}]},{},["ColliderListener","myHero","PvJs","Castle","myApp","bullet","MenuControl"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvQ29jb3NDcmVhdG9yL2FwcC0xLjEuMS9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHQvQ2FzdGxlLmpzIiwiYXNzZXRzL3NjcmlwdC9Db2xsaWRlckxpc3RlbmVyLmpzIiwiYXNzZXRzL3NjcmlwdC9NZW51Q29udHJvbC5qcyIsImFzc2V0cy9zY3JpcHQvUHZKcy5qcyIsImFzc2V0cy9zY3JpcHQvYnVsbGV0LmpzIiwiYXNzZXRzL3NjcmlwdC9teUFwcC5qcyIsImFzc2V0cy9zY3JpcHQvbXlIZXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTg2MTJkbWRFOU16YWJrTi93ZFBsemsnLCAnQ2FzdGxlJyk7XG4vLyBzY3JpcHRcXENhc3RsZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGlmZUJhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIGV4cGxvc2lvbjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcblxuICAgICAgICAvL2dvdCBzaG90Li4uXG4gICAgICAgIGlmIChvdGhlci50YWcgPT0gMzMgJiYgdGhpcy5saWZlQmFyLnByb2dyZXNzID49IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlmZUJhci5wcm9ncmVzcyAtPSAwLjE4O1xuICAgICAgICAgICAgaWYgKHRoaXMubGlmZUJhci5wcm9ncmVzcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmV4cGxvc2lvbiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkVudGVyJyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gb25Db2xsaXNpb25TdGF5KG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBzdGF5Jyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRXhpdCcpO1xuICAgIH1cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyYjAzNmZibEpsT1A3ZHVLbXNOQk12aScsICdDb2xsaWRlckxpc3RlbmVyJyk7XG4vLyBzY3JpcHRcXENvbGxpZGVyTGlzdGVuZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8v5q2k6ISa5pys5Yqg6L295Zyo5aSn5Zyw5Zu+5LiKLOajgOa1i+eisOaSnizmmoLml7bmnKrkvZzku7vkvZXmk43kvZxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuXG4gICAgICAgIC8vZ290IHNob3QuLi5cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkVudGVyJyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gb25Db2xsaXNpb25TdGF5KG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBzdGF5Jyk7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRXhpdCcpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2Q0YWZlS2pMRjFMTjdNV0RoeTFFR3M1JywgJ01lbnVDb250cm9sJyk7XG4vLyBzY3JpcHRcXE1lbnVDb250cm9sLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYnV0dG9uRmlnaHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxuXG4gICAgb25CdG5GaWdodENsaWNrZWQ6IGZ1bmN0aW9uIG9uQnRuRmlnaHRDbGlja2VkKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsRWZmZWN0cygpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnODUwOTIyS211ZEMxWmYrTVlVUzYwcGYnLCAnUHZKcycpO1xuLy8gc2NyaXB0XFxQdkpzLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBJdGVtX0NvdW50OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiSXRlbSDmlbDph49cIlxuICAgICAgICB9LFxuICAgICAgICBJdGVtX1dpZHRoOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5q+P5LiqIEl0ZW0g55qE5a695bqmXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXRlbV9IZWlnaHQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogXCLmr4/kuKogSXRlbSDnmoTpq5jluqZcIlxuICAgICAgICB9LFxuICAgICAgICBJdGVtX01vdmVEaXM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiA1LFxuICAgICAgICAgICAgdG9vbHRpcDogXCLorr7lrprop6blj5Hnv7vpobXnmoTot53nprso5YOP57SgKVwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWVudU11c2ljOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLm1lbnVNdXNpYywgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5wTGF5b3V0Tm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBMYXlvdXRcIik7XG4gICAgICAgIHRoaXMucExheW91dCA9IHRoaXMucExheW91dE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XG5cbiAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnN0YXJ0VmVjUG9zID0gbmV3IGNjLlZlYzIoMCwgMCksIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTWFzaykuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgdmFyIHAxID0gMDtcbiAgICAgICAgdmFyIHAyID0gMDtcbiAgICAgICAgc3dpdGNoICh0aGlzLnBMYXlvdXQubGF5b3V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVHlwZS5OT05FOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLkuI3mlK/mjIHml6DmlrnlkJHnmoRMYXlvdXRcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLkhPUklaT05UQUw6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLkl0ZW1fQ291bnQgKiAwLjUgKiAodGhpcy5JdGVtX1dpZHRoICsgdGhpcy5wTGF5b3V0LnNwYWNpbmdYKSAtICh0aGlzLkl0ZW1fV2lkdGggKyB0aGlzLnBMYXlvdXQuc3BhY2luZ1gpICogMC41O1xuICAgICAgICAgICAgICAgIHAyID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlR5cGUuVkVSVElDQUw6XG4gICAgICAgICAgICAgICAgcDEgPSAwO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5JdGVtX0NvdW50ICogMC41ICogKHRoaXMuSXRlbV9IZWlnaHQgKyB0aGlzLnBMYXlvdXQuc3BhY2luZ1kpIC0gKHRoaXMuSXRlbV9IZWlnaHQgKyB0aGlzLnBMYXlvdXQuc3BhY2luZ1kpICogMC41O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucExheW91dE5vZGUuc2V0UG9zaXRpb24ocDEsIHAyKTtcblxuICAgICAgICB2YXIgdG91Y2hTdGFydCA9IGZ1bmN0aW9uIHRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRWZWNQb3MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRvdWNoU3RhcnQsIHRoaXMpO1xuXG4gICAgICAgIHZhciB0b3VjaEVuZCA9IGZ1bmN0aW9uIHRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZVAgPSAwO1xuICAgICAgICAgICAgdmFyIHNQID0gMDtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wTGF5b3V0LmxheW91dFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLk5PTkU6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLkuI3mlK/mjIHml6DmlrnlkJHnmoRMYXlvdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlR5cGUuSE9SSVpPTlRBTDpcbiAgICAgICAgICAgICAgICAgICAgZVAgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpLng7XG4gICAgICAgICAgICAgICAgICAgIHNQID0gdGhpcy5zdGFydFZlY1Bvcy54O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMOlxuICAgICAgICAgICAgICAgICAgICBlUCA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCkueTtcbiAgICAgICAgICAgICAgICAgICAgc1AgPSB0aGlzLnN0YXJ0VmVjUG9zLnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGVQIC0gc1ApID49IHRoaXMuSXRlbV9Nb3ZlRGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVQID4gc1ApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZUluZGV4ID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZUluZGV4IC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvQWN0aW9uKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZUluZGV4IDwgdGhpcy5JdGVtX0NvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlSW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9BY3Rpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRvdWNoRW5kLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgZG9BY3Rpb246IGZ1bmN0aW9uIGRvQWN0aW9uKGRpcikge1xuICAgICAgICB2YXIgcDEgPSAwO1xuICAgICAgICB2YXIgcDIgPSAwO1xuICAgICAgICBzd2l0Y2ggKHRoaXMucExheW91dC5sYXlvdXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLk5PTkU6XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuS4jeaUr+aMgeaXoOaWueWQkeeahExheW91dFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlR5cGUuSE9SSVpPTlRBTDpcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcDEgPSAtdGhpcy5JdGVtX1dpZHRoIC0gdGhpcy5wTGF5b3V0LnNwYWNpbmdYO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHAxID0gdGhpcy5JdGVtX1dpZHRoICsgdGhpcy5wTGF5b3V0LnNwYWNpbmdYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwMiA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMOlxuICAgICAgICAgICAgICAgIHAxID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcDIgPSAtdGhpcy5JdGVtX0hlaWdodCAtIHRoaXMucExheW91dC5zcGFjaW5nWTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwMiA9IHRoaXMuSXRlbV9IZWlnaHQgKyB0aGlzLnBMYXlvdXQuc3BhY2luZ1k7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucExheW91dE5vZGUucnVuQWN0aW9uKGNjLm1vdmVCeSgwLjMsIHAxLCBwMikpO1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdiZmNiMmxzdk9aQ3k1MXU4MUZ5dlBHbScsICdidWxsZXQnKTtcbi8vIHNjcmlwdFxcYnVsbGV0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BlZWQ6IDMwMCxcblxuICAgICAgICBkZXN0OiBjYy52MigwLCAwKSxcblxuICAgICAgICBoZXJvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXJyb3dfaGl0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgZmlyZVRvRGVzdDogZnVuY3Rpb24gZmlyZVRvRGVzdChkKSB7XG4gICAgICAgIHRoaXMuZGVzdCA9IGQ7XG5cbiAgICAgICAgdmFyIGRlc3RhbmNlID0gTWF0aC5zcXJ0KChkLnggLSB0aGlzLm5vZGUucG9zaXRpb24ueCkgKiAoZC54IC0gdGhpcy5ub2RlLnBvc2l0aW9uLngpICsgKGQueSAtIHRoaXMubm9kZS5wb3NpdGlvbi55KSAqIChkLnkgLSB0aGlzLm5vZGUucG9zaXRpb24ueSkpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLm1vdmVUbyhkZXN0YW5jZSAvIHRoaXMuc3BlZWQsIGQpKTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIC8v5a2Q5by556Kw5Yiw5pWM5pa55bu6562R77yM6ZSA5q+B5bm25byA54Gr77yI5b6F5pS56L+b77yJXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgICAgICBpZiAob3RoZXIudGFnID09IDEgfHwgb3RoZXIudGFnID09IDIgfHwgb3RoZXIudGFnID09IDMgfHwgb3RoZXIudGFnID09IDQpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5hcnJvd19oaXQsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIC8v5LiN5piv5omT5Yiw5aKZ44CC44CC44CCXG4gICAgICAgICAgICBpZiAob3RoZXIudGFnICE9IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5yZWZpcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlcikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRXhpdCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25Db2xsaXNpb25FeGl0Jyk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy/lrZDlvLnlj5HlsITvvIjlvoXmlLnov5vvvIlcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuXG4gICAgICAgIC8vdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIGR0ICogdGhpcy5rO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYjYxNTRoaWthdExDTGo2UkdRL3RxT3YnLCAnbXlBcHAnKTtcbi8vIHNjcmlwdFxcbXlBcHAuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBoZXJvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgbXVzaWM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIGRpcjogMFxuICAgIH0sXG5cbiAgICBhdXRvQ2hhbmdlRGlyOiBmdW5jdGlvbiBhdXRvQ2hhbmdlRGlyKCkge1xuICAgICAgICB0aGlzLmRpcisrO1xuICAgICAgICBpZiAodGhpcy5kaXIgPiA3KSB0aGlzLmRpciA9IDA7XG4gICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLm11c2ljLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICAvLyAgICAgICAgc3BhY2Uuc2xlZXBUaW1lVGhyZXNob2xkID0gMC41O1xuICAgICAgICAvLyBzcGFjZS5kYW1waW5nID0gMTtcbiAgICAgICAgLy8gR3Jhdml0eTpcbiAgICAgICAgLy8gc3BhY2UuZ3Jhdml0eSA9IGNwLnYoMCwtMTIwMCk7Ly/ph43liptcblxuICAgICAgICAvL+m8oOagh+eCueWHu+enu+WKqO+8jOWQjOaXtuaUueWPmOS6uueJqeacneWQke+8iOW+heaUuei/m++8iVxuICAgICAgICBzZWxmLm5vZGUub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgLy9zZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIC8vc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykubW92ZVRvUG9pbnQoZXZlbnQuZ2V0TG9jYXRpb25YKCksIGV2ZW50LmdldExvY2F0aW9uWSgpKTtcblxuICAgICAgICAgICAgLy9zZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5ub2RlLnk9IGV2ZW50LmdldExvY2F0aW9uWSgpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5nZXRMb2NhdGlvblgoKSArICcgJyArIGV2ZW50LmdldExvY2F0aW9uWSgpKTtcblxuICAgICAgICAgICAgdmFyIHZpc2libGVTaXplID0gY2MuZGlyZWN0b3IuZ2V0VmlzaWJsZVNpemUoKTtcblxuICAgICAgICAgICAgdmFyIFhpbmRleCA9IE1hdGguZmxvb3IoZXZlbnQuZ2V0TG9jYXRpb25YKCkgKiAzIC8gdmlzaWJsZVNpemUud2lkdGgpO1xuICAgICAgICAgICAgdmFyIFlpbmRleCA9IDIgLSBNYXRoLmZsb29yKGV2ZW50LmdldExvY2F0aW9uWSgpICogMyAvIHZpc2libGVTaXplLmhlaWdodCk7XG5cbiAgICAgICAgICAgIHZhciBkaXIgPSBYaW5kZXggKyBZaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChYaW5kZXggPT0gMSAmJiBZaW5kZXggPT0gMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoWGluZGV4IDwgWWluZGV4KSB7XG4gICAgICAgICAgICAgICAgZGlyID0gOCAtIGRpcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykuY2hhbmdlRGlyZWN0aW9uKGRpcik7XG5cbiAgICAgICAgICAgIHZhciBjdXN0b21FdmVudCA9IG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbSgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtIGluIGN1c3RvbUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSArICcgJyArIGN1c3RvbUV2ZW50W2l0ZW1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy90aGlzLm5vZGUueCA9IDA7XG4gICAgICAgIC8vdGhpcy5ub2RlLnkgPSAwO1xuICAgICAgICAvL2NjLnJlcGVhdEZvcmV2ZXIodGhpcy5hdXRvQ2hhbmdlRGlyKCkpO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpeyAgICAgICAgdGhpcy5kaXIrKztcbiAgICAgICAgLy8gICAgICAgIGlmKHRoaXMuZGlyID4gNykgdGhpcy5kaXI9MDtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgICAgIC8vICAgICAgIH0sMSk7XG4gICAgICAgIC8vdGhpcy5zY2hlZHVsZSh0aGlzLmF1dG9DaGFuZ2VEaXIoKSwxKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZHQgaXMnICsgZHQpO1xuXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5kaXIrKztcclxuICAgICAgICBpZih0aGlzLmRpciA+IDcpIHRoaXMuZGlyPTA7XHJcbiAgICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xyXG4gICAgICAgICAgKi9cblxuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3Y2EyN3ZRY2R0TWM0SHRJMXd5UWVGSScsICdteUhlcm8nKTtcbi8vIHNjcmlwdFxcbXlIZXJvLmpzXG5cbmNjLkNsYXNzKHtcbiAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuXG4gICAgQW5pbU5hbWU6ICcnLFxuXG4gICAgbG9jOiBjYy52MigwLCAwKSxcbiAgICBzdGFydExvYzogY2MudjIoMCwgMCksXG4gICAgZGVzdExvYzogY2MudjIoMCwgMCksXG5cbiAgICBjb2xsaXNpb246IGZhbHNlLFxuXG4gICAgcmVhY2hlZFRhcmdldDogZmFsc2UsXG5cbiAgICBidWxsZXQ6IHtcbiAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuXG4gICAgZmlyZWRCdWxsZXQ6IHtcbiAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9XG5cbiAgfSxcblxuICAvL+aWnOeOh1xuICAvL2s6IDAsXG5cbiAgY2hhbmdlRGlyZWN0aW9uOiBmdW5jdGlvbiBjaGFuZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KHRoaXMuQW5pbU5hbWUgKyBkaXIpO1xuICB9LFxuXG4gIG1vdmVUb1BvaW50OiBmdW5jdGlvbiBtb3ZlVG9Qb2ludCh4LCB5KSB7XG4gICAgdGhpcy5sb2MueCA9IHg7XG4gICAgdGhpcy5sb2MueSA9IHk7XG5cbiAgICAvL2NjLm1vdmVUbygxLGNjLnAoeCwgeSkpO1xuXG4gICAgLy/msqHmnInnorDmkp7vvIzlj6/ku6Xnp7vliqhcbiAgICBpZiAoIXRoaXMuY29sbGlzaW9uKSB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLm1vdmVUbygxLCBjYy5wKHgsIHkpKSk7XG5cbiAgICAvL3RoaXMuZmlyZSh0aGlzLmxvYyk7XG4gIH0sXG5cbiAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICB9LFxuXG4gIC8v5byA54Gr77yM5Yqo5oCB55Sf5oiQ5a2Q5by5XG4gIGZpcmU6IGZ1bmN0aW9uIGZpcmUoKSB7XG4gICAgdmFyIHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcbiAgICAvL3ZhciB0b3VjaExvYyA9IGxvYztcbiAgICB0aGlzLmZpcmVkQnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXQpO1xuICAgIC8vYnVsbGV0Lmhlcm8gPSB0aGlzO1xuICAgIHRoaXMuZmlyZWRCdWxsZXQucG9zaXRpb24gPSB0aGlzLnN0YXJ0TG9jO1xuICAgIHRoaXMuZmlyZWRCdWxsZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICBzY2VuZS5hZGRDaGlsZCh0aGlzLmZpcmVkQnVsbGV0KTtcblxuICAgIHRoaXMuZmlyZWRCdWxsZXQuZ2V0Q29tcG9uZW50KCdidWxsZXQnKS5maXJlVG9EZXN0KHRoaXMuZGVzdExvYyk7XG4gIH0sXG5cbiAgcmVmaXJlOiBmdW5jdGlvbiByZWZpcmUoKSB7XG4gICAgaWYgKHRoaXMucmVhY2hlZFRhcmdldCkge1xuICAgICAgLy92YXIgc3RvcExvYyA9IGNjLnYyKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSk7XG4gICAgICB0aGlzLmZpcmUoKTtcbiAgICB9XG4gIH0sXG5cbiAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgIC8vY29uc29sZS5sb2coJ29uQ29sbGlzaW9uRW50ZXIgJyArIHNlbGYudGFnKTtcblxuICAgIC8vdGFnIDEx6KGo56S65Lq654mp5pys6Lqr77yMMzPkuLrlrZDlvLnvvIzpmaTkuobnorDliLDoh6rlt7HnmoTlrZDlvLnlpJbvvIznorDmkp7lj5jph4/nva7kuLp0cnVl77yM5YGc5q2i6L+Q5YqoXG4gICAgaWYgKHNlbGYudGFnID09IDExICYmIG90aGVyLnRhZyAhPSAzMykge1xuICAgICAgdGhpcy5jb2xsaXNpb24gPSB0cnVlO1xuICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgfVxuXG4gICAgLy90YWcgMjLkuLrmlLvlh7vojIPlm7Tmo4DmtYvvvIwxLDIsM+S7o+ihqOaVjOaWueW7uuetkSzmu6HotrPlvIDngavmnaHku7ZcbiAgICBpZiAoc2VsZi50YWcgPT0gMjIgJiYgKG90aGVyLnRhZyA9PSAxIHx8IG90aGVyLnRhZyA9PSAyIHx8IG90aGVyLnRhZyA9PSAzKSkge1xuICAgICAgdGhpcy5yZWFjaGVkVGFyZ2V0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RhcnRMb2MgPSBjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xuICAgICAgdGhpcy5kZXN0TG9jID0gY2MudjIob3RoZXIud29ybGQuYWFiYi54ICsgb3RoZXIud29ybGQuYWFiYi53aWR0aCAvIDIsIGNjLmRpcmVjdG9yLmdldFdpblNpemVJblBpeGVscygpLmhlaWdodCk7XG4gICAgICAvL2NvbnNvbGUubG9nKG90aGVyLndvcmxkLmFhYmIueCArICcgJyArIG90aGVyLndvcmxkLmFhYmIueSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHNlbGYud29ybGQuYWFiYi54ICsgJyAnICsgc2VsZi53b3JsZC5hYWJiLnkpO1xuXG4gICAgICAvL+iuoeeul+S4pOeCueeahOaWnOeOh1xuICAgICAgLy9pZihvdGhlci53b3JsZC5hYWJiLnggIT0gc2VsZi53b3JsZC5hYWJiLngpe1xuICAgICAgLy8gICB0aGlzLmsgPSAob3RoZXIud29ybGQuYWFiYi55IC0gc2VsZi53b3JsZC5hYWJiLnkpLyhvdGhlci53b3JsZC5hYWJiLnggLSBzZWxmLndvcmxkLmFhYmIueCk7XG4gICAgICAvL30gIFxuXG4gICAgICB0aGlzLmZpcmUoKTtcbiAgICB9XG4gIH0sXG5cbiAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpIHtcblxuICAgIC8v5Lq654mp56Kw5Yiw6Zmk6Ieq5bex5a2Q5by55aSW55qE54mp5L2T77yM5b6A55u45bqU5Y+N5pa55ZCR6YCA5LiA5qC877yM5Lul6YG/5YWN56Kw5pKe5ZCO5oWi5oWi56m/6LaK54mp5L2T44CCXG4gICAgaWYgKHNlbGYudGFnID09IDExICYmIG90aGVyLnRhZyAhPSAzMykge1xuICAgICAgdGhpcy5jb2xsaXNpb24gPSB0cnVlO1xuXG4gICAgICB2YXIgb3RoZXJBYWJiID0gb3RoZXIud29ybGQuYWFiYjtcbiAgICAgIHZhciBzZWxmQWFiYiA9IHNlbGYud29ybGQuYWFiYi5jbG9uZSgpO1xuICAgICAgdmFyIHByZUFhYmIgPSBzZWxmLndvcmxkLnByZUFhYmI7XG5cbiAgICAgIC8vc2VsZkFhYmIueCA9IHByZUFhYmIueDtcbiAgICAgIC8vc2VsZkFhYmIueSA9IHByZUFhYmIueTtcblxuICAgICAgLy9zZWxmQWFiYi54ID0gc2VsZi53b3JsZC5hYWJiLng7XG4gICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KHNlbGZBYWJiLCBvdGhlckFhYmIpKSB7XG4gICAgICAgIC8v5bem5Y+z56Kw5pKe77yM5b6AeOaWueWQkemAgOagvFxuICAgICAgICBpZiAoc2VsZkFhYmIueE1heCA+IG90aGVyQWFiYi54TWF4KSB7XG4gICAgICAgICAgdGhpcy5ub2RlLnggKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmQWFiYi54TWluIDwgb3RoZXJBYWJiLnhNaW4pIHtcbiAgICAgICAgICB0aGlzLm5vZGUueCAtPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8v5LiK5LiL56Kw5pKe77yMeeaWueWQkemAgOagvFxuICAgICAgc2VsZkFhYmIueSA9IHNlbGYud29ybGQuYWFiYi55O1xuICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChzZWxmQWFiYiwgb3RoZXJBYWJiKSkge1xuICAgICAgICBpZiAoc2VsZkFhYmIueU1heCA+IG90aGVyQWFiYi55TWF4KSB7XG4gICAgICAgICAgdGhpcy5ub2RlLnkgKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmQWFiYi55TWluIDwgb3RoZXJBYWJiLnlNaW4pIHtcbiAgICAgICAgICB0aGlzLm5vZGUueSAtPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL3RoaXMubm9kZS55IC09IDE7XG4gICAgICAvL3RoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgIH1cblxuICAgIC8v56Kw5Yiw5pWM5pa55bu6562R77yM5byA54Gr5p2h5Lu25L6d54S25ruh6LazXG4gICAgaWYgKHNlbGYudGFnID09IDIyICYmIChvdGhlci50YWcgPT0gMSB8fCBvdGhlci50YWcgPT0gMiB8fCBvdGhlci50YWcgPT0gMykpIHtcbiAgICAgIHRoaXMucmVhY2hlZFRhcmdldCA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gb25Db2xsaXNpb25FeGl0KG90aGVyLCBzZWxmKSB7XG4gICAgLy/norDmkp7nu5PmnZ/vvIzlj5jph4/nva7kuLpmYWxzZe+8jOS6uueJqeWPr+S7pee7p+e7reenu+WKqFxuICAgIGlmIChzZWxmLnRhZyA9PSAxMSAmJiBvdGhlci50YWcgIT0gMzMpIHtcbiAgICAgIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/nprvlvIDmlLvlh7vojIPlm7Qs5Y+Y6YeP572u5Li6ZmFsc2Us57uT5p2f5pS75Ye7XG4gICAgaWYgKHNlbGYudGFnID09IDIyICYmIChvdGhlci50YWcgPT0gMSB8fCBvdGhlci50YWcgPT0gMiB8fCBvdGhlci50YWcgPT0gMykpIHtcbiAgICAgIHRoaXMucmVhY2hlZFRhcmdldCA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICAvL+WKqOeUu+WujOaIkOWQjueahOWbnuiwg1xuICBPbkFuaW1pdGlvbkVuZDogZnVuY3Rpb24gT25BbmltaXRpb25FbmQoKSB7XG5cbiAgICAvLyBjb25zb2xlLmxvZygnT25BbmltaXRpb25FbmQnKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgIHRoaXMuY2hlY2thcmVhKCk7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH0sXG5cbiAgY2hlY2thcmVhOiBmdW5jdGlvbiBjaGVja2FyZWEoKSB7XG4gICAgdmFyIFRMMnggPSAyNjQ7IC8vTGVmdCB1cCB0b3dlclxuICAgIHZhciBUTDJ5ID0gODgwO1xuICAgIHZhciBUS3ggPSA0MTg7IC8vS2luZyB0b3dlclxuICAgIHZhciBUS3kgPSA4ODQ7XG4gICAgdmFyIFRSMnggPSA1NjQ7IC8vUmlnaHQgdXAgdG93ZXJcbiAgICB2YXIgVFIyeSA9IDg4MDtcbiAgICB2YXIgUkx4ID0gMjY0OyAvL0xlZnQgUml2ZXIgQnJpZGdlXG4gICAgdmFyIFJMeSA9IDU4MDtcbiAgICB2YXIgUlJ4ID0gNTY0OyAvL1JpZ2h0IFJpdmVyIEJyaWRnZVxuICAgIHZhciBSUnkgPSA1ODA7XG4gICAgdmFyIFRMMXggPSAyNjQ7IC8vTGVmdCBkb3duIHRvd2VyXG4gICAgdmFyIFRMMXkgPSAzNjg7XG4gICAgdmFyIFRSMXggPSA1NjQ7IC8vUmlnaHQgZG93biB0b3dlclxuICAgIHZhciBUUjF5ID0gMzY4O1xuICAgIHZhciBhcmVhID0gMDtcblxuICAgIGlmICh0aGlzLm5vZGUueSA8IDAuMjIgKiAxNzAgKyAzMTApIHtcbiAgICAgIGlmICh0aGlzLm5vZGUueCA8IFRLeCkge1xuICAgICAgICBhcmVhID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZWEgPSA3O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnkgPCAwLjIyICogVEt4ICsgMzEwKSB7XG4gICAgICBpZiAodGhpcy5ub2RlLnggPCBUS3gpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS55IDwgMC4yMiAqIHRoaXMubm9kZS54ICsgMzEwKSB7XG4gICAgICAgICAgYXJlYSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJlYSA9IDI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUueSA8IC0wLjIyICogdGhpcy5ub2RlLnggKyA0OTIpIHtcbiAgICAgICAgICBhcmVhID0gNztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcmVhID0gNjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnkgPCBSTHkpIHtcbiAgICAgIGlmICh0aGlzLm5vZGUueCA8IFRLeCkge1xuICAgICAgICBhcmVhID0gMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZWEgPSA2O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnkgPCBUS3ggKyAzMTYpIHtcbiAgICAgIGlmICh0aGlzLm5vZGUueCA8IFRLeCkge1xuICAgICAgICBhcmVhID0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZWEgPSA1O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnkgPCBUS3kpIHtcbiAgICAgIGlmICh0aGlzLm5vZGUueCA8IFRLeCkge1xuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPiAtMSAqIHRoaXMubm9kZS54ICsgMTE0NCkge1xuICAgICAgICAgIGFyZWEgPSA0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFyZWEgPSAzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPiB0aGlzLm5vZGUueCArIDMxNikge1xuICAgICAgICAgIGFyZWEgPSA0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFyZWEgPSA1O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZWEgPSAwO1xuICAgIH1cblxuICAgIC8vY29uc29sZS5sb2coJ2FyZWE9JyArIHRoaXMuYXJlYSk7XG4gICAgaWYgKGFyZWEgPT0gMSkge1xuICAgICAgdGhpcy5sb2MueCA9IFRMMXg7XG4gICAgICB0aGlzLmxvYy55ID0gVEwxeTtcbiAgICB9IGVsc2UgaWYgKGFyZWEgPT0gMikge1xuICAgICAgdGhpcy5sb2MueCA9IFJMeDtcbiAgICAgIHRoaXMubG9jLnkgPSBSTHk7XG4gICAgfSBlbHNlIGlmIChhcmVhID09IDMpIHtcbiAgICAgIHRoaXMubG9jLnggPSBUTDJ4O1xuICAgICAgdGhpcy5sb2MueSA9IFRMMnk7XG4gICAgfSBlbHNlIGlmIChhcmVhID09IDQpIHtcbiAgICAgIHRoaXMubG9jLnggPSBUS3g7XG4gICAgICB0aGlzLmxvYy55ID0gVEt5O1xuICAgIH0gZWxzZSBpZiAoYXJlYSA9PSA1KSB7XG4gICAgICB0aGlzLmxvYy54ID0gVFIyeDtcbiAgICAgIHRoaXMubG9jLnkgPSBUUjJ5O1xuICAgIH0gZWxzZSBpZiAoYXJlYSA9PSA2KSB7XG4gICAgICB0aGlzLmxvYy54ID0gUlJ4O1xuICAgICAgdGhpcy5sb2MueSA9IFJSeTtcbiAgICB9IGVsc2UgaWYgKGFyZWEgPT0gNykge1xuICAgICAgdGhpcy5sb2MueCA9IFRSMXg7XG4gICAgICB0aGlzLmxvYy55ID0gVFIxeTtcbiAgICB9XG4gIH0sXG5cbiAgbW92ZTogZnVuY3Rpb24gbW92ZSgpIHtcbiAgICBpZiAoIXRoaXMucmVhY2hlZFRhcmdldCkge1xuXG4gICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLm5vZGUueCkgIT0gTWF0aC5mbG9vcih0aGlzLmxvYy54KSkge1xuICAgICAgICBpZiAodGhpcy5sb2MueCAtIHRoaXMubm9kZS54IDwgMCkge1xuICAgICAgICAgIHRoaXMubm9kZS54LS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ub2RlLngrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygneD0nICsgdGhpcy5ub2RlLngpO1xuICAgICAgfVxuXG4gICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLm5vZGUueSkgIT0gTWF0aC5mbG9vcih0aGlzLmxvYy55KSkge1xuICAgICAgICBpZiAodGhpcy5sb2MueSAtIHRoaXMubm9kZS55IDwgMCkge1xuICAgICAgICAgIHRoaXMubm9kZS55LS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ub2RlLnkrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygneT0nICsgdGhpcy5ub2RlLnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7Il19
