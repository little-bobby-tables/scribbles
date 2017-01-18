function getUA() {
    return navigator.userAgent;
}

document.addEventListener("DOMContentLoaded", setup, false);

function setup() {
    document.getElementById("fingerprint").addEventListener("click", fingerprint);
}

function fingerprint() {
    var sources = [
        ["User Agent string", getUA]
    ];
    for (var i = 0; i < sources.size(); i++) {
        displayRow(sources[i][0], sourcees[i][1]());
    }
}

function displayRow(source, value) {
    var table = document.getElementById("target"),
        row = table.insertRow(table.rows.length),
        sourceCell = row.insertCell(0),
        valueCell = row.insertCell(1);
    sourceCell.appendChild(
        document.createTextNode(source));
    valueCell.appendChild(
        document.createTextNode(value));
}



