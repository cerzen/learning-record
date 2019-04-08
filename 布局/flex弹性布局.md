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
  
  -flex-direction:row-reverse row-reverse 左 <- 右
  
  -flex-direction:column-reverse column-reverse 上<-下
  
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

原文：https://www.cnblogs.com/qcloud1001/p/9848619.html
