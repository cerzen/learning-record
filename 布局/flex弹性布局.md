# Flex相关属性

## 容器属性
 - flex-flow
 - flex-direction
 - flex-wrap
 - justify-content
 - align-items
 - align-content
 
## 元素属性

- order 
- flex-grow
- flex-shrink
- flex-basis
- flex
-align-self 

# 一、flex弹性盒模型

对于某个元素只要声明了 `display:flex;`，那么这个元素就成为了弹性容器，具有flex弹性布局的特性。

1.每个弹性容器都有两根轴：主轴和交叉轴，两轴之间成90度关系。注：水平的不一定就是主轴。

2.每根轴都有起点和终点，这对于元素的对齐非常重要。

3.弹性容器中的所有子元素称为<弹性元素>，弹性元素永远沿主轴排列。

4.弹性元素也可以通过`display:flex`设置为另一个弹性容器，形成嵌套关系。因此一个元素既可以是弹性容器也可以是弹性容器。

弹性容器的两根轴非常重要，所有属性都是作用于轴的。

# 二、主轴

flex布局是一种一维布模型，一次只能处理一个维度（一行或者一列）上的元素布局，作为对比的二维布局 CSS Grid Layout，
可以同时处理行和列上的布局。

也就是说，flex布局大部分的属性都是作用于主轴的，在交叉轴上很多时候只能被动地变化。

## 1.主轴的方向

我们可以在弹性容器上通过 `flex-direction`修改主轴的方向。如果主轴方向修改了,那么：

  1.交叉轴就会相应地旋转90度。
  
  2.弹性元素的排列方式也会发生改变，因为弹性元素永远沿主轴排列
  
  - flex-direction:row row(默认) 左->右
  
  - flex-direction: column column 上->下
  
  - flex-direction:row-reverse row-reverse 左 <- 右
  
  - flex-direction:column-reverse column-reverse 上<-下
  
## 2.沿主轴的排列处理

弹性元素永远沿主轴排列，那么如果主轴排不下下，该如何处理

通过设置`flex-wrap:nowrap|wrap|wrap-reverse` 可使得主轴上的元素不折行、折行、反向折行。

默认是`nowrap`不折行。

`wrap`折行，即另起一行的意思。

`wrap-reverse`反向折行，是从容器底部开始的折行，但每行元素之间的排列扔保留正向。

## 3.一个复合属性

`flex-flow = flex-direction + flex-wrap`

`flex-flow`相当于规定了flex布局的“工作流（flow）”

`flex-flow"row nowrap`

# 三、元素如何弹性伸缩应对

当`flex-wrap:nowrap;`不折行时，容器宽度有剩余/不够分，弹性元素们该怎么“弹性”地伸缩应对

这里针对上面两种场景，引入两个属性（需应用在弹性元素上）
 
 1.`flex-shrink`:缩小比例(容器宽度<元素总宽度时如何收缩)
 
 2.`flex-grow`：放大比例（容器>元素总宽度时如何伸展）
 
## 1.flex-shrink：缩小比例

来看下以下场景，弹性容器`#container`宽度是200px，一共有三个弹性元素，宽度分别是50px，100px，120px。在不拆行的情况下，此时容器宽度是明显不够分配的。

实际上，`flex-shrink`默认为1，也就是当不够分配时，元素都将等比例缩小，占满整个宽度。

```

#container{
 display:flex;
 flex-wrap:nowrap;
}

```

元素收缩的计算方法：

真的是等比缩小（每个元素各减去70/3的宽度）吗？这里稍微探究下他的收缩计算方法。

  1.弹性元素1:50px->37.03px
  
  2.弹性元素2：100px->74.08px
  
  3.弹性元素3:120px ->88.89px
  
 先抛结论：`flex-shrink:1`并非严格等比缩小，它还会考虑弹性元素本身的大小。
  
  - 容器剩余宽度： -70px
  
  - 缩小因子的分母： 1*50 + 1*100 + 1*120 = 270(1为各元素flex-shrink的值)
  
  - 元素1的缩小因子： 1*50/270
  
  - 元素1的缩小宽度为缩小因子乘以容器剩余宽度：1*50/270 *(-70)
  
  - 元素1 最后则缩小为： 50px+(1*50/270*(-70)) = 37.03px
  
  加入弹性元素 本身大小作为计算方法的考虑因素，主要是为了避免将一些本身宽度较小的元素在收缩后宽度变为0的情况出现。
  
## 2.flex-grow:放大比例

  同样，弹性容器`#container`宽度是200px，但此时只有两个弹性元素，宽度分别是50px、100px。此时容器宽度是有剩余的.
  
  那么剩余的宽度该怎么样分配？ 而`flex-grow`则决定了要不要分配以及各个分配多少。
  
  （1）在flex布局中，容器剩余宽度默认是不进行分配的，也就是所有弹性元素的`flex-grow`都为0.
  
  （2）通过指定`flex-grow`为大于零的值，实现容器剩余宽度的分配比例设置。
  
  元素放大的计算方法
  
  放大的计算方法并没有与缩小一样，将元素大小纳入考虑。
  
  仅仅按`flex-grow`声明的份数算出每个需分配多少，叠加到原来的尺寸上。
  
   - 容器剩余宽度：50px
   
   - 分成每份：50px/(3+2) = 10px
   
   - 元素1放大为：50px+3*10 = 80px
   
   无多余宽度时，flex-grow 无效
   
   同理，对于`flex-shrink`,在容器宽度有剩余时也不会生效。因此这两个属性是针对两种不同场景的互斥属性。
   
  # 四、弹性处理与刚性尺寸
  
  在进行弹性处理之余，其实有些场景我们更希望元素尺寸固定，不需要进行弹性调整。设置元素尺寸除了width和height以为，
  flex还提供了一个`flex-basis`属性。
  
  `flex-basis`设置的是元素在主轴上的初始尺寸，所谓的初始尺寸就是元素在`flex-grow`和`flex-shrink`生效前的尺寸。
  
  ## 1.与width/height的区别
  
  首先以width为例进行比较。 `#container{display:flex;}`
  
  ```
  
  <div id="container">
    <div>1111</div>
    <div>2222</div>
  </div>
  
  ```
  
   (1)两者都为0
   
   ```
   
   div > div:first-child{
     width:0;
   }
   
   div > div:nth-child(2){
    flex-basis:0;
   }
   
   ```
   
   - width：0 ----完全没显示
   
   - flex-basis:0 --- 根据内容撑开宽度
   
   (2)两者非0
   
   ```
   
   div > div:first-child{
    width:50px;
   }
   
   div > div:nth-child(2){
    flex-basis:50px;
    width:60px;
   }
   
   ```
   
   - width：非0 ------数值相同时两者等效。
   
   - flex-basis:非0 ---- 同时设置，flex-basis优先级高
   
   (3)flex-basis为auto
   
   ```
   
   div > div:first-child{
    flex-basis: auto;
   }
   
   div > div:nth-child(2){
    flex-basis:auto;
    width:60px;
   }
   
   ```
   flex-basis为auto时，如设置了width则元素尺寸由width决定；没有设置则有内容决定
   
   (4)flex-basis== 主轴上的尺寸 ！=width
   
   ```
   #container{
     flex-direction:column;
   }
   
   div > div:first-child{
     flex-basis: auto;
     height:50px;
   }
   
   div > div:nth-child(2){
    flex-basis:60px;
    width:100px;
   }
   
   ```
   
   - 将主轴方向改为：上->下
   
   - 此时主轴上的尺寸是元素的height
   
   - flex-baiss==height
   
   ## 2.常用的复合属性flex
   
   这个属性应该是最容易迷糊的一个。
   
   flex=flex-grow+flex-shrink+felx-basis
   
   复合属性，前面说的三个属性的简写
   
   一些简写
   
   - felx:1 = flex: 1 1 0%
   
   - flex:2 = flex: 2 1 0%
   
   - flex:auto = flex: 1 1 auto;
   
   - flex: auto = flex: 0 0 auto;
   
   ### flex:1和flex:auto的区别
   
   其实可以归结于 `flex-basis:0`和`flex-basis:auto`的区别
   
   `flex-basis`是指定初始尺寸，当设置为0 时（绝对弹性元素），此时相当于告诉`flex-grow`和`flex-shrink`
   在伸缩的时候不需要考虑我的尺寸；相反设置为`auto`时（相对弹性元素），此时则需要在伸缩时将元素尺寸纳入考虑。
   
   
   # 五、容器内如何对齐
   
   前面讲完元素大小关系之后，下面是另一个重要议题——如何对齐。可以发现上面的所有属性都是围绕主轴进行设置的，
   但在对齐方面则不得加入作用于交叉轴上，需要注意的是这些对齐容器都是作用于容器上。
   
   1、主轴的对齐方式
   
   justify-content：
                   flex-start 左对齐
                   flex-end 右对齐
                   center 居中
                   space-between 间隔对齐
                   sapce-around  间隔对称对齐
                   
                   
   
   
   
   
   
  
  

原文：https://www.cnblogs.com/qcloud1001/p/9848619.html
