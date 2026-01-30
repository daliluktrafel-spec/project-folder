/* =====================================================
   AI SMART ARABIC SEARCH – STRICT AND LOGIC
   ===================================================== */

/* ===============================
   1) Normalize Arabic Text
================================ */
function normalizeArabic(text) {
    if (!text) return "";

    return text
        .toLowerCase()
        .replace(/[إأآ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/ـ/g, "")
        .replace(/[^\u0621-\u064A0-9 ]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

/* ===============================
   2) Expand word (plural, singular, ال)
================================ */
function expandWord(word) {
    const w = normalizeArabic(word);
    const forms = new Set();

    if (!w) return [];

    forms.add(w);

    // إزالة ال التعريف
    if (w.startsWith("ال")) forms.add(w.slice(2));

    // الجمع
    if (w.endsWith("ات")) forms.add(w.slice(0, -2));

    // المؤنث
    if (w.endsWith("ه")) forms.add(w.slice(0, -1));

    // إضافة صيغ مرنة
    forms.add("ال" + w);
    forms.add(w + "ه");
    forms.add(w + "ات");

    return Array.from(forms);
}

/* ===============================
   3) Get smart keywords from dictionary
================================ */
function getSmartKeywords(word) {
    const variants = new Set(expandWord(word));

    // dictionary.js يجب أن يحتوي كائن "dictionary" فيه الكلمات والمرادفات
    if (typeof dictionary === "object") {
        variants.forEach(v => {
            if (dictionary[v]) {
                dictionary[v].forEach(s => expandWord(s).forEach(e => variants.add(e)));
            }
        });
    }

    return Array.from(variants);
}

/* ===============================
   4) Strict AI Search (AND Logic)
================================ */
function aiSafeSearch(products, input) {
    if (!input || input.trim() === "") return products;

    const inputWords = normalizeArabic(input).split(" ");
    const results = [];

    products.forEach(product => {
        const text = normalizeArabic(
            (product.name || "") + " " +
            (product.category || "") + " " +
            (product.store || "") + " " +
            (product.description || "")
        );

        // تحقق من كل كلمة → AND logic
        let matchedAll = true;

        for (let word of inputWords) {
            const variants = getSmartKeywords(word);
            let wordMatched = false;

            for (let v of variants) {
                if (text.includes(v)) {
                    wordMatched = true;
                    break;
                }
            }

            if (!wordMatched) {
                matchedAll = false; // كلمة غير موجودة → تجاهل المنتج
                break;
            }
        }

        if (matchedAll) results.push(product);
    });

    return results;
}

/* ===============================
   5) Smart Search للواجهة
================================ */
function smartSearch(){
    const input = document.getElementById("searchInput").value;
    if(!input){
        renderProducts("all");
        return;
    }

    showSection("all");

    const results = aiSafeSearch(products, input);
    renderProducts("all", p => results.includes(p));
}
