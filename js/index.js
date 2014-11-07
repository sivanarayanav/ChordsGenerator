var app = {
    majorChords: {
        "A": "A C# E",
        "B": "B D# F#",
        "C": "C E G",
        "D": "D F# A",
        "E": "E G# B",
        "F": "F A C",
        "G": "G B D",
        "G#": "G# C D#",
        "A#": "A# D F",
        "C#": "C# F G#",
        "D#": "D# G A#",
        "F#": "F# A# C#"
    },
    minorChords: {
        "Am": "A C E",
        "Bm": "B D F#",
        "Cm": "C D# G",
        "Dm": "D F A",
        "Em": "E G B",
        "Fm": "F G# C",
        "Gm": "G A# D",
        "G#m": "G# B D#",
        "A#m": "A# C# F",
        "C#m": "C# E G#",
        "D#m": "D# F# A#",
        "F#m": "F# A C#"
    },
    note_index: {
        "A": "1",
        "A#": "2",
        "B": "3",
        "C": "4",
        "C#": "5",
        "D": "6",
        "D#": "7",
        "E": "8",
        "F": "9",
        "F#": "10",
        "G": "11",
        "G#": "12"
    },
    index_note: {
        "1": "A",
        "2": "A#",
        "3": "B",
        "4": "C",
        "5": "C#",
        "6": "D",
        "7": "D#",
        "8": "E",
        "9": "F",
        "10": "F#",
        "11": "G",
        "12": "G#"
    },
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("generateChords").addEventListener("click", this.init);
        document.getElementById("showChords").addEventListener("click", this.showChords);
        document.getElementById("invertChords").addEventListener("click", this.invertChords);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    init: function() {
        var randomNum = -1,
            chordsLen = 0,
            randomChordName = "",
            randomChordNotes = "",
            liName, liNotes, liInv, _randomNum = -1,
            randomColor = "";
        var count = parseInt(document.getElementById('count').value);
        var resultedChordsNames = [],
            resultedChordsNotes = [],
            resultedChordsInversions = [];

        var resChordNames = document.getElementById("resChordNames");
        var resChordNotes = document.getElementById("resChordNotes");
        var resChordInv = document.getElementById("resChordInversions");
        var chordType = document.getElementById("mySelection").value;
        var chords = {};

        if (chordType == "major") {
            chords = JSON.parse(JSON.stringify(app.majorChords));
        } else if (chordType == "major_minor") {
            chords = app.merge_options(app.majorChords, app.minorChords)
        } else if (chordType == "minor") {
            chords = JSON.parse(JSON.stringify(app.minorChords));
        }
        var keyArray = Object.keys(chords);
        chordsLen = keyArray.length;
        resChordNames.innerHTML = "";
        resChordNotes.innerHTML = "";
        resChordInv.innerHTML = "";
        for (var i = 0; i < count; i++) {

            randomNum = parseInt(Math.random() * chordsLen);
            while (randomNum === _randomNum) {
                randomNum = parseInt(Math.random() * chordsLen);
            }
            _randomNum = randomNum;
            randomChordName = keyArray[randomNum]
            randomChordNotes = chords[randomChordName]
            resultedChordsNames.push(randomChordName);
            resultedChordsNotes.push(randomChordNotes);
        }


        resultedChordsInversions = app.getChordInversions(resultedChordsNotes);

        for (var i = 0; i < count; i++) {

            randomColor = Math.floor(Math.random() * 16777215).toString(16);

            liName = document.createElement("li");
            liName.style.background = "#" + randomColor;
            liName.appendChild(document.createTextNode(resultedChordsNames[i]));
            resChordNames.appendChild(liName);

            liNotes = document.createElement("li");
            liNotes.style.background = "#" + randomColor;
            liNotes.appendChild(document.createTextNode(resultedChordsNotes[i]));
            resChordNotes.appendChild(liNotes);

            liInv = document.createElement("li");
            liInv.style.background = "#" + randomColor;
            liInv.appendChild(document.createTextNode(resultedChordsInversions[i]));
            resChordInv.appendChild(liInv);
        }

        document.getElementById("resChordNames").style.opacity = 1;
        document.getElementById("showChords").style.display = "inline-block";
        document.getElementById("resChordNotes").style.opacity = 0;
        document.getElementById("resChordInversions").style.opacity = 0;
        document.getElementById("invertChords").style.display = "none";
    },
    getnoteIndexes: function(chord) {
        var indexArr = [],
            obj = null,
            note, index;
        var chordArr = chord.split(" ");
        for (var i in chordArr) {
            index = app.note_index[chordArr[i]];
            indexArr.push(index);
        }
        return indexArr;
    },
    getChordInversions: function(resultedChords) {
        var resultedChordsIndex = [],
            res = [];
        var count = resultedChords.length;
        for (var j = 0; j < count; j++) {
            resultedChordsIndex.push(app.getnoteIndexes(resultedChords[j]));
        }
        var _temp0;
        var temp = resultedChordsIndex[0].map(Number);
        var _temp = resultedChordsIndex[0].map(Number);
        _temp.sort(function(a, b) {
            return a - b
        });
        var arrSeq = []
        for (var i in temp) {
            arrSeq.push(_temp.indexOf(temp[i]));
        }
        res.push(resultedChords[0]);
        var finalString = "";
        for (var i = 1; i < count; i++) {
            _temp0 = resultedChordsIndex[i].map(Number);
            _temp0.sort(function(a, b) {
                return a - b
            });
            finalString = app.index_note[_temp0[arrSeq[0]]] + " " + app.index_note[_temp0[arrSeq[1]]] + " " + app.index_note[_temp0[arrSeq[2]]];
            res.push(finalString);

        }
        return res;
    },
    showChords: function() {
        document.getElementById("resChordNotes").style.opacity = 1;
        document.getElementById("invertChords").style.display = "inline-block";
    },
    invertChords: function() {
        document.getElementById("resChordInversions").style.opacity = 1;
    },
    merge_options: function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }
};

app.initialize();