/**
 * 导出JSON文件
 */
export const exportJsonFile = (data, filename) => {
  if (!data) {
    return
  }
  if (!filename) filename = 'data.json'
  if (typeof data === 'object') data = JSON.stringify(data, {}, 4)
  let blob = new Blob([data], { type: 'text/json' })
  let e = document.createEvent('MouseEvents')
  let a = document.createElement('a')
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}
