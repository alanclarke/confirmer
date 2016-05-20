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
    process.stdout.write(`${question} `)
    process.stdin.on('data', handleKey)
    process.stdin.resume()

    function handleKey (key) {
      if (key[0] === 3 || key[0] === 4) return cleanup()
      key = String(key)
      if (!(/^[yn]$/i).test(key)) return
      var result = key === 'y' || key === 'Y'
      process.stdout.moveCursor(-1, null)
      process.stdout.write(` ${result ? 'yes' : 'no'} \n`)
      cleanup()
      resolve(result)
    }

    function cleanup () {
      if (process.stdin.isTTY) process.stdin.setRawMode(isRaw)
      process.stdin.removeListener('data', handleKey)
      process.stdin.pause()
    }
  })
}

function unshift (result) {
  queue.unshift()
  return result
}
