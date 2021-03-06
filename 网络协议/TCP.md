# 头部

对于TCP头部来说，以下几个字段是很重要的：

- Sequence number，这个序号保证了TCP传输的报文都是有序的，对端可以通过序号顺序的拼接报文

- Acknowledgement Number ，这个序号表示数据接收端期望接收的下一个字节的编号是多少，同时也表示上一个序号的数据已经接收到

- Window Size，窗口大小，表示还能接收多少字节的数据，用于流量控制

- 标识符

1. URG=1：该字段为一表示本数据报的数据部分包含紧急信息，是一个高优先级数据报文，此时仅仅指针有效。紧急数据一定位于当前数据包数据部分的最前面，紧急
指针标明了紧急数据的尾部。

2. ACK=1：该字段为一表示确认字段有效。此外，TCP还规定在连接建立后传送的所有报文段都必须把ACK置为1.

3. PSH=1：该字段为一表示接收端应该立即将数据push给应用层，而不是等到缓冲区满后再提交。

4.RST=1：该字段为一表示当前TCP连接出现严重问题，可能需要重新建立TCP连接，也可以用于拒绝非法的报文段和拒绝连接请求。

5.SYN=1:当SYN=1，ACK=0时，表示当前报文段是一个连接请求报文。当SYN=1，ACK=1时，表示当前报文段是一个同意建立连接的应答报文。

6.FIN=1：该字段为一表示此报文段是一个释放连接的请求报文。

# 状态机

TCP的状态机是复杂的，并且与建立断开连接时的握手息息相关，

重要指标RTT：该指标表示发送端发送数据到接收到对端数据所需的往返时间

##  建立连接三次握手

首先假设主动发起请求的一端称为客户端，被动连接的一端称为服务端。不管是客户端还是服务端，TCP连接建立完成后都能发送和接收数据，所以TCP是一个全双工的协议。

起初，两端都为CLOSED状态。在通信开始前，双方都会创建TCB。服务器创建完TCB后便进入LISTEN状态，此时开始等待客户端发送数据。

### 第一次握手

客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 SYN-SENT状态。

### 第二次握手

服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入SYN-RECEIVED状态。

### 第三次握手

当客户端收到连接同意的应答后，还要想服务端发送一个确认报文。客户端发完这个报文段便进入ESTABLISHED状态，服务端收到这个应答后也进入ESTABLISHED状态，此时连接建立成功。

PS：第三次握手中可以包含数据，通过快速打开（TFO）技术就可以实现这一功能。其实只要涉及到握手的协议，都可以使用乐死TFO的方式，客户断喝服务端存储相同的cookie，
下次握手时发出cookie达到减少RTT的目的。

* 为什么TCP建立连接需要三次握手，明明两次就可以建立连接*

因为这是为了防止出现失效的连接请求报文段被服务端接收的情况，从而产生错误。

可以想象如下场景。客户端发送了一个连接请求A，但是因为网络原因造成超时，这时TCP会启动超时重传的机制再次发送一个连接请求B。此时请求顺利到达服务端，
服务端应答完就建立了请求，然后接收数据后释放了连接。

假设这时候连接请求A在两端关闭后终于抵达了服务端，那么此时服务端会认为客户端又需要建立TCP连接，从而应答了该请求并进入ESTABLISHED状态。但是客户端
其实是CLOSED的状态，那么就会导致服务端一直等待，造成资源的浪费。

PS：在建立连接中，任意一端掉线，TCP都会重发SYN包，一般会重试五次，在建立连接中可能会遇到SYN Flood攻击。遇到这种情况你可以选择调低重试次数或者
干脆在不能处理的情况下拒绝请求。


## 断开连接四次握手

TCP是全双工的，在断开连接时两端都需要发送FIN和ACK.

### 第一次握手

若客户端A认为数据发送完成，则它需要向服务端B发送连接释放请求。

###  第二次握手

B收到连接释放请求后，会告诉应用层要释放TCP链接。然后会发送ACK包，并进入CLOSE_WAIT状态，此时表明A到B的连接已经释放，不再接收A发的数据了。但是
因为TCP连接是双向的，所以B仍旧可以发送数据给A。

### 第三次握手

B如果此时还有没发完的数据会继续发送，完毕后会向A发送连接释放请求，然后B便进入LAST-ACK状态。

PS：通过延迟确认的技术（通常有时间限制，否则对方会误认为需要重传），可以将第二次和第三次握手合并，延迟ACK包的发送。

### 第四次握手

A收到释放请求后，向B发送确认应答，此时A进入TIME-WAIT状态。该状态会持续2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃）时间，
若该时间段内没有B的重发请求的话，就进入CLOSED状态。当B收到确认应答后，也便进入CLOSED状态

*为什么A要进入TIME-WAIT状态，等待2MSL时间后才进入CLOSED状态*

为了保证B能收到A的确认应答。若A发完确认应答后直接进入CLOSED状态，如果确认应答因为网络问题一直没有到达，那么就会造成B不能正常关闭。

## ARQ协议

ARQ协议也就是超时重传机制。通过确认和超时机制保证了数据的正确送达，ARQ协议包含停止等待ARQ和连续ARQ两种协议。

### 停止等待ARQ

#### 正常传输过程

只要A向B发送一段报文，都要停止发送并启动一个定时器，等待对端回应，在定时器时间内接收到对端应答就取消定时器并发送下一段报文。

#### 报文丢失或出错

在报文传输的过程中可能会出现丢包。这时候超过定时器设定的时间就会再次发送丢失的数据直到对端响应，所以需要每次都备份发送的数据。

即使报文正常的传输到对端，也可能出现在传输过程中报文出错的问题。这时候对端会抛弃该报文并等待A端重传。

PS：一般定时器设定的时间都会大于一个RTT的平均时间。

#### ACK超时或丢失

对端传输的应答也可能出现丢失或超时的情况。那么超过定时器时间a段照样会重传报文。这时候B端收到相同序号的报文会丢弃该报文并重传应答，
直到A端发送下一个序号的报文。

在超时的情况下也可能出现应答很迟到达，这时A端会判断该序号是否已经接收过，如果接收过只需要丢弃应答即可。

从上面的描述中大家肯定可以发现这不是一个高效的方式。假设在良好的网络环境中，每次发送数据都需要等待片刻肯定是不能接受的。那么既然我们不能
接受这个那么不高效的协议，就来学习相对高效的协议吧。

### 连续ARQ

在连续ARQ中，拥有一个发送端口，可以在没有收到应答的情况下持续发送窗口内的数据，这样相比停止等待ARQ协议来说减少了等待时间，提高了效率。

### 累计确认

连续ARQ中，接收端会持续不断收到报文。如果和停止等待ARQ中接收一个报文就发送一个应答一样，就太浪费资源了。通过累计确认，可以在收到多个报文
以后统一答复一个应答报文。报文中的ACK标志位可以用来告诉发送端这个序号之前的数据已经全部接收到了，下次请求发送这个序号后的数据。

但是累计确认也有一个弊端。在连续接收报文时，可能会遇到接收序号5的报文后，并未接收到序号6的报文，然而序号7以后的报文已经接收。遇到这种情况时，
ACK只能回复6，这样就会造成发送端重复发送数据的情况。

### 滑动窗口

在TCP中，两端其实都维护着窗口：分别为发送端窗口和接收端窗口。

发送端窗口包含已发送但未收到应答的数据和可以发送但是未发送的数据。

发送端窗口是由接收窗口剩余大小决定的。接收方会把当前接受窗口的剩余大小写人应答报文，发送端收到应答后根据该值和当前网络拥塞情况设置发送窗口的大小，
所以发送窗口大小是不断变化的。

当发送端接收到应答报文后，会随之将窗口进行滑动

滑动窗口是一个很重要的概念，它帮助TCP实现了流量控制的功能。接收方通过报文告知发送方还可以发送多少数据，从而保证接收方能够来得及接收数据，防止出现
接收方带宽已满，但是发送方一直发送数据的情况。

### Zero窗口

在发送报文的过程中，可能会遇到对端出现零窗口的情况。在该情况下，发送端会停止发送数据，并启动persistent timer 。该定时器会定时发送请求给对端，
让对端告知窗口大小。在重试次数超过一定次数后，可能会中断TCP链接。

### 拥塞处理

拥塞处理和流量控制不同，后者作用于接收方，保证接收方来得及接受数据。而前者是非作用于网络，防止过多的数据拥塞网络，避免出现网络负载过大的情况。

拥塞处理包括四个算法：慢开始、拥塞避免、快速重传、快速恢复。

#### 慢开始算法

慢开始算法，顾名思义，就是在传输开始时将发送窗口慢慢指数级扩大，从而避免一开始就传输大量数据导致网络拥塞。想必大家都下载过资源，每当我们开始下载
的时候都会发现下载速度是慢慢提升，而不是一蹴而就直接拉满带宽。

慢开始算法步骤如下：

1.连接初始设置拥塞窗口（Congestion Window）为1MSS（一个分段的最大数据量）

2.每过一个RTT就将窗口大小乘二

3.指数级增长肯定不能没有限制的，所以有一个阈值限制，当窗口大小大于阈值时就会启动拥塞避免算法。

#### 拥塞避免算法

拥塞避免算法相比简单点，每过一个RTT窗口大小只加一，这样能够避免指数级增长导致网络拥塞，慢慢将大小调整到最佳值。

在传输过程中可能定时器超时的情况，这时候TCP会认为网络拥塞了，会马上进行以下步骤：

- 将阈值设为当前拥塞窗口的一半
- 将拥塞窗口设为1MSS
- 启动拥塞避免算法

#### 快速重传

快速重传一般和快速恢复一起出现。一旦接收端收到的报文出现失序的情况，接收端只会回复最后一个顺序正确的报文序号。如果发送端收到三个重复的ACK，
无需等待定时器超时而直接启动快速重传算法。具体算法分为两种：

##### TCP Taho 实现如下

- 将阈值设为当前拥塞窗口的一半
- 将拥塞窗口设为1MSS
- 重新开始慢开始算法

##### TCP Reno 实现如下：

- 拥塞窗口减半
- 将阈值设为当前拥塞窗口
- 进入快恢复阶段（重发对端需要的包，一旦收到一个新的ACK答复就退出该阶段），这种方式在丢失多个包的情况下就不那么好了
- 使用拥塞避免算法

#### TCP New Ren 改进后的快恢复

TCP New Reno 算法改进了之前TCP Reno 算法的缺陷。在之前，快恢复中只要收到一个新的ACK包，就会退出快恢复。

在TCP New Reno 中，TCP发送方先记下三个重复ACK的分段的最大序号。

假如我有一个分段数据是1-10这十个序号的报文，其中丢失了序号为3和7的报文，那么该分段的最大序号就是10.发送端只会收到ACK序号为3的应答。
这个时候重发序号为3的报文，接收方顺利接收的话就会发送ACK序号为7的应答。这时候TCP知道对端是有多个包未收到，会继续发送序号为7的报文，接收方顺利
接收并会发送ACK序号为11的应答，这时发送端认为这个分段接收端已经顺利接收，接下来会退出快恢复阶段。

总结：
- 建立连接需要三次握手，断开连接需要四次握手
- 滑动窗口解决了数据丢包，顺序不对和流量控制问题
- 拥塞窗口实现了对流量的控制，保证在全天候环境下最优的传递数据





