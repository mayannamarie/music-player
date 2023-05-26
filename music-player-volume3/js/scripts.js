// const hello = document.getElementById('hello')
console.log("HELLLLLLLLLLLLLLO FROM SCRIPTS");
//formating song length for minutes and seconds 
// function formatDuration(value) {
//     let minutes = Math.floor(value / 60);
//     let seconds = value % 60;
//     return String(minutes).padStart(2, '0') + ":" + String(~~seconds).padStart(2, '0');
// }
window.electronAPI.sendMusicList((_event, value) => {

    sendMusicArray(value);

    //HERE WE CONECCT TO OUR PRELOAD SCRIPT WE DEFINED 
    //PUT MY FORREACH HERE TO OUTPUT ARRAY OF OBJECTS
    //console.log("VALUE PRINTED" + value);
    const tableBody = document.getElementById('table-body');
    value.forEach ((element, i) => {
        let tableRow = document.createElement('tr');
        let tableData_num = document.createElement('td');
        let tableData_title = document.createElement('td');
        let tableData_album = document.createElement('td');
        let tableData_duration = document.createElement('td');
        //getting index 
        tableData_num.innerHTML = i;
        tableData_title.innerHTML = element.title;
        tableData_album.innerHTML = element.album;
        tableData_duration.innerHTML = element.duration + " sec";
        // formatDuration(tableData_duration);

        tableRow.value = element.path;
        tableRow.id = element.path;

        //adding all children to parent TR
        tableRow.appendChild(tableData_num);
        tableRow.appendChild(tableData_title);
        tableRow.appendChild(tableData_album);
        tableRow.appendChild(tableData_duration);
  
    //adding TR to parent tbody
        tableBody.appendChild(tableRow);

        tableRow.addEventListener("click", (event) => {
            console.log("PRINING - " + tableRow.value);
            let track = value.find(({ path }) => path === tableRow.value);
            let index = value.findIndex(({ path }) => path === tableRow.value);
            console.log("printing index >>" + index)
            setDetails(track, index);

        });

    });

})