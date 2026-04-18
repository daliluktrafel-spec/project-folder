// دالة لجلب الطلبات وتحليلها لكل تاجر
async function generateMerchantReport(merchantName) {
    console.log("جاري البدء في تجميع البيانات لـ: " + merchantName);

    try {
        // 1. جلب البيانات من الفايربيس (database معرفة في ملف firebase.js)
        const snapshot = await database.ref("orders").once("value");
        const allOrders = snapshot.val() ? Object.values(snapshot.val()) : [];

        // 2. تصفية الطلبات (حالياً نجمعها بناءً على حالة الطلب "picked")
        const successfulOrders = allOrders.filter(order => order.status === "picked");

        // 3. تحليل البيانات رقمياً
        let reportData = {
            topProducts: {},      // المنتجات الأكثر مبيعاً
            slowProducts: [],    // منتجات لم تبع (سنحتاج مقارنتها بقائمة المنتجات)
            totalRevenue: 0,      // إجمالي المبالغ
            activeRegions: {},    // أكثر المناطق طلباً
            totalOrders: successfulOrders.length
        };

        successfulOrders.forEach(order => {
            // حساب تكرار المنتجات
            reportData.topProducts[order.pName] = (reportData.topProducts[order.pName] || 0) + 1;
            
            // حساب نشاط المناطق
            reportData.regions[order.region] = (reportData.regions[order.region] || 0) + 1;

            // جمع المبالغ (تنظيف النص من كلمة "ريال" وتحويله لرقم)
            const priceValue = parseInt(order.price.replace(/[^\d]/g, '')) || 0;
            reportData.totalRevenue += priceValue;
        });

        console.log("تم تجميع البيانات بنجاح لهذا التاجر.");
        return reportData;

    } catch (error) {
        console.error("خطأ في تجميع البيانات:", error);
        return null;
    }
}
async function craftAIWhatsAppMessage(merchantData, reportData) {
    // تجهيز "ملخص" للذكاء الاصطناعي ليفهمه
    const statsSummary = `
        اسم التاجر: ${merchantData.ownerName}
        اسم المتجر: ${merchantData.storeName}
        إجمالي الطلبات الناجحة: ${reportData.totalOrders}
        إجمالي الدخل: ${reportData.totalRevenue} ريال
        المنتجات اللي انطلبت: ${JSON.stringify(reportData.topProducts)}
        أكثر المناطق طلباً: ${JSON.stringify(reportData.regions)}
    `;

    try {
        // نستخدم رابط الـ API السري اللي عملناه في فرسيل عشان الأمان
        const response = await fetch("/api/chat", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: `أنت خبير مبيعات يمني ومحلل بيانات في "متاجر البلاد". 
                        مهمتك: كتابة رسالة واتساب للتاجر بناءً على بيانات مبيعاته.
                        الشروط:
                        1. اللهجة: يمنية ترحيبية مهذبة (حياك الله، يا غالي، بارك الله في رزقك).
                        2. المحتوى: اذكر المنتج الأكثر مبيعاً، وانصحه بمنتج لم يبع جيداً (يقوم بعمل خصم عليه)، وشاركه توقعك للمنطقة الأكثر نشاطاً.
                        3. التنسيق: استخدم الإيموجي المناسب واجعل الرسالة منظمة وسهلة القراءة على الهاتف.` 
                    },
                    { role: "user", content: `هذه بيانات المبيعات: ${statsSummary}` }
                ]
            })
        });

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        
        console.log("تمت صياغة الرسالة بنجاح بواسطة الذكاء الاصطناعي!");
        return aiMessage;

    } catch (error) {
        console.error("خطأ في صياغة الرسالة الذكية:", error);
        return null;
    }
}