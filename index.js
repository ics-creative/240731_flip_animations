/* セクション1：transformのデモ */
const section1 = document.getElementById("section1")
const box = section1.querySelector(".box")
const button1=  section1.querySelector(".anim-button")

button1.addEventListener("click", () => {
  // 1. スタイルを取得
  const prev = box.getBoundingClientRect()
  // 2. スタイルを変更
  box.classList.toggle("active")
  // 3. スタイルを取得
  const next = box.getBoundingClientRect()
  // 4. アニメーションを適用
  box.animate([
      {
        translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
      },
      {
        translate: "0 0",
      },
    ], {

      duration: 400

    }
  )
})

/* セクション2：flex-directionのデモ */
const section2 = document.getElementById("section2")
const section2Container = section2.querySelector(".container")
const section2Boxed = section2.querySelectorAll(".box")
const button2 = section2.querySelector(".anim-button")

button2.addEventListener("click", () => {

  const prev = [...section2Boxed].map(box => {
    // 1. スタイルを取得
    const prev = box.getBoundingClientRect()
    return prev
  })
  // 2. スタイルを変更
  section2Container.classList.toggle("active")


  section2Boxed.forEach((box, index) => {
    // 3. スタイルを取得
    const next = box.getBoundingClientRect()
    // 4. アニメーションを適用
    box.animate([
        {
          translate: `${prev[index].x - next.x}px ${prev[index].y - next.y}px`,
        },
        {
          translate: "0 0",
        },
      ], {
        duration: 400
      }
    )
  })
})
