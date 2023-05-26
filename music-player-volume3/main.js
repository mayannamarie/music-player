const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const mm = require('music-metadata')


//to create a window browser instance
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    //to load it
    win.loadFile('index.html')

    win.maximize()

    return win;
}
const isMusicFile = (filepath) => {
    const types = ['.mp3', '.wav']
    const ext = path.extname(filepath)

    if (types.includes(ext)) {
        return true
    }
    else {
        return false
    }
}

async function asyncGetMusicMetadata(file) {
    try {
        const fileMetadata = await mm.parseFile(file);
        return fileMetadata
    } catch (error) {
        return console.error('An error was encountered==' + error.message);
    }
}

//to get it to open up
app.whenReady().then(() => {

    ////FS 
    const musicFolder = "C:\\Users\\Maya\\Music\\Toots & The Maytals\\True Love";

    //defining my array
    const musicArray = [];

    //passsing directoryPath and callback function
    fs.readdir(musicFolder, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        //listing all files using forEach
        files.forEach(function (file) {
            const musicFilePath = musicFolder + "\\" + file
            if (isMusicFile(musicFilePath)) {
                musicArray.push({
                    path: musicFilePath,
                    title: '',
                    album: '',
                    artist: '',
                    duration: '',
                    picture: '',
                    pictureFormat: '',
                    fileURL: ''
                })
            }
            // Now get the metadata for each music file
            musicArray.forEach(function (track) {
                asyncGetMusicMetadata(track.path).then(

                    function (value) {
                        const metadata = value
                        //value represents a single files metadata
                        if (value) {
                            const picture = mm.selectCover(metadata.common.picture)

                            track.title = metadata.common.title
                            track.album = metadata.common.album
                            track.artist = metadata.common.artist
                            track.duration = Math.round(metadata.format.duration)
                            track.picture = picture ? picture.data.toString('base64') : ""
                            track.pictureFormat = picture ? picture.format : ""
                            track.fileURL = url.pathToFileURL(track.path).href
                        }
                    },
                    function (error) {
                        console.log(error)
                    }
                )
            })
            //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*   



        });
    });


    const mainWindow = createWindow()

    mainWindow.webContents.once('dom-ready', () => {
        mainWindow.webContents.send('load-tracks', musicArray)
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

//Quit the app when all windows are closed 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
