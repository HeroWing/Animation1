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