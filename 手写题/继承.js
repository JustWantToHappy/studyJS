//原型链继承
function People(name) {
    this.name = name;
}
People.prototype.eat = function () {
    console.info("someone is eating");
}
