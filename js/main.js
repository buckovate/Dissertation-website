function setup() {

        var counter = 0
        if (window.sessionStorage.getItem("answers") == null) {
            var answers = {};
            window.sessionStorage.setItem("answers", JSON.stringify(answers))
        }

        if (window.sessionStorage.getItem("icons") == null) {
            var icons = [];

            icons[0] = ["images/43.jpg"];
            icons[1] = ["images/44.jpg"];
            icons[2] = ["images/46.jpg"];
            icons[3] = ["images/109.jpg"];
            icons[4] = ["images/150.jpg"];
            icons[5] = ["images/193.jpg"];
            icons[6] = ["images/209.jpg"]
            icons[7] = ["images/233.jpg"];
            icons[8] = ["images/240.jpg"];
            icons[9] = ["images/255.jpg"];
            icons = shuffle(icons)
            window.sessionStorage.setItem("icons", JSON.stringify(icons))
        }

    window.sessionStorage.setItem("counter", JSON.stringify(counter))
    selectRandomImage()

}

function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
}

function storeAnswer() {
    var selectedOption = $('input[name="Answer"]:checked').val();
    var answers = JSON.parse(window.sessionStorage.getItem("answers"))
    var counter = JSON.parse(window.sessionStorage.getItem("counter"))
    var icons = JSON.parse(window.sessionStorage.getItem("icons"));
    answers[icons[counter-1]] = selectedOption
    window.sessionStorage.setItem("answers", JSON.stringify(answers));
    selectRandomImage()
    JSON.parse(window.sessionStorage.setItem("selectedOption"), 0);
    }


function submit() {
        var answers = JSON.parse(window.sessionStorage.getItem("answers"));
        var counter = JSON.parse(window.sessionStorage.getItem("counter"));
        // Your web app's Firebase configuration
        var firebaseConfig = {
        apiKey: "AIzaSyCY2BrzL9eW52Mk7dR3-ep0XBlM7Bd8WYM",
        authDomain: "dissertation-symmetry.firebaseapp.com",
        databaseURL: "https://dissertation-symmetry.firebaseio.com",
        projectId: "dissertation-symmetry",
        storageBucket: "dissertation-symmetry.appspot.com",
        messagingSenderId: "120072086901",
        appId: "1:120072086901:web:733ff7c2a978f43d2e1f3c"
    };
        // Initialize Firebase

        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        db.collection("answer").add({answers
        })
        .then(function () {
            console.log("Document successfully written!");
            window.location.href = "thankyou.html"
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

function selectRandomImage() {
    var counter = JSON.parse(window.sessionStorage.getItem("counter"))
    var icon = []
    icon = JSON.parse(window.sessionStorage.getItem("icons"))
    if (counter <10 ) {
        counter += 1
        console.log(counter)
        console.log(icon)
        window.sessionStorage.setItem("counter", counter)
        document.getElementById("counter").innerHTML = "Icon number " + counter + " out of 10."
        var imageCollection = document.images;
        imageCollection.item(0).src = icon[counter-1]

    }
    else {submit()}
}

