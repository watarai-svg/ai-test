const quizData = {
  "漢検4級": [
    {
      question: "『勇気』の読みとして正しいものは？",
      choices: ["ゆうき", "いさき", "ゆき", "ゆげ"],
      answer: 0,
      explanation:
        "『勇気（ゆうき）』は、こわさに負けずに行動する心の強さを表します。『勇』は“いさむ”という訓読みもあります。",
    },
    {
      question: "『河川』の意味として最も近いものは？",
      choices: ["山の道", "大きな川", "海の深い場所", "雨雲"],
      answer: 1,
      explanation:
        "『河川』は“川の流れ全体”を表す言葉です。『河』も『川』もどちらも“かわ”の意味を持っています。",
    },
    {
      question: "『節約』の『約』の意味として近いものは？",
      choices: ["集める", "減らす", "結ぶ", "しばる"],
      answer: 3,
      explanation:
        "『約』には“まとめる・しばる”というイメージがあります。『節約』はむだをしばって抑える、という感覚で覚えると分かりやすいです。",
    },
  ],
  "漢検準2級": [
    {
      question: "『顕著』の読みとして正しいものは？",
      choices: ["けんちょ", "けんしょ", "けんちゅ", "げんちょ"],
      answer: 0,
      explanation:
        "『顕著（けんちょ）』は、はっきり目立っていること。ニュースでは『効果が顕著に表れた』のように使います。",
    },
    {
      question: "『暫定』の意味として正しいものは？",
      choices: ["永久に決めること", "一時的に決めること", "大幅に変更すること", "公表しないこと"],
      answer: 1,
      explanation:
        "『暫』は“しばらく”の意味。『暫定』は、最終決定ではなく、ひとまず仮に決めた状態を表します。",
    },
    {
      question: "『模索』に近い意味はどれ？",
      choices: ["答えを探し求める", "強く反対する", "計画を中止する", "相手を説得する"],
      answer: 0,
      explanation:
        "『模索』は、手探りで探すこと。方法や解決策をすぐに決められないときに、試しながら探るニュアンスです。",
    },
  ],
  "漢検2級": [
    {
      question: "『拮抗』の読みとして正しいものは？",
      choices: ["きっこう", "けっこう", "きつこう", "きっこうう"],
      answer: 0,
      explanation:
        "『拮抗（きっこう）』は、力がほぼ等しく張り合っている状態を意味します。スポーツ記事でよく見かけます。",
    },
    {
      question: "『憂慮』の意味として最も近いものは？",
      choices: ["深く心配する", "強く喜ぶ", "冷静に観察する", "周囲に頼る"],
      answer: 0,
      explanation:
        "『憂』は“うれえる（心配する）”。『慮』は“おもんぱかる（深く考える）”。合わせて、先を案じて深く心配することです。",
    },
    {
      question: "『措置』に近い意味はどれ？",
      choices: ["事実を隠す", "必要な手だてを取る", "議論を拡大する", "時間を延長する"],
      answer: 1,
      explanation:
        "『措』は“おく・ほどこす”。『措置』は状況に応じた対応や処置を行うことを表します。",
    },
  ],
};

const levelSelect = document.getElementById("level");
const startBtn = document.getElementById("startBtn");
const quizPanel = document.getElementById("quizPanel");
const finishPanel = document.getElementById("finishPanel");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
const retryBtn = document.getElementById("retryBtn");

let currentQuiz = [];
let index = 0;
let score = 0;
let locked = false;

Object.keys(quizData).forEach((level) => {
  const option = document.createElement("option");
  option.value = level;
  option.textContent = level;
  levelSelect.appendChild(option);
});

startBtn.addEventListener("click", () => {
  const level = levelSelect.value;
  currentQuiz = [...quizData[level]];
  index = 0;
  score = 0;

  finishPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");

  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  index += 1;
  if (index >= currentQuiz.length) {
    showFinish();
  } else {
    renderQuestion();
  }
});

retryBtn.addEventListener("click", () => {
  finishPanel.classList.add("hidden");
  quizPanel.classList.add("hidden");
});

function renderQuestion() {
  locked = false;
  resultEl.textContent = "選択肢をタップ / クリックして答えよう";
  resultEl.className = "result";
  nextBtn.classList.add("hidden");

  const item = currentQuiz[index];
  questionEl.textContent = item.question;
  progressEl.textContent = `問題 ${index + 1} / ${currentQuiz.length}`;
  scoreEl.textContent = `正解 ${score}`;

  choicesEl.innerHTML = "";
  item.choices.forEach((choiceText, choiceIndex) => {
    const btn = document.createElement("button");
    btn.className = "btn choice";
    btn.textContent = `${choiceIndex + 1}. ${choiceText}`;
    btn.addEventListener("click", () => selectAnswer(choiceIndex, btn));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(choiceIndex, selectedButton) {
  if (locked) return;
  locked = true;

  const item = currentQuiz[index];
  const buttons = Array.from(choicesEl.children);
  const isCorrect = choiceIndex === item.answer;

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === item.answer) btn.classList.add("correct");
  });

  if (isCorrect) {
    score += 1;
    scoreEl.textContent = `正解 ${score}`;
    selectedButton.classList.add("correct");
    resultEl.className = "result correct";
    resultEl.innerHTML = `✅ 正解！<br>${item.explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    resultEl.className = "result wrong";
    resultEl.innerHTML = `❌ 不正解。正しい答えは「${item.choices[item.answer]}」です。<br>${item.explanation}`;
  }

  nextBtn.classList.remove("hidden");
}

function showFinish() {
  quizPanel.classList.add("hidden");
  finishPanel.classList.remove("hidden");
  finalScoreEl.textContent = `${currentQuiz.length}問中 ${score}問正解でした！`;
}
