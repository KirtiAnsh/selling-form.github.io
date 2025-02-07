// ✅ Firebase Configuration (Replace with Your Correct Keys)
const firebaseConfig = {
    apiKey: "AIzaSyAFvHw4FhanhlJxCCcDCGCLeserxV6lONE",
    authDomain: "tree-seller-air.firebaseapp.com",
    databaseURL: "https://tree-seller-air-default-rtdb.firebaseio.com",
    projectId: "tree-seller-air",
    storageBucket: "tree-seller-air.appspot.com",
    messagingSenderId: "860677307523",
    appId: "1:860677307523:web:106d6ff8d2c44ccbccefb6",
    measurementId: "G-R5YCY5Y348"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("seller-products");

// ✅ Add event listener for form submission
document.querySelector(".upload-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // 🔹 Retrieve form values
    var sellerName = getElementVal("seller-name");
    var companyName = getElementVal("company-name");
    var productName = getElementVal("product-name");
    var quantity = getElementVal("quantity");
    var price = getElementVal("price");
    var gst = getElementVal("gst");
    var category = getElementVal("category");
    var description = getElementVal("description");
    var sku = getElementVal("sku");
    var tags = getElementVal("tags");

    // 🔹 Validate GST Format
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(gst)) {
        alert("❌ Invalid GST Number format. Please check and try again.");
        return;
    }

    // 🔹 Push data to Firebase Realtime Database
    db.push({
        sellerName: sellerName,
        companyName: companyName,
        productName: productName,
        quantity: quantity,
        price: price,
        gst: gst,
        category: category,
        description: description,
        sku: sku,
        tags: tags
    }).then(() => {
        alert("✅ Product uploaded successfully!");
        document.querySelector(".upload-form").reset(); // Clear form
    }).catch((error) => {
        console.error("❌ Error saving product:", error);
        alert("❌ Error uploading product. Try again.");
    });
}

// 🔹 Helper function to get form values
const getElementVal = (id) => {
    return document.getElementById(id).value.trim();
};
