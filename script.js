// 🔥 Firebase Configuration (Replace with your Firebase project details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 📩 Send Message
function sendMessage() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (name && message) {
        db.collection("messages").add({
            name: name,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById("message").value = ""; // Clear input
    }
}

// 📥 Listen for Messages
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    document.getElementById("chat").innerHTML = "";
    snapshot.forEach(doc => {
        const msg = doc.data();
        document.getElementById("chat").innerHTML += `<p><strong>${msg.name}:</strong> ${msg.message}</p>`;
    });
});
