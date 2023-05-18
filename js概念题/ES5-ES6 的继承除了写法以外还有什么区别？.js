/**
 * 1. class声明不会进行提升，类似于let,const声明的变量
 */
 console.info(Foo) //error
 class Foo{
   constructor(name) {
     this.name = name;
   }
 }
 /**
  * 2. class内部会启用严格模式
  */
 
 class Student{
   constructor() {
     foo = 12; //error
   }
 }
 
 /**
  * 3. class的所有方法(包括静态方法和实例方法)都是不可以枚举的
  */
 
 class People{
   static say() {
   }
   print() {
   }
 }
 const fooKeys = Object.keys(People); //[]
 const fooPrototypeKeys = Object.keys(People.prototype);//[]
 
 /**
  * 4. class的所有方法(包括静态方法和实例方法)都是没有原型对象prototype，所以也没有[[construct]],不能使用
  * new来调用
  */
 
 new People.say();// error
 
 /**
  * 5. 必须使用new来调用class 
  */
 
 /**
  * 6. class内部无法重写类名
  */
 
 class Test{
   constructor() {
     Test = 'zzz';//error
   }
 }