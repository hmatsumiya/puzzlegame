# PuzzleGame

## 遊び方
### 起動
1. index.html を Firefox や Google Chrome などのブラウザで開く．

### 操作方法
|  key  |      action     |
|:-----:|:---------------:|
| **a** |       left      |
| **s** |       down      |
| **w** |        up       |
| **d** |       right     |
| **b** |     fill_cell   |
| **n** |    ckeck_cell   |
| **m** |    clear_cell   |

## ファイルの説明
### css
見た目を定義する．

### script->Map.js
Map には各問題と完成した絵の名前が定義されている．

### script->Top.js
Top から問題を選択するシーンを定義．

### script->AddElement.js
DOM を変更するためのスクリプト．

### script->Init.js
セルの初期化を行う．

### script->Move.js
操作と判定，クリア後のイベントを指定．

### script->Main.js
Init.js と Draw.js を実行する．

## 編集方法
見た目を編集する場合は main.css を編集する．動作の編集は script 内のファイルを編集．  
プログラムは JavaScript で書いているため，ブラウザでindex.html を開くと動作します．  
また，コンパイルの必要はなく，F5などでブラウザのリロードをすると変更が反映されます．
