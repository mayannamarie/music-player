const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendMusicList: (callback) => ipcRenderer.on('load-tracks', callback)
})