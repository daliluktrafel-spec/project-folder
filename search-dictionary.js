/* =====================================================
    🔥 AI SMART ARABIC SEARCH ENGINE (PRO VERSION)
   ===================================================== */

// 1) تنظيف النص العربي
function normalizeArabic(text) {
    if (!text) return "";
    return text.toLowerCase()
        .replace(/[إأآ]/g, "ا").replace(/ى/g, "ي").replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي").replace(/ة/g, "ه").replace(/ـ/g, "")
        .replace(/[^\u0621-\u064A0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

// 2) توليد اشتقاقات الكلمة (ال، ات، هـ)
function expandWord(word) {
    const w = normalizeArabic(word);
    const forms = new Set();
    if (!w) return [];
    forms.add(w);
    if (w.startsWith("ال")) forms.add(w.slice(2));
    if (w.endsWith("ات")) forms.add(w.slice(0, -2));
    if (w.endsWith("ه")) forms.add(w.slice(0, -1));
    forms.add("ال" + w); forms.add(w + "ه"); forms.add(w + "ات");
    return Array.from(forms);
}

// 3) الربط مع الفهرس الخارجي (dictionary)
function getSmartKeywords(word) {
    let variants = new Set(expandWord(word));
    
    // البحث في القاموس المعرف في ملف dictionary.js
    if (typeof dictionary !== 'undefined') {
        // فحص الكلمة الأصلية وفحص اشتقاقاتها داخل القاموس
        const checkWords = Array.from(variants);
        checkWords.forEach(cw => {
            if (dictionary[cw]) {
                dictionary[cw].forEach(synonym => {
                    expandWord(synonym).forEach(e => variants.add(e));
                });
            }
        });
    }
    return Array.from(variants);
}

// 4) محرك تقييم المنتجات (ترتيب النتائج)
function scoreProduct(product, searchWords) {
    let score = 0;
    const name = normalizeArabic(product.name || "");
    const cat = normalizeArabic(product.category || "");
    const store = normalizeArabic(product.store || "");

    searchWords.forEach(word => {
        const variants = getSmartKeywords(word);
        variants.forEach(v => {
            if (name.includes(v)) score += 10;     // الاسم له أعلى أولوية
            if (cat.includes(v)) score += 5;      // التصنيف ثانياً
            if (store.includes(v)) score += 3;    // المتجر ثالثاً
        });
    });
    return score;
}

// 5) الدالة الرئيسية للبحث (التي يتم مناداتها في الهوم)
function aiSafeSearch(allProducts, input) {
    if (!input || input.trim() === "") return allProducts.map(p => p.id);
    
    const searchWords = normalizeArabic(input).split(" ");
    
    const scoredResults = allProducts.map(p => ({
        id: p.id,
        score: scoreProduct(p, searchWords)
    }));

    // فلترة المنتجات التي حصلت على نقاط (أي وجدنا فيها الكلمة أو مرادفها)
    // ثم ترتيبها من الأعلى نقاطاً إلى الأقل
    return scoredResults
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.id);
}

// 6) نظام الاقتراحات التلقائية أثناء الكتابة
function getSuggestions(input, allProducts) {
    if (!input || input.length < 2) return [];
    const word = normalizeArabic(input).split(" ").pop();
    const suggestions = new Set();

    allProducts.forEach(p => {
        const text = normalizeArabic((p.name || "") + " " + (p.category || ""));
        text.split(" ").forEach(w => {
            if (w.startsWith(word) && w.length > 2) suggestions.add(w);
        });
    });
    return Array.from(suggestions).slice(0, 5);
}