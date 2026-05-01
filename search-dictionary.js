/* =====================================================
    🔥 AI SMART ARABIC SEARCH ENGINE (ULTRA STRICT)
    تطوير القائد حسين - نسخة الدقة المطلقة
   ===================================================== */

// 1) قائمة الكلمات التسويقية (تمت إضافة "خراف" و "خرافيه" لضمان الحماية)
const stopWords = ["خرافي", "خرافيه", "خراف", "روعه", "عرض", "جديد", "مميز", "اصلي", "ماركه", "طقم", "جدا"];

function normalizeArabic(text) {
    if (!text) return "";
    return text.toLowerCase()
        .replace(/[إأآ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/ـ/g, "")
        .replace(/\bال/g, "") 
        .replace(/[^\u0621-\u064A0-9 ]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// دالة جديدة لفحص الكلمات المستبعدة بشكل أدق
function isStopWord(word) {
    const normalized = normalizeArabic(word);
    // الفحص هنا يشمل الكلمة الأصلية وأي اشتقاق تسويقي لها
    return stopWords.some(sw => normalized === sw || normalized.startsWith(sw));
}

function getSynonyms(word) {
    const w = normalizeArabic(word);
    const variants = new Set();
    variants.add(w);
    if (typeof dictionary !== 'undefined' && dictionary[w]) {
        dictionary[w].forEach(syn => variants.add(normalizeArabic(syn)));
    }
    return Array.from(variants);
}

function productContainsWord(product, word) {
    const pName = normalizeArabic(product.name);
    const pCat = normalizeArabic(product.category);
    const pStore = normalizeArabic(product.store);
    const synonyms = getSynonyms(word);

    return synonyms.some(syn => 
        pName.includes(syn) || 
        pCat.includes(syn) || 
        pStore.includes(syn)
    );
}

function aiSafeSearch(allProducts, input) {
    if (!input || input.trim() === "") return allProducts.map(p => p.id);

    // تقسيم جملة البحث
    const allSearchWords = input.split(/\s+/).filter(w => w.length > 1);
    
    // فلترة صارمة: استبعاد أي كلمة تسويقية أو مشتقاتها
    const searchWords = allSearchWords.filter(word => !isStopWord(word));
    
    // إذا كان البحث كله كلمات تسويقية (مثل "عرض جديد خراف")، سنضطر لاستخدامها 
    const finalWordsToUse = searchWords.length > 0 ? searchWords : allSearchWords;
    const totalWords = finalWordsToUse.length;

    let finalResults = [];

    // البحث الصارم: matchCount يجب أن يكون مساوياً لعدد الكلمات الأساسية
    // حذفنا تماماً مستويات البحث الضعيفة (المستوى 3 وما دونه)
    let minMatch = totalWords; 

    for (let matchCount = totalWords; matchCount >= minMatch; matchCount--) {
        let currentMatches = allProducts.filter(product => {
            let foundCount = 0;
            finalWordsToUse.forEach(word => {
                if (productContainsWord(product, word)) {
                    foundCount++;
                }
            });
            return foundCount === matchCount;
        });

        if (currentMatches.length > 0) {
            currentMatches.sort((a, b) => (b.updatedAt || b.id) - (a.updatedAt || a.id));
            finalResults = finalResults.concat(currentMatches.map(p => p.id));
            break; 
        }
    }

    return finalResults;
}