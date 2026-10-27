let walkSprite; // 儲存角色的步行精靈圖
let characterX; // 儲存角色目前的水平位置
let facingDirection = 1; // 設定角色初始朝向右方
let isMoving = false; // 記錄角色本影格是否正在移動
const spriteFrameCount = 8; // 設定精靈圖中的影格數量
const spriteFrameWidth = 1019 / spriteFrameCount; // 根據整張圖寬度計算單格寬度
const characterHeight = 195; // 設定角色原始顯示高度
const movementSpeed = 4; // 設定角色每影格的移動速度

function preload() { // 在畫面建立前載入角色精靈圖
  walkSprite = loadImage('1/walk/walk.png'); // 載入步行動畫圖片
} // 結束圖片載入函式

function setup() { // 設定畫布與角色初始位置
  createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布
  characterX = width / 2; // 將角色放在畫面水平中央
  imageMode(CORNER); // 使用圖片左上角作為繪製座標
  noSmooth(); // 保持精靈圖像素邊緣清晰
} // 結束畫布設定函式

function draw() { // 每個動畫影格更新畫面與角色狀態
  background('#caf0f8'); // 使用指定的淺藍色清除畫面
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查左方向鍵是否按住
  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查右方向鍵是否按住
  const direction = Number(movingRight) - Number(movingLeft); // 計算本影格移動方向
  isMoving = direction !== 0; // 依方向鍵狀態更新移動狀態
  if (isMoving) { // 只有按下單一方向鍵時才移動角色
    facingDirection = direction; // 讓角色朝向目前的移動方向
    characterX += direction * movementSpeed; // 依移動方向更新角色水平位置
  } // 結束方向鍵移動判斷
  const displayScale = min(1, (height * 0.7) / characterHeight); // 小畫面時縮小角色以避免過高
  const displayWidth = spriteFrameWidth * displayScale; // 計算角色顯示寬度
  const displayHeight = characterHeight * displayScale; // 計算角色顯示高度
  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制角色留在畫布範圍內
  const frameIndex = isMoving ? floor(frameCount / 8) % spriteFrameCount : 0; // 移動時循環播放八格動畫
  push(); // 暫存目前的繪圖座標與變形狀態
  translate(characterX, height / 2); // 將繪圖原點移至角色中心
  scale(facingDirection, 1); // 依朝向翻轉角色圖片
  image(walkSprite, -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight, frameIndex * spriteFrameWidth, 0, spriteFrameWidth, characterHeight); // 繪製目前的精靈影格
  pop(); // 還原繪圖座標與變形狀態
} // 結束畫面更新函式

function windowResized() { // 視窗尺寸改變時同步調整畫布
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個視窗
} // 結束視窗尺寸處理函式
