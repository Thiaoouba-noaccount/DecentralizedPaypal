# 去中心化支付宝或paypal v1

**2019年8月1日**

**摘要:**  该系统旨在建立去中心化的无信任系统，充当各种交易和购物中买卖双方之间的中介，它将完全像支付宝或Paypal那样工作。 在我们看来，去中心化系统的灵魂在于社区，他们将受到经济刺激措施的鼓舞，以维护该系统的正常运转。 该系统基于以太坊或EOS区块链和智能合约，是无需信任和安全的。



Copyright © 2019

**DISCLAIMER:** Without permission, anyone may use, reproduce or distribute any material in this proposal for non-commercial and educational use (i.e., other than for a fee or for commercial purposes) provided that the original source and the applicable copyright notice are cited.



- [背景](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96paypal.md#背景)

- [需求](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96paypal.md#需求)

  - [易用性](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96paypal.md#易用性)
  - [智能合约保障安全交易](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96paypal.md#智能合约保障安全交易)
  - [激励机制](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96paypal.md#激励机制)
  
- [流程详解](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96paypal.md#流程详解)

- [结论](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96paypal.md#结论)

  

# 背景


去年我在以太坊的测试网络搞了个智能合约来替代当今的OTC市场，就是需要买数字货币的买家发一个订单，同时发出类似USDT和DAI这样的稳定币到合约里去被合约锁定，然后市场上很多卖家分食这个订单，把数字货币发到买家的钱包里去，买家确认后，就通知智能合约把对应数量的稳定币发到卖家的钱包去。对于卖单亦然，我这里介绍得比较简单，具体过程见这个[帖子](https://hive.blog/cn/@chenlocus/otc#@chenlocus/q2tz0o)。看起来，这个东西稍微修改下，就可以适应于支付宝或者paypal的作用，但是事情并没有这么简单，如同我在[区块链系统的灵魂](https://hive.blog/hive-105017/@chenlocus/6lzsju)这个帖子上说的，这样一个充当买卖中介的智能合约缺乏了灵魂，没人敢去用它，它没有解决支付宝或者paypal最重要的功能-----买家卖家发生纠纷时候的处理，甚至从技术上以太坊上的智能合约还做不到支付宝的某些纯支付中介的功能。



# 需求

为了获得广泛的使用，此系统需要建立一个足够灵活的平台来满足以下要求：

## 易用性 

使用该系统的人不需要特别了解加密货币交换或私钥/公钥。 这就要求系统可以与客户自己的钱包自动集成。 对于中继，不需要专业的技术知识来订购和中继与他们签约的交易所。 稳定硬币是此系统中非常重要的概念。 随着Facebook Libra的发展，

## 通用身份验证

该应用程序应支持用于访问事务的大量身份验证器。 下订单前应有完整的明确授权。


## 通过智能合约来保证买卖双方的安全和隐私

通过运行在以太坊或者EOS上的智能合约来保障交易者和中介人的资金安全，我们需要考虑有可能对合约的各种攻击进行防范。

## 激励机制吸引中介人为系统注入更多流动性

那些把订单中继到各个交易所的中介人，会得到足够的报酬，这样他们能被激励为系统注入更多流动性。







# 流程详解

我一直在思考怎么样弄一个这样的去中心化的支付宝，首先，我一直认为无论是比特币，还是以太坊，柚子(EOS)或者Hive，steem，它们都无法胜任日常支付的功能，原因很简单，就是它们的市场价格的波动性太强，唯有在它们上面创建的像USDT，USDC，DAI这样的[稳定币](https://hive.blog/teamaustralia/@chenlocus/stable-coins)才能胜任日常支付功能，这个合约必须能够接受市面上基于以太坊的各种稳定币，这个只要把我做的那个玩意稍加修改就可以事先；其次，它必须能够吸引一个社区来做仲裁这个事情，这个就是我一直头疼的问题，不是简单的智能合约能解决的，为了想出一个稍微靠谱的解决方案，我先去了解了下支付宝具体过程。

![image.png](https://images.hive.blog/DQmbWdcwf51bCLsLESYoEXoiAvsNR8GYMRNm1dndDycMwWZ/image.png)

支付宝是淘宝的副产品，当年没有支付宝，没人敢用淘宝，它就是解决卖家买家的支付问题，当买家买了一件产品后，她把钱付给支付宝，缺省是7天后，如果没有争议，钱自动从支付宝付给卖家账户（可以是支付宝或者银行账户），由于某些产品发货周期长，这个时间是可以在卖家买家之间协商的，如果产品发货时间被延迟，买家可以申请延长支付宝给卖家的付款时间，但是钱一旦到了卖家的账户，无论是支付宝账户，还是银行账户，买家就无法赎回了。如果关于产品出现争议，比如买家在指定时间没有收到买的产品，或者产品有质量问题，买家需要先和卖家沟通，如果沟通失败，那么买家需要提供支付的证据和买入的产品描述给淘宝，这个时候，淘宝的店小二就充当了仲裁人，在有足够的证据下，店小二可以把钱退回给买家。对于卖家，亦是如此，明明发了货，买家死活不承认，跟买家商量无果，那么卖家就需要提供足够的证明给淘宝店小二来介入，支付宝的钱才可以转入卖家账户。 支付宝之所以能够在淘宝上购物提供退钱功能，因为它是淘宝的产品，但是，如果你用支付宝去别的平台买东西，比如去OTC平台（场外交易）买比特币，很不幸，你就算被骗了，也无处申诉，除了走法律途径，然而中国大陆可能不认为你买卖比特币是合法行为。随着支付宝被使用得越来越多，它逐步变成一种支付手段，可以在其它平台上买卖物品，而不是中介功能。

支付宝账户是在淘宝系统里的一个账户，不一定非得跟你的银行账户有关联，因此在OTC平台上很多卖家宁可用支付宝账户收钱，宁可被支付宝收费，也不用银行账户，这样一旦被发现，仅仅支付宝账户被冻结，而不会银行他的银行账户，因为没有关联。支付宝提供这种中介功能，当然是收费的，不过收的是卖家的费，钱转入卖家账户时候收费，收费标准见[这里](https://cshall.alipay.com/lab/help_detail.htm?help_id=212450)。

Paypal是ebay提供的支付平台，所以仅仅在ebay平台上，它有退钱功能，这个跟淘宝的支付宝一样的，它的工作流程跟支付宝是差不多的，同样，随着被广泛使用，它也变成一种支付手段，而不是支付中介，我在海外购物，能用Paypal我不会用银行卡，主要怕暴露银行卡号，我曾经天真地以外在别的平台Paypal也能退钱，我娃娃曾经“不小心”用我的Paypal在苹果的APP Store里买过一个游戏，每个月都付费，我过了半年才觉察，于是找Paypal理论，说这不是我authorized payment，但是没用，Paypal叫我跟苹果理论去，我问能否把这个regular payment取消掉，Paypal也没辙，我只好改了我的账号的密码，然后那个苹果上的app跟我发了几次邮件说payment failure，就没声了。可见，Paypal也仅仅在ebay平台能起到中介功能，那种regular payment，是买家和卖家的协议，卖家定期通过Paypal提供的接口来把买家的钱转自己账号上。Paypal也是对买家免费，对卖家收费的，费用见[这里](https://www.paypal.com/au/webapps/mpp/paypal-seller-fees)。

![img](https://images.hive.blog/768x0/https://www.rahs.org.au/wp-content/uploads/2017/08/PayPal.jpg)

在去中心化的世界里，人们买卖产品，还是交易数字货币，更需要一个可靠的支付中介，一个去中心化的支付中介，必须能提供处理卖家买家纠纷的功能，这个仲裁的功能，还是需要人类去完成，而支付宝仅仅在淘宝平台能够起到中介的作用，因为它有淘宝领工资的店小二来主动处理。 如果这个去中心化支付系统被应用于中心化的平台，比如一个像淘宝一样的购物网站，网站当然可以指定一些类似淘宝店小二的角色来处理买卖的纠纷，所以这个去中心化支付系统还需要提供一个重要接口：**为一个买卖交易指定仲裁人**。即便这个看似简单的接口，也蕴藏着很多的考量，比如，谁有资格来指定仲裁人？对仲裁人怎么奖励？购物平台有两种方法接入这个去中心化支付系统，一种就是fork这个智能合约，加上些修改，比如加上”`modifier onlyOwner()`”这样限制合约所有者资格的事情，只有他有权利指定仲裁人，还有别的特权，这种情形最简单。 还有一种情形应该占大多数，是购物平台接入已有的智能合约，也就是说，这个智能合约需要服务于各种购物网站，不管中心化的，还是去中心化的购物平台。

![image.png](https://images.hive.blog/DQmWHzRSa37YEtbzeGBkxedH1K2MwoWciQEY93RGpV2Ao8j/image.png)

对于一个要为多个购物平台提供去中心化支付宝服务的智能合约来说，得考虑两种情况，一种就是购物平台类似淘宝那样是第三方平台，如果发生买卖纠纷，可以提交平台来解决，去中心化支付宝需要提供一个**仲裁人把钱返回给买家的接口**，以及**仲裁人把钱转给卖家的接口**，这样的情形，跟前面购物平台fork合约基本差不多，容易处理。

![image.png](https://images.hive.blog/DQmQrmkrKwVEoho642NycncAfiYcqcZZwK4rm5Dox4BF3Z5/image.png)

还有一种情形，就是我想说的，如何更广泛地支持去中心化世界里的陌生人的买卖交易，比如购物平台就是卖家自己搭建的网站，或者在**OpenBazaar**这样去中心化淘宝的系统买卖物品时候，购物平台无法提供店小二来调解纠纷，这个时候，我们就需要经济刺激和惩罚机制来解决这个问题。数字货币世界里，能解决这个问题的方法不是多得是吗？因为是“去中心化”，考虑到人性之恶，是不会有人主动来做这个仲裁人的，一定需要经济刺激，还要解决一个问题，就是店小二贪腐问题，这个让我想起来ETH 2.0 转POS的奖励和惩罚机制。

![image.png](https://images.hive.blog/DQmccKdqkjrduRmzgAo845cR4bQJbv591pG13m3JMExi3rr/image.png)

假设这个去中心化支付宝系统能有一种token，当社区有人看到提交的买卖纠纷案例时候，主动申请成为仲裁人，或者被动地被评选为仲裁人，得到买卖双方的认可，仲裁人需要持有token，把等值纠纷的价值额度抵押在去中心化支付系统里一段时间（这个“一段时间”，在以太坊系统里又是个难题，缺省是不支持timeout这种消息的，但是在EOS里可以这么做的），这样的做法，主要是防止仲裁人和卖家或者买家勾结。在纠结处理后数日会把这个抵押的token归还给仲裁人，同时还要给给仲裁人发额外的token作为奖励。 如果买家或卖家强烈反对，就需要社区来对这个案例投票，甚至动用世俗的法律来解决，如果证明仲裁人作弊，那么他/她抵押的token就会全部被系统没收，如果证明仲裁人是误判，那么抵押的token可能被部分没收。

![image.png](https://images.hive.blog/DQmb1v7raoTALE4oa5cooJDcf7UZ7BRBTzRHoAty37QZugw/image.png)

这个token的基本价值在于，可以分享这个系统产生的收益。要知道，无论是支付宝系统，还是Paypal，它们都是对卖家收费，对买家免费的，所以这个去中心化支付宝当然也对卖家收费，对买家免费。而且，我们要知道，很多大公司，是靠一个产品的利润养活了一堆员工，包括ceo，cto，cfo，各种中层和普通员工，还有就是给股东的分红，然后是被贪污或浪费掉的钱；甚至一个产品还能养活其它亏损部分，所以这个去中心化支付宝系统当然可以把收费搞得很低，薄利多销啊。 收取的费用只需要给所有token持有人分享，去除了各种不必要的环节。

![image.png](https://images.hive.blog/DQmV7HtwMPQo9qRoyDjpdEWQhBVnXVti74ynehtaenNyydx/image.png)

社区是区块链系统的灵魂，它是由所有持有这个去中心化支付系统token的人组成，持有token的权利和义务是相辅相成的，很多系统都是这样的，比如以太坊上著名的defi系统MakerDAO。token持有人除了去仲裁，和对仲裁结果投票的义务之外，还需要对系统的各种参数进行投票，比如对卖家的收费百分比。

![image.png](https://images.hive.blog/DQmcqFu3ihPQhqGFNoHb5xapKSgB2FReovMXjspQUBMBQsq/image.png)

还有就是我觉得仲裁过程应该在链下处理（off chain），而对资金的划拨和token的抵押，奖励，惩罚过程在链上处理（on chain），我们没有必要为了区块链而区块链。但是智能合约本身应该提供足够清晰的操作接口和资金安全性，这样它就不依赖于任何DAPP。

我希望这篇文章是一个引子，投石问路，抛砖引玉，吸引更多有识之士来参与讨论或一起实现。 在区块链的去中心化世界里，我相信，社区的力量是最重要的，一个产品，一个项目，只要有一堆人讨论，或许就能像道德经所说的，无中生有。

![image.png](https://images.hive.blog/DQmbzGiQrzVJGq7A1pnXpGBkG2vrAYgHMcSgfzAjLpnfhwn/image.png)



# 激励机制

我们认为，在联盟链和私有链里，数字货币并不是必须的，但是一个系统要在公链上保证安全性和易用性，必须引入基于数字货币的经济刺激和惩罚机制。基于这个系统产生的数字货币称为”TAO"，这个"TAO"持有人有如下的权利和义务：

- 系统启动上线之后，每次发生一个争执，当社区有人接手处理完一个争执，就会有'TAO'被创造出来，奖励给相关的贡献者； 
- 每次交易结束后，系统会自动从参与用户中扣除少量佣金，这些佣金被保留在智能合约中，然后会发送给“TAO"持有人；
- 'TAO' 持有人有责任对社区的提议进行投票啊，比如对个体交易商的奖励，合约应该如何工作，什么稳定币需要被引进等。


# 结论

这个去中心化支付宝系统，其设计初衷是为了“无账户交易系统”，为了买卖双方能更资金安全地进行交易，但是它的适用性远远高于此，它可以像支付宝或者paypal一样为购物者在用数字货币支付购物时候，进行仲裁的作用，这点甚至支付宝和paypal也不能在它们本身系统外能做到。由加密货币经济刺激驱动社区成员来维护自己的利益的系统。



[English Version](https://github.com/Thiaoouba-noaccount/DecentralizedPaypal/blob/master/doc/Decentralized%20Alipay.md)