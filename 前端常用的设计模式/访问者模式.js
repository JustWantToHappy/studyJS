//接口类
class Shape {
  acept() { };
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  acept(visitor) {
    visitor.visitCircle(this);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  acept(visitor) {
    visitor.visitRectangle(this);
  }
}
//接口类
class Visitor {
  visitCircle() { };
  visitRectangle() { };
}

class ShapeVisitor extends Visitor {
  #totalAreas = 0;
  constructor() {
    super();
  }
  /**
   * 
   * @param {Circle} circle 
   */
  visitCircle(circle) {
    const { radius } = circle;
    this.#totalAreas += Math.PI * radius * radius;
  }
  /**
   * 
   * @param {Rectangle} rectangle 
   */
  visitRectangle(rectangle) {
    this.#totalAreas += rectangle.width * rectangle.height;
  }

  get totalAreas() {
    return this.#totalAreas;
  }
}

let circle = new Circle(1);
let rectangle = new Rectangle(2, 2);
let visitor = new ShapeVisitor();

circle.acept(visitor);
rectangle.acept(visitor);

console.info(visitor.totalAreas);