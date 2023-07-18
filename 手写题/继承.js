/**
 * 
 * @desc js继承的多种方式
 * 
 */

/**
 * 原型链继承
 * @desc 缺点:1.子类在实例化的时候不能够给父类构造器传递参数
 * 2.原型中包含的应用类型属性将被所有实例共享，比如People中的color属性
 */
function People(name) {
    this.name = name;
    this.color = ['black', 'yellow', 'white'];
}
People.prototype.eat = function () {
    console.info("someone is eating");
}
function Chinese() {

}
Chinese.prototype = new People();
let p = new Chinese();
p.color.push("sb")
let q = new Chinese();
console.log(q.color);//[ 'black', 'yellow', 'white', 'sb' ]

/**
 * @desc 使用构造函数实现继承
 * @desc 缺点：由于方法必须定义在构造函数之中，所以导致每次创建一次子类实例都会创建一遍方法
 */
function Animal(name) {
    this.name = name;
    console.log("hhh");
    this.say = () => {
        console.info(this.name);
    }
}
function Dog(name) {
    Animal.call(this, name);
}
let dog = new Dog("hhh");
dog.say();


/**
 * @desc 组合继承
 */
function Man(name) {
    this.name = name;
}
Man.prototype.say = function () {
    console.log("your name is " + this.name);
}
function Boy(name) {
    Man.call(this, name);
}
Boy.prototype = new Man();
Boy.prototype.construtor = Boy;
let boy = new Boy('zzz')
boy.say();

/**
 * @desc 寄生式组合继承,其实就是组合继承中父类将自身的原型寄生到一个空函数中。
 * 组合式继承已经很优秀了，但是尚有不足，因为Man的构造函数调用了两次
 */
function Car(name) {
    this.name = name;
}
Car.prototype.start = function () {
    console.info("car is starting");
}

function Bus(name) {
    Car.call(this, name);
}

function F() {
}
F.prototype = Car.prototype;
let f = new F();
f.construtor = Bus;
Bus.prototype = f;

