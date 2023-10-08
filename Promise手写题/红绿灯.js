const d = new Date() * 1
function red() {
  console.log(new Date() * 1 - d)
  console.log("red");
}
function green() {
  console.log(new Date() * 1 - d)
  console.log("green");P
}
function yellow() {
  console.log(new Date() * 1 - d)
  console.log("yellow");
}

function light(timer, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}

function step() {
  Promise.resolve().then(() => {
    return light(3000, red)
  }).then(() => {
    return light(2000, green)
  }).then(() => {
    return light(1000, yellow)
  }).then(() => {
    step()
  })
}
step()
// light(3000,red)
