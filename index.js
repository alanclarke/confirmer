module.exports = function confirmer (question) {
  if (process.stdin.isTTY) process.stdin.setRawMode(true)
  return new Promise(function (resolve, reject) {
    process.stdout.write(`\n${question} `)
    process.stdin.on('data', handleKey).resume()
    function handleKey (key) {
      key = String(key)
      if (!(/^[yn]$/i).test(key)) return
      process.stdin.removeListener('data', handleKey).pause()
      var result = key === 'y' || key === 'Y'
      process.stdout.cursorTo(0, null)
      process.stdout.clearScreenDown()
      process.stdout.write(`${question} ${result ? 'yes' : 'no'}\n`)
      resolve(result)
    }
  })
}
