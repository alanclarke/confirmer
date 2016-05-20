var queue = []

module.exports = function confirmer (question) {
  var l = queue.length
  queue.push(l
    ? queue[l - 1].then(() => confirm(question).then(unshift))
    : confirm(question).then(unshift)
  )
  return queue[l]
}

function confirm (question) {
  return new Promise(function (resolve, reject) {
    var isRaw = process.stdin.isRaw
    if (process.stdin.isTTY) process.stdin.setRawMode(true)
    process.stdout.write(`${question} \n`)
    process.stdin.on('data', handleKey)
    process.stdin.resume()
    function handleKey (key) {
      if (key[0] === 3 || key[0] === 4) return process.stdin.pause()
      key = String(key)
      if (!(/^[yn]$/i).test(key)) return
      process.stdin.pause()
      process.stdin.removeListener('data', handleKey)
      var result = key === 'y' || key === 'Y'
      process.stdout.cursorTo(0, null)
      process.stdout.moveCursor(null, -1)
      process.stdout.clearScreenDown()
      process.stdout.write(`${question} ${result ? 'yes' : 'no'}\n`)
      if (process.stdin.isTTY) process.stdin.setRawMode(isRaw)
      resolve(result)
    }
  })
}

function unshift (result) {
  queue.unshift()
  return result
}
