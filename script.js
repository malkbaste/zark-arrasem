document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const welcomeScreen = document.getElementById('welcome-screen');
    const aboutScreen = document.getElementById('about-screen');
    const questionScreen = document.getElementById('question-screen');
    const gameoverScreen = document.getElementById('gameover-screen');
    
    const startBtn = document.getElementById('start-btn');
    const exitBtn = document.getElementById('exit-btn');
    const aboutIcon = document.getElementById('about-icon');
    const backBtn = document.getElementById('back-btn');
    const retryBtn = document.getElementById('retry-btn');
    const quitBtn = document.getElementById('quit-btn');
    
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackElement = document.getElementById('feedback');
    const mistakesCounter = document.getElementById('mistakes-count');
    const mistakesMessage = document.getElementById('mistakes-message');
    const correctCounter = document.getElementById('correct-count');
    const finalCorrect = document.getElementById('final-correct');
    
    // متغيرات التطبيق
    let mistakes = 0;
    let correctAnswers = 0;
    
    // قائمة الأسئلة والأجوبة (محدثة بالأسئلة المطلوبة)
    const questions = [
        {
            question: "الصائمون",
            options: ["محذوفة", "أل الحذف تركب اعل الياء", "ثابتة لم يهمز", "ثابتة"],
            correctAnswer: "أل الحذف تركب اعل الياء"
        },
        {
            question: "قسيسين",
            options: ["محذوفة", "ثابتة", "ما فيه شي", "الياء محذوفة"],
            correctAnswer: "ما فيه شي"
        },
        {
            question: "بسم معاها (الله)",
            options: ["فيه ألف", "ما فيه شي", "ممالة", "في القيد تثبت"],
            correctAnswer: "ما فيه شي"
        },
        {
            question: "أولئك",
            options: ["كما كتبت", "محذوفة فقط", "ليست صحيحة", "ثابتة الهمزة على الياء"],
            correctAnswer: "كما كتبت"
        },
        {
            question: "الملائكة",
            options: ["محذوفة", "(أل) الحذف الهمزة على (ي) التاء (ة)", "ثابتة أل الياء", "ما فيه ش"],
            correctAnswer: "(أل) الحذف الهمزة على (ي) التاء (ة)"
        },
        {
            question: "ينادونك",
            options: ["محذوفة", "الأول محذوف والاخر ثابت", "ثابت", "الاثنين أمحذف"],
            correctAnswer: "ثابت"
        },
        {
            question: "أئذا",
            options: ["الاولى اعل الليف، الاخرى ما تركب", "يركب الثنتين اعل الليف", "الاولى الليف والثانية في القيد تركب", "ما يركب الثنتين"],
            correctAnswer: "الاولى الليف والثانية في القيد تركب"
        },
        {
            question: "السماوات",
            options: ["شد أولا ومحذوفة", "الأول محذوف والثاني ثابت", "الأول محذوف في القيد", "امحذف الاثنين"],
            correctAnswer: "شد أولا ومحذوفة"
        },
        {
            question: "الشهداء",
            options: ["الحذف أتوف", "ثابتة والهمزة تركب", "أل  والثبات", "أل والحدف ركوب الهمزة"],
            correctAnswer: "أل  والثبات"
        },
        {
            question: "سابغات",
            options: ["محذوفة", "الأول ثابت والثاني محذوف", "ثابتة كاملة واخلاص", "ما فيه ش كاع"],
            correctAnswer: "محذوفة"
        },
        {
            question: "يتلاومون",
            options: ["ثابتة", "ما فيه ش", "محذوفة للنون", "محذوفة حرف"],
            correctAnswer: "محذوفة حرف"
        },
        {
            question: "ثبات",
            options: ["محذوفة", "ثابتة", "ثابتة ومربوطة تاء", "ما فيه ش"],
            correctAnswer: "ثابتة"
        },
        {
            question: "نحيي",
            options: ["الياءين محذوفتين", "ي اللولة محذوفة", "ي الثانية محذوفة", "ما فيه ش"],
            correctAnswer: "ي الثانية محذوفة"
        },
        {
            question: "وكتاب",
            options: ["محذوفة", "ثابتة كلا", "في القيد ثابتة", "محذوفة في القيد"],
            correctAnswer: "في القيد ثابتة"
        },
        {
            question: "أفتمارونه",
            options: ["بالالف الاولى الحذف", "بالالف الاولى الثبات", "مماله", "بالالف والحذف والمزيد"],
            correctAnswer: "بالالف الاولى الحذف"
        },
        {
            question: "أزفت",
            options: ["بالالف الاولى ربط التاء", "ما فيه ش", "بالالف الالولى", "ماهِ وحده منهم"],
            correctAnswer: "بالالف الالولى"
        },
        {
            question: "أريكم",
            options: ["فيه المزيد واو", "ما فيه ش", "بالالف الاولى", "بالالف الاولى والمزيد"],
            correctAnswer: "بالالف الاولى"
        },
        {
            question: "إنَّ المجرمين قاعدة",
            options: ["الحركة الأصلية", "ككسر", "استثناء من ككسر", "وصل ورا الميت"],
            correctAnswer: "الحركة الأصلية"
        },
        {
            question: "تنوأ قاعدة (ء)",
            options: ["ظهر النص", "استثناء من الألف الاولى", "بالقبل", "الأخرى"],
            correctAnswer: "ظهر النص"
        },
        {
            question: "الملأ بالضم قاعدة (ء)",
            options: ["بالقبل", "الفتحة", "الأخرى", "أو كالملأ في القيد"],
            correctAnswer: "أو كالملأ في القيد"
        },
        {
            question: "يرى",
            options: ["ممالة", "محمولة", "ما فيه ش", "ليف البرزة"],
            correctAnswer: "ممالة"
        },
        {
            question: "أولوا",
            options: ["بالالف (أ) ومزيد (و ا )", "بالالف الاولى", "ما فيه ش", "المزيد أتوف"],
            correctAnswer: "بالالف (أ) ومزيد (و ا )"
        },
        {
            question: "كاذبة",
            options: ["محذوفة التاء (ة)", "ثابتة تاء (ة)", "ثابتة تاء (ت)", "ما فيه ش"],
            correctAnswer: " (ة)محذوفة التاء "
        },
        {
            question: "سبح اسم. القاعدة",
            options: ["ككسر", "وصل ورا الميت", "معتل", "الحركة الأصلية"],
            correctAnswer: "ككسر"
        },
        {
            question: "مختال",
            options: ["محذوفة", "ثابتة", "ما فيه ش", "محمولة ثابتة"],
            correctAnswer: "ثابتة"
        },
        
            question: "لئلا قاعدة",
            options: ["بالقبل", "استثناء بالالف الاولى", "الفتحة", "أو كسر"],
            correctAnswer: "استثناء بالالف الاولى"
        },
        {
            question: "رضوان",
            options: ["محذوفة", "ثابتة", "ممالة", "ما فيه ش"],
            correctAnswer: "محذوفة"
        },
        {
            question: "عليين",
            options: ["ي الاولى محذوفة", "ي الثانية محذوفة", "اليائين محذوفتين", "ما فيه ش"],
            correctAnswer: "ما فيه ش"
        },
        {
            question: "اتبعني",
            options: ["ازيدها ورش", "إزيدها قالون", "إزيدها نافع", "ما فيه ش"],
            correctAnswer: "ما فيه ش"
        },
        {
            question: "نذيري",
            options: ["ما فيه ش", "إزيدها قالون", "إزيدها ورش", "إزيدها نافع (اتفاق)"],
            correctAnswer: "إزيدها ورش"
        },
        {
            question: "مناة",
            options: ["ثابتة", "محذوفة", "اتعوض(و) و (ة)", "ما فيه ش"],
            correctAnswer: "اتعوض(و) و (ة)"
        },
        {
            question: "يحيى",
            options: ["ممالة", "ي محذوفة", "ما فيه ش", "مقطوعة"],
            correctAnswer: "ممالة"
        },
        {
            question: "أنها",
            options: ["ما فيه ش", "بالالف الاولى والحملة", "ممالة", "بالالف الاولى فقط"],
            correctAnswer: "بالالف الاولى والحملة"
        },
        {
            question: "تحاوركما",
            options: ["محذوفة", "ثابتة", "محمولة", "ما فيه ش"],
            correctAnswer: "ثابتة"
        },
        {
            question: "عذاب أليم القاعدة",
            options: ["وانقل ورا الميت", "ككسر", "المعتل", "وانقل ورا الفتح"],
            correctAnswer: "وانقل ورا الفتح"
        },
        {
            question: "يتغامزون",
            options: ["محذوفة أفحرفها", "ثابتة", "مسثنية من للنون", "مماله"],
            correctAnswer: "ثابتة"
        },
        {
            question: "ثلاثة",
            options: ["محذوفة", "ثابتة", "مقطوعة", "ممالة"],
            correctAnswer: "محذوفة"
        },
        {
            question: "معصيت الرسول (ت)",
            options: ["وعن سوى فتح", "وما لوصل كسرت", "جات اعل النص", "استثناء من وعن سوى"],
            correctAnswer: "وما لوصل كسرت"
        },
        {
            question: "تناجيتم",
            options: ["محذوفة", "ثابتة", "ما فيه ش", "ممالة"],
            correctAnswer: "محذوفة"
        },
        {
            question: "تترا",
            options: ["مقطوعة", "ممالة", "ما فيه ش", "محمولة"],
            correctAnswer: "مقطوعة"
        },
        {
            question: "حزبُ الشيطان قاعدة",
            options: ["الحركة الأصلية", "انوسط الألف", "ككسر", "وصل ورا الميت"],
            correctAnswer: "الحركة الأصلية"
        },
        {
            question: "الشيطان",
            options: ["ثابتة أتوف", "شد أولا محذوفة", "ما فيه ش", "وفي السكون ثابتة"],
            correctAnswer: "شد أولا محذوفة"
        },
        {
            question: "الجنات",
            options: ["محذوفة", "(أل) ثابتة", "بأل�� ثابتة", "ما فيه ش"],
            correctAnswer: "(أل) ثابتة"
        },
        {
            question: "شديدا إنهم القاعدة",
            options: ["المعتل", "وانقل ورا الكسر", "استثناء من ككسر", "وصل ورا الميت"],
            correctAnswer: "استثناء من ككسر"
        },
        {
            question: "ديارهم",
            options: ["محذوفة", "ممالة", "مقطوعة", "ثابتة"],
            correctAnswer: "محذوفة"
        },
        {
            question: "اليتامى",
            options: ["أل حذف ممالة", "أل ثبات قطع", "حذف ممالة", "مقطوعة حذف"],
            correctAnswer: "أل حذف ممالة"
        },
        {
            question: "حين إذن",
            options: ["منفصلة الهمزة اعل (ا)", "متصلة الهمزة اعل (ي)", "ما فيه ش", "ما تركب متصلة"],
            correctAnswer: "متصلة الهمزة اعل (ي)"
        },
        {
            question: "قوا",
            options: ["محمولة", "فيه المزيد", "ما فيه ش", "ممالة"],
            correctAnswer: "فيه المزيد"
        },
        {
            question: "يتنازعون",
            options: ["محذوفة", "ثابتة", "حذف للنون", "ما فيه ش"],
            correctAnswer: "محذوفة"
        },
        {
            question: "سبحان",
            options: ["محذوفة", "ثابتة", "مقطوعة", "مسثنية"],
            correctAnswer: "محذوفة"
        },
        {
            question: "مالِكِ",
            options: ["محذوفة", "ثابتة", "في القيد ثابتة", "منفصلة"],
            correctAnswer: "محذوفة"
        },
        {
            question: "عسى",
            options: ["ممالة", "محمولة", "بعدها وصل محمولة", "ما فيه ش"],
            correctAnswer: "بعدها وصل محمولة"
        },
        {
            question: "الايكةِ",
            options: ["بألا التاء", "التاء", "ما فيه ش", "اتزيد واو"],
            correctAnswer: "بألا التاء"
        },
        {
            question: "زاغوا",
            options: ["ثبات مزيد", "محذوفة المزيد", "مقطوعة", "الحذف"],
            correctAnswer: "ثبات مزيد"
        },
        {
            question: "ليطفئوا الهمزة",
            options: ["تركب اعل (و)", "ما تركب", "تركب اعل (ا)", "تركب اعل (ي)"],
            correctAnswer: "ما تركب"
        },
        {
            question: "ليال",
            options: ["محذوفة", "ثابتة", "ما فيه ش", "محمولة"],
            correctAnswer: "ثابتة"
        },
        {
            question: "الحواريين الياء",
            options: ["اللولة محذوفة", "الثانية محذوفة", "امحذفة الثنتين", "ثابتين كاملين"],
            correctAnswer: "الثانية محذوفة"
        },
        {
            question: "تفرون",
            options: ["محذوفة", "ثابتة", "ممالة", "ما فيه ش"],
            correctAnswer: "ما فيه ش"
        },
        {
            question: "ملاقيكم",
            options: ["محذوفة", "ثابتة", "مقطوعة", "ممالة"],
            correctAnswer: "محذوفة"
        },
        {
            question: "العذاب",
            options: ["الثبات شد أولا", "الحذف أل", "الثبات أل", "الحذف بألا"],
            correctAnswer: "الثبات أل"
        },
        {
        	question: "ملجأ",
            options: ["تركب على الألف", "ما تركب", "تركب على الواو", "تركب على الياء"],
             correctAnswer: "تركب على الألف"
         },
         { 
            question: "عالم",
            options: ["محذوفة", "ثابتة", "ما فيه ش", "مقطوعة"],
            correctAnswer: "محذوفة"
        },
        {
            question: "أنشأناهن",
            options: ["بالالف الاولى الهمزة اعل (ا) حذف", "ثابتة أل تركب (ي)", "مسثنية من ككسر", "ما فيه ش"],
            correctAnswer: "بالالف الاولى الهمزة اعل (ا) حذف"
        }
    ];

    // رسائل التغذية الراجعة
    const correctFeedbacks = ["حسبك", "النصر", "أسك", "ما شاء الله"];
    const incorrectFeedbacks = ["هذ الزلقة", "اطرح بالك", "أنت أمالك"];
    const mistakesMessages = ["جاتك", "جاووك","جاووك "];
    
    // وظائف التطبيق
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }
    
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    function getRandomQuestion() {
        const shuffledQuestions = shuffleArray([...questions]);
        return shuffledQuestions[0];
    }
    
    function displayQuestion(questionObj) {
        questionText.textContent = questionObj.question;
        optionsContainer.innerHTML = '';
        
        const shuffledOptions = shuffleArray([...questionObj.options]);
        
        shuffledOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => checkAnswer(option, questionObj.correctAnswer));
            optionsContainer.appendChild(optionElement);
        });
    }
    
    function checkAnswer(selectedAnswer, correctAnswer) {
        const options = document.querySelectorAll('.option');
        
        if (selectedAnswer === correctAnswer) {
            // الإجابة الصحيحة
            options.forEach(option => {
                if (option.textContent === correctAnswer) {
                    option.classList.add('correct');
                }
            });
            
            const randomFeedback = correctFeedbacks[Math.floor(Math.random() * correctFeedbacks.length)];
            feedbackElement.textContent = randomFeedback;
            feedbackElement.classList.add('correct-feedback');
            
            correctAnswers++;
            correctCounter.textContent = correctAnswers;
            
            setTimeout(() => {
                feedbackElement.textContent = '';
                feedbackElement.classList.remove('correct-feedback');
                displayQuestion(getRandomQuestion());
            }, 1500);
        } else {
            // الإجابة الخاطئة
            options.forEach(option => {
                if (option.textContent === selectedAnswer) {
                    option.classList.add('incorrect');
                }
                if (option.textContent === correctAnswer) {
                    option.classList.add('correct');
                }
            });
            
            const randomFeedback = incorrectFeedbacks[Math.floor(Math.random() * incorrectFeedbacks.length)];
            feedbackElement.textContent = randomFeedback;
            feedbackElement.classList.add('incorrect-feedback');
            
            mistakes++;
            mistakesCounter.textContent = mistakes;
            mistakesMessage.textContent = mistakesMessages[mistakes - 1];
            
            setTimeout(() => {
                feedbackElement.textContent = '';
                feedbackElement.classList.remove('incorrect-feedback');
                
                if (mistakes >= 3) {
                    finalCorrect.textContent = correctAnswers;
                    showScreen(gameoverScreen);
                } else {
                    displayQuestion(getRandomQuestion());
                }
            }, 1500);
        }
    }
    
    function resetGame() {
        mistakes = 0;
        correctAnswers = 0;
        mistakesCounter.textContent = '0';
        correctCounter.textContent = '0';
        mistakesMessage.textContent = '';
    }
    
    // معالجات الأحداث
    startBtn.addEventListener('click', () => {
        resetGame();
        displayQuestion(getRandomQuestion());
        showScreen(questionScreen);
    });
    
    exitBtn.addEventListener('click', () => {
        // يمكنك إضافة أي وظيفة للخروج هنا
        alert('شكرًا لاستخدامك التطبيق!');
    });
    
    aboutIcon.addEventListener('click', () => {
        showScreen(aboutScreen);
    });
    
    backBtn.addEventListener('click', () => {
        showScreen(welcomeScreen);
    });
    
    retryBtn.addEventListener('click', () => {
        resetGame();
        displayQuestion(getRandomQuestion());
        showScreen(questionScreen);
    });
    
    quitBtn.addEventListener('click', () => {
        showScreen(welcomeScreen);
    });
    
    // تهيئة التطبيق
    showScreen(welcomeScreen);
});

