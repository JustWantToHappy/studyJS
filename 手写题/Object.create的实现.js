
Object.mycreate = function (proto, propertiesObject = undefined) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object or null: undefined");
  }

  if (propertiesObject === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const obj = new Object();
  obj.__proto__ = proto;
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
}

let obj = Object.mycreate({ name: "sb" }, { age: { writable: true, value: 12, enumerable: true } });