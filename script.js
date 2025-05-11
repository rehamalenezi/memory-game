const cardArray = [
    { id: 1, value: 'cat', img: 'imges/stich.png' }, { id: 2, value: 'cat', img: 'imges/stich.png' },
    { id: 3, value: 'dog', img: 'imges/stich1.png' }, { id: 4, value: 'dog', img: 'imges/stich1.png' },
    { id: 5, value: 'bird', img: 'imges/stich2.png' }, { id: 6, value: 'bird', img: 'imges/stich2.png' },
    { id: 7, value: 'fish', img: 'imges/stich3.png' }, { id: 8, value: 'fish', img: 'imges/stich3.png' },
    { id: 9, value: 'elephant', img: 'imges/stich4.png' }, { id: 10, value: 'elephant', img: 'imges/stich4.png' },
    { id: 11, value: 'tiger', img: 'imges/stich5.png' }, { id: 12, value: 'tiger', img: 'imges/stich5.png' },
    { id: 13, value: 'lion', img: 'imges/stich6.png' }, { id: 14, value: 'lion', img: 'imges/stich6.png' },
    { id: 15, value: 'rabbit', img: 'imges/stich7.png' }, { id: 16, value: 'rabbit', img: 'imges/stich7.png' }
];

// خلط ترتيب البطاقات عشان تكون عشوائية في كل مرة
cardArray.sort(() => 0.5 - Math.random());

// تحديد مكان اللوحة (container) في HTML
const gameBoard = document.getElementById('game-board');

// متغيرات لتتبع البطاقات المقلوبة والمطابقة
let flippedCards = []; // لحفظ البطاقتين اللي اختارهم المستخدم مؤقتًا
let matchedCards = []; // لحفظ البطاقات المتطابقة

// إضافة صوت
const cardClickSound = new Audio('sound/click.mp3'); // هنا تضيف رابط الصوت الخاص بك

// دالة لإنشاء البطاقات وعرضها على اللوحة
function createBoard() {
  cardArray.forEach(card => {
    const cardElement = document.createElement('div'); // إنشاء div لكل بطاقة
    cardElement.classList.add('card'); // إضافة كلاس CSS اسمه card
    cardElement.dataset.value = card.value; // حفظ القيمة لتستخدم بالمقارنة لاحقًا

    const cardImage = document.createElement('img'); // إنشاء عنصر صورة داخل البطاقة
    cardImage.src = card.img; // تحديد مصدر الصورة
    cardElement.appendChild(cardImage); // إضافة الصورة إلى البطاقة

    // عند الضغط على البطاقة، نفذ دالة flipCard
    cardElement.addEventListener('click', () => {
      cardClickSound.currentTime = 0; // يضمن تشغيل الصوت من البداية
      cardClickSound.play(); // تشغيل الصوت
      flipCard(cardElement);
    });

    // أضف البطاقة إلى لوحة اللعبة
    gameBoard.appendChild(cardElement);
  });
}

// دالة لقلب البطاقة عند الضغط عليها
function flipCard(card) {
  // تأكد أن اللاعب ما قلب أكثر من بطاقتين، والبطاقة ما تكون مفتوحة أو متطابقة
  if (flippedCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('matched')) {
    card.classList.add('open'); // أضف كلاس "open" عشان الصورة تطلع
    flippedCards.push(card); // أضف البطاقة للمصفوفة المؤقتة

    // إذا صار عندنا بطاقتين مقلوبات، نتحقق هل هن متطابقات
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// دالة لفحص إذا البطاقتين المقلوبات متطابقات
function checkMatch() {
  const [firstCard, secondCard] = flippedCards; // استخراج البطاقتين من المصفوفة

  if (firstCard.dataset.value === secondCard.dataset.value) {
    // إذا نفس القيمة، أضف كلاس matched وخلي الصورة تبقى
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    matchedCards.push(firstCard, secondCard); // خزّنهم في مصفوفة المطابقات
    flippedCards = []; // افرغ المصفوفة المؤقتة

    // تحقق إذا كانت جميع البطاقات قد تطابقت
    checkWin();
  } else {
    // إذا ما كانوا متطابقين، ارجع اقلبهم بعد 1 ثانية
    setTimeout(() => {
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');
      flippedCards = []; // افرغ المصفوفة المؤقتة
    }, 1000);
  }
}

// دالة للتحقق من الفوز
function checkWin() {
  if (matchedCards.length === cardArray.length) {
    setTimeout(() => {
      alert("لقد فزت! تهانينا!");
    }, 500);
  }
}

// استدعاء دالة إنشاء اللعبة عند بداية التشغيل
createBoard();
