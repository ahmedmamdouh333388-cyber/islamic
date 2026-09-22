// تغيير ألوان الخلفية كل ثانيتين
const colors = ['#f0f4f8', '#e8f8f5', '#fef9e7', '#f4ecf7', '#eaf2f8'];
let colorIndex = 0;
setInterval(() => {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}, 2000);

// التنقل بين الشاشات
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// تسجيل الدخول مع التحقق من كلمة السر (2468) وإظهار التنبيه
function checkPassword() {
    var input = document.getElementById('passInput').value;
    if (input.trim() === '2468') {
        showScreen('screen-salawat');
        var audio = document.getElementById('bgAudio');
        if (audio) {
            audio.play().catch(function(err) {
                console.log("Audio autoplay disabled by browser policy");
            });
        }
    } else {
        alert('كلمة السر خطأ');
    }
}

// تشغيل / إيقاف الصوت
function toggleAudio() {
    var audio = document.getElementById('bgAudio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// عداد الصلاة على النبي الأولى
var salawatCount = 10;
function countSalawat() {
    if (salawatCount > 1) {
        salawatCount--;
        document.getElementById('salawat-count').innerText = salawatCount;
    } else {
        document.getElementById('salawat-count').innerText = 0;
        document.getElementById('btn-salawat-next').style.display = 'block';
    }
}

// أسئلة المسابقة
var questionsData = {
    easy: [
        { q: "من هو أول الأنبياء؟", options: ["آدم عليه السلام", "نوح عليه السلام", "إبراهيم عليه السلام"], correct: 0 },
        { q: "ما هو كتاب المسلمين المقدس؟", options: ["القرآن الكريم", "التوراة", "الإنجيل"], correct: 0 },
        { q: "كم عدد أركان الإسلام؟", options: ["5", "6", "4"], correct: 0 },
        { q: "ما هي قبلة المسلمين؟", options: ["الكعبة المشرفة", "المسجد الأقصى", "المسجد النبوي"], correct: 0 },
        { q: "في أي شهر يصوم المسلمون؟", options: ["رمضان", "شعبان", "محرم"], correct: 0 },
        { q: "من هو خاتم الأنبياء والمرسلين؟", options: ["محمد ﷺ", "عيسى عليه السلام", "موسى عليه السلام"], correct: 0 },
        { q: "ما هي أول صلاة في اليوم؟", options: ["الفجر", "الظهر", "العصر"], correct: 0 },
        { q: "كم عدد الصلوات المفروضة؟", options: ["5", "3", "7"], correct: 0 },
        { q: "ما هي السورة التي تسمى بأم الكتاب؟", options: ["الفاتحة", "البقرة", "الإخلاص"], correct: 0 },
        { q: "أين ولد النبي محمد ﷺ؟", options: ["مكة المكرمة", "المدينة المنورة", "القدس"], correct: 0 }
    ],
    medium: [
        { q: "كم عدد سور القرآن الكريم؟", options: ["114", "110", "120"], correct: 0 },
        { q: "من هو الصحابي الملقب بالفاروق؟", options: ["عمر بن الخطاب", "أبو بكر الصديق", "عثمان بن عفان"], correct: 0 },
        { q: "ما هي أطول سورة في القرآن؟", options: ["البقرة", "النساء", "آل عمران"], correct: 0 },
        { q: "من هو الصحابي الذي اهتز لموته عرش الرحمن؟", options: ["سعد بن معاذ", "حمزة بن عبد المطلب", "مصعب بن عمير"], correct: 0 },
        { q: "كم عدد أجزاء القرآن الكريم؟", options: ["30", "60", "15"], correct: 0 },
        { q: "ما هي السورة التي لا تبدأ بالبسملة؟", options: ["التوبة", "الأنفال", "يس"], correct: 0 },
        { q: "من هو كليم الله؟", options: ["موسى عليه السلام", "إبراهيم عليه السلام", "عيسى عليه السلام"], correct: 0 },
        { q: "ما هي أقصر سورة في القرآن؟", options: ["الكوثر", "الإخلاص", "الناس"], correct: 0 },
        { q: "في أي غزوة أُسر المشركون لأول مرة؟", options: ["بدر", "أحد", "الخندق"], correct: 0 },
        { q: "من هي أول أمهات المؤمنين؟", options: ["خديجة بنت خويلد", "عائشة بنت أبي بكر", "حفصة بنت عمر"], correct: 0 }
    ],
    hard: [
        { q: "من هو الصحابي الذي اهتز لموته عرش الرحمن؟", options: ["سعد بن معاذ", "زيد بن حارثة", "عبادة بن الصامت"], correct: 0 },
        { q: "ما هي السورة التي تحتوي على بسملتين؟", options: ["النمل", "النحل", "الحج"], correct: 0 },
        { q: "من هو أول من حيا الرسول بتحية الإسلام؟", options: ["أبو ذر الغفاري", "أبو بكر الصديق", "علي بن أبي طالب"], correct: 0 },
        { q: "كم كان عمر النبي ﷺ عند البعثة؟", options: ["40 سنة", "35 سنة", "50 سنة"], correct: 0 },
        { q: "ما هي السورة التي تسمى عروس القرآن؟", options: ["الرحمن", "يس", "الواقعة"], correct: 0 },
        { q: "من هو أمين هذه الأمة؟", options: ["أبو عبيدة بن الجراح", "معاذ بن جبل", "خالد بن الوليد"], correct: 0 },
        { q: "كم عدد السجدات في القرآن الكريم؟", options: ["15", "12", "10"], correct: 0 },
        { q: "من هي المرأة التي جادلت النبي ونزل فيها قرآن؟", options: ["خولة بنت ثعلبة", "أسماء بنت أبي بكر", "أم سلمة"], correct: 0 },
        { q: "ما هي الغزوة التي سميت الفاضحة؟", options: ["التوبة (غزوة تبوك)", "الأحزاب", "حنين"], correct: 0 },
        { q: "من هو أول سفير في الإسلام؟", options: ["مصعب بن عمير", "عثمان بن عفان", "جعفر بن أبي طالب"], correct: 0 }
    ]
};

var currentLevel = '';
var currentQIndex = 0;
var lives = 3;
var timer = null;
var timeLeft = 15;
var completedLevels = { easy: false, medium: false, hard: false };

function startQuiz(level) {
    if (completedLevels[level]) return;
    currentLevel = level;
    currentQIndex = 0;
    lives = 3;
    showScreen('screen-quiz');
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    document.getElementById('quiz-feedback').innerText = '';
    document.getElementById('lives-display').innerText = '❤️'.repeat(lives);
    document.getElementById('q-num').innerText = currentQIndex + 1;

    var qData = questionsData[currentLevel][currentQIndex];
    document.getElementById('question-text').innerText = qData.q;

    var opts = qData.options.map((opt, i) => ({ text: opt, isCorrect: i === qData.correct }));
    opts.sort(() => Math.random() - 0.5);

    var container = document.getElementById('options-container');
    container.innerHTML = '';
    opts.forEach(o => {
        var btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = o.text;
        btn.onclick = function() { handleAnswer(o.isCorrect); };
        container.appendChild(btn);
    });

    timeLeft = 15;
    document.getElementById('progress-fill').style.width = '100%';
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('progress-fill').style.width = (timeLeft / 15 * 100) + '%';
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswer(false);
        }
    }, 1000);
}

function handleAnswer(isCorrect) {
    clearInterval(timer);
    if (isCorrect) {
        document.getElementById('quiz-feedback').innerText = '❤️ الإجابة صحيحة ❤️';
        setTimeout(function() {
            currentQIndex++;
            if (currentQIndex < 10) {
                loadQuestion();
            } else {
                completedLevels[currentLevel] = true;
                var btn = document.getElementById('btn-lvl-' + currentLevel);
                if (btn) {
                    btn.innerText = 'مكتملة';
                    btn.classList.add('disabled');
                }
                
                showScreen('screen-levels');
                if (completedLevels.easy && completedLevels.medium && completedLevels.hard) {
                    document.getElementById('btn-levels-next').style.display = 'block';
                }
            }
        }, 1000);
    } else {
        lives--;
        if (lives > 0) {
            alert('إجابة خاطئة! حاول مجدداً في هذا السؤال.');
            loadQuestion();
        } else {
            alert('انتهت محاولاتك! ستعيد المستوى من البداية.');
            startQuiz(currentLevel);
        }
    }
}

// عدادات الأذكار (4 مراحل)
var dhikrCounts = [10, 10, 10, 10];
function countDhikr(index) {
    var idx = index - 1;
    if (dhikrCounts[idx] > 1) {
        dhikrCounts[idx]--;
        document.getElementById('dhikr' + index + '-count').innerText = dhikrCounts[idx];
    } else {
        document.getElementById('dhikr' + index + '-count').innerText = 0;
        document.getElementById('btn-dhikr' + index + '-next').style.display = 'block';
    }
}

// عرض أذكار الصباح والمساء
function showAdhkar(type) {
    var box = document.getElementById('adhkar-box');
    box.style.display = 'block';
    if (type === 'morning') {
        box.innerHTML = "<b>أذكار الصباح:</b><br>- أصبحنا وأصبح الملك لله والحمد لله.<br>- آية الكرسي.<br>- اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور.";
    } else {
        box.innerHTML = "<b>أذكار المساء:</b><br>- أمسينا وأمسى الملك لله والحمد لله.<br>- آية الكرسي.<br>- اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير.";
    }
    document.getElementById('btn-adhkar-finish').style.display = 'block';
}

// عداد الصلاة على النبي الأخيرة
var finalSalawatCount = 10;
function countFinalSalawat() {
    if (finalSalawatCount > 1) {
        finalSalawatCount--;
        document.getElementById('final-salawat-count').innerText = finalSalawatCount;
    } else {
        document.getElementById('final-salawat-count').innerText = 0;
        document.getElementById('exit-text').style.display = 'block';
    }
}
