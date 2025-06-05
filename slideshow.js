let slideIndex = 0;
let slideshowInterval; // スライドショーのインターバルを保持する変数
const fadeDuration = 1000; // フェードアニメーションの時間 (ミリ秒)

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // 全てのスライドを非表示にする
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove('fade-in'); // フェードインクラスを削除
    }

    // 全てのドットからactiveクラスを削除
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }

    // slideIndexを調整してループさせる
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // 現在のスライドを表示し、activeクラスを追加
    slides[slideIndex - 1].style.display = "block";
    // フェードインアニメーションを開始
    setTimeout(() => {
        slides[slideIndex - 1].classList.add('fade-in');
    }, 10); // 短い遅延を入れてdisplay:blockが適用された後にopacityが適用されるようにする

    // 現在のドットにactiveクラスを追加
    dots[slideIndex - 1].classList.add("active-dot");

    // 次のスライドへの自動切り替えを設定
    // 既存のインターバルをクリアしてから新しいインターバルを設定することで、重複を防ぐ
    clearInterval(slideshowInterval);
    slideshowInterval = setTimeout(showSlides, 5000); // 5秒ごとにスライドを切り替える
}

// ドットクリックでスライドを切り替える関数
function currentSlide(n) {
    slideIndex = n - 1; // showSlides内でインクリメントされるため -1
    showSlides();
}

// 前へ/次へボタンでスライドを切り替える関数
function plusSlides(n) {
    // 現在の自動切り替えを停止し、手動操作後も自動切り替えが再開するように設定
    clearInterval(slideshowInterval); // 現在のインターバルをクリア
    slideIndex += n -1; // showSlides内でインクリメントされるため
    showSlides();
}

// ページロード時にスライドショーを開始
document.addEventListener('DOMContentLoaded', showSlides);

// フェードアニメーションのCSS変数を使う場合は、以下のJSは不要です
// ただし、もしCSSでフェードアニメーションがうまく動かない場合は
// 以下のようなJSでopacityを制御する方法も検討できます
/*
function showSlidesWithFade() {
    // ... 前半のslideIndexとdisplayの制御は同じ ...

    // フェードインアニメーションをJavaScriptで制御する場合の例
    slides[slideIndex - 1].style.opacity = 0; // 一旦透明にしてから
    slides[slideIndex - 1].style.display = "block";
    let currentOpacity = 0;
    const fadeStep = 50; // ms
    const increment = 1 / (fadeDuration / fadeStep);

    let fadeEffect = setInterval(function () {
        if (currentOpacity >= 1) {
            clearInterval(fadeEffect);
        } else {
            currentOpacity += increment;
            slides[slideIndex - 1].style.opacity = currentOpacity;
        }
    }, fadeStep);

    clearInterval(slideshowInterval);
    slideshowInterval = setTimeout(showSlidesWithFade, 5000);
}
*/